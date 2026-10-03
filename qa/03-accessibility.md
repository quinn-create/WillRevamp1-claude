# 03-accessibility
Result: PASS

Round 1. Reviewer data: `qa/axe.json` (generated 2026-10-03T15:08:06Z against `dist/`, built 15:05:53Z), plus
reviewer Playwright runs against the same `dist/` (served by `tools/lib.mjs#serve`, Chromium 1.56.1). Source reviewed:
`src/layouts/Site.astro`, `src/layouts/Base.astro`, `src/components/{Header,MenuDialog,FAQ,LanguageToggle,Icon}.astro`,
`src/components/forms/*`, `src/components/consent/*`, `src/styles/{global,components,shell}.css`.

## Automated (qa/axe.json — axe-core, tags wcag2a/2aa/21a/21aa/22aa + best-practice)

| Requirement | Result | Pages |
|---|---|---|
| axe critical | 0 on every page | 60/60 (31 EN + 29 ES incl. 404s) |
| axe serious | 0 on every page | 60/60 |
| axe moderate / minor | 0 / 0 (no violations of any impact) | 60/60 |
| exactly one `<h1>` | h1 = 1 | 60/60 |
| heading skips | 0 | 60/60 |
| `<html lang>` | `en` on all 31 EN pages, `es` on all 29 `/es/` pages | 60/60 |
| `<main>` landmark | present (`<main id="main" tabindex="-1">`) | 60/60 |
| skip link | present (`a.skip-link[href="#main"]`) | 60/60 |
| keyboard focusNotVisible | 0 (3,234 stops) | 60/60 |

No page errored. Note: `tools/axe.mjs` caps the keyboard walk at 60 stops (32 pages hit the cap), so the reviewer
re-ran it with no cap (below).

## Keyboard: full sweep with no cap (reviewer run)

- Every page at 1280×900 and 390×844 (120 runs), tabbed until focus wrapped back to the first stop: 6,580 focus
  stops (35 to 101 per page). **0 stops without a visible indicator** (outline ≥ 3px brass `#8C6A2F` on paper,
  `#D8B46A` on ink, or a box-shadow bar), 0 zero-size focus targets.
- Focus Not Obscured (2.4.11), checked with `elementFromPoint` after scrolling settled, on all 120 runs:
  **0 focused elements fully hidden** by the sticky header, the phone call bar or anything else. Earlier hits on
  `/adoption/`, `/dcs-case-attorney/`, `/es/derecho-familiar/` and `/es/lesiones-personales/` at 390 (hero `a.tel`
  under `.callbar`) came from reading the page in the middle of a smooth scroll; once it settled (reduced motion, or
  a 700 ms wait) the element was in the clear. The skip link at 1280 sits on top of the header (z-index 100), and
  Enter moves focus to `#main`.

## Manual checks

**Menu dialog** (`MenuDialog.astro` + script in `Site.astro`), 390×844, on `/`, `/es/`, `/contact-us/`, `/faqs/`:
- With JS, the `<button data-menu-open aria-haspopup="dialog" aria-controls="menu">` is shown and the no-JS
  fallback link is hidden. Enter calls `showModal()`, sets `aria-expanded="true"` and moves focus into the dialog
  (the brand link). The dialog is named "Menu"/"Menú" and the close button "Close menu"/"Cerrar menú".
- Trap: in 60 Tabs per page, focus never left the dialog (0 escapes) and was visible on every stop.
- **Esc closes it**, focus **returns to the opener** and `aria-expanded` goes back to `"false"` (checked after the
  async `close` event, 4/4 pages). The close button (Enter) behaves the same way. Under reduced motion there is no
  slide-in (`animation-name: none`).
- Desktop nav disclosure (1280): Enter on the chevron sets `aria-expanded="true"` and shows the submenu, and Tab
  moves into it. Esc collapses it, sets `aria-expanded="false"` and puts focus back on the chevron.

**FAQ `<details>`** (`FAQ.astro`) on `/faqs/` (31 items), `/es/preguntas-frecuentes/` (31), `/criminal-defense/dui/` (5):
native `<details>/<summary>`. The summary is reachable by keyboard, shows a 3px brass ring, Enter and Space both
toggle it, and the accessibility tree exposes the question text as its name plus an `expanded` state. The chevron
SVG is `aria-hidden="true" focusable="false"`.

**Contact form** (`ContactForm.astro`, `contact-form.ts`):
- Every control has a programmatic `<label for>` (EN + ES): First name, Last name, Email (optional), Phone, Best time
  to reach you (optional), Are you a new client? (optional), How can we help? (optional). Required fields carry
  `required`, and `autocomplete` tokens are set. The fieldset has a visually hidden `<legend>`.
- Every `aria-describedby` id resolves (0 missing). It points to the help text and to the field's `-err` message.
  On error the script fills the message and sets `aria-invalid="true"`, so the message is read with the field.
- Submit with errors: the summary `role="alert" tabindex="-1"` is shown and focused, and it links to each bad
  field. A send failure (`role="alert"`, focused) and the success notice (`role="status"`, focused) are announced.
  `qa/form-test.txt`: all assertions PASS in EN and ES (specific errors, summary focused, aria-invalid, errors clear
  once fixed).
- The honeypot sits in an `aria-hidden="true"` wrapper with `tabindex="-1"` (axe `aria-hidden-focus` clean). In
  the launch state the form is OFF: the fieldset is disabled, and a notice gives a `tel:` link and a `mailto:` link.

**Consent banner** (`ConsentManager.astro`, `consent.ts`, `consent.css`): it does not render in the launch state (no
vendor configured; `plan/checks/consent-test.json`: 80/80 PASS). To test the keyboard, the reviewer injected the
banner markup with a dummy GA4 id (`G-TESTQA0300`), with tracker hosts stubbed, into `/` at 1280 and 390:
- The banner is reachable by Tab. Privacy link, Accept all, Reject all and Settings are all native controls with a
  visible 3px ring, and none is covered.
- Enter on Settings sets `aria-expanded="true"`, opens the panel, shows Save and moves focus to the Analytics
  checkbox. Space ticks the checkbox (3px ring). Enter on Save stores the `consent` cookie and hides the banner,
  and focus goes to `#main` (never lost to `<body>`). No page errors.
- With the banner open, tabbing through the whole page left 0 focused elements hidden behind it
  (`scroll-padding-bottom` and body padding work).
- The banner is a non-modal region, so it needs no Esc. It never traps focus.

**Reduced motion** (`reducedMotion: 'reduce'`): `html` scroll-behavior `auto` (it is `smooth` only under
no-preference). The longest computed transition or animation anywhere is 0.01 ms (global override in
`global.css:187-194`). The dialog has `animation-name: none`. Every `transition` and `animation` in
`src/styles/*.css` is inside `@media (prefers-reduced-motion: no-preference)`. There is no autoplay media and
nothing is triggered by scrolling. `scrollIntoView()` in `consent.ts` follows the CSS scroll-behavior.

## Fixes

None required. Every requirement is met: 0 defects.

The items below are optional hardening, not defects, and do not affect the result:
- `tools/axe.mjs` stops the keyboard walk at 60 stops. That is a harness limit, and the reviewer's uncapped sweep
  covered the rest. (`tools/axe.mjs` is not `check.mjs`; change it only if the orchestrator wants the cap raised.)
- `src/styles/global.css:187-194`: under reduced motion, `transition-duration: 0.01ms` on `*` also applies to
  properties that otherwise have no transition (e.g. the focus outline). This is invisible to users and there is
  nothing to change.
