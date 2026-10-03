#!/usr/bin/env node
// Builds mockups/COMPARE.html (self-contained: screenshots inlined as base64 JPEG) and MOCKUPS-rev<N>.zip.
// Also rewrites each mockups/<X>/dist to relative paths so the folder opens from disk (file://).
// Usage: node tools/compare.mjs --rev 1 [--dirs A,B,C] [--no-zip]
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { args, abs, walk, readJSON, launchBrowser, newContext } from './lib.mjs';

const a = args();
const REV = Number(a.rev || 1);
const DIRS = String(a.dirs || 'A,B,C').split(',');
const NAMES = { A: 'Counsel', B: 'Verdict', C: 'Neighbor' };
const PAGES = [['index', 'Home'], ['criminal-defense', 'Criminal Defense'], ['contact-us', 'Contact']];
const LIMIT = 25 * 1024 * 1024;

/** Make every root-absolute URL in a built folder relative, and point directory links at index.html. */
function relativize(distDir) {
  const root = abs(distDir);
  for (const f of walk(root, (p) => /\.(html|css)$/.test(p))) {
    const depth = path.relative(root, path.dirname(f)).split(path.sep).filter(Boolean).length;
    const up = depth ? '../'.repeat(depth) : './';
    let s = fs.readFileSync(f, 'utf8');
    const fix = (u) => {
      if (!u.startsWith('/') || u.startsWith('//')) return u;
      let [p, rest = ''] = u.split(/(?=[?#])/);
      if (p.endsWith('/')) p += 'index.html';
      else if (!/\.[a-z0-9]+$/i.test(p)) p += '/index.html';
      return up + p.slice(1) + rest;
    };
    if (f.endsWith('.html')) {
      s = s.replace(/(\s(?:href|src|poster|content)=")([^"]*)"/g, (m, k, u) => (k.includes('content') && !u.startsWith('/') ? m : k + fix(u) + '"'));
      s = s.replace(/(\s(?:image)?srcset=")([^"]*)"/g, (m, k, v) => k + v.split(',').map((part) => { const [u, d] = part.trim().split(/\s+/); return [fix(u), d].filter(Boolean).join(' '); }).join(', ') + '"');
      s = s.replace(/url\((['"]?)(\/[^)'"]+)\1\)/g, (m, q, u) => `url(${q}${fix(u)}${q})`);
    } else {
      const cssUp = '../'.repeat(depth);
      s = s.replace(/url\((['"]?)(\/[^)'"]+)\1\)/g, (m, q, u) => `url(${q}${cssUp}${u.slice(1)}${q})`);
    }
    fs.writeFileSync(f, s);
  }
}

function md(text) {
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (t) => esc(t).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/`([^`]+)`/g, '<code>$1</code>');
  const out = [];
  let list = false;
  for (const line of text.replace(/^---[\s\S]*?---\n/, '').split('\n')) {
    if (/^\s*[-*] /.test(line)) { if (!list) { out.push('<ul>'); list = true; } out.push(`<li>${inline(line.replace(/^\s*[-*] /, ''))}</li>`); continue; }
    if (list) { out.push('</ul>'); list = false; }
    const h = line.match(/^(#{1,4}) (.*)/);
    if (h) out.push(`<h${h[1].length + 2}>${inline(h[2])}</h${h[1].length + 2}>`);
    else if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push('</ul>');
  return out.join('\n');
}

async function inline(file, width) {
  const buf = await sharp(abs(file)).resize({ width, withoutEnlargement: true }).jpeg({ quality: 68, mozjpeg: true }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

function findShot(dir, slug, w) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const f = `mockups/${dir}/shots/${slug}-${w}.${ext}`;
    if (fs.existsSync(abs(f))) return f;
  }
  return null;
}

async function verifyOpensFromDisk(dir) {
  const f = abs(`mockups/${dir}/dist/index.html`);
  if (!fs.existsSync(f)) return { ok: false, why: 'no dist/index.html' };
  const browser = await launchBrowser();
  const ctx = await newContext(browser);
  const page = await ctx.newPage();
  const failed = [];
  // Chromium refuses web fonts over file:// (opaque origin, CORS) — expected; the page falls back to system fonts.
  page.on('requestfailed', (r) => { if (!/\.woff2?$/.test(r.url())) failed.push(r.url()); });
  await page.goto('file://' + f, { waitUntil: 'load' });
  const css = await page.evaluate(() => document.styleSheets.length);
  await browser.close();
  return { ok: failed.length === 0 && css > 0, failed: failed.slice(0, 5), stylesheets: css };
}

async function main() {
  const report = {};
  for (const d of DIRS) {
    if (fs.existsSync(abs(`mockups/${d}/dist`))) {
      relativize(`mockups/${d}/dist`);
      report[d] = await verifyOpensFromDisk(d);
    }
  }
  const rec = fs.existsSync(abs('mockups/RECOMMENDATION.md')) ? fs.readFileSync(abs('mockups/RECOMMENDATION.md'), 'utf8') : '_No recommendation written._';
  const sections = [];
  for (const d of DIRS) {
    const rationale = fs.existsSync(abs(`mockups/${d}/RATIONALE.md`)) ? fs.readFileSync(abs(`mockups/${d}/RATIONALE.md`), 'utf8') : '';
    const rows = [];
    for (const [slug, label] of PAGES) {
      const m = findShot(d, slug, 390), dk = findShot(d, slug, 1280);
      rows.push(`<div class="pair"><h4>${label}</h4><div class="shots">${m ? `<figure class="m"><img loading="lazy" alt="${NAMES[d]} — ${label}, phone" src="${await inline(m, 390)}"><figcaption>Phone</figcaption></figure>` : ''}${dk ? `<figure class="d"><img loading="lazy" alt="${NAMES[d]} — ${label}, desktop" src="${await inline(dk, 960)}"><figcaption>Desktop</figcaption></figure>` : ''}</div></div>`);
    }
    sections.push(`<section id="${d}"><h2><span class="tag">${d}</span> ${NAMES[d]}</h2><details><summary>Why this direction</summary><div class="md">${md(rationale)}</div></details>${rows.join('\n')}<p class="open">Full mockup: open <code>mockups/${d}/dist/index.html</code> from the unzipped folder.</p></section>`);
  }
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Will Fraley — Mockups rev ${REV}</title>
<style>
:root{--bg:#f6f4ef;--fg:#1d1f22;--muted:#5b5f66;--card:#fff;--line:#e3dfd6;--accent:#8a5a1f}
@media (prefers-color-scheme:dark){:root{--bg:#141619;--fg:#ecebe7;--muted:#a3a6ab;--card:#1d2024;--line:#2c3036;--accent:#d9a65a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif}
header,section{max-width:1200px;margin:0 auto;padding:24px 16px}header h1{margin:0 0 8px;font-size:1.6rem}nav{display:flex;gap:8px;flex-wrap:wrap;position:sticky;top:0;background:var(--bg);padding:10px 16px;border-bottom:1px solid var(--line);z-index:2}
nav a{color:var(--fg);text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:6px 14px}.rec{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:8px;padding:12px 16px}
h2{font-size:1.4rem;border-top:1px solid var(--line);padding-top:24px}.tag{display:inline-block;background:var(--fg);color:var(--bg);border-radius:6px;padding:0 8px;margin-right:6px}
.pair h4{margin:24px 0 8px}.shots{display:flex;gap:16px;align-items:flex-start;overflow-x:auto}figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px}
figure img{display:block;width:100%;height:auto;border-radius:4px}figure.m{flex:0 0 min(300px,80vw)}figure.d{flex:1 1 640px;min-width:min(640px,90vw)}figcaption{font-size:.8rem;color:var(--muted);padding-top:4px}
details{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:8px 14px}summary{cursor:pointer;font-weight:600}.md h3,.md h4,.md h5{margin:.8em 0 .3em}.open{color:var(--muted);font-size:.9rem}
@media (max-width:700px){.shots{flex-direction:column}figure.m,figure.d{flex:none;width:100%;min-width:0}}
</style></head><body>
<header><h1>Will Fraley, Attorney at Law — three directions</h1><p>Mockups rev ${REV}. Each direction shows Home, Criminal Defense and Contact on a phone and on a desktop, using the rewritten copy, the firm's own logo and photos, and newly generated scenes.</p>
<div class="rec"><strong>Creative Director's recommendation</strong><div class="md">${md(rec)}</div></div>
<p>Reply with one of: <code>Revise mockups: &lt;notes&gt;</code> · <code>Build direction &lt;A|B|C&gt;. &lt;optional tweaks&gt;</code></p></header>
<nav>${DIRS.map((d) => `<a href="#${d}">${d} · ${NAMES[d]}</a>`).join('')}</nav>
${sections.join('\n')}
</body></html>`;
  fs.writeFileSync(abs('mockups/COMPARE.html'), html);
  console.log(`COMPARE.html ${(fs.statSync(abs('mockups/COMPARE.html')).size / 1048576).toFixed(1)} MB; from-disk check: ${JSON.stringify(report)}`);

  if (!a['no-zip']) {
    const zip = abs(`MOCKUPS-rev${REV}.zip`);
    const build = (excludeShots) => {
      if (fs.existsSync(zip)) fs.rmSync(zip);
      const ex = ['mockups/*/node_modules/*', 'mockups/*/.astro/*', 'mockups/*/src/*', ...(excludeShots ? ['mockups/*/shots/*'] : [])];
      execFileSync('zip', ['-r', '-q', '-9', zip, 'mockups', '-x', ...ex], { cwd: abs('.') });
      return fs.statSync(zip).size;
    };
    let size = build(false);
    if (size > LIMIT) size = build(true);
    if (size > LIMIT) { console.error(`ZIP TOO LARGE: ${(size / 1048576).toFixed(1)} MB`); process.exit(1); }
    console.log(`MOCKUPS-rev${REV}.zip ${(size / 1048576).toFixed(1)} MB`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
