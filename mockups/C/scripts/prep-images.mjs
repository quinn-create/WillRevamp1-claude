// Direction C "Neighbor": prepares public/img/ for the mockup.
// Run from the repo root: node mockups/C/scripts/prep-images.mjs
// - Copies the generated scene variants we use from images/generated/C/ (no re-encode).
// - Makes optimized copies of the reused assets with sharp: logo (IMG01), Will at the desk (IMG03),
//   Will at the brick doorway (IMG02). Cropped and color-corrected only. Never upscaled.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const OUT = path.resolve(HERE, '../public/img');
fs.mkdirSync(OUT, { recursive: true });
const manifest = {};

// 1. Generated scenes: copy the variants as delivered by tools/images.mjs.
const scenes = {
  hero: [640, 960, 1280, 1920],
  practice: [640, 960, 1280],
  contact: [640, 960],
};
const gen = JSON.parse(fs.readFileSync(path.join(ROOT, 'images/GENERATED.json'), 'utf8')).images.filter((r) => r.set === 'C');
for (const [slot, widths] of Object.entries(scenes)) {
  const rec = gen.find((r) => r.slot === slot);
  if (!rec) throw new Error(`no generated record for C/${slot}`);
  const ratio = rec.height / rec.width;
  manifest[slot] = { ratio: [rec.width, rec.height], widths: [] };
  for (const w of widths) {
    for (const fmt of ['avif', 'webp']) {
      const src = path.join(ROOT, `images/generated/C/${slot}-${w}.${fmt}`);
      fs.copyFileSync(src, path.join(OUT, `${slot}-${w}.${fmt}`));
    }
    manifest[slot].widths.push({ w, h: Math.round(w * ratio) });
  }
}

// 2. Logo (IMG01, 400x62 raster). The tagline and rules ship at ~55% alpha (2.2:1 on white, A07).
//    Color correction only: raise the tagline's alpha so "ATTORNEY AT LAW" is solid. Rows 0-39 are the
//    wordmark; rows 47-61 are the tagline. A wordmark-only crop serves narrow screens (DESIGN-BRIEF: drop the
//    tagline below 200 px wide).
{
  const src = path.join(ROOT, 'inventory/assets/Logo-3.webp');
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 44; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    data[i + 3] = Math.min(255, Math.round(data[i + 3] * 1.85));
  }
  const fixed = sharp(data, { raw: info });
  await fixed.clone().webp({ lossless: true }).toFile(path.join(OUT, 'logo.webp'));
  await fixed.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo.png'));
  await sharp(data, { raw: info }).extract({ left: 0, top: 0, width: 400, height: 40 }).webp({ lossless: true }).toFile(path.join(OUT, 'logo-wordmark.webp'));
  manifest.logo = { full: [400, 62], wordmark: [400, 40] };
}

// 3. Will at the desk (IMG03, 910x715). A gentle warm grade so it sits with the golden scenes.
//    - desk: full frame at 910 and 640 (never wider than its pixels).
//    - byline: a 4:5 head-and-shoulders crop for the hero card (350x438 source, shown at 120x150).
{
  const src = path.join(ROOT, 'inventory/assets/content-v1-img.webp');
  const grade = (s) => s.modulate({ brightness: 1.02, saturation: 0.97 }).linear([1.015, 1, 0.97], [2, 0, -1]);
  for (const w of [910, 640]) {
    const h = Math.round((715 / 910) * w);
    const pipe = grade(sharp(src).resize(w === 910 ? undefined : w));
    await pipe.clone().avif({ quality: 60 }).toFile(path.join(OUT, `will-desk-${w}.avif`));
    await pipe.clone().webp({ quality: 82 }).toFile(path.join(OUT, `will-desk-${w}.webp`));
    (manifest.willDesk ||= { widths: [] }).widths.push({ w, h });
  }
  const crop = { left: 150, top: 0, width: 350, height: 438 };
  const pipe = grade(sharp(src).extract(crop));
  await pipe.clone().avif({ quality: 62 }).toFile(path.join(OUT, 'will-byline-350.avif'));
  await pipe.clone().webp({ quality: 84 }).toFile(path.join(OUT, 'will-byline-350.webp'));
  manifest.willByline = { w: 350, h: 438 };
}

// 4. Will at the brick doorway (IMG02, 673x951). Shown no wider than 673 px.
{
  const src = path.join(ROOT, 'inventory/assets/content-v10-img-attorney.webp');
  for (const w of [673, 480]) {
    const h = Math.round((951 / 673) * w);
    const pipe = sharp(src).resize(w === 673 ? undefined : w).modulate({ saturation: 0.97 });
    await pipe.clone().avif({ quality: 60 }).toFile(path.join(OUT, `will-door-${w}.avif`));
    await pipe.clone().webp({ quality: 82 }).toFile(path.join(OUT, `will-door-${w}.webp`));
    (manifest.willDoor ||= { widths: [] }).widths.push({ w, h });
  }
}

fs.writeFileSync(path.resolve(HERE, '../src/lib/images.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(manifest));
