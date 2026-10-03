# 07-responsive
Result: FAIL

Round 1. Data: `qa/responsive.json` (tools/responsive.mjs, generated 2026-10-03T15:15Z against `dist/`, built 15:05Z, no
`src/` file newer than the build), 60 pages (30 EN + 30 ES) x 5 widths (360x780, 390x844, 768x1024, 1280x800,
1920x1080) = 300 page-widths, 0 errors. I re-probed the same `dist/` with my own script to cover what the tool does
not: region of each small target, text-overlap check, reverse (Shift+Tab) focus pass for the sticky header, and
1216 px (the 76em nav breakpoint).

## Requirement-by-requirement

| Requirement | Result | Evidence |
|---|---|---|
| No horizontal scroll (`scrollWidth <= innerWidth`) | PASS | `summary.overflowPages: []`; re-probe: `max(documentElement.scrollWidth, body.scrollWidth) == innerWidth` on all 300 page-widths (and at 1216). |
| Tap targets >= 44x44 in header, CTA, footer | **FAIL** | 1,500 failing instances across all 60 pages (defects D1–D5). Tool total: 2,508 small targets (1,530 under 24 px), including the out-of-scope body links listed under Advisory. |
| No overlapping text | PASS | Re-probe compared every visible text-line box against every other element's text-line boxes on all 300 page-widths (overlap > 2 px wide and > 35% of line height). 0 overlaps. Spot-checked `REPORT/shots/after/index-390.jpg`: nothing overlaps apart from the fixed call bar, which shows up mid-page only because of how full-page screenshots capture fixed elements. |
| Sticky header / call bar not covering focused elements | **FAIL** | Forward Tab pass: `focusObscured {fully 0, partly 120, offscreen 0}`. All 120 are `a.footer-cookie` ("Cookie settings" / "Configuración de cookies"), 20% covered by `a.callbar` at 360 and 390 on all 60 pages (D6). Reverse Shift+Tab pass (re-probe): 0 elements covered by `.site-header`. |

## Defects (header / CTA / footer)

| # | Region | Element | Size (w x h) | Widths | Pages | Instances |
|---|---|---|---|---|---|---|
| D1 | header | `a.brand` (logo home link) | 120x13 @360/390, 200x31 @768, 184x29 @1280/1920 | all 5 | 60 (EN+ES) | 300 |
| D2 | header | `button.nav-chev` (3 submenu toggles: Criminal Defense, Family Law, About) | 32x44 | 1280, 1920 | 30 EN (ES hides the desktop nav) | 180 |
| D3 | footer | `.footer-social a` "X" and "AVVO" | X 10–11x44, AVVO 40–43x44 | all 5 | 60 | 600 |
| D4 | footer | `.footer-links a` "About" (43x44 @360/390) and "FAQs" (37–39x44, all widths) | see left | all 5 | 30 EN | 210 |
| D5 | CTA | `.proof a.tel` "(615) 410-7290" (phone CTA in the proof strip, e.g. "FREE CONSULTATION: (615) 410-7290") | 107x18 @360–768, 118x19 @1280/1920 | all 5 | 42 | 210 |
| D6 | call bar / footer | `a.callbar` partly covers the focused `a.footer-cookie` (20%) | — | 360, 390 | 60 | 120 |

D6 root cause: the phone-only rule `.site-footer { padding-bottom: calc(var(--space-10) + var(--callbar-height) + …) }`
in `src/styles/shell.css` line 259 sits in a media block **before** the footer section. The base rule at line 266,
`padding-block: … var(--space-10)`, has the same specificity and comes later, so it wins, and the reserved space for
the call bar is lost. At 390x844 with the page scrolled to the end, the cookie link sits at y 760–804 while the call
bar starts at y 796.

Every defect is in shared shell CSS, so each one appears on every page that has the element.

## Fix verification (not applied)
I injected the CSS below into the built pages and re-ran the probe at 360/390/768/1216/1280/1920 on all 60 pages. With
it, there are 0 small targets in header, footer or CTA, 0 focus-obscured elements (forward and reverse), 0 overflow
and 0 text overlaps. At 1216 px, the nav chevron fix alone squeezes the header call button from 191 px to 177 px wide.
Adding `gap: 0` on the nav list (F2b) keeps it at 191 px, and the nav list still ends before `.header-actions`.

## Fixes

- **F1 (D1)**: `src/styles/shell.css` line 21, selector `.brand`. Replace
  `.brand { display: block; flex: none; border-radius: var(--radius-focus); line-height: 0; }`
  with
  `.brand { display: flex; align-items: center; flex: none; min-height: var(--control-height); border-radius: var(--radius-focus); line-height: 0; }`
- **F2a (D2)**: `src/styles/shell.css` line 118, selector `.nav-chev`. Replace
  `width: calc(var(--control-height) - var(--space-3)); height: var(--control-height);`
  with
  `width: var(--control-height); height: var(--control-height);`
- **F2b (D2, keeps the header fitting at 76em)**: `src/styles/shell.css` line 86, selector `.nav-primary > ul`. Change
  `gap: var(--space-1);` to `gap: 0;` (the 8 px inline padding on `.nav-link` already separates the items).
- **F3 (D3)**: `src/styles/shell.css` line 316, selector `.footer-social a`. Replace with
  `.footer-social a { display: inline-flex; align-items: center; justify-content: center; min-height: var(--control-height); min-width: var(--control-height); }`
- **F4 (D4)**: `src/styles/shell.css` line 311, selector `.footer-links a`. Replace with
  `.footer-links a { display: inline-flex; align-items: center; min-height: var(--control-height); min-width: var(--control-height); text-decoration: none; }`
  (line 313's `.footer-links .lang-toggle { min-width: 0; … }` can stay, because the language label is wider than 44 px).
- **F5 (D5)**: `src/styles/components.css` line 228, selector `.proof a`. Replace with
  `.proof a { display: inline-flex; align-items: center; min-height: var(--control-height); margin-block: calc(-1 * var(--space-2)); letter-spacing: var(--tracking-button); margin-left: 0.35em; }`
  (the negative block margin cancels the `li`'s `padding-block: var(--space-2)`, so the strip's row height stays the same).
- **F6 (D6)**: `src/styles/shell.css`. Delete line 259
  (`  .site-footer { padding-bottom: calc(var(--space-10) + var(--callbar-height) + env(safe-area-inset-bottom)); }`)
  from the `@media (max-width: 37.49em)` block at lines 257–260, and keep that block's `html { scroll-padding-bottom … }`.
  Then add this after line 320 (`.footer-cookie { … }`, the end of the footer section), so it comes after the base
  `.site-footer` rule:
  `@media (max-width: 37.49em) { .site-footer { padding-bottom: calc(var(--space-10) + var(--callbar-height) + env(safe-area-inset-bottom)); } }`

After the fixes: rebuild, then run `node tools/responsive.mjs --dist dist --out qa/responsive.json`. Expect
`focusObscured.partly == 0`, `overflowPages == []`, and no `a.brand`, `nav-chev`, `footer-social`, `footer-links` or
`.proof a.tel` entries in `smallTargetsByElement`.

### Advisory (outside the header/CTA/footer scope; not counted in the result)
- Body related-link lists `ul.related-links a` (`src/pages/_templates/PageView.astro` line 415): 20–21 px tall on
  30 pages, 690 instances. Suggested change:
  `.related-links a { display: inline-flex; align-items: center; min-height: var(--control-height); margin-block: calc(-1 * var(--space-3)); font-weight: var(--weight-text-strong); }`
- Body `ul.list` links (`tel:` / `mailto:` / practice links on accessibility, privacy, criminal-defense hub, DUI, theft
  and their ES mirrors, plus related lists on the criminal sub-pages): 20–21 px tall. Same pattern; optional.
- Breadcrumb "Home" / "Inicio" `.breadcrumbs a` (`src/styles/components.css` line 199): 38–43x44 at 768+.
  Add `min-width: var(--control-height);`.
- Consent checkboxes (`label.check input`, 22x22) pass, because their label is part of the tap area (the tool already
  counts it).
