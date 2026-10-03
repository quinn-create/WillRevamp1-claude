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
