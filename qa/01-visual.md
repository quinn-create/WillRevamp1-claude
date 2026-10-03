# 01-visual
Result: FAIL

Check 01 (visual fidelity), round 3. The reviewer did not edit site code and did not commit.

## Evidence

Sources:
- `REPORT/shots/after/*.jpg`, taken at 17:50. That is after the 17:41 `dist/` build of commit 2e0944e ("stage6 qa
  round 2: fixes"). No file under `src/` is newer than `dist/index.html`.
- `mockups/A/shots/*.jpg`: index, criminal-defense and contact-us, at 1280 and 390.
- `design/DESIGN-SYSTEM.md`.
- `src/**`.
- Five Playwright probes on Chromium, serving `dist/` (and `mockups/A/dist`) with `tools/lib.mjs#serve`:
  - tel-link metrics against the mockup;
  - `.list a` wrapping on every built page at 1280, 390 and 320;
  - footer social-link geometry, before and after an injected CSS candidate, at 1280, 390 and 320 (EN and ES);
  - hover and focus-visible computed styles, using real keyboard Tab and settled styles;
  - form-field and checkbox states.

Pages compared, in EN and the ES twin at 1280 and 390:
- Home (`index` / `es`).
- Hub: `criminal-defense` / `es__defensa-penal`.
- Practice: `criminal-defense__dui` / `es__defensa-penal__dui`, and `family-law__divorce` /
  `es__derecho-familiar__divorcio`.
- About, FAQs, Testimonials, Contact, Privacy and 404.
- Cookie Settings, to re-check the round-2 checkbox fix.

### Round-2 defects: all 4 verified fixed
1. **Nav rhythm** (`shell.css:91,104,117–121`).
   - At 1280 each chevron sits about 4 px after its label, and items are about 24 px apart.
   - It now matches mockup index-1280 and criminal-defense-1280 (index-1280 y≈33).
   - The current-page brass underline still spans the label (criminal-defense-1280, contact-us-1280).
2. **Section eyebrows.**
   - Steps: "THE PROCESS" on the criminal-defense-1280, dui and divorce steps; "WHAT TO EXPECT" on contact-us-1280.
   - ES steps: "EL PROCESO" and "QUÉ ESPERAR".
   - Hub cards: "CASE TYPES" / "TIPOS DE CASOS". legal-services does not repeat it.
   - Spanish panel: "EN ESPAÑOL" on EN home and About.
   - These match the mockup positions.
3. **Cookie Settings "Strictly necessary".** It is now a checked, disabled box at 0.5 opacity, aligned with the
   Analytics and Marketing boxes (cookie-settings-1280 y≈1015, ES the same). `consent.css` uses
   `--border-hairline`.
4. **About "Visit the office".** It is now a 5fr/7fr split: H2 in the aside, intro and info list (Office, Hours)
   in the main column, aligned with "In the news" (about-1280 y≈2290–2560, ES the same).

### What matches mockup A and the DS
- **Home 1280.** It matches the mockup through the hero, proof strip, plate, cards, reasons, testimonial, Spanish
  panel, FAQ, CTA band and footer.
  - The inline tel link is wider than the mockup's (153 vs 129 px) because of `tabular-nums lining-nums`. That is
    DS 3.3, so not a defect.
- **390.** Language strip, phone header with the full number, byline, portrait after the copy, stacked proof
  strip, call bar and 2-column footer, as DS 7.5–7.8 and 7.21 describe.
- **Hover and focus-visible exist and work** (settled computed styles, keyboard Tab):
  - `.btn-primary`: bg rgb(46,95,150) → rgb(55,106,162), translateY −1 px, shadow-2.
  - `.btn-inverse`: paper → white, −1 px.
  - Card link: blue → navy, underline 2 px, card shadow → hover shadow. `.card:has(:focus-visible)` gives the ring
    on the card.
  - `.nav-link`: ink → navy, plus the underline.
  - `.nav-chev`: muted → navy.
  - Inline `a.tel`: underline 1.5 → 2 px.
  - Footer links: paper → sky rgb(157,190,227).
  - Input, select and textarea: border rgb(115,124,136) → hover token. Focus is a brass ring with the border set to
    ink.
  - Cookie checkbox: border darkens on hover; focus ring.
  - Every Tab stop checked (skip link, brand, nav-link, nav-chev, links) shows a 3 px solid brass outline,
    rgb(140,106,47), at 2 px offset. The skip link on ink uses brass-300.
  - CSS sources: `global.css:109–116`, `components.css:38–43, 352–353, 568–574, 629`, `shell.css:111–125`.
- **`.list a` inline-flex** (new in round 2, `components.css:142`): no link wraps or breaks a row on any built page
  at 1280, 390 or 320. The probe found 0 boxes taller than 50 px.

### Defects (3)
1. **The steps results disclaimer renders as body text, not fine print** (26 pages: every `[steps]` with a
   trailing disclaimer, EN and ES).
   - Examples: criminal-defense-1280 y≈2992, dui, divorce, and es__defensa-penal at "Los resultados anteriores…".
   - Built: 17–18 px `--color-text` (ink). The markup is `<div class="flow steps-after"><p>Prior results…</p></div>`.
   - Mockup A (criminal-defense-1280 y≈2560): small muted fine print. The mockup's `Steps.astro:33` uses
     `class="fineprint"`.
   - The same sentence under every testimonial is fine print (`.fineprint.disclaimer`), so the page shows the
     disclaimer in two styles.
2. **Footer social links are unevenly spaced** (every page, EN and ES, all widths; index-1280 y≈6150).
   - `shell.css:319` centers each label in a `min-width: 44px` box. "X" (10 px) and "AVVO" therefore float inside
     wide boxes.
   - Measured text-to-text gaps at 1280 are 20 / 37 / 37 px (Facebook→LinkedIn→X→AVVO), and 20 / 37 / 39 at 390.
   - The row reads as a broken rhythm. It was introduced by the round-1 target-size fix and missed in round 2.
3. **The ES home portrait caption is in English** (es-1280 y≈755: "Will Fraley · Attorney at Law").
   - `PageView.astro:144` builds it from `firm.jobTitle.value` for both languages.
   - The ES hero eyebrow and the byline say "Abogado" (`i18n.ts:84`).
   - This breaks DS 11 (UI strings per language) and DS 7.21 ("Will Fraley · Attorney at Law" is the EN caption).

### Observations (not counted)
- Contact and 404 CTA bands carry the ghost-inverse "Send a short message". Home and hub bands do not; the link is
  inline in the band text instead. Both forms appear in the mockup or DS 7.17, so this is left as is.
- The DUI and divorce practice pages run on paper from the hero to the FAQ. Only the testimonial is linen. The
  DS template allows this.

## Fixes

1. **`src/components/Steps.astro` line 36.**
   - Change `{after.length > 0 && <Blocks blocks={after} lang={lang} class="steps-after" />}` →
     `{after.length > 0 && <Blocks blocks={after} lang={lang} class="steps-after fineprint" />}`.
   - `.fineprint` (`components.css:156`) comes after `.steps-after` (`components.css:150`), so the result is
     `--text-small`, `--color-text-muted` and `margin-top: --space-6`. That matches the mockup.
   - Confirm on criminal-defense, dui, divorce and es__defensa-penal: the disclaimer looks identical to the one under
     the testimonial.
2. **`src/styles/shell.css` lines 318–319, footer social row.**
   - Line 318: `.footer-social { display: flex; flex-wrap: wrap; gap: 0 var(--space-5); }` →
     `.footer-social { display: flex; flex-wrap: wrap; gap: 0; margin-inline-start: calc(-1 * var(--space-4)); }`
   - Line 319: append `padding-inline: var(--space-4);` inside the `.footer-social a { … }` rule. Keep
     `justify-content: center`, `min-height` and `min-width: var(--control-height)`.
   - After line 319, add
     `@media (max-width: 22.49em) { .footer-social { margin-inline-start: calc(-1 * var(--space-3)); } .footer-social a { padding-inline: var(--space-3); } }`
   - Verified by injection, EN and ES:
     - gaps become 32 / 33 / 32 px at 1280 and 32 / 33 / 33 at 390;
     - the first label stays on the container's left edge (offset 0);
     - every target is still at least 44×44 (X 44, AVVO 75, Facebook 106 px wide);
     - `scrollWidth` equals the viewport;
     - without the 22.49em rule, AVVO wraps at 320. The rule keeps one row there (about 24 / 29 / 24 px gaps).
3. **`src/pages/_templates/PageView.astro` line 144.** In the `caption` template, change
   `· ${esc(firm.jobTitle.value)}` → `· ${esc(lang === 'en' ? firm.jobTitle.value : ui.attorneyAtLaw)}`.
   - `ui = t(lang)` is already defined at line 50.
   - EN output is unchanged. ES reads "Will Fraley · Abogado", matching the ES eyebrow and byline.
   - Rebuild, then confirm on `/es/` at 1280.
