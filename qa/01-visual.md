# 01-visual
Result: FAIL

Check 01 (visual fidelity), round 2. The reviewer did not edit site code and did not commit.

## Evidence

Sources:
- `REPORT/shots/after/*.jpg`. These were retaken at 16:58, after the 16:49 `dist/` build from commit 124a4bf
  ("stage6 qa round 1: fixes").
- `mockups/A/shots/*.jpg`: index, criminal-defense and contact-us at 1280 and 390.
- `design/DESIGN-SYSTEM.md`.
- `src/**`.
- Three Playwright probes on Chromium, serving `dist/` with `tools/lib.mjs#serve`:
  - hover and focus-visible computed styles;
  - nav geometry at 1216, 1280 and 1440, plus a CSS candidate injected at those widths;
  - call-bar metrics at 320, 360, 390, 410 and 599.

Pages compared (EN and the ES twin, at 1280 and 390): Home, hub `criminal-defense` (and also `family-law` and
`legal-services`), practice pages `criminal-defense/dui` and `family-law/divorce`, About, FAQs, Testimonials,
Contact, Privacy and 404. Cookie Settings was also checked because of its checkbox states.

### Round-1 defects: all 12 verified fixed
1. **Contact facts link.** "Get directions in Google Maps" and "Cómo llegar con Google Maps" render inside
   `.contact-facts` (contact-us-1280 and es__contacto-1280).
2. **Contact facts panel.** One column, an ink rule under the title and no last hairline. Phone, address and hours
   no longer wrap awkwardly.
3. **ES call bar.** The icon is 18 px at 320, 360, 390, 410 and 599. At 410 the text runs from x=18 to x=392, so
   both gutters are at least 16 px. No page overflows horizontally (`sw` equals the viewport at every width).
4. **Reasons lead-ins.** They now use `--step-2`, `--weight-display-strong` and opsz heading (home and About, EN
   and ES). They match mockup index-1280 y≈1150–1700.
5. **Hub paired columns.** EN and ES hubs show paired columns with an ink top rule and a brass dash list, a
   2-up grid at 60em and above, and stacking on phones. They match mockup criminal-defense-1280 y≈430–600.
6. **Hub cards on linen.** Done (criminal-defense, family-law and legal-services, EN and ES).
7. **Policy hero.** The hero now sits in `.container--prose`, so breadcrumb, H1 and summary share the x of the
   body column (privacy-policy-1280, cookie-settings-1280, and ES).
8. **Policy "short version" cards.** Stacked one per row in the prose column, with titles on one line.
9. **Nav chevrons.** They measure 44×44 at 1216, 1280 and 1440 (3 per page). This fix caused a spacing
   regression; see defect 1 below.
10. **About Spanish panel.** Present on EN and ES About ("Se habla español" / "Atención en español"), in the same
    form as the home panel.
11. **About "Visit the office".** Now info items (Office, Hours) with icons and hairlines. A layout issue remains;
    see defect 4 below.
12. **Notices on linen.** They use `--color-surface-card` (contact-us-1280 y≈1780 and y≈2160, ES the same).

### What matches mockup A and the design system
- **Header, type and color.**
  - Header: glass and hairline. The full-number call button shows at every width. The language strip shows on
    phones.
  - Type: Newsreader display and Public Sans text.
  - Color: paper and linen rhythm, ink CTA band and footer, logo-blue quote marks and FAQ chevrons, brass step
    numerals and current-nav underline.
  - Home 1280 is close to the mockup pixel for pixel down to the FAQ (H1, deck, CTA group, portrait, proof
    strip, plate and cards).
- **Testimonial quote.** It renders at `--step-2` from 60em. That is DS 7.11, and it overrides the mockup's
  smaller quote.
- **CTA band and footer.** The CTA band is contained ink with an inverse button and the note, and it is the last
  section on every page checked. The footer has 4 columns at 70em and above and 2 on phones, carries the legal line
  ("not legal advice" / "no constituye asesoramiento legal"), and reserves call-bar room on phones.
- **Hover and focus-visible exist and work.** Each element below was probed (base → hover, then programmatic
  focus with `:focus-visible` true):
  - `.btn-primary`: bg #2E5F96 → rgb(55,106,162), translateY −1 px, shadow-2. Focus: solid outline.
  - `.btn-inverse`: paper → white, −1 px, shadow-2. Focus: outline.
  - Ghost and inline links: blue → navy (rgb 29,71,138), underline 1.5 → 2 px. Focus: outline.
  - `.card`: −2 px and `--shadow-card-hover`. Focus: ring on the card.
  - `.nav-link`: navy, plus the underline `::after`. Focus: outline.
  - `.nav-chev`: muted → navy. Focus: outline.
  - Footer links: paper → sky, underlined. Focus: outline.
  - FAQ summary: `.faq__q` → navy. Focus-visible ring on the summary.
  - Form input, select and textarea (`disabled` removed for the probe): border rgb(115,124,136) → rgb(63,73,87).
    Focus: solid outline.
  - Cookie checkbox: border darkens on hover. Focus: outline.
  - CSS sources: `components.css:38`, `global.css:104,110`, `components.css:563–569`, `613–627`, `shell.css:111–125`.
- **Recorded decisions, so not defects:**
  - Scenes on practice child pages.
  - Contact fields disabled while the form is off (D-A21-2).
  - ES desktop uses the "Menú" dialog.
  - On ES pages the Spanish panel is "Atención en español" with "Read in English".
  - The first FAQ item is closed outside FAQ hubs.

### Defects found (4)
1. **The header nav lost the mockup's rhythm after the 44 px chevron fix** (EN pages, 76em and up; nav-now.png
   probe at 1280).
   - Each chevron glyph sits centered in its 44 px button, so it floats 14 px from its own label. It is almost as
     far from its own label as from the next item: glyph to next label is 21 px.
   - Plain items are only 16 px apart, because round 1 set `gap: 0` with 8 px link padding. Measured at 1280:
     "Criminal Defense" text 313–440, glyph 454–471, "Family Law" at 492. "Personal Injury" ends at 741 and
     "About" starts at 757.
   - Mockup A (index-1280, criminal-defense-1280): the chevron sits about 4–6 px after its label, and items are
     24–26 px apart. The chevron no longer reads as part of its label.
2. **Section eyebrows that mockup A shows are missing.**
   - **Steps:** mockup hub "THE PROCESS" (criminal-defense-1280 y≈800) and contact "WHAT TO EXPECT"
     (contact-us-1280 y≈470). Built: no eyebrow on any `[steps]` section, EN or ES (criminal-defense-1280 y≈1200,
     contact-us-1280 y≈1060, dui and divorce steps).
   - **Hub cards:** mockup "CASE TYPES" (criminal-defense-1280 y≈700). Built: none on the hub cards, although
     home cards carry "PRACTICE AREAS".
   - **Spanish panel:** mockup "EN ESPAÑOL" above "Se habla español" (index-1280 y≈2530, index-390). Built: none.
     `spanishEyebrow` is defined in `src/pages/_lib/strings.ts:9` but never used.
   - DS 7.23 defines the section head as eyebrow + H2. These are the components where the port dropped it.
3. **Cookie Settings: "Strictly necessary" has no checkbox** (cookie-settings-1280 y≈1000; ES the same).
   - DS 7.9 calls for "disabled ('Strictly necessary · Always on') checked + 0.5 opacity + the words 'Always on'".
     DS 7.20 calls for "three category rows …, each a 44 px checkbox row (7.9)".
   - Built: the row is two plain paragraphs indented to the checkbox column, so an empty gap shows where the box
     should be (`src/components/consent/ConsentCategories.astro:21–24`). No decision records this deviation.
   - The same file family uses literal `1px` borders (`consent.css:17, 44, 45`). DS 15.7 calls for tokens only.
4. **About: "Visit the office" breaks the page's editorial grid** (about-1280 y≈5100–5390, es__sobre-nosotros the
   same).
   - Every neighbouring section, including "In the news" just above, is a 5fr/7fr split with its H2 in the aside.
   - "Visit the office" renders as a stacked section head. Its info list runs the full 1216 px container: a 9rem
     label column and ~1000 px of empty hairline rows.
   - It reads unfinished next to the split above it and the Spanish panel below it.

### Observations (not counted)
- **Hub hero eyebrow.** Mockup hub heroes carry an eyebrow ("CRIMINAL DEFENSE · MURFREESBORO, TENNESSEE"). Built
  heroes carry the byline (DS 15.3), whose "ATTORNEY AT LAW" line plays that role. Adding both would stack two
  eyebrows, so this is left as is.
- **Contact section tones.** Steps are on paper, the form on linen and directions on paper. That is the inverse of
  the mockup, but the alternation is kept.
- **DS 9.2 is out of date.** It still says practice child pages use no generated image. The orchestrator should
  align it with the Stage 5 decision.

## Fixes

1. **`src/styles/shell.css`, nav rhythm.** All rules affect `.nav-primary` only; `.nav-link` is used only in
   `Header.astro:30`.
   - Line 91: `padding-inline: var(--space-2);` → `padding-inline: var(--space-3);`
   - Line 104: `left: var(--space-2); right: var(--space-2); bottom: var(--space-2);` →
     `left: var(--space-3); right: var(--space-3); bottom: var(--space-2);`
   - Line 117 (`.nav-chev`): `display: inline-flex; align-items: center; justify-content: center;` →
     `display: inline-flex; align-items: center; justify-content: flex-start;`
   - Line 119: `padding: 0;` → `padding: 0 0 0 var(--space-1);`
   - After line 110, add:
     `.nav-item.has-sub + .nav-item > .nav-link { padding-left: 0; }`
     `.nav-item.has-sub + .nav-item > .nav-link::after { left: 0; }`
   - Verified by injection at 1216, 1280 and 1440:
     - label to glyph: 4 px;
     - glyph to next label: 22 px;
     - plain to plain: 24 px;
     - total nav width unchanged (Contact ends at 964 vs 968 at 1280);
     - chevrons still 44×44, with no overlap between targets;
     - header `scrollWidth` equals `clientWidth` at 1216;
     - the hover underline still lines up on "Personal Injury".
2. **Section eyebrows.**
   - `src/pages/_lib/strings.ts`, `en` (after line 8): add
     `processEyebrow: 'The process',` `expectEyebrow: 'What to expect',` `caseTypesEyebrow: 'Case types',`.
     In `es` (after line 27), add `processEyebrow: 'El proceso',` `expectEyebrow: 'Qué esperar',`
     `caseTypesEyebrow: 'Tipos de casos',`.
   - `src/pages/_templates/PageView.astro` line 221: change
     `eyebrow={template === 'home' ? s.practiceEyebrow : undefined}` →
     `eyebrow={template === 'home' ? s.practiceEyebrow : template === 'hub' && body.filter((y) => y.hint === 'cards').length === 1 ? s.caseTypesEyebrow : undefined}`.
     This leaves `/legal-services/`, with its three grouped card sections, without a repeated eyebrow.
   - Line 225: `<Steps section={x} lang={lang} />` →
     `<Steps section={x} lang={lang} eyebrow={template === 'contact' ? s.expectEyebrow : s.processEyebrow} />`.
   - `src/components/SpanishPanel.astro`:
     - Props: `interface Props { section: Section; lang?: Lang; id?: string; eyebrow?: string }`, and destructure
       `eyebrow`.
     - Inside `.lang-panel__head`, before the H2, add `{eyebrow && <p class="eyebrow" lang="es">{eyebrow}</p>}`.
   - `PageView.astro` line 275: `<SpanishPanel section={x} lang={lang} id={sid} />` →
     `<SpanishPanel section={x} lang={lang} id={sid} eyebrow={lang === 'en' ? s.spanishEyebrow : undefined} />`.
     ES pages stay without an eyebrow, because their `spanishEyebrow` is "English".
3. **Cookie Settings "Strictly necessary" checkbox.**
   - `src/components/consent/ConsentCategories.astro` lines 21–24: replace the fixed row with:
     `<div class="consent-cat consent-cat--fixed">`
     `  <label class="check consent-cat__head" for={`${prefix}-necessary`}>`
     `    <input type="checkbox" id={`${prefix}-necessary`} checked disabled aria-describedby={`${prefix}-necessary-desc`} />`
     `    <span class="consent-cat__name">{s.necessary}</span> <span class="consent-cat__state">{s.alwaysOn}</span>`
     `  </label>`
     `  <p class="consent-cat__desc" id={`${prefix}-necessary-desc`}>{s.necessaryDesc}</p>`
     `</div>`
   - The input has no `name` and no `data-consent-cat`, so `consent.ts:98` (`input[data-consent-cat]`) and form
     submission ignore it. Its own `disabled` keeps it off when the script enables the fieldset.
   - Update the header comment on line 3 ("Strictly necessary is a checked, disabled checkbox").
   - `src/components/consent/consent.css`: delete line 49
     (`.consent-cat--fixed .consent-cat__head { padding-inline-start: … }`), which is no longer needed.
   - Same file, lines 17, 44 and 45: `1px solid` → `var(--border-hairline) solid`.
   - Rebuild, then confirm on `/cookie-settings/`, `/es/configuracion-de-cookies/` and the banner settings panel:
     a checked box at 0.5 opacity with a white mark, aligned with the Analytics and Marketing boxes.
4. **About "Visit the office" as an editorial split.**
   - `src/pages/_templates/PageView.astro`, after line 88 (`trainingSection`), add:
     `const visitSection = template === 'about' ? body.find((x) => x.hint === 'cards' && x !== trainingSection) : undefined;`
   - In `case 'cards':`, before the generic `return` at line 219, add:
     `if (x === visitSection) { return (<Section labelledby={sid}><Split><SectionHead slot="aside" h2={x.h2!} lang={lang} /><CardGrid section={x} lang={lang} variant="info" headless /></Split></Section>); }`
   - `Split`, `SectionHead` and `CardGrid` are already imported.
   - Rebuild and confirm on `/about/` and `/es/sobre-nosotros/`:
     - H2 in the 5fr aside;
     - intro and info list in the 7fr column, aligned with "In the news";
     - stacked on phones.
