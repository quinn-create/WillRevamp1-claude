# A15 Image Director — decisions (mockup stage)

- **Model:** Higgsfield `nano_banana_pro`, `resolution: "2k"`, aspect ratios 16:9 (hero), 3:2 (practice), 4:5 (contact).
  The job API labels the model `nano_banana_2` internally; the transaction log bills it as "Nano Banana Pro". No project or
  folder created (`auto_create_project=false`); `use_unlim` never passed. Preflight `get_cost` = 2 credits/image.
- **Masters:** 2752x1536 (16:9), 2528x1696 (3:2), 1856x2304 (4:5); AVIF + WebP variants by `tools/images.mjs`.
- **Credits:** 13 generations x 2 = **26 credits** spent by A15 (cap 100). Kept 9 (18 credits, the total in
  `images/GENERATED.json`); rejected 4 (8 credits). Balance 1091.07 before, 1021.07 after. The other 44 credits of the drop
  were 22 Nano Banana Pro images billed 12:15:41–12:18:32 UTC by another session on the same Higgsfield account, not A15.
- **Mood references:** IMG08 (`mainstage-v1-img.webp`) for every exterior and the A-practice interior; IMG09
  (`Screenshot-2025-10-21-at-2.27.41-PM.png`) for the contact still lifes and interiors. Only light, palette and materials
  were taken. Neither building, nor the "509" number, nor the arched doorway was reproduced.
- **Rejections (4):**
  - A-hero, attempt 1 (`2a9190ec…`): the wall plaque had a seal and lines that looked like lettering, and the left third
    was an artificial blank wall. Regenerated with no plaques or inscriptions and an open sky/tree-line left third. Kept attempt 2.
  - A-contact, attempt 1 (`59ebf0ac…`): a saturated green banker's-lamp shade broke the brass/ink palette, and the pad
    rendered as a bound book. Regenerated with an all-brass dome lamp and an open leather padfolio. Kept attempt 2.
  - C-hero, attempt 1 (`cc101f4e…`): a sign board with pseudo-lettering and a parked car.
  - C-hero, attempt 2 (`d9b9b39b…`): a diptych seam (an AI artifact), a clock face on the cupola and a red traffic sign.
    Kept attempt 3 (`6c056fc2…`). Retries for this slot are exhausted. A very soft grey shape far left may be a car roof.
    It is not legible and has no plate.
- **Accepted with notes:** B-practice (diagonal shadow bands come from an off-frame source; graphic and on-brief),
  C-practice (a distant blank sign post seen edge-on; nothing readable), B-contact (the phone is soft and side-on, with no
  digits showing).
- No placeholders were needed; Higgsfield was available on the first ToolSearch.
