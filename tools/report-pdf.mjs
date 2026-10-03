#!/usr/bin/env node
// REPORT/Before-After.md -> styled, self-contained HTML -> REPORT/Before-After.pdf (A4) via Playwright.
// Usage: node tools/report-pdf.mjs [--in REPORT/Before-After.md] [--out REPORT/Before-After.pdf] [--html <path>]
// Local images are embedded as data URIs. Tall phone screenshots inside "Old site | New site" tables are cropped
// to the first phone screen (390 x 844 CSS px) so each old/new pair fits on a page. Fonts are the site's own
// self-hosted woff2 files (public/fonts), embedded; nothing is fetched from the network.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { abs, args, launchBrowser } from './lib.mjs';

const a = args();
const IN = abs(a.in || 'REPORT/Before-After.md');
const OUT = abs(a.out || 'REPORT/Before-After.pdf');
const BASE = path.dirname(IN);
const SCREEN = { width: 390, height: 844 };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const imgCache = new Map();
async function imageData(src, { crop = false } = {}) {
  const file = path.resolve(BASE, src);
  const key = `${file}|${crop}`;
  if (imgCache.has(key)) return imgCache.get(key);
  if (!fs.existsSync(file)) throw new Error(`image not found: ${src}`);
  let img = sharp(file);
  const meta = await img.metadata();
  if (crop && meta.height > SCREEN.height) {
    const w = meta.width;
    const h = Math.round((SCREEN.height / SCREEN.width) * w);
    img = img.extract({ left: 0, top: 0, width: w, height: Math.min(h, meta.height) });
  }
  const buf = await img.resize({ width: Math.min(meta.width, 780), withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
  const uri = `data:image/jpeg;base64,${buf.toString('base64')}`;
  imgCache.set(key, uri);
  return uri;
}

// Inline markdown: code, images, links, bold, italic. Images are resolved later (async), so they become tokens.
const pendingImages = [];
function inline(src, ctx = {}) {
  const codes = [];
  let s = src.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000C${codes.length - 1}\u0000`; });
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, url) => {
    const i = pendingImages.push({ alt, url, crop: !!ctx.crop }) - 1;
    return `\u0000I${i}\u0000`;
  });
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, url) => `<a href="${attr(url)}">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
  s = s.replace(/\u0000C(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
  return s;
}

function render(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  let lastHeading = '';
  const isBlockStart = (l) => /^(#{1,6}\s|\|)/.test(l) || /^\s*([-*]|\d+\.)\s+/.test(l) || l.trim() === '';
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      lastHeading = h[2];
      out.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      const pair = head.length === 2 && /old site/i.test(head[0]) && /new site/i.test(head[1]) && body.some((r) => r.some((c) => c.startsWith('![')));
      if (pair) {
        out.push(`<figure class="pair" aria-label="${attr(lastHeading)}">`);
        for (const r of body) {
          r.forEach((c, k) => {
            out.push(`<div class="shot"><div class="shot-label">${k ? 'New site' : 'Old site'}</div>${inline(c, { crop: true })}</div>`);
          });
        }
        out.push('</figure>');
      } else {
        out.push('<table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>');
        for (const r of body) out.push('<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>');
        out.push('</tbody></table>');
      }
      continue;
    }
    const li = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (li) {
      const ordered = /\d+\./.test(li[2]);
      const start = ordered ? parseInt(li[2], 10) : 1;
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (m && (/\d+\./.test(m[2]) === ordered)) { items.push(m[3]); i++; continue; }
        if (lines[i].trim() && /^\s{2,}/.test(lines[i]) && items.length) { items[items.length - 1] += ' ' + lines[i].trim(); i++; continue; }
        break;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}${ordered && start !== 1 ? ` start="${start}"` : ''}>` + items.map((t) => `<li>${inline(t)}</li>`).join('') + `</${tag}>`);
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !(para.length && isBlockStart(lines[i]))) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

const fontFace = (family, file) => {
  const p = abs(`public/fonts/${file}`);
  if (!fs.existsSync(p)) return '';
  return `@font-face{font-family:"${family}";font-weight:400 700;font-style:normal;src:url(data:font/woff2;base64,${fs.readFileSync(p).toString('base64')}) format("woff2");}`;
};

const CSS = `
${fontFace('Newsreader', 'newsreader-latin.woff2')}
${fontFace('Public Sans', 'public-sans-latin.woff2')}
@page { size: A4; margin: 18mm 17mm 20mm; }
:root { --ink:#16202C; --muted:#5A6472; --rule:#CDD0D3; --paper:#FFFFFF; --linen:#EFEDE7; --blue:#2E5F96; --logo:#447CB7; --brass:#8C6A2F; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin:0; background:var(--paper); color:var(--ink); font:10.5pt/1.55 "Public Sans", "Helvetica Neue", Arial, sans-serif; }
h1, h2, h3 { font-family:"Newsreader", Georgia, serif; font-weight:600; color:var(--ink); line-height:1.15; break-after:avoid; }
h1 { font-size:27pt; margin:0 0 4pt; letter-spacing:-0.01em; }
h1 + p { color:var(--muted); margin-top:0; padding-bottom:10pt; border-bottom:2pt solid var(--logo); }
h2 { font-size:17pt; margin:20pt 0 6pt; padding-top:8pt; border-top:0.75pt solid var(--ink); }
h3 { font-size:13pt; margin:14pt 0 4pt; }
p { margin:0 0 7pt; orphans:3; widows:3; }
ul, ol { margin:0 0 8pt; padding-left:22pt; }
li { margin:0 0 3.5pt; }
li::marker { color:var(--brass); }
strong { font-weight:650; }
a { color:var(--blue); text-decoration:underline; text-underline-offset:1.5pt; }
code { font:9pt/1.3 ui-monospace, "DejaVu Sans Mono", monospace; background:var(--linen); padding:0.5pt 3pt; border-radius:2pt; overflow-wrap:anywhere; }
table { width:100%; border-collapse:collapse; margin:6pt 0 10pt; font-size:9.2pt; break-inside:auto; }
thead { display:table-header-group; }
tr { break-inside:avoid; }
th { text-align:left; font-weight:650; background:var(--linen); border-bottom:1pt solid var(--ink); padding:5pt 6pt; vertical-align:bottom; }
td { border-bottom:0.5pt solid var(--rule); padding:4.5pt 6pt; vertical-align:top; }
td:not(:first-child), th:not(:first-child) { font-variant-numeric: tabular-nums; }
.pair { display:grid; grid-template-columns:1fr 1fr; gap:8mm; margin:4pt 0 8pt; break-inside:avoid; justify-items:center; }
.shot { width:78mm; }
.shot-label { font-size:8.5pt; font-weight:650; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); margin-bottom:3pt; }
.shot img { display:block; width:78mm; height:auto; border:0.75pt solid var(--rule); border-radius:2.5mm; }
h3 { break-before:auto; }
h3:has(+ .pair) { break-before:page; }
.footer-note { color:var(--muted); font-size:8.5pt; }
`;

const md = fs.readFileSync(IN, 'utf8');
let body = render(md);
const uris = await Promise.all(pendingImages.map((im) => imageData(im.url, { crop: im.crop })));
body = body.replace(/\u0000I(\d+)\u0000/g, (_, k) => {
  const im = pendingImages[+k];
  return `<img src="${uris[+k]}" alt="${attr(im.alt)}">`;
});
const title = (md.match(/^#\s+(.*)$/m) || [, 'Report'])[1];
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${CSS}</style></head><body>${body}</body></html>`;
if (a.html) fs.writeFileSync(abs(a.html), html);

const browser = await launchBrowser();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font:8px Arial,sans-serif;color:#5A6472;padding:0 17mm;display:flex;justify-content:space-between"><span>Will Fraley, Attorney at Law — website before and after</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '18mm', right: '17mm', bottom: '20mm', left: '17mm' },
  });
} finally {
  await browser.close();
}
console.log(`${path.relative(abs('.'), OUT)} written (${(fs.statSync(OUT).size / 1048576).toFixed(1)} MB, ${pendingImages.length} images)`);
