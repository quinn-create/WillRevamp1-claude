# 07-responsive
Result: FAIL

Round 2. Data: `qa/responsive.json` (tools/responsive.mjs, generated 2026-10-03T16:56Z against `dist/`, built 16:49Z
after the round-1 fix commit 124a4bf; no `src/` file is newer than the build). It covers 60 pages (30 EN + 30 ES) x 5
widths (360x780, 390x844, 768x1024, 1280x800, 1920x1080) = 300 page-widths, with 0 errors. I re-probed the same `dist/`
with my own scripts to cover what the tool does not:
- the region of each small target
- a text-overlap check
- a reverse (Shift+Tab) focus pass
- 1216 px (the 76em nav breakpoint)
- desktop dropdowns expanded
- **the header menu dialog opened** on all 60 pages at all 5 widths. The tool never opens it, which is how round 1
  missed it.

## Requirement-by-requirement

| Requirement | Result | Evidence |
|---|---|---|
| No horizontal scroll (`scrollWidth <= innerWidth`) | PASS | `summary.overflowPages: []`. Re-probe: `max(documentElement.scrollWidth, body.scrollWidth) <= innerWidth` on all 360 page-widths (5 widths + 1216). With the menu dialog open: dialog `scrollWidth == clientWidth` (360/390, or 416 at 768+). |
| Tap targets >= 44x44 in header, CTA, footer | **FAIL** | The round-1 defects D1–D5 are fixed: 0 small targets in `.site-header` (closed), `.callbar`, `.site-footer` or `.proof`, and 0 non-inline small targets in `.hero`/`.cta-band`. Desktop dropdowns at 1280/1920: every `.nav-sub a` is 222–238x44. **But the header menu dialog `#menu` has `.menu-sub a` links that are too narrow: 570 instances on 60 pages (R2-D1).** |
| No overlapping text | PASS | Re-probe compared the text-line boxes of every visible element against every other element's on all 360 page-widths (overlap > 2 px wide and > 35% of line height): 0 overlaps. Header controls at 1216: 0 overlapping boxes; right-most control ends at x=1178. |
| Sticky header / call bar not covering focused elements | PASS | Tool: `focusObscured {fully 0, partly 0, offscreen 0}` (the round-1 D6 call-bar/cookie-link fix holds). Re-probe: forward Tab 0 and reverse Shift+Tab 0 on all 360 page-widths. With the menu dialog open (focus trapped): 0 covered or off-screen on the 4 pages x 4 widths sampled. |

## Defects

| # | Region | Element | Size (w x h) | Widths | Pages | Instances |
|---|---|---|---|---|---|---|
| R2-D1 | header (menu dialog opened by `button.menu-btn`) | `.menu-sub a`: EN "DUI", "Theft", "Fraud"; ES "DUI", "Robo" | DUI 25–27x44, Theft 39x44, Fraud 41–42x44, Robo 35–39x44 | EN 360/390/768 (EN switches to the desktop nav at 76em); ES all 5 widths (ES keeps the dialog on desktop) | 60 | 570 (EN 30x3x3 = 270, ES 30x5x2 = 300) |

Cause: `src/styles/shell.css` line 215, `.menu-sub a`, sets `min-height: var(--control-height)` but no minimum width,
so short labels shrink to their text width.

I verified the fix without applying it: I injected the CSS below into 8 pages and widths (/, /es/, DUI, drug-crimes,
robo, fraude at 360/390/768/1280/1920). Result: 0 small targets in the open dialog, no dialog or document overflow,
and the wrap layout is unchanged apart from "DUI", "Theft" and "Fraud"/"Robo" taking 44 px.

## Fixes

- **F1 (R2-D1)**: in `src/styles/shell.css` at line 215, selector `.menu-sub a`, add `min-width: var(--control-height);`
  after line 217 (`min-height: var(--control-height);`), so the rule reads:
  ```
  .menu-sub a {
    display: inline-flex; align-items: center;
    min-height: var(--control-height);
    min-width: var(--control-height);
    font-size: var(--text-small);
    color: var(--color-text-muted);
    text-decoration: none;
  }
  ```

After the fix: rebuild, then run `node tools/responsive.mjs --dist dist --out qa/responsive.json`. Expect the summary
to stay the same (overflow `[]`, focusObscured 0/0/0). Also open `button.menu-btn` at 360 and at 1920 on `/es/` and
confirm that every `#menu a, #menu button` measures >= 44x44.

### Advisory (outside the header/CTA/footer scope; not counted in the result)
- **Body `ul.related-links a`, narrow labels:**
  - Where: "DUI" 29–31x44 on 6 pages; "Robo" 42–43x44 on 2 pages. These are 60 of the tool's 250 small targets.
  - Fix: in `src/pages/_templates/PageView.astro` line 452, add `min-width: var(--control-height);` to
    `.related-links a`. I verified it by injection: 0 small.
- **Body `ul.list a`, 20–21 px tall:**
  - Where: tel/mailto on accessibility, privacy and the ES mirrors; practice links on criminal-defense, DUI, theft,
    domestic-assault, probation-violation and testimonials, plus their ES mirrors. These are the other 190 tool
    targets.
  - Fix: add
    `.list a { display: inline-flex; align-items: center; min-height: var(--control-height); margin-block: calc(-1 * var(--space-3)); }`
    in `src/styles/components.css` after line 140. The negative margin keeps the row rhythm.
- **Inline links inside CTA/hero paragraphs (deliberately not counted):**
  - What: `.cta-band__copy p a.tel` "(615) 410-7290" and "send a short message", and `.hero__deck p a.tel`. They are
    20–26 px tall.
  - Why they are not counted: they are inline links inside a sentence, which WCAG 2.5.5/2.5.8 exempt as Inline. Every
    one of these blocks also has an equivalent >= 44 px `a.btn.btn-call` to the same `tel:` target, which meets the
    Equivalent exception.
  - Optional fix if the fixer wants a 44 px hit area anyway: add
    `.cta-band__copy p a, .hero__deck p a { padding-block: 0.6em; margin-block: -0.6em; }`.
- Consent checkboxes (`label.check input`, 22x22) pass: the label they sit in is 44–55 px tall and is part of the tap
  area.
