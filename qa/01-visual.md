# 01-visual
Result: FAIL

Check 01 (visual fidelity), round 1. Reviewer did not edit site code and did not commit.

## Evidence

Sources: `REPORT/shots/after/*.jpg` (1280 and 390, 120 files), `mockups/A/shots/*.jpg` (index, criminal-defense and
contact-us at 1280 and 390), `design/DESIGN-SYSTEM.md`, and `src/styles/{global,components,shell}.css`. I also ran a
Playwright probe (Chromium, `dist/` served by `tools/lib.mjs#serve`) that tabs through the home page, hovers controls,
focuses form fields and measures the call bar.

### Pages compared (EN and ES twin at 1280 and 390)
Home (`index`, `es`), hub (`criminal-defense`, `es__defensa-penal`), practice pages (`criminal-defense__dui`,
`family-law__divorce` and their ES twins), `about` / `es__sobre-nosotros`, `faqs` / `es__preguntas-frecuentes`,
`testimonials` / `es__testimonios`, `contact-us` / `es__contacto`, `privacy-policy` / `es__politica-de-privacidad`,
`404` / `es__404`.

### What matches mockup A and the design system
- **Header.** Sticky and glass, with a static hairline. Logo, 6-item nav and "ES" toggle. The full-number call button
  renders at every width: icon-less at 390 per 7.5, icon from 30em. The language strip shows on phones. ES desktop
  keeps the menu dialog with a visible "Menú", which is a recorded decision.
- **Type.** Newsreader display and Public Sans text. The home H1 is display size, other H1s are h1 size, eyebrows are
  uppercase tracked. Home hero 1280: built and mockup are pixel-close (H1 lines, deck, CTA group, portrait 473 px,
  proof strip).
- **Color.** Paper ground, ink CTA panel and footer, logo-blue chevrons and quote marks, brass step numerals and
  active-nav underline.
- **Components** match 7.x: home practice cards on linen, steps, FAQ, testimonial on linen with disclaimer, Spanish
  panel (home), CTA band, and footer with legal line.
- **Byline** placement is correct: home phones only, hubs, practice pages, contact, FAQs and testimonials. It is absent
  on about, policy pages and 404.
- **Hover and focus-visible states exist and work.** Measured values:
  - Buttons: `.btn-primary` hover changes bg #2E5F96 → rgb(55,106,162), lifts −1 px and gets shadow-2;
    `.btn-inverse` hover goes paper → white with lift; `.btn-ghost` hover goes navy with a 2 px underline; focus is a
    3 px brass ring at 2 px offset (`.btn:focus-visible`, components.css:38).
  - Links: hover goes navy with a 2 px underline (global.css:104); focus ring from the global `:focus-visible`
    (global.css:110); on ink it switches to brass-300 (`.on-ink`).
  - Cards: hover lifts −2 px with `--shadow-card-hover`; focus puts a brass ring on the whole card via `:has`
    (measured `solid 3px rgb(140,106,47)`).
  - Form fields: hover changes the border to `--input-border-hover`; `:focus-visible` gives a 3 px brass ring and an
    ink border (components.css:563–569). Measured on input, select and textarea after removing `disabled`.
    Checkbox hover and focus exist (components.css:613, 623).
  - Nav link, footer link, FAQ summary, lang strip, menu button and call bar all have hover rules. 40 home tab stops
    were walked; every one showed a visible ring.
- **Recorded decisions, so not defects:**
  - Scenes on practice child pages (DECISIONS "Stage 5 — site-wide image pass, Scope").
  - Contact fields disabled in the configured-off state (D-A21-2).
  - On home, the first FAQ item is not opened (DS 7.10 opens the first item only on FAQ hubs).

### Defects found (12)
1. **The contact-facts panel drops the "Get directions in Google Maps" link** on EN and ES. Copy line 24 of
   `copy/pages/contact-us.md` (ES line 26) has the link, but `dist/contact-us/index.html` has no maps link inside
   `.contact-facts`. Built text: "Office 509 W College St, Murfreesboro, TN 37130 Hours…". DS section 10 Contact
   requires "Office + directions link".
2. **The contact-facts panel is cramped compared with the mockup** (contact-us-1280, es__contacto-1280). A 9rem label
   column inside the 5fr panel wraps "(615) 410-7290 — free / consultation." and the address over 2 lines. Mockup A
   used one column inside this panel, with an ink top rule (`mockups/A/src/styles/global.css:754-757`).
3. **On the ES call bar, the phone icon collapses to 0 px at 390** (measured iconW 0, EN 18). The text runs from
   x=25 to x=374: flush with the right gutter, and the icon is gone (es-390.jpg, es__contacto-390.jpg; probe
   screenshot). At 320 and 360 it is fine because the note is hidden.
4. **Reasons-list lead-ins are smaller and lighter than the mockup** (Home "Why people call", About "How Will
   practices", EN and ES). They render at `--step-1` with literal weight 460. Mockup A uses `--step-2`,
   `--weight-display-strong` and opsz (index-1280 y≈2500–3400; index-390 crop). The literal `460` also breaks the
   tokens-only rule (DS 15.7).
5. **The criminal-defense hub (EN and ES) has no paired columns** (DS 7.23 "paired columns (ink top rule + brass dash
   list)"; mockup criminal-defense-1280 y≈430–600, criminal-defense-390). "If you were just charged" and "If someone
   you love was arrested" render as two stacked editorial splits with blue disc bullets and no ink rule.
6. **The hub cards section is on paper; in the mockup it is on linen** (criminal-defense-1280: mockup y≈640–1010
   linen, built paper). This flattens the page rhythm: the paper sections hero → proof → prose → cards → steps → FAQ
   run together for about 3000 px.
7. **On policy pages, the hero is not aligned with the prose column** (privacy-policy-1280, accessibility-1280,
   cookie-settings-1280 and ES twins). Breadcrumb, H1 and summary start at x=40, but the body column starts at x=288.
   DS section 10 Legal/policy calls for a `--container-prose` single column.
8. **The policy "short version" cards are squeezed 3-up into the 44rem prose column** (privacy-policy-1280
   y≈810–1180). Each card is about 218 px wide with about 154 px of text. Titles wrap ("What we / collect") and body
   lines hold about 16 characters. es__politica-de-privacidad-1280 and the other policy pages are the same.
9. **The header nav chevron buttons are 32×44 px** (measured, 3 per page at ≥ 76em; also listed in
   `qa/responsive.json` smallTargets). DS 7.5 calls for "a separate 44 px chevron `<button>`", and DS 12.4 for
   44×44 targets.
10. **About (EN and ES) has no Spanish panel.** DS 7.16 says "Home and About only", and DS section 10 About ends
    "… Visit the office → Spanish panel → [cta-band]". `dist/about/index.html` and
    `dist/es/sobre-nosotros/index.html` contain 0 `lang-panel`.
11. **About's "Visit the office" is plain prose.** DS section 10 About asks for "Visit the office (NAP + hours info
    items)". Built (about-1280 y≈5050–5130) is two sentences of prose.
12. **Notices in the contact form are invisible as a surface** (contact-us-1280 y≈1780–1830 and y≈2160–2230,
    contact-us-390). The form section is `tone="linen"` and `.notice` is also `--color-surface` (linen), so the
    "Online messages are not switched on yet" and "Please read before you send" notices lose their panel. Mockup A
    shows them as linen boxes on paper.

### Observations (not counted)
- `design/DESIGN-SYSTEM.md` 9.2 still says practice child pages use no generated image. The Stage 5 decision
  overrides it; the doc should be brought in line by the orchestrator, not by the site fixer.
- The ES home portrait caption reads "Will Fraley · Attorney at Law", while the ES byline reads "Abogado". This
  matches the footer convention (`attorneyShort` stays English), so it is left as is.
- The footer social row (Facebook · LinkedIn · X · AVVO) is not in DS 7.18. Its sourcing is for the facts check.

## Fixes

1. **`src/components/CardGrid.astro` (lines 16–22, 34–39).** In the info variant, keep each item's full blocks
   (including its link) and do not move anything to `after`. Replace the render branch:
   `<InfoList items={cards.map((c) => ({ title: c.title, blocks: c.blocks }))} lang={lang} />`
   → `<InfoList items={items.map((it) => ({ title: it.title, blocks: it.blocks }))} lang={lang} />`
   and change `{after.length > 0 && …}` → `{!asInfo && after.length > 0 && …}`.
   Rebuild, then confirm `dist/contact-us/index.html` has "Get directions in Google Maps" inside `.contact-facts`, and
   `dist/es/contacto/index.html` has "Cómo llegar con Google Maps".
2. **`src/pages/_templates/PageView.astro`, `<style is:global>` after line 398 (`.hero--media:has(.contact-facts)…`).**
   Add:
   `.contact-facts .info-list { border-top-color: var(--color-rule-strong); }`
   `.contact-facts .info-item { grid-template-columns: minmax(0, 1fr); }`
   `.contact-facts .info-item:last-child { border-bottom: 0; padding-bottom: 0; }`
3. **`src/styles/shell.css` line 252.** Change `.callbar .icon { width: …; height: …; }` →
   `.callbar .icon { flex: none; width: var(--icon-size-small); height: var(--icon-size-small); }`.
   After line 255, add `@media (max-width: 25.49em) { .callbar:lang(es) .callbar__note { display: none; } }`.
   Verify that `/es/` at 360, 390 and 410 shows the icon, has no overflow, and keeps at least 16 px from each edge.
4. **`src/pages/_templates/PageView.astro` lines 373–381 (`.reasons > p > strong:first-child`).** Change
   `font-size: var(--step-1);` → `font-size: var(--step-2);` and `font-weight: 460;` →
   `font-weight: var(--weight-display-strong);`, then add
   `font-variation-settings: "opsz" var(--opsz-heading);`.
5. **`src/pages/_templates/PageView.astro` (paired columns).** On `template === 'hub'`, render the two consecutive
   prose sections that come before the first `[cards]` section as one section:
   `<Section labelledby={id(first)}><div class="pair">{[first, second].map((x) => <div><Heading level={2} size="paired" id={id(x)}>…</Heading><Blocks blocks={x.blocks} lang={lang} /></div>)}</div></Section>`.
   Mark both rendered. Applies to `/criminal-defense/` and `/es/defensa-penal/`, and to any hub with the same shape.
   Add to the same `<style is:global>`, ported from `mockups/A/src/styles/global.css:762-773` with tokens:
   `.pair { display: grid; gap: var(--space-12) var(--grid-gap); }`
   `.pair > div { border-top: var(--border-hairline) solid var(--color-rule-strong); padding-top: var(--space-6); }`
   `.pair h2 { margin-bottom: var(--space-4); }`
   `.pair ul { list-style: none; padding-left: 0; }`
   `.pair li { position: relative; padding-left: var(--space-6); }`
   `.pair li::before { content: ""; position: absolute; left: 0; top: 0.72em; width: 0.75rem; height: var(--border-link); background: var(--color-marker); }`
   `.pair li + li { margin-top: var(--space-3); }`
   `@media (min-width: 60em) { .pair { grid-template-columns: repeat(2, minmax(0, 1fr)); } }`
6. **`src/pages/_templates/PageView.astro` line 115 (`const tone`).** Change
   `(template === 'home' && x.hint === 'cards')` → `((template === 'home' || template === 'hub') && x.hint === 'cards')`.
7. **`src/components/PageHero.astro` line 29.** Change `<div class="container">` →
   `<div class:list={['container', variant === 'policy' && 'container--prose']}>`.
8. **`src/styles/components.css`, after line 306.** Add
   `.container--prose .card-grid { grid-template-columns: minmax(0, 1fr); }`.
   Specificity 0,2,0 beats the media-query 2-up and 3-up rules.
9. **`src/styles/shell.css` line 118 (`.nav-chev`).** Change
   `width: calc(var(--control-height) - var(--space-3));` → `width: var(--control-height);`.
   If the nav row then overflows at 1216 or 1280 px, also add `margin-right: calc(-1 * var(--space-3));` so the row
   width is unchanged. Re-run `tools/responsive` and confirm the chevrons measure 44×44.
10. **About Spanish panel.**
    - Copy: in `copy/pages/about.md`, insert before `[cta-band]` (line 96) a section `## Se habla español`. Its body is
      the two paragraphs of `copy/pages/index.md` lines 69–73, with the same fact tags (F092, F094, F013, F090). Make
      the matching insert in `copy/pages/es/about.md` before line 100, copying `copy/pages/es/index.md`'s Spanish-panel
      section.
    - Template: in `src/pages/_templates/PageView.astro` line 84, change
      `const spanishSection = template === 'home' ? prose[1] : undefined;` →
      `const spanishSection = template === 'home' ? prose[1] : template === 'about' ? prose.find((x) => /^se habla español$/i.test(plain(x.h2 || ''))) : undefined;`
11. **About "Visit the office" as info items.**
    - In `copy/pages/about.md` lines 90–94, put the `[cards]` hint above `## Visit the office`. Keep the links sentence
      as the intro paragraph. Split the facts into `### Office` (`509 W College St, Murfreesboro, TN 37130 {fact:F021}`)
      and `### Hours` (`- Monday–Thursday: 9:00 a.m. – 5:00 p.m. {fact:F031}`,
      `- Friday: 9:00 a.m. – 4:00 p.m. {fact:F032}`), worded like `copy/pages/contact-us.md` lines 23–29.
    - Mirror this in `copy/pages/es/about.md` lines 94–98 (`### Oficina`, `### Horario`).
    - `CardGrid` auto-detects the info variant (no links in the items).
12. **`src/styles/components.css`, after line 531 (notices).** Add
    `.section--linen .notice { background: var(--color-surface-card); }`.
    The pairings text, error and success on `--color-surface-card` are already in DS 2.4.
