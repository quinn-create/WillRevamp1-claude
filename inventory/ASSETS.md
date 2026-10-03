# Asset inventory (old site)

Downloaded originals of every image referenced by the 24 crawled pages (img src/srcset largest/original size, og:image, CSS background images). Machine-readable ledger: `inventory/assets.json`. Files: `inventory/assets/`. No favicon/site icon is published (`/favicon.ico` returns an empty 200; no `<link rel=icon>` in any page head) and no PDFs are linked.

| ID | File | Kind | Size (px, bytes) | Where used | Verdict |
|---|---|---|---|---|---|
| IMG01 | Logo-3.webp | logo | 400x62, 5 KB | all 24 pages (logo) | reuse |
| IMG02 | content-v10-img-attorney.webp | person | 673x951, 50 KB — low-res | /about/ (content, og) | reuse |
| IMG03 | content-v1-img.webp | person | 910x715, 74 KB — low-res | Home (content) | reuse |
| IMG04 | Screenshot-2025-10-20-at-6.05.23-PM.png | person | 1302x1506, 1.15 MB — low-res | /legal-services/, /criminal-defense/, /family-law/ (content) | reuse |
| IMG05 | unnamed-56.jpg | person | 169x224, 8 KB | /about/ (content) | reuse |
| IMG06 | 11.webp | scene (document) | 1600x1240, 126 KB | /about/ (content) | reuse |
| IMG07 | 12.webp | scene (document) | 1600x1246, 315 KB | /about/ (content) | reuse |
| IMG08 | mainstage-v1-img.webp | scene | 1124x736, 156 KB — low-res | Home (hero, og) | replace |
| IMG09 | Screenshot-2025-10-21-at-2.27.41-PM.png | scene | 1728x1916, 3.61 MB | /contact-us/ (hero, og) | replace |
| IMG10 | Screenshot-2025-10-21-at-12.58.05-PM.png | scene | 1754x1322, 0.99 MB | /legal-services/ (hero, og) | replace |
| IMG11 | Screenshot-2025-10-20-at-6.04.57-PM.png | scene | 1738x1398, 1.03 MB | /criminal-defense/ (hero, og) | replace |
| IMG12 | Screenshot-2025-10-21-at-2.23.01-PM.png | scene | 1742x1432, 1.50 MB | /family-law/ (hero, og) | replace |
| IMG13 | panel-group-v1-bg.webp | scene | 1600x938, 14 KB | 14 pages (background) | drop |
| IMG14 | criminal-defense.jpg | scene | 418x314, 11 KB | /legal-services/ (card) | replace |
| IMG15 | family-law.jpg | scene | 418x314, 22 KB | /legal-services/ (card) | replace |
| IMG16 | personal-injury.jpg | scene | 451x314, 13 KB | /legal-services/ (card) | replace |
| IMG17 | services-domestic-assault.jpg | scene | 1023x761, 40 KB | /criminal-defense/ (card) | replace |
| IMG18 | services-drug-crimes.jpg | scene | 1023x761, 60 KB | /criminal-defense/ (card) | replace |
| IMG19 | services-dui.jpg | scene | 1023x761, 114 KB | /criminal-defense/ (card) | replace |
| IMG20 | services-fraud.jpg | scene | 1023x761, 94 KB | /criminal-defense/ (card) | replace |
| IMG21 | services-murder.jpg | scene | 1023x761, 74 KB | /criminal-defense/ (card) | replace |
| IMG22 | services-criminal-defense-probation-violation.jpg | scene | 1023x761, 61 KB | /criminal-defense/ (card) | replace |
| IMG23 | services-theft.jpg | scene | 1023x761, 89 KB | /criminal-defense/ (card) | replace |
| IMG24 | services-violent-crimes.jpg | scene | 1023x761, 52 KB | /criminal-defense/ (card) | replace |
| IMG25 | services-child-custody.jpg | scene | 1023x761, 111 KB | /family-law/ (card) | replace |
| IMG26 | services-divorce.jpg | scene | 1023x761, 104 KB | /family-law/ (card) | replace |
| IMG27 | services-parenting-plan-modifications.jpg | scene | 1023x761, 72 KB | /family-law/ (card) | replace |
| IMG28 | services-paternity.jpg | scene | 1023x761, 97 KB | /family-law/ (card) | replace |
| IMG29 | services-wills.jpg | scene | 1023x761, 123 KB | /family-law/ (card) | replace |

**Totals:** 29 assets — 4 person, 1 logo, 24 scene (2 of them documents). Reuse 7, replace 21, drop 1.

**Reuse set (crop / colour-correct / optimize only):** IMG01 logo; IMG02, IMG03, IMG04 Will Fraley; IMG05 Katie Fults; IMG06, IMG07 certificate scans (documents).

**Notes**

- IMG04 is IMG02's photograph mirrored left-to-right inside a screenshot with a baked-in blue frame. Prefer IMG02; if IMG04's wider crop is used, crop the frame off and flop it back.
- Low-res: IMG02 (673 px), IMG03 (910 px), IMG04 (≈1050 px usable) can't fill a 1200 px+ full-bleed hero or a 1200x630 OG without upscaling, so use them in framed or split layouts. IMG05 (169x224) works only as a small avatar. IMG01 is a 400x62 raster logo.
- Every published alt attribute is empty except the logo's. The new site writes its own alt text.
- All stock photos showing people (handcuffed man, father and child, hand-to-hand deal, shoplifter, crime scene, families, elderly couple, etc.) are *not* the firm's people. Replace them and never reuse them. The new site generates scene, object and texture images only, with no people and no faces.
- IMG08 (civic building, home hero) and IMG09 (brick office with "509", Contact hero) are real buildings. Per the plan-time decision both are replaced by generated scenes, and a generated image must never be captioned or implied to be the actual office.
