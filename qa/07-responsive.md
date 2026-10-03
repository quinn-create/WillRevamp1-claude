# 07-responsive
Result: PASS

This is round 3.

**Tool data.** `qa/responsive.json` was generated at 2026-10-03T17:48Z by `tools/responsive.mjs` against `dist/`.
- `dist/` was built at 17:41Z. The round-2 fix commit is 2e0944e. No `src/` file is newer than the build.
- It covers 60 pages (30 EN + 30 ES) at 5 widths (360x780, 390x844, 768x1024, 1280x800, 1920x1080). That is 300 page-widths, with `errors: 0`.

**Round-2 fix check.**
- `src/styles/shell.css` lines 215–222, `.menu-sub a`, now has `min-width: var(--control-height)`.
- The built CSS (`dist/_astro/CTABand.FJEOHOuE.css`) contains it.
- The advisory fixes are also in source and in `dist`:
  - `.related-links a` in `src/pages/_templates/PageView.astro`, line 466
  - `.list a` in `src/styles/components.css`, line 142

**Independent re-probe.** I wrote my own script and ran it against the same `dist/`. It covered all 60 pages at 6 widths (the 5 above plus 1216, the 76em nav breakpoint), so 360 page-widths. Each width used a fresh page with the mouse parked at x=2, so no hover state carried over. It checked:
- overflow
- tap targets, with their region
- text-line overlap
- a reverse (Shift+Tab) focus pass
- every desktop dropdown expanded
- the **header menu dialog opened**, with a Tab pass inside it

## Requirement-by-requirement

| Requirement | Result | Evidence |
|---|---|---|
| No horizontal scroll (`scrollWidth <= innerWidth`) | PASS | Tool: `summary.overflowPages: []`, max `overflowPx` 0 over 300 page-widths. Re-probe: `max(documentElement.scrollWidth, body.scrollWidth) - innerWidth <= 0` and `documentElement.scrollWidth - clientWidth <= 0` on all 360 page-widths. With the menu dialog open (270 page-widths): dialog `scrollWidth - clientWidth` = 0, document overflow 0, and the dialog's right edge is never past the viewport. With the dropdowns expanded (90 page-widths at 1216/1280/1920): document overflow 0. |
| Tap targets >= 44x44 in header, CTA, footer | PASS | Tool: `smallTargetCount: 0`, `smallTargetsBelow24: 0`. That covers every `a[href]`, `button`, `input`, `select` and `summary` on all pages, not only header/CTA/footer. Inline links inside a paragraph are exempt, as in rounds 1–2. Re-probe: (1) Menu dialog `#menu a[href], #menu button` gave 0 small targets in 270 opened dialogs (EN 360/390/768; ES all 6 widths), so R2-D1 is fixed. "DUI", "Theft", "Fraud" and "Robo" now measure >= 44 wide. (2) Desktop `.nav-sub a` gave 0 small. (3) `.site-header`, `.callbar`, `.site-footer`, `.cta-band` and `.hero` had 0 non-inline small targets at any width. (4) The only non-inline sub-44 controls on the site are both in the page body and both pass. The `botcheck` honeypot on contact/contacto has `aria-hidden`, `tabindex=-1` and is not a target. The cookie-settings checkboxes are 22x22 inside a `label` that is 44–55 px tall. |
| No overlapping text | PASS | Re-probe compared the client rects of every visible text node against every other element's on all 360 page-widths. A hit means more than 2 px of horizontal overlap and more than 35% of the line height. There were 0 overlaps. Inside the opened menu dialog, comparing link, button and text boxes gave 0 overlaps in 270 dialogs. |
| Sticky header / call bar not covering focused elements | PASS | Tool forward Tab pass: `focusObscured {fully 0, partly 0, offscreen 0}` over 16,100 focus stops. Re-probe reverse Shift+Tab pass, 7x5 sample grid against every visible fixed or sticky box: 0 covered and 0 off-screen on all 360 page-widths. Tab pass inside the opened menu dialog (focus trapped): 0 covered and 0 off-screen in 270 dialogs. |

## Notes on what was excluded

- **Pointer hover is not a keyboard defect.** A first run of the re-probe kept one page across widths. The mouse was left over a desktop nav item, so its hover dropdown stayed open in the sticky header and covered footer links during the reverse Tab pass. It also overlapped H1 text at 1920.
  - A fresh page with the pointer parked showed 0 such cases.
  - That combination needs the pointer resting on the nav while the user Tabs.
  - It is pointer-triggered transient content, not something the author placed over focused content, so it is not counted.
- **Inline text links in hero and CTA-band paragraphs are not counted.** The same ruling was made in rounds 1 and 2, and `tools/responsive.mjs` excludes them by design. WCAG 2.5.8's Inline exception covers them. 130 instances are 17–26 px tall, for example `.cta-band__copy p a.tel` "(615) 410-7290" and "send a short message".
  - Every inline `tel:` link sits in a block that also has a >= 44 px `a.btn` to the same `tel:` target, except the accessibility hero (EN/ES). There the header call button and the call bar are on the same page.
  - "send a short message" has a >= 44 px `/contact-us/` control elsewhere on each page.

## Fixes

None required: no defects remain in scope. R2-D1 (`.menu-sub a` narrow labels, 570 instances) is verified fixed.

Optional, not counted toward the result: if a 44 px hit area is wanted on the inline CTA/hero links as well, add
`.cta-band__copy p a, .hero__deck p a { padding-block: 0.6em; margin-block: -0.6em; }` to `src/styles/components.css`.
