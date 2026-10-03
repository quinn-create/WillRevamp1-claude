# 07-responsive
Result: PASS

This is the recheck after round 3, run against the current build.

**Build state.** The working tree has three uncommitted `src/` edits, and all three are in the build:
- `src/styles/shell.css` lines 318–320 change the footer social row. The links get `gap: 0` and `padding-inline: var(--space-4)`, and the row gets a negative start margin. A `@media (max-width: 22.49em)` rule steps both down to `--space-3`.
- `src/components/Steps.astro` changes one line.
- `src/pages/_templates/PageView.astro` changes one line.

`dist/` was rebuilt at 18:31:30Z, which is about 4 minutes after `qa/responsive.json` (18:27:15Z). No `src/` file is newer than `dist/`. Because the build is newer than the tool data, I re-probed the current `dist/` myself (see below). `REPORT/shots/after/` has been re-captured: 120 shots (60 pages × 390/1280), all modified in the working tree.

## Tool data (`qa/responsive.json`)

The tool ran at 360x780, 390x844, 768x1024, 1280x800 and 1920x1080 on 60 pages (30 EN + 30 ES). That is 300 page-widths, with `errors: 0`.

| Summary field | Value |
|---|---|
| `overflowPages` | [] |
| `smallTargetCount` | 0 |
| `smallTargetsBelow24` | 0 |
| `focusObscured` | fully 0, partly 0, offscreen 0 |

## Independent re-probe (current `dist/`)

I ran my own Playwright script against the current `dist/`:
- **Coverage:** all 60 pages at 6 widths (320, 360, 390, 768, 1280 and 1920), which is 360 page-widths with 0 errors.
- **Setup:** each page-width got a fresh context, with the pointer parked at (2,2).
- **Focus test:** 19,002 forward Tab stops.

| Requirement | Result | Evidence |
|---|---|---|
| No horizontal scroll | PASS | I measured `max(html.scrollWidth, body.scrollWidth) - html.clientWidth`. The largest value was **0 px** across 360 page-widths, including every page at 320. |
| Tap targets ≥ 44×44 (header, call bar, CTA, footer) | PASS | I checked every visible `a`, `button`, `summary`, `input` and `select` inside `header`/`.site-header`, `.callbar`, `footer`/`.site-footer`, `.cta-band` and `[class*=cta]`, plus every `.btn`. Inline `<a>` inside paragraph text was exempt (WCAG 2.5.8 inline exception, as in rounds 1–3). **0 targets were under 44×44** across the 360 page-widths. |
| Menu dialog and dropdowns | PASS | I opened the mobile menu dialog with every disclosure expanded on all 60 pages at 320, 360, 390 and 768 (240 dialogs). I also opened it on the 30 pages that show the menu button at 1280, for 270 dialogs in total. Every dialog opened, with **0 small targets, 0 overflow and 0 links past the right edge**. I also expanded each desktop header dropdown at 1280 and found 0 small or clipped links. |
| No overlapping text | PASS | I compared the client rects of every visible text node pairwise, excluding the header, call bar, skip link and dialog. A hit meant more than 2 px of horizontal overlap and more than 35% of the line height. Result: **0 overlaps** in 360 page-widths. |
| Sticky header / call bar not covering focused elements | PASS | For each Tab stop I measured the share of the focused element's box covered by any visible fixed or sticky element that is not its own ancestor or descendant. Where boxes overlapped, I used `elementFromPoint` to check paint order, so the skip link (z-index 100, above the header's 50) is not counted as covered. Result: **0 stops more than 1% covered and 0 stops off-screen**, out of 19,002. |
| Footer social row: one row at 320 px, each link ≥ 44×44 | PASS | `.footer-social` is present on all 60 pages and has 4 links (Facebook, LinkedIn, X, AVVO). It is **1 row at every width**. **The smallest link is 44.0×44.0 at every width.** At 320 the row runs from x = 4.0 to 288.0 inside a 320 px viewport, so nothing is clipped. At 360 it runs from 1.0 to 309.0, and at 390 from 1.8 to 309.8. |

## Fixes

None required.
