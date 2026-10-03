#!/usr/bin/env node
// A23 P700: social cards + favicon set, generated before `astro build` (wired into the npm "build" script).
//
//   node tools/og.mjs            -> public/og/<file-slug>.png for every sitemap page, EN and ES (1200x630)
//                                   public/og/default.png, favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png,
//                                   icon-192.png, icon-512.png, icon-maskable-512.png, site.webmanifest
//
// File slug = the page URL path without slashes, "/" -> "__" (CLAUDE.md conventions); "/" is "index".
//   /criminal-defense/dui/ -> criminal-defense__dui.png    /es/defensa-penal/dui/ -> es__defensa-penal__dui.png
// src/layouts/Base.astro computes the same name for og:image.
//
// Text is set in the brand faces: tools/fonts/*.ttf are static instances of the self-hosted variable fonts
// (tools/fonts/build-fonts.py). FONTCONFIG_FILE points libvips/pango at tools/fonts/fonts.conf, which exposes
// ONLY those files, so a missing face fails loudly instead of falling back to a system serif.
// Colors are the production tokens (src/styles/tokens.css), read from the file, not retyped.
// The card states only verified firm facts (name, phone, city) plus the page's own H1 from its copy file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...a) => path.join(ROOT, ...a);
process.env.FONTCONFIG_FILE = P('tools/fonts/fonts.conf');
fs.mkdirSync(P('.cache/fontconfig'), { recursive: true });
const sharp = (await import('sharp')).default;
const YAML = (await import('yaml')).default;

// ------------------------------------------------------------------ tokens
const css = fs.readFileSync(P('src/styles/tokens.css'), 'utf8');
const vars = {};
for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) if (!(m[1] in vars)) vars[m[1]] = m[2].replace(/\/\*.*?\*\//g, '').trim();
const tok = (name, d = 0) => { const v = vars[name]; if (!v || d > 8) throw new Error(`token ${name} missing`); const r = v.match(/^var\((--[\w-]+)\)$/); return r ? tok(r[1], d + 1) : v; };
const C = {
  paper: tok('--color-bg'),
  ink: tok('--color-heading'),
  muted: tok('--color-text-muted'),
  brand: tok('--brand-600'),
  logoBlue: tok('--color-brand'),
  rule: tok('--color-rule'),
  marker: tok('--color-marker'),
};

// ------------------------------------------------------------------ fonts
for (const f of ['Newsreader-Display.ttf', 'Newsreader-DisplayStrong.ttf', 'PublicSans-SemiBold.ttf', 'PublicSans-Regular.ttf', 'monogram.json'])
  if (!fs.existsSync(P('tools/fonts', f))) { console.error(`og: tools/fonts/${f} missing — run python3 tools/fonts/build-fonts.py`); process.exit(1); }
const FONT = {
  display: { font: 'Newsreader Display', file: P('tools/fonts/Newsreader-Display.ttf') },
  label: { font: 'Public Sans Card SemiBold', file: P('tools/fonts/PublicSans-SemiBold.ttf') },
  text: { font: 'Public Sans Card Regular', file: P('tools/fonts/PublicSans-Regular.ttf') },
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function textLayer(markup, face, size, { width, spacing = 0, align = 'left', letterSpacing } = {}) {
  const span = `<span foreground="${'#000'}"${letterSpacing ? ` letter_spacing="${letterSpacing}"` : ''}>${markup}</span>`;
  const img = sharp({ text: { text: span, font: `${face.font} ${size}`, fontfile: face.file, width, wrap: 'word', align, spacing, rgba: true, dpi: 72 } });
  const buf = await img.png().toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, width: meta.width, height: meta.height };
}
/** Recolor a black-on-transparent text raster to a hex color (pango markup colors are unreliable with rgba). */
async function tint(layer, hex) {
  const { data, info } = await sharp(layer.buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  for (let i = 0; i < data.length; i += 4) { data[i] = r; data[i + 1] = g; data[i + 2] = b; }
  return { ...layer, buf: await sharp(data, { raw: info }).png().toBuffer() };
}

// ------------------------------------------------------------------ monogram ("WF" in Newsreader, paper on Counsel blue)
const mono = JSON.parse(fs.readFileSync(P('tools/fonts/monogram.json'), 'utf8'));
/** SVG tile with the WF outlines centered; inset = share of the tile the letters may span. */
function monogramSvg(size, { radius = 0, inset = 0.72, bg = C.brand, fg = C.paper } = {}) {
  const [x0, y0, x1, y1] = mono.bbox;
  const s = (size * inset) / (x1 - x0);
  const tx = (size - (x1 - x0) * s) / 2 - x0 * s;
  // optical center: cap height box centered vertically
  const ty = (size - (y1 - y0) * s) / 2 - y0 * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">` +
    `<rect width="${size}" height="${size}"${radius ? ` rx="${radius}"` : ''} fill="${bg}"/>` +
    `<path transform="matrix(${+s.toFixed(6)} 0 0 ${+s.toFixed(6)} ${+tx.toFixed(3)} ${+ty.toFixed(3)})" fill="${fg}" d="${mono.d}"/></svg>`;
}

// ------------------------------------------------------------------ pages
const sm = JSON.parse(fs.readFileSync(P('plan/sitemap.json'), 'utf8'));
const normPath = (p) => { const s = String(p || '/').replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, ''); return s ? `/${s}/` : '/'; };
export const ogSlug = (p) => normPath(p).replace(/^\/|\/$/g, '').replace(/\//g, '__') || 'index';
const slugOf = (enPath) => normPath(enPath).replace(/^\/|\/$/g, '') || 'index';
function front(file) {
  if (!fs.existsSync(file)) return {};
  const m = fs.readFileSync(file, 'utf8').match(/^---\n([\s\S]*?)\n---/);
  return m ? YAML.parse(m[1]) || {} : {};
}
const strip = (s) => String(s || '').replace(/\{fact:[^}]*\}/g, '').replace(/\s+/g, ' ').trim();

const W = 1200, H = 630, M = 80;
async function card({ headline, lang }) {
  const eyebrow = await tint(await textLayer(esc('WILL FRALEY · ATTORNEY AT LAW'), FONT.label, 22, { letterSpacing: 2600 }), C.muted);
  // Headline: largest size from 84 down that fits in 3 lines / 290 px.
  let head;
  for (let size = 84; size >= 48; size -= 4) {
    head = await textLayer(esc(headline), FONT.display, size, { width: W - 2 * M - 40, spacing: Math.round(size * 0.12) });
    if (head.height <= 290) break;
  }
  head = await tint(head, C.ink);
  const footL = await tint(await textLayer(esc('(615) 410-7290'), FONT.label, 30), C.brand);
  const footR = await tint(await textLayer(esc('Murfreesboro, Tennessee · Se habla español'), FONT.text, 24), C.muted);
  const tile = Buffer.from(monogramSvg(64, { radius: 0 }));
  const base = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${C.paper}"/>` +
    `<rect width="${W}" height="10" fill="${C.brand}"/>` +
    `<rect x="${M}" y="${H - 132}" width="${W - 2 * M}" height="1" fill="${C.rule}"/>` +
    `<rect x="${M}" y="${H - 133}" width="56" height="3" fill="${C.marker}"/></svg>`;
  const headTop = 168 + Math.max(0, Math.round((290 - head.height) / 2));
  return sharp(Buffer.from(base))
    .composite([
      { input: tile, left: M, top: 72 },
      { input: eyebrow.buf, left: M + 64 + 24, top: 72 + Math.round((64 - eyebrow.height) / 2) },
      { input: head.buf, left: M, top: headTop },
      { input: footL.buf, left: M, top: H - 132 + 36 },
      { input: footR.buf, left: W - M - footR.width, top: H - 132 + 36 + Math.round((footL.height - footR.height) / 2) },
    ])
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  const out = P('public/og');
  fs.mkdirSync(out, { recursive: true });
  const jobs = [];
  for (const pg of sm.pages) {
    const slug = slugOf(pg.path);
    const en = front(P('copy/pages', `${slug}.md`));
    jobs.push({ path: pg.path, lang: 'en', headline: strip(en.h1 || pg.title) });
    if (pg.esPath) {
      const es = front(P('copy/pages/es', `${slug}.md`));
      jobs.push({ path: pg.esPath, lang: 'es', headline: strip(es.h1 || pg.titleEs || pg.title) });
    }
  }
  jobs.push({ path: '/default/', lang: 'en', headline: 'Criminal defense, family law and personal injury in Murfreesboro' });
  let bytes = 0;
  for (const j of jobs) {
    const file = path.join(out, `${j.path === '/default/' ? 'default' : ogSlug(j.path)}.png`);
    const png = await card(j);
    fs.writeFileSync(file, png);
    bytes += png.length;
  }
  console.log(`og: ${jobs.length} cards (1200x630) -> public/og/ (${(bytes / 1024).toFixed(0)} KB total)`);

  // ---------------------------------------------------------------- favicon set
  const pub = P('public');
  fs.writeFileSync(path.join(pub, 'favicon.svg'), monogramSvg(64, { radius: 10 }) + '\n');
  const png = (size, opts) => sharp(Buffer.from(monogramSvg(size, opts)), { density: 72 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
  fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), await png(180, { inset: 0.66 }));
  fs.writeFileSync(path.join(pub, 'icon-192.png'), await png(192, { inset: 0.66 }));
  fs.writeFileSync(path.join(pub, 'icon-512.png'), await png(512, { inset: 0.66 }));
  fs.writeFileSync(path.join(pub, 'icon-maskable-512.png'), await png(512, { inset: 0.5 }));
  // favicon.ico: PNG-compressed entries at 16, 32 and 48 (Vista+ ICO format).
  const icoSizes = [16, 32, 48];
  const imgs = await Promise.all(icoSizes.map((s) => png(s, { inset: 0.8, radius: s / 8 })));
  const header = Buffer.alloc(6 + 16 * imgs.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(imgs.length, 4);
  let offset = header.length;
  imgs.forEach((b, i) => {
    const e = 6 + 16 * i, s = icoSizes[i];
    header.writeUInt8(s, e); header.writeUInt8(s, e + 1); header.writeUInt8(0, e + 2); header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6); header.writeUInt32LE(b.length, e + 8); header.writeUInt32LE(offset, e + 12);
    offset += b.length;
  });
  fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...imgs]));
  const manifest = {
    name: 'Will Fraley, Attorney at Law',
    short_name: 'Will Fraley',
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: C.paper,
    theme_color: C.paper,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  fs.writeFileSync(path.join(pub, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('og: favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png, icon-192/512, icon-maskable-512, site.webmanifest');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
