// Direction B "Verdict": prepares mockup images in public/img.
// Run from the repo root: node mockups/B/scripts/prep-images.mjs
// - copies the generated set-B variants that the mockup uses
// - optimizes the logo (IMG01) and the attorney photos (IMG02, IMG03) with sharp, never upscaling
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const OUT = path.resolve(HERE, '../public/img');
fs.mkdirSync(OUT, { recursive: true });

// 1. Generated scenes (already graded and encoded by tools/images.mjs).
const GEN = path.join(ROOT, 'images/generated/B');
const want = [
  'hero-640', 'hero-960', 'hero-1280', 'hero-1920',
  'practice-640', 'practice-960', 'practice-1280',
  'contact-640', 'contact-960',
];
for (const w of want) for (const ext of ['avif', 'webp']) {
  fs.copyFileSync(path.join(GEN, `${w}.${ext}`), path.join(OUT, `${w}.${ext}`));
}

// 2. Logo IMG01 (400x62 raster, transparent). Two versions:
//    - logo-blue: the wordmark as drawn, with the faint tagline (#113964 at ~40% alpha) made solid so it reads.
//    - logo-white: a white knockout of the same letterforms for night blocks.
const LOGO = path.join(ROOT, 'inventory/assets/Logo-3.webp');
const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const blue = Buffer.from(data);
const white = Buffer.from(data);
const dist = (r, g, b, c) => (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2;
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  if (a === 0) continue;
  const isTagline = dist(r, g, b, [0x11, 0x39, 0x64]) < dist(r, g, b, [0x44, 0x7c, 0xb7]);
  if (isTagline) {
    // solid navy tagline (#1D478A, 9.05:1 on white)
    blue[i] = 0x1d; blue[i + 1] = 0x47; blue[i + 2] = 0x8a;
    blue[i + 3] = Math.min(255, Math.round(a * 2.4));
  }
  white[i] = 255; white[i + 1] = 255; white[i + 2] = 255;
  white[i + 3] = isTagline ? Math.min(255, Math.round(a * 2.2)) : a;
}
for (const [name, buf] of [['logo-blue', blue], ['logo-white', white]]) {
  const img = sharp(buf, { raw: { width: info.width, height: info.height, channels: 4 } });
  await img.clone().webp({ lossless: true }).toFile(path.join(OUT, `${name}.webp`));
  // Below 200 px wide the tagline is dropped (DESIGN-BRIEF): wordmark-only crop, rows 0-39 of 62.
  if (name === 'logo-blue') await img.clone().extract({ left: 0, top: 0, width: info.width, height: 40 }).webp({ lossless: true }).toFile(path.join(OUT, `${name}-mark.webp`));
}

// 3. Attorney photos. Never wider than the source pixels.
const photos = [
  // IMG03: Will at his desk, 910x715. Light crop off the left chair edge, keep the desk.
  { src: 'content-v1-img.webp', name: 'will-desk', widths: [640, 880], extract: { left: 30, top: 0, width: 880, height: 715 } },
  // IMG02: Will at the brick doorway, 673x951. Portrait crop.
  { src: 'content-v10-img-attorney.webp', name: 'will-door', widths: [480, 672], extract: { left: 0, top: 0, width: 672, height: 896 } },
];
for (const p of photos) {
  const base = sharp(path.join(ROOT, 'inventory/assets', p.src)).extract(p.extract)
    .modulate({ saturation: 0.94 }).linear(1.03, -3); // gentle color correction only
  const meta = p.extract;
  for (const w of p.widths) {
    const width = Math.min(w, meta.width);
    const h = Math.round((meta.height / meta.width) * width);
    await base.clone().resize({ width, withoutEnlargement: true }).avif({ quality: 55 }).toFile(path.join(OUT, `${p.name}-${width}.avif`));
    await base.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(OUT, `${p.name}-${width}.webp`));
    console.log(`${p.name}-${width} ${width}x${h}`);
  }
}
console.log('logo', info.width, 'x', info.height);
