#!/usr/bin/env node
// Image pipeline. Generation itself is an AGENT tool call (Higgsfield MCP generate_image + jobs_wait);
// this script never talks to Higgsfield and holds no credentials. It downloads the returned file,
// optimizes it, and logs it.
//
//   --pull <rawUrl> --slot <slot> --set <A|B|C|site> --model <id> --credits <n> --prompt <text|@file> [--ratio 16:9] [--job <id>] [--ref <original image>]
//        -> images/generated/<set>/<slot>.png + .avif/.webp at several widths, logged to images/generated/<set>.json
//   --placeholder --slot <slot> --set <set> --ratio 16:9 --colors "#1b2a3a,#c9b48a"   (tonal fallback, no credits)
//   --optimize <src> --out <dir> [--widths 480,960,1440]                         (reused real photos/logo)
//   --merge                                                                     -> images/GENERATED.json
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { args, abs, ensureDir, readJSON, writeJSON, fetchRetry, walk } from './lib.mjs';

const a = args();
const WIDTHS = String(a.widths || '640,960,1280,1920,2560').split(',').map(Number);

async function variants(src, outDir, base) {
  const meta = await sharp(src).metadata();
  const files = [];
  for (const w of WIDTHS.filter((w) => w <= (meta.width || 0)).concat(WIDTHS.every((w) => w > meta.width) ? [meta.width] : [])) {
    for (const [fmt, opts] of [['avif', { quality: 55, effort: 5 }], ['webp', { quality: 78 }]]) {
      const f = path.join(outDir, `${base}-${w}.${fmt}`);
      await sharp(src).resize({ width: w, withoutEnlargement: true })[fmt](opts).toFile(f);
      files.push({ file: path.relative(abs('.'), f), width: w, format: fmt, bytes: fs.statSync(f).size });
    }
  }
  return { width: meta.width, height: meta.height, files };
}

function logRecord(set, rec) {
  const frag = `images/generated/${set}.json`;
  const list = readJSON(frag, []).filter((r) => r.slot !== rec.slot);
  list.push(rec);
  writeJSON(frag, list);
}

async function main() {
  if (a.pull) {
    if (!a.slot || !a.set) throw new Error('--slot and --set are required');
    const dir = ensureDir(`images/generated/${a.set}`);
    const r = await fetchRetry(a.pull);
    if (!r.ok) throw new Error(`download failed: HTTP ${r.status} for ${a.pull}`);
    const buf = Buffer.from(await r.arrayBuffer());
    const master = path.join(dir, `${a.slot}.png`);
    await sharp(buf).png().toFile(master);
    const v = await variants(master, dir, a.slot);
    const prompt = String(a.prompt || '').startsWith('@') ? fs.readFileSync(abs(a.prompt.slice(1)), 'utf8') : a.prompt;
    const rec = { slot: a.slot, set: a.set, kind: 'generated', model: a.model || null, credits: a.credits !== undefined ? Number(a.credits) : null,
      ratio: a.ratio || null, job: a.job || null, reference: a.ref || null, prompt, source: a.pull,
      master: path.relative(abs('.'), master), width: v.width, height: v.height, variants: v.files, createdAt: new Date().toISOString() };
    logRecord(a.set, rec);
    console.log(JSON.stringify({ ok: true, slot: a.slot, width: v.width, height: v.height, variants: v.files.length }));
    return;
  }
  if (a.placeholder) {
    const [w, h] = String(a.ratio || '16:9').split(':').map(Number);
    const W = 1920, H = Math.round((W * h) / w);
    const [c1, c2] = String(a.colors || '#1d2733,#3a4a5c').split(',');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .06 0"/></filter></defs><rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    const dir = ensureDir(`images/generated/${a.set}`);
    const master = path.join(dir, `${a.slot}.png`);
    await sharp(Buffer.from(svg)).png().toFile(master);
    const v = await variants(master, dir, a.slot);
    logRecord(a.set, { slot: a.slot, set: a.set, kind: 'placeholder', model: null, credits: 0, ratio: a.ratio || '16:9', prompt: null,
      master: path.relative(abs('.'), master), width: v.width, height: v.height, variants: v.files, createdAt: new Date().toISOString() });
    console.log(JSON.stringify({ ok: true, placeholder: a.slot }));
    return;
  }
  if (a.optimize) {
    const out = ensureDir(a.out || 'src/assets/reused');
    const base = path.basename(a.optimize).replace(/\.[^.]+$/, '');
    const v = await variants(abs(a.optimize), out, base);
    console.log(JSON.stringify(v, null, 2));
    return;
  }
  if (a.merge) {
    const frags = walk('images/generated', (f) => /images\/generated\/[^/]+\.json$/.test(f));
    const all = frags.flatMap((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
    const credits = all.reduce((s, r) => s + (r.credits || 0), 0);
    writeJSON('images/GENERATED.json', {
      generatedAt: new Date().toISOString(),
      totals: { images: all.filter((r) => r.kind === 'generated').length, placeholders: all.filter((r) => r.kind === 'placeholder').length, credits: Number(credits.toFixed(2)) },
      images: all.sort((x, y) => (x.set + x.slot).localeCompare(y.set + y.slot)),
    });
    console.log(`merged ${all.length} records, ${credits.toFixed(2)} credits`);
    return;
  }
  console.log('see header for usage');
}
main().catch((e) => { console.error(e.message || e); process.exit(1); });
