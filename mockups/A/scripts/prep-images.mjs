#!/usr/bin/env node
// Direction A "Counsel": prepare mockup images into mockups/A/public/img and write src/lib/images.json.
// - Generated scenes: the A15 variants are copied as-is; one art-directed 4:3 mobile crop of the hero is cut
//   from the master (a crop, never an upscale).
// - Reused real assets (logo, attorney photos): cropped, lightly color-corrected and re-encoded with sharp.
//   Nothing is ever resized above its source pixels.
// Run from anywhere: node mockups/A/scripts/prep-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HERE, '..');
const ROOT = path.resolve(PROJECT, '..', '..');
const GEN = path.join(ROOT, 'images/generated/A');
const ASSETS = path.join(ROOT, 'inventory/assets');
const OUT = path.join(PROJECT, 'public/img');
fs.mkdirSync(OUT, { recursive: true });

const manifest = {};
const add = (key, file, width, height) => {
  (manifest[key] ||= []).push({ src: `/img/${file}`, width, height, format: path.extname(file).slice(1) });
};

// 1. Generated scenes: copy the variants we use.
for (const f of fs.readdirSync(GEN).sort()) {
  const m = f.match(/^(hero|practice|contact)-(\d+)\.(avif|webp)$/);
  if (!m) continue;
  fs.copyFileSync(path.join(GEN, f), path.join(OUT, `a-${f}`));
  const meta = await sharp(path.join(GEN, f)).metadata();
  add(`a-${m[1]}`, `a-${f}`, meta.width, meta.height);
}

// 2. (Home plate art direction is done in CSS: one srcset, a 4:3 object-position crop on phones. A
//    media-switched <picture> was dropped because swapping sources on resize left the plate blank in
//    width-by-width screenshots.)

// 3. Logo IMG01 (400x62, transparent). Color correction only: the tagline and rules (rows 44+) are drawn
//    at about 40% alpha in the source, which renders at 2.2:1. Their alpha is restored to solid so the
//    tagline reads; letterforms, geometry and hue are untouched. The wordmark-only crop (rows 0-41) is the
//    compact logo used below 200px wide, where the brief drops the tagline.
{
  const src = path.join(ASSETS, 'Logo-3.webp');
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.from(data);
  for (let y = 44; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4 + 3;
      px[i] = Math.min(255, Math.round(px[i] / 0.42));
    }
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };
  await sharp(px, raw).webp({ lossless: true }).toFile(path.join(OUT, 'logo.webp'));
  add('logo', 'logo.webp', info.width, info.height);
  await sharp(px, raw).extract({ left: 0, top: 0, width: info.width, height: 42 }).webp({ lossless: true })
    .toFile(path.join(OUT, 'logo-wordmark.webp'));
  add('logo-wordmark', 'logo-wordmark.webp', info.width, 42);
}

// 4. IMG03 (910x715): Will at his desk. Art-directed crop to 5:6 around Will, which also removes the
//    computer monitor and the mug on the right. Gentle grade toward the set: a touch less saturation.
{
  const src = path.join(ASSETS, 'content-v1-img.webp');
  const crop = { left: 14, top: 0, width: 596, height: 715 };
  for (const w of [596, 448]) {
    const h = Math.round((w * crop.height) / crop.width);
    const base = sharp(src).extract(crop).modulate({ saturation: 0.9, brightness: 1.01 }).resize(w, h);
    await base.clone().avif({ quality: 60, effort: 6 }).toFile(path.join(OUT, `will-desk-${w}.avif`));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT, `will-desk-${w}.webp`));
    add('will-desk', `will-desk-${w}.avif`, w, h);
    add('will-desk', `will-desk-${w}.webp`, w, h);
  }
}

// 5. IMG02 (673x951): Will at the brick doorway. Crop to 4:5 from the top; same grade.
{
  const src = path.join(ASSETS, 'content-v10-img-attorney.webp');
  const crop = { left: 0, top: 0, width: 673, height: 841 };
  for (const w of [673, 448]) {
    const h = Math.round((w * crop.height) / crop.width);
    const base = sharp(src).extract(crop).modulate({ saturation: 0.88 }).resize(w, h);
    await base.clone().avif({ quality: 60, effort: 6 }).toFile(path.join(OUT, `will-portrait-${w}.avif`));
    await base.clone().webp({ quality: 82 }).toFile(path.join(OUT, `will-portrait-${w}.webp`));
    add('will-portrait', `will-portrait-${w}.avif`, w, h);
    add('will-portrait', `will-portrait-${w}.webp`, w, h);
  }
}

fs.writeFileSync(path.join(PROJECT, 'src/lib/images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(Object.fromEntries(Object.entries(manifest).map(([k, v]) => [k, v.map((x) => `${x.width}x${x.height}.${x.format}`)])));
