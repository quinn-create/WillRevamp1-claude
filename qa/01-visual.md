# 01-visual
Result: PASS

Check 01 (visual fidelity), recheck after round 3, second pass. The reviewer did not edit site code and did not commit.

## Evidence

Sources:
- `dist/` built 18:31:30, after the last source change (`src/styles/shell.css` 18:31:19). The built CSS
  (`dist/_astro/CTABand.Dx6YxWfz.css`) contains `.footer-social a:focus-visible`.
- `REPORT/shots/after/*.jpg` (120 files, 60 pages × 1280/390) and `qa/responsive.json` (60 pages × 360/390/768/1280/1920:
  0 overflow pages, 0 small targets, 0 obscured focus, 0 errors).
- The working-tree diff against 0626458 touches only `src/components/Steps.astro`, `src/pages/_templates/PageView.astro`
  and `src/styles/shell.css` (the three round-3 fixes plus the inset focus ring for footer social links).
- Three Playwright probes on Chromium serving `dist/` with `tools/lib.mjs#serve`, at 1280, 390 and 320:
  1. Computed styles and geometry (steps disclaimer, footer social links, portrait caption) and real-keyboard focus on
     each social link, on 8 pages.
  2. Mouse hover on the footer links.
  3. A full Tab walk on 13 pages (EN and ES) checking every stop for a visible ring inside the viewport.
- Pages compared, EN and ES twin, at 1280 (20-page contact sheet) and 390: home (`index` / `es`), hub
  (`criminal-defense` / `es__defensa-penal`), practice pages (`criminal-defense__dui` / `es__defensa-penal__dui`,
  `family-law__divorce` / `es__derecho-familiar__divorcio`), about, faqs, testimonials, contact, privacy and 404.
  - Type (Newsreader display, sans text), navy/paper/brass palette, section eyebrows, card grids, steps rows, FAQ
    accordions, testimonial blocks, the navy CTA band and the navy footer all match mockup A and the round-3 shots.
  - No layout regression.
  - At desktop width the ES header uses the "Menú" button. This is recorded in `plan/DECISIONS.md:893` (the Spanish
    labels need about 920 px inline and do not fit), so it is not a defect.

### Round-3 residual defects: all 3 fixed
1. **The steps disclaimer renders as fine print.**
   - In `dist/**/index.html`, all 26 pages with `steps-after` use `class="flow steps-after fineprint"`, EN and ES
     (26 of 26).
   - Computed on dui and es/derecho-familiar/divorcio: 16 px at 1280, 15.03 px at 390 and 15 px at 320. Color is
     rgb(90,100,114) (`--color-text-muted`). This is the same style as the testimonial disclaimer and matches mockup
     A's `.fineprint`.
   - Visual check on criminal-defense-1280: under the 05 "Court." rule, "Prior results do not guarantee a similar
     outcome." is small and muted.
2. **The footer social links are evenly spaced.**
   - Measured text-to-text gaps (Facebook→LinkedIn→X→AVVO), identical on all 8 probed pages, EN and ES:

     | Width | Gaps (px) |
     |---|---|
     | 1280 | 32 / 33 / 33 |
     | 390 | 32 / 33 / 33 |
     | 320 | 24 / 29 / 29 |

   - The links stay on one row at every width.
   - Every target is at least 44 × 44 (X is 44 wide). `scrollWidth` equals the viewport at 1280, 390 and 320.
   - Visual check: the footers on index-1280 and es-390 read as an even row.
3. **The ES home caption reads "Will Fraley · Abogado".**
   - Rendered on `/es/` at 1280, 390 and 320, and visible in es-1280.
   - EN is unchanged: "Will Fraley · Attorney at Law".

### Regression from the previous pass: fixed
- **Footer focus ring.** The footer social focus ring was clipped at the left viewport edge at phone widths. It is now
  drawn inset: 3 px solid rgb(216,180,106) with a −4 px offset.
  - Measured by real Tab focus. The outer left edge of the ring is at 25 / 2.8 / 5 px at 1280 / 390 / 320 (was
    19 / −3 / −1).
  - The rings are 42 px tall, and adjacent rings do not overlap.
  - `:focus-visible` matched on all 4 links on all 8 pages.

### Hover and focus-visible
- **Tab walk.** 13 pages × 3 widths, 38–101 stops per page. Every stop has a visible ring, and no ring extends past the
  viewport.
- **Footer social hover.** Paper rgb(247,246,242) changes to sky rgb(157,190,227) with a 0.16 s transition, and the
  underline stays.
  - The first probe read paper on `/` only because it sampled mid-transition. A re-probe after 300 ms read sky at 1280
    and 390.
- **Other components.** No CSS changed outside the footer social rules, so the round-3 hover and focus measurements for
  buttons, cards (`.card:has(:focus-visible)`), nav, inputs and the cookie checkbox still apply.
