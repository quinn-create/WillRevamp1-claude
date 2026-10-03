# DESIGN SYSTEM: willfraleylaw.com

**Direction:** A, "Counsel" (named on the first line of `mockups/RECOMMENDATION.md`; the operator asked the run to
finish without stopping, so the Creative Director's recommendation is the Build decision).
**Owner:** A11 (creative director), Stage 3b. **Built by:** A19 (P100 foundation, P200 components, P300 shell),
A20 (pages), A21 (forms), A22 (consent), A23 (SEO/performance). **Images:** A15.
**Tokens:** `src/styles/tokens.css` is the only source of colors, sizes, radii, shadows, durations and z-indexes.
Token names match `mockups/A/tokens.css`, so `mockups/A/src/styles/global.css` and its components port without
renames. Where this document and the mockup disagree, this document wins (the differences are listed in section 15).

**Borrowed elements (two, the maximum):**

| # | Element | Comes from | Where it lives here |
|---|---|---|---|
| 1 | **Full-number header call button.** The header's call button shows "(615) 410-7290" at every width, phones included, instead of A's icon-only phone button. | B "Verdict", `mockups/B/src/components/Header.astro` (`.header__phone`) | Header on every page, EN and ES (7.5). Consequence: on phones the Español toggle moves out of the header row into the language strip (7.6). |
| 2 | **Byline.** A small 4:5 photo of Will beside his name, "Attorney at Law" and the street address. | C "Neighbor", `mockups/C/src/pages/index.astro` (`.byline`) | Page heroes: Home on phones and tablets, practice hubs, practice pages, Contact, FAQs, Testimonials, In the News (7.14). |

Nothing else is borrowed. B's gold signal color, navy blocks and stat tiles, and C's photographic full-bleed
hero, sand bands and brick accents are **not** part of this system.

---

## 1. Principles

1. **The phone number is the boldest object on every screen.** One solid brand-blue block per viewport: the
   call button. Everything else is ink on paper. A second solid block in the same viewport is a defect.
2. **Typography carries the authority.** Newsreader display type at generous sizes, Public Sans for reading.
   No decorative imagery is needed to feel premium; images are few, large, calm and always optional.
3. **Rules, not boxes.** Hairline rules separate content. Cards exist only where the whole card is a link.
4. **Warmth from real things.** Will's real photographs, the byline, verbatim client words, plain copy and
   the brass details. Never from stock people or generated faces.
5. **Quiet means fast.** Static HTML, two font families, one hero image at most per page, JS only for the
   menu dialog, the form and consent. A page that needs more is designed wrong.
6. **Bilingual by construction.** Every component survives Spanish strings about 20% longer at 320 px, and
   every component has an `/es/` twin with `lang` set correctly.
7. **Lawful by design.** No visual implies results (no trophies, counters of wins, verdict graphics, stars).
   No "specialist", "expert", "certified" or "guarantee" in any UI string, alt text, file name or caption.
8. **Light scheme only.** There is no dark mode. `color-scheme: light` is declared, `body` always has the
   paper background, and no component reads `prefers-color-scheme`. Reason: one audited palette, one set of
   contrast proofs, and photographs graded for paper.

---

## 2. Color

### 2.1 Primitives

| Token | Hex | Name | Role |
|---|---|---|---|
| `--neutral-50` | #F7F6F2 | Paper | Page ground; text on ink |
| `--neutral-100` | #EFEDE7 | Linen | Alternate sections, notices, menu-dialog foot |
| `--neutral-200` | #E3E2DC | Sunken | Pressed surfaces, image placeholders, disabled inputs |
| `--neutral-300` | #CDD0D3 | Rule | Hairline rules (decorative only; never the only boundary of a control) |
| `--neutral-400` | #A3AAB3 | Mist | Muted text on ink; disabled control border |
| `--neutral-500` | #737C88 | Steel | Input and control borders |
| `--neutral-600` | #5A6472 | Slate | Muted text, eyebrows |
| `--neutral-700` | #3F4957 | Graphite | Quiet headings, attributions; rules on ink |
| `--neutral-800` | #283341 | Raised ink | Raised surface on ink (consent banner variant on ink is not used; reserved) |
| `--neutral-900` | #16202C | Ink | Body text, headings, CTA panel, footer |
| `--white` | #FFFFFF | White | Input fields, button labels on blue |
| `--card-white` | #FCFBF8 | Card | Card and panel surface, consent banner |
| `--brand-100` | #E8EFF7 | Tint | Language strip, Spanish panel, secondary hover |
| `--brand-200` | #C9DAEC | Tint pressed | Secondary-button pressed |
| `--brand-300` | #9DBEE3 | Sky | Links and accents on ink |
| `--brand-500` | #447CB7 | Logo blue | Large display type (24 px+), stat numerals, rules, icons. Never small text |
| `--brand-600` | #2E5F96 | Counsel blue | Text links, primary button, header call, call bar |
| `--brand-700` | #1D478A | Navy | Link hover, pressed primary, Spanish-panel heading, language-strip text |
| `--brand-600-lift` | #376AA2 | | Primary hover fill |
| `--accent-300` | #D8B46A | Brass on ink | Focus ring on ink |
| `--accent-600` | #8C6A2F | Brass | Focus ring, active-nav marker, list dashes |
| `--accent-700` | #735623 | Brass text | Step numerals |
| `--red-700` | #A12B1F | Error | Error text, error border |
| `--green-700` | #2D6A3E | Success | Success text and rule |

### 2.2 Semantic roles (use these in components, never the primitives)

Surfaces: `--color-bg`, `--color-surface`, `--color-surface-sunken`, `--color-surface-card`,
`--color-surface-tint`, `--color-surface-tint-pressed`, `--color-inverse-bg`, `--color-inverse-raised`.
Text: `--color-text`, `--color-heading`, `--color-heading-quiet`, `--color-text-muted`, `--color-eyebrow`,
`--color-numeral`, `--color-on-inverse`, `--color-on-inverse-muted`. Links: `--color-link`,
`--color-link-hover`, `--color-link-inverse`. Marks: `--color-brand`, `--color-stat`, `--color-marker`,
`--color-rule`, `--color-rule-strong`, `--color-rule-inverse`. Controls: `--button-*`, `--input-*`,
`--check-*`, `--focus-ring*`, `--callbar-*`, `--lang-strip-*`, `--consent-*`. Status: `--color-error`,
`--color-success`. Composites (never text): `--header-glass`, `--hairline-card`, `--hairline-header`,
`--scrim-image`, `--backdrop`, all `--shadow-*`.

### 2.3 Color rules

- Logo blue `--color-brand` is never used for text below 24 px (or 18.66 px bold). It is 4.04:1 on paper.
- Muted text is for secondary information only (help text, attributions, notes). Never for a phone number,
  a price, a deadline, a legal notice or a link.
- Brass is an accent, not a color theme: focus ring, active marker, step numerals, list dashes. Nowhere else.
- Red and green appear only in form validation and notices, always with an icon and words, never color alone.
- The ink panel (CTA band) and the footer are the only dark surfaces. No full-bleed dark section bands.
- Header glass is 85% paper; header text is ink or link blue only. The worst case (glass over the ink footer,
  opaque #D5D6D4) is proved in the table below.

### 2.4 Contrast table (every pairing allowed on the site)

Computed with the WCAG 2.x formula used by `tools/check.mjs`. `text` needs 4.5:1, `ui` needs 3:1 (non-text UI
and large display type). 92 declared pairs, 92 pass. A pairing not in this table is not allowed; add it to
`tokens.css` with `@pair` first and prove it.

| Foreground | Background | Kind | Ratio | AA | Note |
|---|---|---|---|---|---|
| `--color-text` #16202C | `--color-bg` #F7F6F2 | text | 15.21:1 | pass | |
| `--color-text` #16202C | `--color-surface` #EFEDE7 | text | 14.05:1 | pass | |
| `--color-text` #16202C | `--color-surface-card` #FCFBF8 | text | 15.89:1 | pass | |
| `--color-text` #16202C | `--color-surface-tint` #E8EFF7 | text | 14.19:1 | pass | |
| `--color-text` #16202C | `--color-surface-sunken` #E3E2DC | text | 12.67:1 | pass | |
| `--color-heading` #16202C | `--color-bg` #F7F6F2 | text | 15.21:1 | pass | |
| `--color-heading-quiet` #3F4957 | `--color-bg` #F7F6F2 | text | 8.44:1 | pass | |
| `--color-heading-quiet` #3F4957 | `--color-surface` #EFEDE7 | text | 7.79:1 | pass | |
| `--color-heading-quiet` #3F4957 | `--color-surface-card` #FCFBF8 | text | 8.82:1 | pass | |
| `--color-text-muted` #5A6472 | `--color-bg` #F7F6F2 | text | 5.55:1 | pass | |
| `--color-text-muted` #5A6472 | `--color-surface` #EFEDE7 | text | 5.12:1 | pass | |
| `--color-text-muted` #5A6472 | `--color-surface-card` #FCFBF8 | text | 5.80:1 | pass | |
| `--color-text-muted` #5A6472 | `--color-surface-tint` #E8EFF7 | text | 5.18:1 | pass | |
| `--color-text-muted` #5A6472 | `--color-surface-sunken` #E3E2DC | text | 4.62:1 | pass | disabled input text, image-missing note |
| `--color-text-muted` #5A6472 | `--input-bg` #FFFFFF | text | 6.00:1 | pass | help text inside white fields |
| `--color-eyebrow` #5A6472 | `--color-bg` #F7F6F2 | text | 5.55:1 | pass | |
| `--color-eyebrow` #5A6472 | `--color-surface` #EFEDE7 | text | 5.12:1 | pass | |
| `--color-numeral` #735623 | `--color-bg` #F7F6F2 | text | 6.30:1 | pass | |
| `--color-numeral` #735623 | `--color-surface` #EFEDE7 | text | 5.82:1 | pass | |
| `--color-numeral` #735623 | `--color-surface-card` #FCFBF8 | text | 6.58:1 | pass | |
| `--color-link` #2E5F96 | `--color-bg` #F7F6F2 | text | 6.08:1 | pass | |
| `--color-link` #2E5F96 | `--color-surface` #EFEDE7 | text | 5.62:1 | pass | |
| `--color-link` #2E5F96 | `--color-surface-card` #FCFBF8 | text | 6.35:1 | pass | |
| `--color-link` #2E5F96 | `--color-surface-tint` #E8EFF7 | text | 5.67:1 | pass | |
| `--color-link` #2E5F96 | `--color-surface-sunken` #E3E2DC | text | 5.07:1 | pass | |
| `--color-link` #2E5F96 | `--input-bg` #FFFFFF | text | 6.58:1 | pass | |
| `--color-link-hover` #1D478A | `--color-bg` #F7F6F2 | text | 8.37:1 | pass | |
| `--color-link-hover` #1D478A | `--color-surface` #EFEDE7 | text | 7.73:1 | pass | |
| `--color-link-hover` #1D478A | `--color-surface-tint` #E8EFF7 | text | 7.81:1 | pass | nav dropdown hover, Spanish panel heading |
| `--color-brand` #447CB7 | `--color-bg` #F7F6F2 | ui | 4.04:1 | pass | |
| `--color-brand` #447CB7 | `--color-surface` #EFEDE7 | ui | 3.73:1 | pass | |
| `--color-brand` #447CB7 | `--color-surface-card` #FCFBF8 | ui | 4.22:1 | pass | |
| `--color-brand` #447CB7 | `--color-surface-tint` #E8EFF7 | ui | 3.77:1 | pass | |
| `--color-stat` #447CB7 | `--color-bg` #F7F6F2 | ui | 4.04:1 | pass | |
| `--color-stat` #447CB7 | `--color-surface` #EFEDE7 | ui | 3.73:1 | pass | |
| `--color-marker` #8C6A2F | `--color-bg` #F7F6F2 | ui | 4.60:1 | pass | |
| `--color-marker` #8C6A2F | `--header-bg-worst` #D5D6D4 | ui | 3.41:1 | pass | active-nav underline under the glass header |
| `--button-primary-text` #FFFFFF | `--button-primary-bg` #2E5F96 | text | 6.58:1 | pass | |
| `--button-primary-text` #FFFFFF | `--button-primary-bg-hover` #376AA2 | text | 5.61:1 | pass | |
| `--button-primary-text` #FFFFFF | `--button-primary-bg-active` #1D478A | text | 9.05:1 | pass | |
| `--button-primary-bg` #2E5F96 | `--color-bg` #F7F6F2 | ui | 6.08:1 | pass | |
| `--button-primary-bg` #2E5F96 | `--color-surface` #EFEDE7 | ui | 5.62:1 | pass | |
| `--button-primary-bg` #2E5F96 | `--color-surface-card` #FCFBF8 | ui | 6.35:1 | pass | |
| `--button-primary-bg` #2E5F96 | `--header-bg-worst` #D5D6D4 | ui | 4.51:1 | pass | header call button under the glass |
| `--button-secondary-text` #2E5F96 | `--color-bg` #F7F6F2 | text | 6.08:1 | pass | |
| `--button-secondary-text` #2E5F96 | `--color-surface-card` #FCFBF8 | text | 6.35:1 | pass | |
| `--button-secondary-text` #2E5F96 | `--button-secondary-bg-hover` #E8EFF7 | text | 5.67:1 | pass | |
| `--button-secondary-text` #2E5F96 | `--button-secondary-bg-active` #C9DAEC | text | 4.61:1 | pass | |
| `--button-secondary-border` #2E5F96 | `--color-bg` #F7F6F2 | ui | 6.08:1 | pass | |
| `--button-secondary-border` #2E5F96 | `--color-surface-card` #FCFBF8 | ui | 6.35:1 | pass | |
| `--color-on-inverse` #F7F6F2 | `--color-inverse-bg` #16202C | text | 15.21:1 | pass | |
| `--color-on-inverse-muted` #A3AAB3 | `--color-inverse-bg` #16202C | text | 7.01:1 | pass | |
| `--color-link-inverse` #9DBEE3 | `--color-inverse-bg` #16202C | text | 8.54:1 | pass | |
| `--color-on-inverse` #F7F6F2 | `--color-inverse-raised` #283341 | text | 11.84:1 | pass | |
| `--color-on-inverse-muted` #A3AAB3 | `--color-inverse-raised` #283341 | text | 5.46:1 | pass | |
| `--color-link-inverse` #9DBEE3 | `--color-inverse-raised` #283341 | text | 6.65:1 | pass | |
| `--button-inverse-text` #16202C | `--button-inverse-bg` #F7F6F2 | text | 15.21:1 | pass | |
| `--button-inverse-text` #16202C | `--button-inverse-bg-hover` #FFFFFF | text | 16.44:1 | pass | |
| `--button-inverse-bg` #F7F6F2 | `--color-inverse-bg` #16202C | ui | 15.21:1 | pass | |
| `--focus-ring` #8C6A2F | `--color-bg` #F7F6F2 | ui | 4.60:1 | pass | |
| `--focus-ring` #8C6A2F | `--color-surface` #EFEDE7 | ui | 4.25:1 | pass | |
| `--focus-ring` #8C6A2F | `--color-surface-card` #FCFBF8 | ui | 4.81:1 | pass | |
| `--focus-ring` #8C6A2F | `--color-surface-tint` #E8EFF7 | ui | 4.30:1 | pass | |
| `--focus-ring` #8C6A2F | `--input-bg` #FFFFFF | ui | 4.98:1 | pass | |
| `--focus-ring` #8C6A2F | `--header-bg-worst` #D5D6D4 | ui | 3.41:1 | pass | |
| `--focus-ring-inverse` #D8B46A | `--color-inverse-bg` #16202C | ui | 8.34:1 | pass | |
| `--focus-ring-inverse` #D8B46A | `--color-inverse-raised` #283341 | ui | 6.50:1 | pass | |
| `--focus-ring-on-fill` #FFFFFF | `--callbar-bg` #2E5F96 | ui | 6.58:1 | pass | |
| `--input-text` #16202C | `--input-bg` #FFFFFF | text | 16.44:1 | pass | |
| `--input-border` #737C88 | `--input-bg` #FFFFFF | ui | 4.23:1 | pass | |
| `--input-border` #737C88 | `--color-bg` #F7F6F2 | ui | 3.91:1 | pass | |
| `--input-border` #737C88 | `--color-surface-card` #FCFBF8 | ui | 4.09:1 | pass | |
| `--input-border-hover` #3F4957 | `--input-bg` #FFFFFF | ui | 9.12:1 | pass | |
| `--input-placeholder` #5A6472 | `--input-bg` #FFFFFF | text | 6.00:1 | pass | |
| `--check-bg-checked` #2E5F96 | `--input-bg` #FFFFFF | ui | 6.58:1 | pass | |
| `--check-mark` #FFFFFF | `--check-bg-checked` #2E5F96 | ui | 6.58:1 | pass | |
| `--color-error` #A12B1F | `--input-bg` #FFFFFF | text | 7.29:1 | pass | |
| `--color-error` #A12B1F | `--color-bg` #F7F6F2 | text | 6.74:1 | pass | |
| `--color-error` #A12B1F | `--color-surface` #EFEDE7 | text | 6.23:1 | pass | error notice |
| `--color-error` #A12B1F | `--color-surface-card` #FCFBF8 | text | 7.04:1 | pass | |
| `--color-success` #2D6A3E | `--color-bg` #F7F6F2 | text | 5.99:1 | pass | |
| `--color-success` #2D6A3E | `--color-surface` #EFEDE7 | text | 5.53:1 | pass | success notice |
| `--color-success` #2D6A3E | `--color-surface-card` #FCFBF8 | text | 6.26:1 | pass | |
| `--color-text` #16202C | `--header-bg-worst` #D5D6D4 | text | 11.27:1 | pass | |
| `--color-link` #2E5F96 | `--header-bg-worst` #D5D6D4 | text | 4.51:1 | pass | Español toggle in the header |
| `--button-primary-text` #FFFFFF | `--button-primary-bg` #2E5F96 | text | 6.58:1 | pass | full number in the header call [borrowed: B] |
| `--callbar-text` #FFFFFF | `--callbar-bg` #2E5F96 | text | 6.58:1 | pass | |
| `--lang-strip-text` #1D478A | `--lang-strip-bg` #E8EFF7 | text | 7.81:1 | pass | |
| `--color-text` #16202C | `--lang-strip-bg` #E8EFF7 | text | 14.19:1 | pass | |
| `--consent-text` #16202C | `--consent-bg` #FCFBF8 | text | 15.89:1 | pass | |
| `--color-text-muted` #5A6472 | `--consent-bg` #FCFBF8 | text | 5.80:1 | pass | |
| `--color-link` #2E5F96 | `--consent-bg` #FCFBF8 | text | 6.35:1 | pass | |

Disabled controls use `--disabled-opacity: 0.5` and are exempt from contrast (WCAG 1.4.3), but every disabled
control also carries a visible reason or is avoided altogether (a submit button is never disabled to signal
validation; it validates on submit).

---

## 3. Type

### 3.1 Families and files

| Family | Role | Axes used | Files (`public/fonts/`, copy from `mockups/A/public/fonts/`) | Size |
|---|---|---|---|---|
| **Newsreader** (variable) | Display: H1–H3, menu links, quotes, step titles, footer name, stat numerals | `wght` 460 and 560; `opsz` 32 and 60 | `newsreader-latin.woff2` (preloaded) · `newsreader-latin-ext.woff2` | 132 KB · 87 KB |
| **Public Sans** (variable) | Text: body, UI, buttons, nav, forms, eyebrows, footer | `wght` 400, 500, 600 | `public-sans-latin.woff2` · `public-sans-latin-ext.woff2` | 27 KB · 18 KB |

- Subsets: Latin and Latin Extended only, split by `unicode-range` exactly as declared in `tokens.css`. Spanish
  (á é í ó ú ñ ü ¿ ¡ «») is fully inside the Latin file, so the latin-ext files normally never download.
- `font-display: swap`. Metric-matched fallbacks `"Newsreader Fallback"` (Times New Roman, size-adjust 108%) and
  `"Public Sans Fallback"` (Arial, 104%) were re-measured in Chromium in Stage 3b; values and method are in the
  `tokens.css` header. Keep them in the stacks.
- Preload exactly one file: `<link rel="preload" href="/fonts/newsreader-latin.woff2" as="font" type="font/woff2" crossorigin>`.
  Public Sans latin (27 KB) is discovered from the inlined CSS.
- No Google Fonts request at runtime. No third family, no icon font. Icons are inline SVG (Lucide-style,
  stroke 1.75, `--icon-size`).
- Performance option for A23, only if mobile LCP misses 2.0 s: instance Newsreader to `wght` 400–600 and `opsz`
  24–72 with the npm package `subset-font` (harfbuzz). Same family, same names; record it in a decision.

### 3.2 Fluid scale (1.25 ratio, 360 px to 1280 px)

| Token | Size (360 → 1280) | Used for | Family / weight / leading / tracking |
|---|---|---|---|
| `--step-6` `--text-display` | 44 → 68 px | Home H1 only | Newsreader 460, opsz 60, 1.08, −0.02em |
| `--step-5` `--text-h1` `--text-stat` | 38 → 55 px | H1 on every other page; CTA-band H2; stat numerals | Newsreader 460, opsz 60, 1.08, −0.02em |
| `--step-4` `--text-h2` | 33 → 44 px | H2 | Newsreader 460, opsz 60, 1.15, −0.02em |
| `--step-3` | 28 → 35 px | Paired-column H2, contact-facts title, footer name | Newsreader 460, opsz 32, 1.15 |
| `--step-2` `--text-h3` | 24 → 28 px | H3, card titles, FAQ questions, step titles, menu links | Newsreader 560 (H3) / 460, opsz 32, 1.15 |
| `--step-1` `--text-lead` `--text-h4` | 20 → 22.5 px | Lead paragraph, H4, quote text (phones) | Public Sans 400 (lead) / Newsreader (quote), 1.35 |
| `--step-0` `--text-body` | 17 → 18 px | Body, buttons, inputs | Public Sans 400, 1.6, 0 |
| `--step--1` `--text-small` | 15 → 16 px | Nav, labels, help, card body on 4-up grids, footer | Public Sans 400–600, 1.45–1.6 |
| `--step--2` `--text-fine` | 13 → 14 px | Eyebrows (uppercase, +0.08em, 600), proof strip, legal line | Public Sans 600 (eyebrows) / 400 |

### 3.3 Type rules

- One H1 per page; headings strictly sequential. Card titles in a section under an H2 are H3.
- Left-aligned, never justified. Body measure `--measure` (68ch); hero decks `--measure-narrow`.
- `text-wrap: balance` on headings, `pretty` on paragraphs. Body is never under 17 px on phones.
- Phone numbers, hours and step numerals use `font-variant-numeric: tabular-nums lining-nums`; the phone number
  never wraps (`white-space: nowrap`).
- Eyebrows are uppercase tracked small text in `--color-eyebrow`; they are a `<p>`, never a heading.
- Spanish: H1s and buttons are tested with the ES strings at 320, 360 and 390 px. Nothing truncates with an
  ellipsis; buttons wrap to two lines before they overflow (`white-space: normal` below 22.5em except the
  phone number itself). Short Spanish phrases ("Se habla español") use `.nowrap`.
- Typographic quotes and apostrophes (’ “ ”), en dash for ranges (9:00–5:00), the middle dot · as the inline
  separator.

---

## 4. Spacing

8 px rhythm with 4 px half-steps: `--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 20 · `-6` 24 · `-8` 32 ·
`-10` 40 · `-12` 48 · `-16` 64 · `-20` 80 · `-24` 96 · `-32` 128.

| Token | Value | Use |
|---|---|---|
| `--section-pad` | 64 → 128 px | Vertical padding of every section |
| `--section-pad-tight` | 48 → 80 px | Short sections (proof strip followers, policy sub-sections) |
| `--hero-pad-top` / `--hero-pad-bottom` | 40 → 96 / 48 → 80 px | Page hero |
| `--gutter` | 16 → 40 px | Container side padding (16 px at phone width, never less) |
| `--grid-gap` | 24 → 48 px | Column gap of splits, card grids, footer |
| `.flow > * + *` | `--space-4` | Prose rhythm; `--space-8` before an H2 inside prose, `--space-6` before an H3 |

Inside components: label → field `--space-2`; field → field `--space-6`; card padding 24 → 32 px; button padding
`--button-pad-y` × `--button-pad-x` (12 × 24 px).

---

## 5. Radius, borders, elevation

- **Radius:** one token, `--radius` 4 px, for buttons, inputs, cards, frames, panels, dialogs. Focus outlines on
  inline links use `--radius-focus` 2 px. No pills, no circles (the byline photo is a 4 px-radius rectangle).
- **Borders:** hairline 1 px (`--color-rule` or `--hairline-card`), controls 1.5 px, link underline 1.5 px →
  2 px on hover, accent bars 3 px (`--border-accent`). The 1 px ink rule (`--color-rule-strong`) opens steps,
  FAQ lists and paired columns, like a table of contents.
- **Elevation** (two-layer shadows; never colored glows):

| Token | Use |
|---|---|
| `--shadow-card` | Resting cards, contact-facts panel, scene frames |
| `--shadow-card-hover` | Hovered card, nav dropdown, portrait frame |
| `--shadow-1` | Resting primary and inverse buttons |
| `--shadow-2` | Hovered primary and inverse buttons |
| `--shadow-callbar` | Mobile call bar |
| `--shadow-consent` | Consent banner |

z-index: call bar 40, header 50, consent banner 60, dialogs 100. Nothing else gets a z-index.

---

## 6. Motion

- Every transition and animation lives inside `@media (prefers-reduced-motion: no-preference)`. Under reduce,
  nothing moves and smooth scrolling is off.
- Ceiling 200 ms: `--dur-fast` 160 ms (color, opacity, dropdown), `--dur` 200 ms (lift, arrow nudge, dialog
  slide, FAQ chevron). Easing `--ease` cubic-bezier(0.2, 0.8, 0.2, 1).
- Allowed: button lift −1 px and press scale 0.985; card lift −2 px; arrow nudge 3 px; dropdown fade + 4 px
  rise; dialog 16 px slide-in; FAQ chevron rotate 180°.
- **Not allowed:** scroll-triggered reveals (the mockup's `data-reveal` is removed), scroll-linked animation
  (the mockup's scroll-timeline header hairline becomes a static hairline), parallax, autoplay, carousels,
  looping animation of any kind except the form's loading spinner while a request is in flight.

---

## 7. Layout and components

### 7.1 Breakpoints, grid, containers

| Name | Query | What changes |
|---|---|---|
| xs | `< 22.5em` (< 360 px) | Smallest phone header (7.5); call-bar note hidden below 23.4em |
| phone | `22.5em – 37.49em` | Phone header, language strip, call bar, single column |
| phone-wide | `≥ 30em` | Phone icon returns to the header call button |
| tablet | `≥ 37.5em` (600 px) | Full logo with tagline, Español toggle back in the header (short "ES" until 48em), call bar hidden, 2-up proof strip, 2-col form rows |
| tablet-wide | `≥ 48em` | Toggle reads "Español" / "English" |
| desktop | `≥ 60em` (960 px) | Splits (5fr/7fr), sticky split asides, hero 7fr/5fr with portrait, 3-up cards, byline grows to 96 px |
| wide | `≥ 70em` | 4-up cards, 4-col footer |
| nav | `≥ 76em` (1216 px) | Inline primary nav, menu button hidden; toggle short "ES" until 86em |

Containers: `--container` 76rem (1216 px) + gutters; `--container-prose` 44rem for policy pages and long prose;
`--container-form` 44rem. Grid: CSS grid with `minmax(0, Nfr)` columns; the editorial split is 5fr / 7fr
(heading aside / content), the hero 7fr / 5fr (copy / portrait), the form 7fr / 5fr (form / facts).

### 7.2 Buttons

| Variant | Default | Hover | `:focus-visible` | Active | Disabled | Loading |
|---|---|---|---|---|---|---|
| **Primary** (`.btn-primary`; the call button) | `--button-primary-bg`, white 600 label, phone icon, 48 px high, `--shadow-1` | `--button-primary-bg-hover`, lift −1 px, `--shadow-2` | 3 px brass ring, 2 px offset | `--button-primary-bg-active`, scale 0.985, `--shadow-1` | opacity 0.5, no shadow, `cursor: not-allowed` (never used on the call button) | spinner + "Sending…" ("Enviando…"), `aria-busy="true"`, keeps width |
| **Secondary** (`.btn-secondary`) | transparent, 1.5 px `--button-secondary-border`, blue label | `--button-secondary-bg-hover`, lift −1 px | brass ring | `--button-secondary-bg-active`, scale 0.985 | opacity 0.5 | — |
| **Ghost / text** (`.btn-ghost`) | link blue, underlined 1.5 px | navy, underline 2 px | brass ring | scale 0.985 | opacity 0.5 | — |
| **Inverse** (`.btn-inverse`, on ink only) | paper fill, ink label, `--shadow-1` | white fill, lift | `--focus-ring-inverse` | scale 0.985 | — | — |
| **Ghost inverse** | `--color-link-inverse`, underlined | paper | `--focus-ring-inverse` | — | — | — |

Rules: one primary per viewport. Minimum height 44 px (primary 48 px). Label + icon gap 8 px; icon 1.15em.
`.btn-block` is full width on phones. The **call CTA group** (`.call-cta`) is: primary "Call (615) 410-7290"
(`tel:+16154107290`) + note "Free consultation · Se habla español" + ghost "Send a short message"
(`/contact-us/#form`). On phones the primary is full width and the note sits under it. "Free consultation"
never appears without the `tel:` link in the same group (CLAUDE.md rule 7).

### 7.3 Links

- **Inline:** `--color-link`, underline 1.5 px at 0.2em offset; hover navy + 2 px; visited same as default;
  focus brass ring with 2 px radius. Never color alone.
- **Arrow link** (`.link-arrow`): 600 weight + arrow icon, 44 px min height, arrow nudges 3 px on hover.
- **Tel link** (`a.tel`): 600 weight, nowrap, always the full number in text, `href="tel:+16154107290"`.
- **External** (dnj.com, Google Maps): same style, plus a visually hidden "(opens in a new tab)" only if
  `target="_blank"` is used. Prefer same tab.
- **On ink:** `--color-link-inverse`; hover `--color-on-inverse`.

### 7.4 Cards

- **Practice card** (`[cards]`): card surface, 1 px `--hairline-card`, `--shadow-card`, 4 px radius, padding
  24 → 32 px. Anatomy: H3 title, short body (`--color-text-muted`), arrow link pinned to the bottom whose
  `::after` stretches over the card (one link, one tab stop). States: hover lift −2 px + `--shadow-card-hover`
  + link underline; focus-visible: brass ring on the whole card via `:has(:focus-visible)`; active: no lift.
  Grid: 1 → 2 (40em) → 3 (60em) for `[cards: 3]`; 4-up from 70em for `[cards: 4]` and the 8 criminal charges.
  A card with no link (e.g. the "short version" on Privacy) has no hover, no shadow change and no arrow.
- **Info item** (contact facts, office hours): eyebrow label with icon + body, divided by hairlines; 9rem
  label column from 40em.
- **News item** (In the News): card with date line (eyebrow, `<time>`), outlet, H3 headline, neutral
  description, external link "Read the story on dnj.com". No logos of the outlet.
- **Post card** (blog, hidden until a first post): eyebrow (practice area · `<time>`), H3 link title, two-line
  excerpt. Same card states.

### 7.5 Header [borrowed element 1: B's full-number call button]

Sticky, `--header-height` 68 px, `--header-glass` with 12 px backdrop blur, static 1 px `--hairline-header`
bottom rule (no scroll-driven animation). `<header>` with the logo link, `<nav aria-label="Main">`, and actions.

| Width | Logo | Nav | Language | Call button | Menu |
|---|---|---|---|---|---|
| `< 22.5em` | wordmark, `--logo-width-phone-xs` (96 px) | in dialog | language strip (7.6) | **full number**, no icon, `--header-call-size-xs` 13 px, padding 10 px | 44 px icon button |
| `22.5em – 29.99em` | wordmark, `--logo-width-phone` (120 px) | in dialog | language strip | **full number**, no icon, 14 px, padding 12 px | 44 px |
| `30em – 37.49em` | wordmark, 120 px | in dialog | language strip | phone icon + **full number**, 14 px | 44 px |
| `37.5em – 75.99em` | full logo with tagline, `--logo-width-tablet` | in dialog | "ES" (to 48em), then "Español" | icon + number, `--text-small` | 48 px |
| `≥ 76em` | full logo, `--logo-width-desktop` | inline 6 items | "ES" to 86em, then "Español" | icon + number | hidden |

- Measured budget (Public Sans 600): "(615) 410-7290" is 117 px at 14 px. At 360 px: 120 + 141 + 44 + 2 × 8 gaps
  = 321 px of 326 px available; at 320 px: 96 + 129 + 44 + 2 × 6 = 281 of 288. A19 verifies no overflow at
  320, 360, 390, 600, 768, 1024, 1280 in EN and ES.
- Call button: `.btn-primary` styling, `href="tel:+16154107290"`, visible text is the number (identical in EN and
  ES), accessible name "Call (615) 410-7290" / "Llamar al (615) 410-7290" via a visually hidden prefix, never
  via an `aria-label` that drops the visible text. States as primary button.
- Nav items (6, from `plan/sitemap.json` `nav`): `--text-small` 500 weight, 44 px high; hover navy + 2 px
  underline grows from the left; current page (`aria-current="page"`, also set on the parent of the current
  child) ink 600 + brass underline `--color-marker`; focus brass ring.
- Dropdown (Criminal Defense, Family Law, About): the parent label stays a link to its hub; a separate 44 px
  chevron `<button aria-expanded aria-controls>` toggles the submenu (disclosure pattern). Pointer hover and
  focus-within also open it; Esc closes it and returns focus to the chevron; it stays open while hovered
  (WCAG 1.4.13). Panel: card surface, 1 px hairline, `--shadow-card-hover`, items 44 px, hover tint +
  navy text, current item `aria-current`.
- Logo: the redrawn wordmark; tagline dropped below 200 px rendered width (all phone sizes). Link name
  "Will Fraley, Attorney at Law: home" ("…: inicio"). Width and height attributes always set.

### 7.6 Language strip (phones only) and language toggle

- **Language strip** (`< 37.5em`, above the header, scrolls away, not sticky): `--lang-strip-height` 44 px,
  `--lang-strip-bg`, full-width single link, `--lang-strip-text`, 600 weight, languages icon. EN pages:
  `<a href="{esTwin}" hreflang="es" lang="es">Se habla español · Ver esta página en español</a>`; ES pages:
  `<a href="{enTwin}" hreflang="en" lang="en">View this page in English</a>`. Hover underline; focus brass
  ring inset 2 px; active `--color-surface-tint-pressed`. It exists because borrowed element 1 gives the
  phone header row to the full number; it keeps the one-tap switch to Spanish in the first phone screen.
- **Toggle** (header ≥ 37.5em, menu dialog foot, footer): a link (not a button, not a select) to the current
  page's twin from `plan/sitemap.json` (`esPath` / path); `hreflang` + `lang` on the link; label in the target
  language ("Español" / "English", short "ES" / "EN" with `aria-label` of the long form). Pages without a twin
  link to the other language's home. States: link blue → navy + underline on hover; brass focus ring.

### 7.7 Mobile menu dialog

Native `<dialog>` opened with `showModal()` (focus trap, Esc, inert page from the platform). Right-anchored
panel `min(26rem, 100%)`, full height, `--color-bg`, backdrop `--backdrop`. Top bar: wordmark + 48 px close
button ("Close menu" / "Cerrar menú"). List: the 6 nav items as Newsreader `--step-2` links 44 px high, each
followed by its children as `--text-small` muted links (44 px targets) wrapping inline; current item
`aria-current` + 3 px brass inset bar. Foot (linen): full-width primary call button with the number, the note
"Free consultation · Se habla español", and the language toggle. Opener has `aria-haspopup="dialog"`,
`aria-controls`, `aria-expanded` kept in sync; focus returns to the opener on close; backdrop click closes.
Slide-in 16 px / 200 ms only under no-preference. Without JS, the menu button is a link to `#site-footer`
(the footer carries every nav link), so navigation never depends on script.

### 7.8 Mobile call bar

`< 37.5em` only: fixed bottom, `--callbar-height` 48 px + safe-area inset, `--callbar-bg`, white 600 label
"Call (615) 410-7290 · Free consultation" ("Llame al (615) 410-7290 · Consulta gratuita"); the note drops below
23.4em, never the number. Focus: white ring inset 6 px (`--focus-ring-on-fill`). The footer and
`scroll-padding-bottom` reserve its height so it never covers content or a focused element (WCAG 2.4.11). It is
hidden while the menu dialog is open (the dialog has its own call button) and sits under the consent banner.

### 7.9 Forms (contact form; A21 wires it, OFF until configured)

- Fields: Name, Phone or email (one field, `inputmode` by content), "What is this about?" (select: Criminal
  defense, Family law, Personal injury, Other), short message (textarea). Labels always visible above the field,
  600 weight `--text-small`; "(optional)" in muted text, never asterisks alone.
- **Input / select / textarea:** white `--input-bg`, 1.5 px `--input-border`, 48 px high, 4 px radius,
  `--text-body` (never below 16 px, so iOS does not zoom). Placeholder only as an example, never as the label.

| State | Treatment |
|---|---|
| Default | `--input-border` |
| Hover | `--input-border-hover` |
| Focus-visible | brass 3 px ring at 2 px offset + border to ink |
| Filled | unchanged (no green "valid" ticks) |
| Error | `--color-error` border + 1 px inset, `aria-invalid="true"`, message below with alert icon and words, linked by `aria-describedby` |
| Disabled | `--color-surface-sunken` fill, `--input-border-disabled`, muted text (used only in the configured-off state) |

- **Error summary:** on submit with errors, a notice (error variant) at the top of the form, focused, with
  `role="alert"`, listing each error as a link to its field. Messages say how to fix ("Enter a phone number or an
  email so the office can reply").
- **Checkbox and radio** (cookie settings): native inputs restyled with `appearance: none`, 22 px box
  (`--check-size`) in a 44 px label row, 1.5 px `--input-border`, checked fill `--check-bg-checked` with a
  white mark, focus brass ring, disabled ("Strictly necessary · Always on") checked + 0.5 opacity + the words
  "Always on".
- **Non-confidentiality notice** (law-firm rule 8) sits directly above the submit button as a neutral notice:
  do not send confidential information; submitting does not create an attorney-client relationship.
- **Submit:** primary button "Send message" ("Enviar mensaje"), loading state as 7.2; never disabled before
  submit. Beside it: "Or call (615) 410-7290" as a tel link.
- **Success:** redirect to `/thank-you/` (`/es/gracias/` per sitemap). **Network failure:** error notice with the
  phone number; the typed message is kept.
- **Configured-off state** (no form key yet): the form renders, fields enabled, but the submit is replaced by a
  notice "Online messages are not switched on yet. Please call (615) 410-7290 or email inbox@willfraleylaw.com."
  with both links. No request ever leaves the page.
- **Notice component** (`.notice`): linen surface, 3 px left bar (`--color-brand` info, `--color-success`,
  `--color-error`), icon + text, `--text-small`.

### 7.10 FAQ (`[faq]`, native `<details>`)

Ink top rule, then one `<details class="faq__item">` per question with a hairline below. `<summary>`: the
question as Newsreader `--step-2` inside a heading-level wrapper only if the page outline needs it (H3 under the
section H2), chevron in logo blue on the right, 44 px+ target. States: hover question → navy; focus-visible brass
ring on the summary; open → chevron rotates 180°. Answer: body text, `--measure`, padding-bottom 24 px. All
closed by default except the first on FAQ hubs. FAQPage schema only on `/faqs/` (and its ES twin). Works with no
JS; no accordion script that closes siblings.

### 7.11 Testimonial (`[testimonial]`)

Editorial split: H2 + eyebrow in the aside; quote in the main column. Quote mark icon in logo blue (2.5 rem),
quote in Newsreader `--step-1` (phones) / `--step-2` (≥ 60em), ink, max 34em; verbatim text with the original
spelling and punctuation; an omission at the source end is marked with " …" (never edited words). Attribution
in a `<figcaption>`: "— Katherine S."-style, uppercase tracked `--color-heading-quiet`. The results disclaimer
"Prior results do not guarantee a similar outcome." / "Los resultados anteriores no garantizan un resultado
similar." sits right under it as fine print. No stars, ratings, photos or invented names. Testimonials page:
three quotes stacked with a hairline between, each with its own disclaimer line or one disclaimer after the
set plus in the page intro (A20 picks; the page carries it at least once).

### 7.12 Stats

Reserved for ledgered figures only (e.g. "2004" with "Practicing law since"). Numeral in Newsreader
`--text-stat` `--color-stat` (display size only), label below in `--text-small` muted, items separated by
hairlines, 2-up on phones, up to 4-up from 60em. No counters, no animation, no "cases won", no percentages,
no "+" suffixes. Every figure carries its fact ID in copy. No current page copy uses a `[stats]` hint; the
proof strip (7.15) carries these facts and is preferred. Use stats only if a page's copy adds the hint.

### 7.13 Steps (`[steps]`)

A table of contents: ink top rule, ordered list, each step on a hairline row. Numeral "01" in Public Sans
600 tabular `--color-numeral` (brass text), title in Newsreader `--step-2`, text muted, `--measure`. Phones:
3rem numeral column + stacked title/text; ≥ 60em three columns (4rem / 4fr / 7fr). The `<ol>` keeps native
numbering semantics; the visual numeral is `aria-hidden`.

### 7.14 Byline [borrowed element 2: C's small photo beside Will's name]

A horizontal unit: photo frame (`--byline-photo` 72 px wide, 4:5, 4 px radius, `--shadow-1`), then a stack:
eyebrow "Attorney at Law" ("Abogado"), name "Will Fraley" in Newsreader `--step-1` ink, and "509 W College St,
Murfreesboro" in `--text-small` muted. Gap 16 px; photo 96 px wide from 60em (`--byline-photo-lg`).
- Placement: in the page hero above the H1 (as a `<p>`/`<div>`, never a heading). Home: phones and tablets only
  (< 60em), because the large portrait takes over at desktop and is pushed below the first phone screen. Practice
  hubs, practice pages, Contact, FAQs, Testimonials, In the News: all widths. Not on About (real portraits there),
  policy pages, thank-you, 404 or blog.
- Image: a head-and-shoulders crop of IMG03 (Will at the desk), 4:5, served at 144 w and 192 w (AVIF + WebP),
  `width`/`height` set, eager on the hero but not `fetchpriority="high"` (the H1 stays the LCP). The photo is
  `alt=""` because the name sits beside it. Static; not a link.
- Facts: the name, title and street come from the facts ledger via the site config (same source as the footer
  NAP). Spanish uses the same facts.

### 7.15 Proof strip (`[proof-strip]`)

A quiet line of uppercase tracked `--text-fine` 600 items in `--color-heading-quiet` between two hairlines:
1 column with hairlines between (phones), 2-up (37.5em), one row with vertical hairlines (60em). Items are
ledgered phrases only (Practicing law since 2004 · Native to Tennessee · Se habla español · Free consultation:
(615) 410-7290 with the tel link). Not a badge wall, no icons, no logos.

### 7.16 Spanish panel

`--color-surface-tint` panel, 4 px radius, split 5fr/7fr: H2 "Se habla español" in `--color-link-hover` (navy)
with `lang="es"`, body with the phone number and "Leer en español" arrow link to `/es/`. Home and About only.

### 7.17 CTA band (`[cta-band]`)

A contained ink panel inside the container (not full-bleed), 4 px radius, padding 32 → 80 px. H2 in
`--color-on-inverse` at `--step-5`; text `--color-on-inverse-muted`; inline links `--color-link-inverse`. Actions:
`.btn-inverse` "Call (615) 410-7290" (the panel's one solid object), note "Free consultation · Se habla
español", ghost-inverse "Send a short message". ≥ 60em: copy left, the call stack in a right column (min
17.5rem), centered notes. Focus rings switch to `--focus-ring-inverse` inside (`.on-ink`). One per page, last
section before the footer.

### 7.18 Footer

Ink, `--text-small`, top padding 64 → 96 px, bottom padding 40 px (+ call-bar height on phones). Grid: firm
block (name in Newsreader `--step-3` + "ATTORNEY AT LAW" tracked in sky; `<address>` 509 W College St,
Murfreesboro, TN 37130; tel link; "Free consultation · Se habla español"; mailto link) · Office hours (`<dl>`,
Monday–Thursday 9:00 a.m. – 5:00 p.m., Friday 9:00 a.m. – 4:00 p.m., hairlines on ink) · Practice areas nav ·
Site nav (About, Testimonials, In the News, FAQs, Contact, Privacy, Accessibility, Cookie Settings, Sitemap,
Español/English). Links 40 px+ rows, paper text, hover sky + underline, brass-on-ink focus. Legal line block
under a rule: "The information on this website is general information only, not legal advice. Viewing this
site or contacting the office does not create an attorney-client relationship." ES: "…no constituye
asesoramiento legal…". Then © year + firm name + "Cookie settings" link. `id="site-footer"`. 2 columns on phones
(firm and hours full width), 2 at 40em, 4 at 70em.

### 7.19 Breadcrumbs

Every page except Home (and 404, thank-you): `<nav aria-label="Breadcrumb">` with an `<ol>`; items in
`--text-small`, links in link blue, separator "/" or chevron icon `aria-hidden` in muted, current page as
plain ink text with `aria-current="page"`. Sits at the top of the hero, above the eyebrow/byline, 44 px row; on
phones it shows only the parent link ("‹ Criminal defense") to save width. Trail from `plan/sitemap.json`:
Home › Practice areas › Criminal defense › DUI; Adoption and DCS: Home › Practice areas › Family law › …;
Testimonials and In the News: Home › About › …. ES labels from `labelEs` ("Inicio"). BreadcrumbList schema
matches the visible trail.

### 7.20 Consent banner and cookie settings (A22; tracking OFF until keys exist)

- **When it shows:** only when at least one non-essential vendor is configured in `site.config.json`. With no
  vendor configured (launch state) there is no banner, and Cookie Settings says so via `[vendor-off]`.
- **Banner:** fixed bottom panel (above the call bar on phones, `--z-consent`), `--consent-bg`,
  `--shadow-consent`, top hairline, max-width container; non-modal (`role="region"`, `aria-label="Cookie
  choices"`), so the page and the call button stay usable. Copy: one sentence + link to Privacy. Actions:
  "Accept" and "Reject" as **two secondary buttons of equal weight** (no dark pattern; reject is as easy as
  accept), plus "Settings" text link to `/cookie-settings/`. 44 px targets, wrap to full-width stacked buttons
  on phones. No pre-checked boxes. Respects Global Privacy Control (treated as Reject).
- **Cookie settings page (`[consent-controls]`):** three category rows (Strictly necessary · Always on;
  Analytics; Marketing), each a 44 px checkbox row (7.9) with a description and the configured vendors
  (`[vendor: …]`), then "Save choices" primary + "Reject all" secondary. Success notice after save, focused,
  `role="status"`. Footer "Cookie settings" link reopens the choices on any page.

### 7.21 Hero patterns

- **Home hero:** 7fr/5fr split; eyebrow "Attorney at Law · Murfreesboro, Tennessee"; H1 at `--text-display`;
  deck (lead + 1–2 short paragraphs); call CTA group; portrait (IMG03 desk crop, 596/715) at ≥ 60em with a
  hairline figcaption "Will Fraley · Attorney at Law". Phones: byline above H1; portrait follows the hero copy at
  max 26rem (lazy). Proof strip under the hero.
- **Page hero:** breadcrumbs → byline (where 7.14 says) → eyebrow → H1 (`--text-h1`, max 18ch) → deck → call CTA
  group. Optional framed scene to the right (≥ 60em) or below the CTA (phones), per 9.
- **Policy hero:** breadcrumbs → H1 → one-line summary → "Last reviewed" date (`<time>`) in muted. No CTA group;
  the tel link is in the header and call bar.

### 7.22 Media frames

Portrait frame (4 px radius, sunken placeholder, `--shadow-card-hover`, `object-fit: cover`, fixed
`aspect-ratio`), scene frame (`.scene--3x2`, `.scene--4x5`, `--shadow-card`), opening plate (Home only,
full-bleed, 21:9 ≥ 37.5em / 4:3 phones), document figure (certificate scan on card surface with 1 px hairline
and 16 px padding, caption below, link "View full size" to the optimized large file).

### 7.23 Utility components

Skip link (first focusable, ink pill, "Skip to main content" / "Saltar al contenido principal", target
`<main id="main" tabindex="-1">`), visually-hidden text, eyebrow, section head (eyebrow + H2 + optional intro),
editorial split, reasons list (Newsreader lead-in + text between hairlines), paired columns (ink top rule +
brass dash list), contact-facts panel.

---

## 8. Iconography

Inline SVG, 24 px grid, stroke 1.75, round caps, `currentColor`, `aria-hidden="true"` with a text label always
present. Set: phone, mail, map-pin, clock, languages, menu, x, chevron-down, arrow-right, quote, alert-circle,
check-circle, info, external-link. No gavels, scales, handcuffs or decorative icons in cards.

---

## 9. Imagery

### 9.1 Rules

- **Scenes only** for generated images (A15, Higgsfield `nano_banana_pro`, 2k, logged by `tools/images.mjs`):
  Middle Tennessee townscapes, courthouse-square architecture with no readable signage, law-office interiors,
  objects, textures. No people, faces, hands, silhouettes, reflections of people, text, signage, lettering,
  flags with emblems or license plates. Every prompt ends "no people, no faces, no text, no signage, no
  lettering". No generated building is captioned or implied to be 509 W College St or a real courthouse.
- **One grade for the whole site:** overcast Middle Tennessee light, cool blue-grey shadow, low-saturation brick,
  warm paper-white highlights, blacks near blue-black ink, never pure black. Reads like the opening plate of a
  book, not advertising.
- **Generated scenes are decorative** (`alt=""`), never behind text, never carrying meaning.
- **One image-led moment per page at most**, and many pages have none (speed is a design principle).
- **Real people:** Will (IMG03 desk, IMG02 brick doorway) and Katie Fults (IMG05, About only) are reused,
  cropped and color-corrected only (match the grade lightly: lift shadows toward ink, neutralize casts). Alt
  text is literal ("Will Fraley at his desk"). IMG04 is not used.
- **Never upscale attorney photos.** The largest `srcset` candidate is the source's own pixel width (IMG03 910 px,
  IMG02 673 px, IMG05 169 px). Render widths are capped so the 1x rendering is never wider than the source:
  portrait frame `--portrait-max` 30rem (480 px ≤ 596 px crop), aside photo `--aside-photo-max` 22rem (352 px ≤
  673 px), Katie `--avatar-katie` 84 px (2x = 168 px ≤ 169 px). Never full-bleed, never a background.
- **Certificates** IMG06 and IMG07 are documents: shown whole (no crop), in the document figure (7.22), alt text
  names the document from the ledger quote (e.g. completion certificate and the course name), never
  "certified"/"certification" as a claim about Will. Caption uses the ledgered course name.
- **Formats:** AVIF + WebP via `<picture>`, `srcset` at 640/960/1280/1920 (2560 for the Home plate), explicit
  `width`/`height`, `sizes` matching the layout, `loading="lazy"` + `decoding="async"` below the fold. The one
  above-the-fold image per page gets `fetchpriority="high"` only if it is the LCP candidate; on Home the H1 is
  the intended LCP on phones, so the portrait is lazy on phones and eager (not high priority) at ≥ 60em.
- **Placeholders:** frames have `--color-surface-sunken` and fixed `aspect-ratio`, so a missing or slow image
  never shifts layout. If A15 cannot generate a slot, the frame is omitted (the layout works without it).

### 9.2 Slot catalog (set `A`; A15 generates the new ones in Stage 5)

| Slot | Page(s) | Ratio by breakpoint | Focal point / crop | Status |
|---|---|---|---|---|
| `A-hero` | Home opening plate (full-bleed band under the hero) | 4:3 phones (object-position 66% 50%) · 21:9 ≥ 37.5em (50% 30%) | architecture right two-thirds, calm sky top | exists (mockup) |
| `A-practice` | `/criminal-defense/` hub (+ ES) | 3:2 all widths; right of H1 ≥ 60em, below CTA on phones | vanishing point slightly right | exists (mockup) |
| `A-contact` | `/contact-us/` (+ ES) | 4:5 ≥ 60em beside facts · 3:2 phones (50% 72%) | pen nib and pad edge lower third | exists (mockup) |
| `A-services` | `/legal-services/` hub | 3:2 | wide calm townscape: courthouse-square cornices and a row of brick storefronts under high overcast | new |
| `A-family` | `/family-law/` hub | 3:2 | warm interior object still life: a kitchen table by a window with two empty chairs and a closed folder; soft morning light (family warmth from objects, never people) | new |
| `A-injury` | `/personal-injury/` | 3:2 | a quiet two-lane Middle Tennessee road between fields after rain, guardrail, overcast; calm, not a crash | new |
| `A-adoption` | `/adoption/` | 3:2 | a sunlit empty window seat with a folded quilt in an old house; hopeful, still | new |
| `A-dcs` | `/dcs-case-attorney/` | 3:2 | a front porch of a modest brick house in soft daylight, door closed, two rocking chairs empty | new |

All other pages use no generated image: practice child pages, About (real photos and certificates), Testimonials,
FAQs, In the News, policy pages, thank-you, 404, blog. ES twins reuse the EN page's images.

---

## 10. Page templates

Section order follows the copy's component hints; prose sections without a hint render as the editorial split
(H2 aside, prose main) or plain `.flow` prose on policy pages. Every page: language strip (phones) → header →
`<main>` → footer → call bar (phones). Every page has the tel link in the first 390 px viewport (header call
button). The last section before the footer is the CTA band where the copy has `[cta-band]`.

| Template | Pages | Structure |
|---|---|---|
| **Home** | `/`, `/es/` | Home hero (byline < 60em, portrait ≥ 60em) → proof strip → `A-hero` opening plate → `[cards: 3]` practice areas + "All practice areas" link → "Why people call" reasons split with the IMG02 aside photo → `[testimonial]` on linen → Spanish panel → `[faq]` (4) split → `[cta-band]` |
| **Hub** | `/legal-services/`, `/criminal-defense/`, `/family-law/` (+ ES) | Breadcrumbs → page hero with byline + scene slot → proof strip → intro split → `[cards]` (criminal: 8 charges, 4-up ≥ 70em; family: 7; services: grouped by practice, each group an H2 + cards) → bridge prose (criminal ↔ family) → `[steps]` → `[testimonial]` (linen) → `[faq]` → `[cta-band]` |
| **Practice** | 8 criminal children, 5 family children, `/adoption/`, `/dcs-case-attorney/`, `/personal-injury/` (+ ES) | Breadcrumbs → page hero with byline (scene only for adoption, DCS, injury) → proof strip → answer-first split → `[cards]` (what's handled, no links unless they go somewhere) → prose splits (what you may face, what to do this week) → `[steps]` → family/criminal bridge → `[faq]` → `[testimonial]` → related-practice links (arrow links list) → `[cta-band]` |
| **About** | `/about/` (+ ES) | Breadcrumbs → hero split with IMG02 portrait (no byline) → proof strip → story splits ("Will's story", "From law school…", "How Will practices") → `[cards]` training with the two certificate document figures → memberships list (ledgered names) → Katie Fults block (IMG05 at 84 px + ledgered text, only here) → `[testimonial]` → In the news teaser → Visit the office (NAP + hours info items) → Spanish panel → `[cta-band]` |
| **Testimonials** | `/testimonials/` (+ ES) | Breadcrumbs → page hero with byline → three `[testimonial]` blocks separated by hairlines, results disclaimer → "Find help for your situation" practice links → "What happens when you call" → `[cta-band]`. No stars, no carousel. |
| **FAQs** | `/faqs/` (+ ES) | Breadcrumbs → page hero with byline → proof strip → "Find your question" in-page jump list (links to each group H2, 44 px rows, 2-up ≥ 40em) → `[faq]` groups (Getting started, Criminal charges, DUI, Family court, …) each with its H2 → `[cta-band]`. FAQPage schema. |
| **News** | `/in-the-news/` (+ ES) | Breadcrumbs → page hero with byline → news item card(s) (7.4) → About teaser → For reporters (contact info items) → `[cta-band]` |
| **Contact** | `/contact-us/` (+ ES) | Breadcrumbs → hero split: H1 + deck + call CTA (left) and the contact-facts panel (Phone, Email, Office + directions link, Hours) right ≥ 60em / below on phones → `[steps]` what happens after you reach out → form split (form 7fr / `A-contact` scene + Spanish note 5fr, `id="form"`) → Finding the office (address, Google Maps link, no embedded map iframe) → `[cta-band]` |
| **Legal / policy** | `/privacy-policy/`, `/accessibility/`, `/cookie-settings/` (+ ES) | Breadcrumbs → policy hero (H1, summary, last-reviewed) → `--container-prose` single column → `[cards: 3]` short version (non-link cards) → prose sections with H2/H3, `[vendor]`/`[vendor-off]` blocks as notices, `[consent-controls]` on Cookie Settings → `[cta-band]`. `policy_page: true`. Cookie Settings is noindex. |
| **Thank-you** | `/thank-you/` (+ ES) | No breadcrumbs. Hero: success icon (check-circle, success color) + H1 + deck + primary "Call (615) 410-7290 if it cannot wait" → `[steps]` what happens next → While you wait / Office hours / court-date note as info items → links home and practice areas → `[cta-band]`. noindex. |
| **404** | `dist/404.html`, `dist/es/404.html` | No breadcrumbs. Hero: H1 + deck + call CTA → `[cards: 4]` (three practice hubs + contact) → links Home · All practice areas · Español → `[cta-band]`. Bilingual hint line linking to the other language's home. |
| **Blog index** | `/blog/` (built only when `blog.enabled`) | Breadcrumbs → page hero (no byline) → "Latest articles" post cards (3-up ≥ 60em) or an empty state (one sentence + practice links; never "coming soon" filler) → `[cards]` browse by practice area → "An article is not advice about your case" notice → `[cta-band]` |

---

## 11. Bilingual rules

- `<html lang="en">` / `<html lang="es">`; inline phrases in the other language get `lang` (e.g. `<span
  lang="es">Se habla español</span>` on EN pages).
- Every page's toggle, strip and `hreflang` alternates point at its twin from `plan/sitemap.json`; `x-default`
  is the EN page.
- UI strings live in one dictionary per language (A19); no string is hard-coded in a component.
- The phone number, address, email and hours are identical in both languages; ES formats hours as "9:00 a. m. –
  5:00 p. m." only if the copy does; otherwise keep the copy's form.
- Every component is checked at 320 px with ES strings: nav labels ("Violación de libertad condicional" is the
  longest child), buttons, H1s, breadcrumbs, the call bar.

---

## 12. Accessibility rules (WCAG 2.2 AA)

1. Every text/background pair is in section 2.4; nothing else ships.
2. Skip link first; landmarks: header (banner), `nav[aria-label]` (Main, Breadcrumb, Practice areas, Site),
   main, footer (contentinfo). One H1; sequential headings.
3. Visible focus everywhere: 3 px brass ring with 2 px offset (on ink: brass-300; in the call bar: white inset).
   Never `outline: none` without a replacement. Focus is never hidden under the sticky header or call bar
   (`scroll-padding-top` = header + 16 px, `scroll-padding-bottom` = call bar + 16 px).
4. Targets 44 × 44 px minimum, including inline footer links (row height) and the FAQ summaries.
5. Keyboard: menu dialog (native), dropdown disclosure (Esc closes), FAQ (native), form, consent banner all
   operable without a pointer; tab order follows the visual order.
6. Forms: visible labels, `autocomplete` (name, tel, email), errors in text + icon + `aria-invalid` +
   `aria-describedby`, an error summary that takes focus, no time limits, no CAPTCHA puzzles (Turnstile only
   in invisible/managed mode when configured).
7. Images: literal alt for real people and documents; `alt=""` for scenes and the byline photo. No text in images.
8. Motion: section 6. Nothing flashes.
9. Reflow at 320 px with no horizontal scroll; text resizes to 200% without loss; `text-size-adjust: 100%`.
10. Links are distinguishable by underline, not color alone; external links say where they go.
11. Language of page and parts set (section 11).
12. axe (tools/axe.mjs) reports zero serious/critical issues on every built page.

---

## 13. Performance budget the design must respect

Static HTML; JS ≤ 30 KB gzipped per page (menu dialog, dropdown Esc handler, form, consent only; no
framework runtime); CSS inlined or one file ≤ 20 KB gzipped; fonts: one preload (Newsreader latin, 132 KB),
everything else on demand; at most one hero image per page; Lighthouse mobile ≥ 95 in every category, LCP ≤ 2.0 s,
CLS ≤ 0.05, TBT ≤ 150 ms.

---

## 14. Content guardrails expressed in components

- The call CTA group is the only place "Free consultation" appears outside the footer/call bar, and it always
  holds the `tel:` link.
- Results language appears only inside testimonials, always with the disclaimer.
- Katie Fults appears only on About. No component (team grid, "our attorneys", plural "lawyers") implies a
  multi-attorney firm.
- No component renders a stat, year, membership or name that is not passed in from ledgered copy or site config.

---

## 15. Changes from the mockup (for A19 when porting `mockups/A`)

1. Header call button shows the full number at every width (borrowed element 1); phone header sizes per 7.5.
2. Language strip added above the phone header; header language toggle hidden below 37.5em (7.6).
3. Byline component added (borrowed element 2) and placed per 7.14.
4. Scroll reveal (`data-reveal`, the IntersectionObserver script, `--dur-reveal`, `--stagger`, `--reveal-rise`)
   removed. Header hairline is static (no `animation-timeline`).
5. One font preload (Newsreader latin), not two. Fallback metrics updated (108% / 104%).
6. Dropdowns become disclosure buttons with Esc support (7.5); the mockup relied on hover/focus-within only.
7. New tokens: `--color-stat`, `--color-marker`, `--color-rule-strong`, `--color-surface-tint-pressed`,
   `--button-primary-bg-active`, `--button-secondary-bg-active`, `--button-inverse-bg-hover`,
   `--input-border-hover`, `--input-border-disabled`, `--check-*`, `--focus-ring-on-fill`, `--lang-strip-*`,
   `--consent-*`, `--backdrop`, `--hairline-header` (was `--hairline-scroll`), `--shadow-callbar`,
   `--shadow-consent`, header-phone and byline sizes, `--z-consent`, `--weight-text-medium`, `--leading-ui`,
   `--section-pad-tight`, hero paddings, media maxima. Replace the mockup's literal values (e.g. `font-weight:
   500`, `rgb(var(--rgb-ink) / 0.45)`, `min-height: 2.75rem`, `14rem`) with tokens.
8. Breadcrumbs, consent banner, cookie checkboxes, error summary, configured-off form state, news item, post
   card, document figure and stats are new components (P200).
9. The components page is dev-only (`/_components/`), excluded from production and the sitemap.
