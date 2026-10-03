# Image prompts — A15 Image Director

Generated scenes for the three mockup directions (sets A, B, C; slots hero, practice, contact). Scenes only:
no people, faces, hands, silhouettes, reflections of figures, readable text, signage, lettering or logos
(CLAUDE.md rule 6). Every prompt ends with "no people, no faces, no text, no signage, no lettering".
Plain-text prompt files: `images/prompts/<set>-<slot>.txt` (the kept version). Masters and variants:
`images/generated/<set>/<slot>.*`, logged in `images/generated/<set>.json` and merged into `images/GENERATED.json`.

- **Model:** `nano_banana_pro` (Higgsfield; the job API reports it internally as `nano_banana_2`), `resolution: "2k"`, no project/folder, `use_unlim` never passed.
- **Cost:** 2 credits per image (preflight `get_cost` = 2; confirmed by the account transaction log).
- **Generations:** 13 (9 first pass + 4 regenerations). **Kept:** 9. **Rejected:** 4.
- **Credits spent by A15: 26** (cap 100). Balance before 1091.07; balance after 1021.07. The 70-credit drop includes 44 credits
  (22 Nano Banana Pro images, 12:15:41–12:18:32 UTC) spent concurrently on the same Higgsfield account by another session; they
  are not A15 jobs (A15 job charges: 9 at 12:15:14, 3 at 12:21:58, 1 at 12:24:45 UTC).

## Direction A "Counsel"

Set grade: Overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick, warm paper-white highlights, blacks near blue-black ink. Reads like the opening plate of a book.

### A-hero (16:9)

- **Model:** nano_banana_pro, 2k, aspect ratio 16:9 -> master 2752x1536 (`images/generated/A/hero.png`)
- **Mood reference:** inventory/assets/mainstage-v1-img.webp (IMG08, old Home hero civic building)
- **Palette (words):** warm paper-white stone, muted mid-blue sky and shade, blue-black ink in the deepest shadows, softened low-saturation brick red, a whisper of aged brass
- **Kept job:** `0d0c9939-45b5-4cb0-94fc-c86faec6fba9` (2 credits). Attempts: 2; rejected: 1.

**Prompt (kept):**

> Wide editorial architectural photograph of a historic courthouse square in a small Middle Tennessee town just after sunrise under high thin overcast. In the right two-thirds of the frame: a pale limestone civic building with tall fluted columns and a plain blank pediment, beside a row of two-story red-brick storefronts with ornate painted cornices and tall multi-pane upper windows; storefront glass is plain and dark, reflecting only soft sky. Empty brick sidewalk and empty street in the foreground, one dark iron lamp post with a faint touch of aged brass. The left third of the frame is quiet and natural: open pale sky over a low, distant line of bare-branched trees and a broad empty plaza of pale paving, free of detail, leaving room for a headline; no blank walls. The top 35 percent is calm, even, pale sky. Soft directional light from the left, deep cool blue-grey shade on the right-hand facades. Palette: warm paper-white stone, muted mid-blue sky and shade, blue-black ink in the deepest shadows, softened low-saturation brick red, a whisper of aged brass. Shot on a 35 mm shift lens at eye level, corrected verticals, horizon in the lower third, gentle depth, fine detail, no wide-angle distortion, no vehicles, no flags. The facades carry no plaques, no placards, no notices, no boards and no carved inscriptions of any kind. Composed, civic, quiet and unhurried, like the opening plate of a book. Generic architecture, not a recognizable landmark. no people, no faces, no text, no signage, no lettering

**Rejected attempt 1** — job `2a9190ec-535e-4430-a37e-40e582c42907` (2 credits). Reason: A dark wall plaque beside the portico carried a seal and pseudo-text lines (implied lettering); the left third was a flat, artificial-looking blank stone wall.

<details><summary>Prompt used</summary>

> Wide editorial architectural photograph of a historic courthouse square in a small Middle Tennessee town just after sunrise under high thin overcast. In the right two-thirds of the frame: a pale limestone civic building with tall fluted columns and a plain blank pediment, beside a row of two-story red-brick storefronts with ornate painted cornices and tall multi-pane upper windows; storefront glass is plain and dark, reflecting only soft sky. Empty brick sidewalk and empty street in the foreground, one dark iron lamp post with a faint touch of aged brass. The left third of the frame is quiet: soft even sky above and a calm stretch of empty sidewalk and pale stone, free of detail, leaving room for a headline. The top 35 percent is calm, even, pale sky. Soft directional light from the left, deep cool blue-grey shade on the right-hand facades. Palette: warm paper-white stone, muted mid-blue sky and shade, blue-black ink in the deepest shadows, softened low-saturation brick red, a whisper of aged brass. Shot on a 35 mm shift lens at eye level, corrected verticals, horizon in the lower third, gentle depth, fine detail, no wide-angle distortion, no vehicles, no flags. Composed, civic, quiet and unhurried, like the opening plate of a book. Generic architecture, not a recognizable landmark. no people, no faces, no text, no signage, no lettering

</details>

### A-practice (3:2)

- **Model:** nano_banana_pro, 2k, aspect ratio 3:2 -> master 2528x1696 (`images/generated/A/practice.png`)
- **Mood reference:** inventory/assets/mainstage-v1-img.webp (IMG08, old Home hero civic building)
- **Palette (words):** cool grey-blue daylight walls, warm paper-white window light, worn honey-brown wood, blue-black ink far shadow, dull brass glint
- **Kept job:** `cf530bdb-68a6-40d6-81ce-3ce612d2e0dc` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial interior photograph of an empty upstairs corridor in a historic Southern county courthouse in Middle Tennessee, mid-morning. A worn pale marble terrazzo floor runs into a long one-point perspective toward a closed pair of tall paneled wooden doors with dull brass handles, the vanishing point slightly right of center. Tall arched multi-pane windows line the right wall and lay long soft window-shaped patches of daylight across the floor. Plain honey-brown wooden benches stand empty against the left wall, which is calm, plain plaster in cool grey-blue, so the left third crops cleanly. Bare walls: no seals, no plaques, no notices, no frames. Palette: cool grey-blue daylight on the walls, warm paper-white window light, worn honey-brown wood, blue-black ink shadow at the far end, a dull brass glint on the door hardware. Shot on a 40 mm lens at standing eye height, corrected verticals, medium depth of field, fine natural grain, low saturation. Mood: gravity, order, stillness, patience; serious but never threatening, no bars, no cells, no police imagery. no people, no faces, no text, no signage, no lettering

### A-contact (4:5)

- **Model:** nano_banana_pro, 2k, aspect ratio 4:5 -> master 1856x2304 (`images/generated/A/contact.png`)
- **Mood reference:** inventory/assets/Screenshot-2025-10-21-at-2.27.41-PM.png (IMG09, old Contact hero brick office)
- **Palette (words):** warm paper-white page and window light, deep walnut, blue-black ink shadows, muted mid-blue cast in the glass, low-gloss brass
- **Kept job:** `9b98dd02-e91a-470b-826a-87aa547a2d18` (2 credits). Attempts: 2; rejected: 1.

**Prompt (kept):**

> Editorial still-life photograph on a law-office desk in an older Middle Tennessee building, late morning. In the lower two-thirds: a dark brown leather padfolio lying open, holding a blank cream writing pad with no ruled lines, a capped black fountain pen lying diagonally across it, a closed plain manila folder to one side with a blank cover and no tab label, and an all-brass desk lamp with a polished brass dome shade, switched off, behind them; no green glass, no colored shade. The desk surface is warm deep walnut with a soft low-gloss sheen. The upper third is a tall window with white-painted mullions, softly out of focus, glass carrying a muted cool blue cast. Soft side light from the window at the back left, gentle falloff into blue-black shadow on the right. Palette: warm paper-white page and window light, deep walnut wood, blue-black ink shadows, a muted mid-blue cast in the window glass, low-gloss polished brass. Shot on an 85 mm lens slightly above desk level looking down about 20 degrees, shallow depth of field focused on the pen nib and the edge of the pad. Uncluttered, generic, discreet and ready. No hands, no books with spines, no screens, no certificates. no people, no faces, no text, no signage, no lettering

**Rejected attempt 1** — job `59ebf0ac-e56e-4ce8-a33e-7d876ea41824` (2 credits). Reason: Off-palette: a saturated green-glass banker's lamp shade dominated the frame (slot asks for brass); the legal pad rendered as a thick bound book.

<details><summary>Prompt used</summary>

> Editorial still-life photograph on a law-office desk in an older Middle Tennessee building, late morning. In the lower two-thirds: a closed leather-bound legal pad with blank cream pages showing at its edge, a capped black fountain pen lying diagonally across it, a closed plain manila folder to one side with a blank cover and no tab label, and a brass banker's desk lamp switched off behind them. The desk surface is warm deep walnut with a soft low-gloss sheen. The upper third is a tall window with white-painted mullions, softly out of focus, glass carrying a muted cool blue cast. Soft side light from the window at the back left, gentle falloff into blue-black shadow on the right. Palette: warm paper-white page and window light, deep walnut wood, blue-black ink shadows, a muted mid-blue cast in the window glass, low-gloss polished brass. Shot on an 85 mm lens slightly above desk level looking down about 20 degrees, shallow depth of field focused on the pen nib and the edge of the pad. Uncluttered, generic, discreet and ready. No hands, no books with spines, no screens, no certificates. no people, no faces, no text, no signage, no lettering

</details>

## Direction B "Verdict"

Set grade: Hard, clean light with crisp shadow edges; shadows fall toward navy and near-black; highlights limestone white and pale sky blue; mid-tones cool slate grey; warm notes small. High contrast, moderate saturation, no haze, flare or vignette.

### B-hero (16:9)

- **Model:** nano_banana_pro, 2k, aspect ratio 16:9 -> master 2752x1536 (`images/generated/B/hero.png`)
- **Mood reference:** inventory/assets/mainstage-v1-img.webp (IMG08, old Home hero civic building)
- **Palette (words):** deep navy sky grading to near-black, limestone white on sunlit column faces, cool slate-grey and navy shadow in the flutes, one small note of warm red brick
- **Kept job:** `93514767-3e55-4534-96b1-f2674ceb3381` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Bold low-angle architectural photograph looking up a row of tall classical columns and the plain cornice and entablature of a generic Southern county courthouse in Middle Tennessee, late afternoon. The columns are smooth painted-white limestone with deep flutes and fill the right 45 percent of the frame, the strongest column at about 65 percent of the width; a sliver of warm red brick at the far right edge. The blank frieze has no carved words. The left 55 percent of the frame is clean, open, cloudless deep navy sky grading to near-black at the top edge, with no objects in it, leaving room for a headline. Hard late-afternoon sun from the right about 30 degrees above the horizon rakes across the flutes so every column throws a crisp vertical shadow. Palette: deep navy sky, limestone white on sunlit column faces, cool slate-grey and navy shadow in the flutes, one small note of warm red brick. High contrast, moderate saturation, no haze, no lens flare, no vignette. Shot on a 24 mm tilt-shift lens from a low angle with verticals kept straight, horizon not visible, strong vertical rhythm. Decisive, upright, steady. No flags. no people, no faces, no text, no signage, no lettering

### B-practice (3:2)

- **Model:** nano_banana_pro, 2k, aspect ratio 3:2 -> master 2528x1696 (`images/generated/B/practice.png`)
- **Mood reference:** inventory/assets/mainstage-v1-img.webp (IMG08, old Home hero civic building); door tone only from inventory/assets/Screenshot-2025-10-21-at-2.27.41-PM.png (IMG09, old Contact hero brick office)
- **Palette (words):** pale limestone and cool grey stone, deep navy-slate tread shadows, near-black walnut doors, a sliver of pale sky blue
- **Kept job:** `7478a934-d629-428a-aae4-9a225f130f28` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Minimal, geometric architectural photograph of steep, wide pale limestone steps rising toward a pair of closed, heavy paneled dark walnut double doors at the top of a generic Southern civic building in Middle Tennessee, mid-morning on a clear day. The steps fill the lower two-thirds of the frame; the doors sit in the upper third. Plain stone cheek walls on each side, no railings, no plaques, no door numbers, no arch. Hard side light raking from the left makes each tread cast a sharp graphic band of deep navy-slate shadow, so the steps read as a bold stripe pattern with strong diagonals leading up to the doors. The left third is quieter, mostly smooth shadowed stone. A thin sliver of pale sky blue at the very top edge, or none. Palette: pale limestone and cool grey stone, deep navy-slate shadows, near-black walnut doors, pale sky blue. High contrast, moderate saturation, no haze, no lens flare, no vignette, no foliage. Shot on a 35 mm lens from the foot of the steps, slightly left of center, looking up about 15 degrees, verticals straight. Resolve, forward motion, clarity, weight, order. no people, no faces, no text, no signage, no lettering

### B-contact (4:5)

- **Model:** nano_banana_pro, 2k, aspect ratio 4:5 -> master 1856x2304 (`images/generated/B/contact.png`)
- **Mood reference:** inventory/assets/Screenshot-2025-10-21-at-2.27.41-PM.png (IMG09, old Contact hero brick office)
- **Palette (words):** near-black and deep navy shadow over most of the frame, dark walnut, deep twilight-blue window, one small warm-white lamp pool, muted navy folder
- **Kept job:** `7e1155e5-09d8-4ea6-a04d-b4e3d9b44f7c` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Low-key editorial still-life photograph of a quiet law-office desk at blue hour, just after sunset, in an older Middle Tennessee building. On a dark walnut desktop in the lower-middle third: a classic dark desk telephone with its handset resting in the cradle, keypad turned away from camera and soft out of focus so no digits show; beside it a closed plain muted navy case folder with a blank cover and no label or tab, and a closed pen lying on top. A single focused desk lamp from upper left casts one small, contained pool of warm white light across the phone and folder, falling off to near-black within a short distance. The top 35 percent is a tall window, out of focus, showing deep twilight blue sky, with plain dark wall around it, calm and empty. Faint cool fill from the window. Palette: near-black and deep navy shadows filling most of the frame, dark walnut wood, deep twilight blue window, one small warm-white lamp pool, muted navy folder. Shot on a 50 mm lens about 30 degrees above desk height at f/2.8, shallow depth of field. Uncluttered: no screens, no books, no certificates, no diplomas. Ready, direct, calm, private. No hands. no people, no faces, no text, no signage, no lettering

## Direction C "Neighbor"

Set grade: Warm low golden light or soft warm after-rain light; cream and pale-honey highlights, sand and aged red-brick mid-tones, warm-umber shadows fading to deep blue-grey; brick red the main warm color, blue kept small. Gentle contrast.

### C-hero (16:9)

- **Model:** nano_banana_pro, 2k, aspect ratio 16:9 -> master 2752x1536 (`images/generated/C/hero.png`)
- **Mood reference:** inventory/assets/mainstage-v1-img.webp (IMG08, old Home hero civic building)
- **Palette (words):** aged red brick and warm terracotta, cream and ivory trim, honey-gold sunlight, deep green foliage, warm-umber shade, sky from warm cream to soft muted blue
- **Kept job:** `6c056fc2-e39a-4a28-841b-f8a3ba868bbd` (2 credits). Attempts: 3; rejected: 2.

**Prompt (kept):**

> A single continuous natural editorial photograph, one unbroken frame with no split, seam, panel or diptych, of a historic courthouse-square townscape in a small Middle Tennessee town at golden hour, about forty minutes before sunset, seen at eye level from across the street, looking slightly down the block. In the right 55 percent of the frame: a row of two-story aged red-brick storefronts with ornate cream-painted cornices and tall upper windows, the storefront glass plain and reflecting only warm light, and behind them in soft focus a generic white courthouse cupola with plain louvered openings only, no clock and no dial. No awnings, no banners, no window lettering, no sign boards, no placards, no posts carrying panels, no street signs, no traffic signs, and no vehicles anywhere in the frame, including far down the street, where the view closes softly into trees. Mature shade trees with deep green, just-turning leaves line a quiet, empty brick-edged sidewalk; a wrought-iron bench and a planter stand in the foreground. The left 45 percent is calm and low in detail: soft tree shade, out-of-focus foliage and open sky, leaving room for a headline card. Low sun rakes from the right so the cornices glow honey-gold while the sidewalk falls into soft warm-umber shade with long gentle shadows. Palette: aged red brick and warm terracotta, cream and ivory trim, honey-gold sunlight, deep green foliage, warm-umber shade, sky moving from warm cream at the horizon to a soft muted blue above. Shot on a 35 mm lens, verticals straight, medium depth of field, gentle contrast, no lens flare, no heavy vignette, no HDR. Rooted, warm, neighborly, unhurried. Not a recognizable landmark. No flags. no people, no faces, no text, no signage, no lettering

**Rejected attempt 1** — job `cc101f4e-80d9-49f4-ba00-e501408edfbd` (2 credits). Reason: A white sign board with pseudo-lettering in the midground and a parked vehicle far down the street.

<details><summary>Prompt used</summary>

> Natural editorial photograph of a historic courthouse-square townscape in a small Middle Tennessee town at golden hour, about forty minutes before sunset, seen at eye level from across the street, looking slightly down the block. In the right 55 percent of the frame: a row of two-story aged red-brick storefronts with ornate cream-painted cornices and tall upper windows, the storefront glass plain and reflecting only warm light, and behind them in soft focus a generic white courthouse cupola. No awnings, no banners, no window lettering, no parked vehicles. Mature shade trees with deep green, just-turning leaves line a quiet, empty brick-edged sidewalk; a wrought-iron bench and a planter stand in the foreground. The left 45 percent is calm and low in detail: soft tree shade, out-of-focus foliage and open sky, leaving room for a headline card. Low sun rakes from the right so the cornices glow honey-gold while the sidewalk falls into soft warm-umber shade with long gentle shadows. Palette: aged red brick and warm terracotta, cream and ivory trim, honey-gold sunlight, deep green foliage, warm-umber shade, sky moving from warm cream at the horizon to a soft muted blue above. Shot on a 35 mm lens, verticals straight, medium depth of field, gentle contrast, no lens flare, no heavy vignette, no HDR. Rooted, warm, neighborly, unhurried. Not a recognizable landmark. No flags. no people, no faces, no text, no signage, no lettering

</details>

**Rejected attempt 2** — job `d9b9b39b-f5ca-4750-ab23-dc1c1d369565` (2 credits). Reason: AI artifact: a hard vertical seam split the frame into a diptych at about 39% width; the cupola carried a clock face; a red traffic sign in the midground.

<details><summary>Prompt used</summary>

> Natural editorial photograph of a historic courthouse-square townscape in a small Middle Tennessee town at golden hour, about forty minutes before sunset, seen at eye level from across the street, looking slightly down the block. In the right 55 percent of the frame: a row of two-story aged red-brick storefronts with ornate cream-painted cornices and tall upper windows, the storefront glass plain and reflecting only warm light, and behind them in soft focus a generic white courthouse cupola. No awnings, no banners, no window lettering, no sign boards, no placards, no posts carrying panels, and no vehicles anywhere in the frame, including far down the street, where the view closes softly into trees. Mature shade trees with deep green, just-turning leaves line a quiet, empty brick-edged sidewalk; a wrought-iron bench and a planter stand in the foreground. The left 45 percent is calm and low in detail: soft tree shade, out-of-focus foliage and open sky, leaving room for a headline card. Low sun rakes from the right so the cornices glow honey-gold while the sidewalk falls into soft warm-umber shade with long gentle shadows. Palette: aged red brick and warm terracotta, cream and ivory trim, honey-gold sunlight, deep green foliage, warm-umber shade, sky moving from warm cream at the horizon to a soft muted blue above. Shot on a 35 mm lens, verticals straight, medium depth of field, gentle contrast, no lens flare, no heavy vignette, no HDR. Rooted, warm, neighborly, unhurried. Not a recognizable landmark. No flags. no people, no faces, no text, no signage, no lettering

</details>

### C-practice (3:2)

- **Model:** nano_banana_pro, 2k, aspect ratio 3:2 -> master 2528x1696 (`images/generated/C/practice.png`)
- **Mood reference:** inventory/assets/mainstage-v1-img.webp (IMG08, old Home hero civic building); brick tone and white multi-pane windows only from inventory/assets/Screenshot-2025-10-21-at-2.27.41-PM.png (IMG09, old Contact hero brick office)
- **Palette (words):** rain-darkened red brick, wet slate-grey pavement with honey and amber reflections, sage-green leaves, sky clearing from muted blue-grey to warm cream, warm-umber shadow
- **Kept job:** `5863345b-8c23-4c5d-ba55-63a06670994f` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Natural editorial photograph of a quiet tree-lined street of two-story red-brick buildings in a small Middle Tennessee town, late afternoon, minutes after a summer shower. The street and brick sidewalk are wet, and the lower third of the frame is filled with long warm honey and amber reflections from softly glowing upper-story windows and a pale clearing sky. Street trees with soft sage-green leaves frame the edges and drip. The view runs along the street toward a soft vanishing point in the right third; the left third stays calm, wet pavement and tree shade with little detail. The street is completely empty: no vehicles, no figures, nothing reflected but buildings, trees and sky. Windows glow warm with no lettering; no signs anywhere. Diffuse, low, warm light breaks through thinning cloud from the left. Palette: rain-darkened red brick, wet slate-grey pavement with honey and amber reflections, sage-green leaves, sky clearing from muted blue-grey to warm cream at the horizon, warm-umber shadow. Shot on a 50 mm lens at standing eye level, shallow-to-medium depth of field, gentle contrast, no lens flare, no heavy vignette. Steady, hopeful, grounded, clearing after the storm. no people, no faces, no text, no signage, no lettering

### C-contact (4:5)

- **Model:** nano_banana_pro, 2k, aspect ratio 4:5 -> master 1856x2304 (`images/generated/C/contact.png`)
- **Mood reference:** inventory/assets/Screenshot-2025-10-21-at-2.27.41-PM.png (IMG09, old Contact hero brick office)
- **Palette (words):** sunlit red brick, oatmeal and cream upholstery, honey wood floor, dark walnut table, warm cream window light, soft umber shadow, one quiet note of pale sky blue
- **Kept job:** `152e94aa-8eb1-4dcb-b33a-76ec602fbde0` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Natural editorial interior photograph of a welcoming reception corner in an older Middle Tennessee brick building, mid-afternoon on a clear day, a generic room. In the lower-middle half: two upholstered armchairs in warm oatmeal fabric angled toward each other, and between them a small dark walnut side table holding a clear glass of water and a closed blank cream notepad with a pen. A warm honey-wood floor with a muted wool rug. Behind: an exposed sunlit red-brick wall and a tall old white multi-pane window; warm sunlight falls through it in soft rectangles across the brick and floor. The upper 35 percent is brick and window light, calm and empty. Nothing on the walls but light: no frames, no certificates, no art, no clocks, no plaques, no books, no screens. Warm directional sun from the window at upper left with soft bounce fill; bright, never dim. Palette: sunlit red brick, oatmeal and cream upholstery, honey wood, dark walnut, warm cream window light, soft umber shadow, one quiet note of pale blue sky in the window glass. Shot on a 35 mm lens at seated eye level, three-quarter view into the corner, medium depth of field with the window slightly soft, gentle contrast. Welcome, calm, unhurried, safe, private. No pets. no people, no faces, no text, no signage, no lettering

## Review notes on kept images

- **A-hero:** a small blank dark panel beside the portico carries no marks; lamp post has empty brackets. Left third is open sky over bare trees and empty paving.
- **B-practice:** the diagonal shadow bands come from an unseen structure to the left rather than from the treads themselves; graphically strong and on-brief for the duotone. Plain dark handrails, no plaques or numbers.
- **B-contact:** the telephone is soft and seen from the side; no digits are visible.
- **C-practice:** a distant street-sign post is seen edge-on and blank, and far signs are unreadable blurs; no lettering anywhere.
- **C-hero (attempt 3):** far left background holds a very soft grey shape behind a shrub that may be a parked car roof; no plate, no text, not legible. Retries for this slot are exhausted (max 2).
- No image shows a person, face, hand, silhouette or readable text. None is captioned or implied to be 509 W College St or any real courthouse (all decorative, alt="").

## Site-wide (direction X)

Direction X = A "Counsel" (`mockups/RECOMMENDATION.md`). Set `site`; slot map in `images/SLOTS-SITE.md`. Reused from the mockup pass: `A-hero` -> Home, `A-practice` -> `/criminal-defense/`, `A-contact` -> `/contact-us/` (no new credits).

Set grade (design-system 9.1, every prompt): overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain. Sensitive practices get non-literal, respectful subjects: no handcuffs, weapons, injuries, crime scenes, children, police imagery or courtrooms with people.

- **Model:** `nano_banana_pro` (job API reports `nano_banana_2`), `resolution: "2k"`, no project/folder, `use_unlim` never passed. Preflight `get_cost` = 2 credits.
- **Generations:** 28 submitted (24 first pass + 3 regenerations + 1 resubmission of a failed job); 27 billed. **Kept:** 24. **Rejected:** 3. **Failed (unbilled):** 1.
- **Credits spent by A15 this pass: 54** (cap 250). Balance 643.07 before, 589.07 after.
- **Mood references:** IMG08 (`inventory/assets/mainstage-v1-img.webp`) for exteriors and landscapes; IMG09 (`inventory/assets/Screenshot-2025-10-21-at-2.27.41-PM.png`) for interiors and still lifes. Light, palette and materials only.

### site-services (3:2) — `/legal-services/`

- **Subject:** courthouse-square cornices and brick storefront row under high overcast
- **Master:** 2528x1696 (`images/generated/site/services.png`)
- **Mood reference:** IMG08
- **Kept job:** `485cf9ea-506d-4960-bfb6-38ec2dd825e9` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Wide, calm editorial architectural photograph of one side of a historic courthouse square in a small Middle Tennessee town on a still morning under high, even overcast. A continuous row of two- and three-story red-brick storefronts with ornate painted cornices, stone window hoods and tall multi-pane upper windows runs across the right two-thirds of the frame at a gentle angle; ground-floor display windows are plain dark glass reflecting only soft sky, with no awnings and no lettering. At the far right edge, a corner of a pale limestone civic building with a plain column. The upper third is pale, even sky. Empty brick sidewalk, one dark iron lamp post. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm shift lens at eye level, corrected verticals. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-family (3:2) — `/family-law/`

- **Subject:** kitchen table by a window, two empty chairs, closed folder, morning light
- **Master:** 2528x1696 (`images/generated/site/family.png`)
- **Mood reference:** IMG09
- **Kept job:** `de5a56a2-a32b-47d0-87fe-518112d800b1` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial interior photograph of a modest Middle Tennessee farmhouse kitchen in soft early-morning light. A worn pale oak kitchen table stands beside a tall double-hung window with white-painted trim; two plain wooden chairs are pulled in, empty. On the table: one closed plain manila folder with a blank cover and no tab label, a white ceramic mug, and a small glass jar holding a few sprigs of green leaves. Soft window light falls across the tabletop from the right and fades into cool blue-grey shade on the left wall, which is plain and calm. A faint view of a green yard through the window glass, out of focus. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 40 mm lens at seated eye height, medium depth of field. Warm, steady, private; family warmth carried by objects, never people. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-injury (3:2) — `/personal-injury/`

- **Subject:** quiet two-lane road between fields after rain, guardrail, overcast
- **Master:** 2528x1696 (`images/generated/site/injury.png`)
- **Mood reference:** IMG08
- **Kept job:** `204dd06a-ab2c-4d8d-a7c5-17d409fb04bc` (2 credits). Attempts: 2; rejected: 1.

**Prompt (kept):**

> Editorial landscape photograph of a quiet two-lane rural road in Middle Tennessee just after a rain shower, under soft grey overcast. The damp dark asphalt curves gently from the lower right toward low rolling green hills and a line of trees, with a plain galvanized steel guardrail along the right shoulder and open hayfields on both sides. The road surface carries a soft sheen of sky. The road is completely empty. No road markings with words, no road signs, no mailboxes, no power-line clutter. A single continuous, unbroken natural photograph with no panels, overlays, translucent bands, borders, seams or split; the left side of the frame is simply open hayfield and soft sky, evenly lit and quiet. Shot on a 35 mm lens at standing eye height, horizon in the upper third. Calm, clear, after the storm: steadiness, not a crash, no debris, no damage. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

**Rejected attempt 1** — job `4f1074dd-38cc-48d5-9e13-7f8c6f69d398` (2 credits). Reason: AI artifact: a flat translucent grey panel was laid over the left third of the frame (the model read "left third calm" as an overlay). Regenerated as one continuous photograph with an open hayfield left side.

<details><summary>Prompt used</summary>

> Editorial landscape photograph of a quiet two-lane rural road in Middle Tennessee just after a rain shower, under soft grey overcast. The damp dark asphalt curves gently from the lower right toward low rolling green hills and a line of trees, with a plain galvanized steel guardrail along the right shoulder and open hayfields on both sides. The road surface carries a soft sheen of sky. The road is completely empty. No road markings with words, no road signs, no mailboxes, no power-line clutter. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens at standing eye height, horizon in the upper third. Calm, clear, after the storm: steadiness, not a crash, no debris, no damage. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

</details>

### site-about (3:2) — `/about/`

- **Subject:** quiet law-office interior in an older brick building, tall window, walnut desk
- **Master:** 2528x1696 (`images/generated/site/about.png`)
- **Mood reference:** IMG09
- **Kept job:** `c1c00c3f-2d83-4db2-8ba3-b1b926a14d10` (2 credits). Attempts: 2; rejected: 1.
- **Accepted with note:** A valet stand rendered in place of the coat stand (harmless). The blown-out window panes show faint, unreadable shapes of a building across the street; nothing legible.

**Prompt (kept):**

> Editorial interior photograph of a quiet small-town law office on the upper floor of an older red-brick building in Middle Tennessee, late morning. A tall arched window with white-painted mullions on the right lets in soft overcast light; an exposed brick wall in low-saturation red runs along the right side. A deep walnut desk stands empty and tidy in the middle distance with a closed leather padfolio and a brass desk lamp switched off; a wooden client chair faces it, empty. On the left, a calm plain plaster wall painted a soft cool grey-blue with a tall paneled walnut wainscot and an empty wooden coat stand; there are no bookshelves and no books anywhere in the room. Worn wide-plank wooden floor. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens at standing eye height, corrected verticals, medium depth of field. Settled, trustworthy, practical. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

**Rejected attempt 1** — job `7a956d32-aec1-47af-abf3-fafa51d5daf5` (2 credits). Reason: Bookshelf volumes carried gilt pseudo-lettering on their spines (implied text). Regenerated with no bookshelves or books in the room.

<details><summary>Prompt used</summary>

> Editorial interior photograph of a quiet small-town law office on the upper floor of an older red-brick building in Middle Tennessee, late morning. A tall arched window with white-painted mullions on the right lets in soft overcast light; an exposed brick wall in low-saturation red runs along the right side. A deep walnut desk stands empty and tidy in the middle distance with a closed leather padfolio and a brass desk lamp switched off; a wooden client chair faces it, empty. On the left, built-in walnut shelves hold rows of plain cloth-bound volumes in muted blue, oxblood and tan with completely blank spines, softly out of focus. Worn wide-plank wooden floor. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens at standing eye height, corrected verticals, medium depth of field. Settled, trustworthy, practical. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

</details>

### site-testimonials (3:2) — `/testimonials/`

- **Subject:** open front gate and tree-lined lane to a white farmhouse, morning
- **Master:** 2528x1696 (`images/generated/site/testimonials.png`)
- **Mood reference:** IMG08
- **Kept job:** `068dcdb9-f8e8-4c6f-a8a3-4350cdebc732` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial landscape photograph of a white-painted wooden front gate standing open in a simple board fence, a gravel lane beyond it leading between two rows of mature oak trees to a modest white farmhouse with a green metal roof in the middle distance, in rolling Middle Tennessee countryside on a soft overcast morning. Dew on the grass verges, a faint low mist over the far field. The farmhouse windows are plain and dark. No mailbox, no animals. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 50 mm lens at standing eye height, medium depth of field, the gate sharp and the house gently soft. Welcoming, grateful, quietly hopeful. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-faqs (3:2) — `/faqs/`

- **Subject:** closed law book and blank legal pad on a walnut table
- **Master:** 2528x1696 (`images/generated/site/faqs.png`)
- **Mood reference:** IMG09
- **Kept job:** `d7b9def0-f879-4a2a-a6c1-8cbc2c0bfb39` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial still-life photograph on a deep walnut library table by a window in an older law office, mid-morning. In the right half of the frame: a single thick closed book bound in dark oxblood cloth with a completely blank cover and blank spine, and beside it a yellow legal pad with faint ruled lines and nothing written on it, a plain wooden pencil laid across the pad. Soft window light from the upper left rakes across the table and the edge of the pad, falling off into blue-black shadow on the right. The left third is quiet, softly lit walnut surface. Shot on a 50 mm lens about 30 degrees above table height, shallow depth of field focused on the edge of the pad. Clear, patient, answers within reach. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-news (3:2) — `/in-the-news/`

- **Subject:** white cupola rising above courthouse-square rooftops and trees, morning
- **Master:** 2528x1696 (`images/generated/site/news.png`)
- **Mood reference:** IMG08
- **Kept job:** `fdb63591-d08e-4453-aab3-78f538c0ed3b` (2 credits). Attempts: 1; rejected: 0.
- **Accepted with note:** A blank pale metal panel on a storefront parapet at the bottom edge; checked at full size, no lettering.

**Prompt (kept):**

> Editorial architectural photograph of the rooftops of a small Middle Tennessee courthouse square seen from slightly above, early morning under thin high overcast. A white-painted octagonal cupola with plain louvered openings, no clock and no dial, rises from a pale limestone civic building in the right half of the frame, above a ring of mature trees just turning gold; around it, the parapets and cornices of red-brick storefront rooftops, a few plain chimneys. The upper third is soft, pale sky. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 70 mm lens from an elevated vantage, corrected verticals, gentle compression. Civic, local, present. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-dui (3:2) — `/criminal-defense/dui/`

- **Subject:** empty Middle Tennessee two-lane road at dusk
- **Master:** 2528x1696 (`images/generated/site/cd-dui.png`)
- **Mood reference:** IMG08
- **Kept job:** `8966758f-a135-43b0-bd6d-2876dcdcc83b` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial landscape photograph of an empty two-lane country road in Middle Tennessee at dusk, about twenty minutes after sunset. The road runs straight away from the camera then bends gently right over a low rise, between a split-rail fence on the left and dark cedar trees on the right. The sky is a deep, calm blue fading to a thin band of muted warm paper-white at the horizon; the asphalt holds a faint reflection of the sky. No vehicles, no headlights, no tail lights, no police lights, no road signs, no mailboxes. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens at standing eye height, horizon in the lower third, long exposure stillness. Quiet, sober, reflective, never threatening. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-drug-crimes (3:2) — `/criminal-defense/drug-crimes/`

- **Subject:** empty bench under an old oak on a courthouse lawn in morning mist
- **Master:** 2528x1696 (`images/generated/site/cd-drug-crimes.png`)
- **Mood reference:** IMG08
- **Kept job:** `820ec2c3-f12b-4c8d-a9e4-f3bb17b23f7c` (2 credits). Attempts: 2; rejected: 1.
- **Accepted with note:** The left third is a soft out-of-focus foreground trunk in fog, which crops cleanly.

**Prompt (kept):**

> Editorial landscape photograph of a single empty slatted wooden park bench with dark iron ends beneath a broad old oak tree on the lawn of a small Middle Tennessee courthouse square, on a misty early morning under soft overcast. In the background, softly out of focus through the mist, only the pale limestone corner and plain columns of a generic civic building and more bare trees fading into fog; no storefronts, no shop windows, no signs, no lamps with panels anywhere. Damp green grass, a few fallen leaves, a brick walkway curving past the bench. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 50 mm lens at seated eye height, shallow depth of field with the bench sharp. Patient, steady, a place to think. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

**Rejected attempt 1** — job `c7a58bb8-7bdf-4ee1-aace-d7c35fd04f28` (2 credits). Reason: Background storefronts carried sign boards with pseudo-lettering and a lit window sign. Regenerated with only the civic building corner and fog-bound trees behind the bench.

<details><summary>Prompt used</summary>

> Editorial landscape photograph of a single empty slatted wooden park bench with dark iron ends beneath a broad old oak tree on the lawn of a small Middle Tennessee courthouse square, on a misty early morning under soft overcast. In the background, softly out of focus through the mist, the pale limestone corner and plain columns of a generic civic building and a few red-brick storefronts. Damp green grass, a few fallen leaves, a brick walkway curving past the bench. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 50 mm lens at seated eye height, shallow depth of field with the bench sharp. Patient, steady, a place to think. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

</details>

### site-cd-theft (3:2) — `/criminal-defense/theft/`

- **Subject:** brick storefront facade without signage, closed door, early morning
- **Master:** 2528x1696 (`images/generated/site/cd-theft.png`)
- **Mood reference:** IMG09
- **Kept job:** `0c445f1d-2ba2-484d-9ce2-afc383dc8b61` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Straight-on editorial architectural photograph of a single two-story historic red-brick storefront facade on a Middle Tennessee town square in early morning under soft overcast. A recessed entry with a closed dark-painted wooden door with a tall glass panel, flanked by two plain display windows of dark glass that reflect only soft sky and contain no goods; above, a plain painted cornice and three tall arched upper windows with white trim. The sign band above the windows is completely plain painted wood. Clean brick sidewalk in front, empty. The facade fills the right two-thirds; on the left, the soft edge of a neighboring building in shade. Shot on a 50 mm shift lens at eye level, perfectly corrected verticals, symmetrical calm. Ordinary, local, composed. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-violent-crimes (3:2) — `/criminal-defense/violent-crimes/`

- **Subject:** closed paneled doors in a pale limestone civic portico, overcast
- **Master:** 2528x1696 (`images/generated/site/cd-violent-crimes.png`)
- **Mood reference:** IMG08
- **Kept job:** `4cdcbb41-1c19-4ef3-a465-99f6d2d3ab5a` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial architectural photograph of the portico of a generic Southern county courthouse in Middle Tennessee under high overcast: a pair of tall closed paneled dark walnut doors with dull brass pulls, set deep in a pale limestone doorway framed by two plain fluted columns, three wide shallow limestone steps in front. Soft even light, cool blue-grey shade within the doorway. The stone is weathered and plain, with no inscriptions, no seals, no carved words. The doors and columns sit in the right two-thirds; the left third is smooth shaded limestone wall and a soft column edge. Shot on a 40 mm lens from the foot of the steps, corrected verticals. Gravity, order, a serious matter met calmly; no police imagery, no bars. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-sex-crimes (3:2) — `/criminal-defense/sex-crimes/`

- **Subject:** rain on a tall office window overlooking blurred brick rooftops
- **Master:** 2528x1696 (`images/generated/site/cd-sex-crimes.png`)
- **Mood reference:** IMG09
- **Kept job:** `1e793f7a-7cb7-4487-8eee-ac55d6678289` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Quiet editorial interior photograph looking out through a tall old multi-pane office window with white-painted mullions on a rainy overcast afternoon. Fine raindrops bead and run on the glass; beyond, softly out of focus, the red-brick upper floors and cornices of a Middle Tennessee town square and the tops of bare trees in cool grey light. A deep walnut window sill in the foreground holds nothing but soft reflected light. The left third is the plain shaded plaster wall beside the window. Shot on a 50 mm lens at standing eye height, shallow depth of field focused on the raindrops. Private, discreet, calm, considered. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-fraud (3:2) — `/criminal-defense/fraud/`

- **Subject:** neat stack of blank manila folders, closed ledger, brass clip on walnut desk
- **Master:** 2528x1696 (`images/generated/site/cd-fraud.png`)
- **Mood reference:** IMG09
- **Kept job:** `9ffa4ba3-ea13-452b-8fef-86c1cc2bcd56` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial still-life photograph on a deep walnut desk in an older law office, soft overcast window light from the left. In the right half: a neat squared stack of plain manila folders with blank covers and no tab labels, a closed ledger book bound in dark blue-black cloth with a completely blank cover, and a single brass binder clip resting on top. An all-brass desk lamp with a brass dome shade and no green glass, switched off, stands softly out of focus behind. No loose paper with writing, no numbers, no calculators, no money. The left third is clean, softly lit walnut surface fading to shadow. Shot on a 50 mm lens about 25 degrees above desk height, shallow depth of field. Order, scrutiny, careful review. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-probation (3:2) — `/criminal-defense/probation-violation/`

- **Subject:** Stones River greenway path under autumn trees, morning mist
- **Master:** 2528x1696 (`images/generated/site/cd-probation.png`)
- **Mood reference:** IMG08
- **Kept job:** `975bf777-d07e-4eb9-b97b-35b9957a4da3` (2 credits). Attempts: 1; rejected: 0. Plus 1 failed submission (`4d5b97c6-8baa-4568-bdc6-120cded2ab7a`, unbilled), resubmitted unchanged.

**Prompt (kept):**

> Editorial landscape photograph of a paved riverside greenway path in Middle Tennessee curving gently forward under tall autumn trees, beside a calm river with low limestone banks, on a soft misty overcast morning. Trees in muted gold, rust and faded green; a scatter of fallen leaves on the pale path; still water reflecting the pale sky on the left. A simple wooden rail fence along the riverside edge of the path. No benches with plaques, no trail markers, no signs. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens at standing eye height, medium depth of field, the path leading the eye forward into soft mist. Forward motion, a way back on track, quiet resolve. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-cd-domestic-assault (3:2) — `/criminal-defense/domestic-assault/`

- **Subject:** calm river bend under a limestone bluff, still water, overcast
- **Master:** 2528x1696 (`images/generated/site/cd-domestic-assault.png`)
- **Mood reference:** IMG08
- **Kept job:** `e11765f6-8e12-47c3-86b8-a178382b2b20` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial landscape photograph of a calm bend in a Middle Tennessee river beneath a low, layered grey limestone bluff topped with cedars and bare-branched hardwoods, on a still overcast morning. The water is glassy and slow, reflecting the pale sky and the bluff; a gravel bar and smooth river stones in the near foreground at the right. Faint low mist over the water in the distance. No boats, no docks, no structures. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens from the riverbank at standing eye height, horizon in the middle third. Stillness after strain; calm, measured, steady. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-fl-divorce (3:2) — `/family-law/divorce/`

- **Subject:** single set of house keys on an entry table by a closed front door, morning
- **Master:** 2528x1696 (`images/generated/site/fl-divorce.png`)
- **Mood reference:** IMG09
- **Kept job:** `a4029cea-d56c-424d-b5da-8c8886374186` (2 credits). Attempts: 1; rejected: 0.
- **Accepted with note:** Keys rendered as an old-fashioned brass ring of skeleton keys; on-brief and tasteful.

**Prompt (kept):**

> Editorial interior still-life photograph of the entry hall of a modest older Middle Tennessee house in soft morning light. A narrow painted wooden entry table stands against a plain pale wall in the right half of the frame; on it, a single ring of plain brass house keys with no tags, a small ceramic dish, and a short glass vase with one branch of green leaves. Beside the table, a closed white-painted paneled front door with a brass knob and a narrow sidelight window of seeded glass, glowing softly. Worn oak floor. The left third is a calm stretch of plain wall in cool blue-grey shade. Shot on a 50 mm lens at standing eye height, shallow depth of field focused on the keys. A new chapter, steady and dignified, never sad or broken. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-fl-custody (3:2) — `/family-law/child-custody/`

- **Subject:** empty wooden porch swing on a front porch, morning
- **Master:** 2528x1696 (`images/generated/site/fl-custody.png`)
- **Mood reference:** IMG09
- **Kept job:** `ec0cbc1a-892f-4c23-90e6-083e90a49902` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial photograph of a wide covered front porch on a white-painted Middle Tennessee farmhouse on a soft overcast morning. An empty slatted wooden porch swing hangs on plain chains in the right half of the frame, a folded wool blanket in muted blue resting on its seat; painted white porch posts and a beadboard ceiling in pale blue-grey. Beyond the porch rail, a softly out-of-focus green lawn and a large shade tree. A potted fern hangs at the far end. No toys, no bicycles. The left third is the plain clapboard wall of the house in soft shade. Shot on a 40 mm lens at standing eye height, medium depth of field. Home, continuity, security, gentle care. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-fl-visitation (3:2) — `/family-law/visitation/`

- **Subject:** gravel driveway under a big oak leading to a farmhouse, late afternoon
- **Master:** 2528x1696 (`images/generated/site/fl-visitation.png`)
- **Mood reference:** IMG08
- **Kept job:** `5bbcd054-e0ed-4641-a0f6-fed2e4660a54` (2 credits). Attempts: 1; rejected: 0.
- **Accepted with note:** Two empty porch chairs on the distant farmhouse porch; checked at full size, no figures.

**Prompt (kept):**

> Editorial landscape photograph of a gravel driveway winding up a gentle slope beneath a great spreading oak toward a modest white farmhouse with a deep front porch, in rolling Middle Tennessee countryside on a soft overcast late afternoon. A board fence follows the driveway on the left; pasture grass on both sides, a faint warm paper-white glow low in the sky behind the house. The house windows are plain. No vehicles, no mailbox, no animals. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 50 mm lens at standing eye height, medium depth of field. Coming and going, connection kept, unhurried. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-fl-parenting-plan (3:2) — `/family-law/parenting-plan-modifications/`

- **Subject:** open blank notebook and pencil on a kitchen counter by a window
- **Master:** 2528x1696 (`images/generated/site/fl-parenting-plan.png`)
- **Mood reference:** IMG09
- **Kept job:** `2ad8188b-9eb8-42a8-9644-3e0fec9c08e1` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial still-life photograph on a pale butcher-block kitchen counter beside a window in an older Middle Tennessee house, soft morning light. In the right half of the frame: an open spiral-bound notebook with plain unruled cream pages, completely blank, a sharpened wooden pencil lying across it, and a small potted herb plant on the windowsill behind, softly out of focus. A white ceramic mug at the edge of the frame. Soft light from the window at upper right falls across the pages, with cool blue-grey shade on the left. Shot on a 50 mm lens about 35 degrees above counter height, shallow depth of field focused on the pencil tip. Planning ahead, adjusting, calm practicality. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-fl-paternity (3:2) — `/family-law/paternity/`

- **Subject:** old oak with spreading roots on a Middle Tennessee hillside, morning
- **Master:** 2528x1696 (`images/generated/site/fl-paternity.png`)
- **Mood reference:** IMG08
- **Kept job:** `0b7f7ce7-cada-4418-9248-02a7e24614d8` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial landscape photograph of a single great old white oak tree with a broad spreading crown and thick roots gripping a gentle grassy hillside in Middle Tennessee, on a soft overcast morning with faint mist in the valley beyond. The trunk stands at about two-thirds of the frame width; its roots spread across the near ground into dew-wet grass. Low rolling hills and a distant tree line fade into pale sky. No fences with signs, no buildings, no swings. The left third of the frame is calm and low in detail so it crops cleanly beside a headline. Shot on a 35 mm lens at standing eye height, horizon in the lower third. Roots, lineage, belonging, steadiness. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-adoption (3:2) — `/adoption/`

- **Subject:** sunlit empty window seat with a folded quilt in an old house
- **Master:** 2528x1696 (`images/generated/site/adoption.png`)
- **Mood reference:** IMG09
- **Kept job:** `588a8838-9f48-4c51-b354-d98ee2ded6de` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial interior photograph of an empty built-in window seat in a bay window of an older Middle Tennessee house, in soft hopeful morning light. A neatly folded handmade patchwork quilt in muted blue, cream and faded brick red rests on a plain linen cushion, with one soft pillow. Tall multi-pane windows with white-painted trim glow with pale light; beyond them, out of focus, green leaves of a garden tree. Painted wood paneling below the windows, worn oak floor. No toys, no framed photos. The left third is plain painted wall in soft cool shade. Shot on a 40 mm lens at seated eye height, medium depth of field. Welcome, belonging, a place made ready. Generic, uncluttered, not any real office. No hands, no screens, no framed pictures, no certificates, no books with printed spines, no printed paper. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-dcs (3:2) — `/dcs-case-attorney/`

- **Subject:** front porch of a modest brick house, door closed, two empty rocking chairs
- **Master:** 2528x1696 (`images/generated/site/dcs.png`)
- **Mood reference:** IMG09
- **Kept job:** `d09b411c-a175-421c-8fdd-27fa9a93cc84` (2 credits). Attempts: 1; rejected: 0.

**Prompt (kept):**

> Editorial photograph of the front porch of a modest single-story red-brick house in a Middle Tennessee neighborhood in soft overcast daylight. Two empty white-painted wooden rocking chairs sit side by side on a plain concrete porch; behind them a closed dark-blue painted front door with a brass knob and a plain storm door, and a window with simple white curtains. A small potted plant by the steps, neatly kept boxwood shrubs along the front. No house numbers, no mailbox, no toys, no signs. The porch sits in the right two-thirds; the left third is soft lawn and shrub in gentle shade. Shot on a 40 mm lens from the front walk at standing eye height, corrected verticals. Home intact, respectful, steady, private. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-og-default (16:9) — `site-wide social share image (1200x630 crop)`

- **Subject:** courthouse-square cornices and limestone cupola, centered for a 1.9:1 crop
- **Master:** 2752x1536 (`images/generated/site/og-default.png`)
- **Mood reference:** IMG08
- **Kept job:** `8f60d3fc-f518-4acc-a585-8c21bf1da8ff` (2 credits). Attempts: 1; rejected: 0.
- **Accepted with note:** Centered composition; a small blank plate under the portico window, no lettering. Crop to 1200x630 keeps the cupola and both storefront rows.

**Prompt (kept):**

> Wide, balanced editorial architectural photograph of a historic courthouse square in a small Middle Tennessee town on a calm morning under soft high overcast. Centered in the frame: a pale limestone civic building with a plain columned portico and a white octagonal cupola with plain louvered openings, no clock and no dial; on both sides, rows of two-story red-brick storefronts with ornate painted cornices and tall multi-pane upper windows, display glass plain and dark. Mature shade trees in muted green frame the left and right edges; an empty brick-paved plaza runs across the bottom. Keep all important detail inside the central band of the frame, with calm sky in the top 15 percent and plain paving in the bottom 15 percent so it crops to a wide 1.9 to 1 banner. Shot on a 35 mm shift lens at eye level, corrected verticals, horizon in the lower third. Generic architecture, not a recognizable landmark and not any real law office. No vehicles, no flags, no street signs, no house numbers, no plaques, no notices, no posters. Grade: overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick and wood, warm paper-white highlights, deepest shadows a blue-black ink, never pure black; low saturation, gentle contrast, fine natural grain, no HDR, no lens flare, no heavy vignette. Calm and unhurried, like the opening plate of a book, not advertising. no people, no faces, no text, no signage, no lettering

### site-texture (16:9) — `section backgrounds (site-wide)`

- **Subject:** subtle warm paper-white cotton paper texture
- **Master:** 2752x1536 (`images/generated/site/texture.png`)
- **Mood reference:** IMG09
- **Kept job:** `ea222a94-9e48-40e5-b9fc-c0ae39ed0c2c` (2 credits). Attempts: 1; rejected: 0.
- **Accepted with note:** Near-uniform warm paper-white with faint fibre; use at low opacity or as-is for linen sections.

**Prompt (kept):**

> Extreme close, perfectly flat, evenly lit photograph of a sheet of heavy warm paper-white handmade cotton rag paper filling the entire frame edge to edge, showing only a very subtle fine fiber texture and the faintest soft mottling. Very low contrast, almost uniform tone, with a barely perceptible cool blue-grey cast in the slightest hollows. No folds, no creases, no edges, no stains, no watermark, no shadows, no objects, no vignette, no gradient. Shot straight down with soft diffused light, entire frame in focus. Quiet, tactile, suitable as a seamless background. Grade: warm paper-white with the faintest cool blue-grey in the shadows, low saturation. no people, no faces, no text, no signage, no lettering
