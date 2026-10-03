# 06-copy-proof
Result: FAIL

This is round 1. The reviewer read the text of all 60 built pages in `dist/`: 30 EN (including `404.html`) and 30 ES. Each page was rendered in Chromium (Playwright 1.56.1, local server over `dist/`) and its `document.body.innerText` was captured. The raw HTML was also parsed, including hidden menu and dialog markup and the `alt`, `aria-label`, `placeholder`, `title` and `<meta content>` attributes. In total that is about 23,800 EN words and 27,000 ES words. The spell check used nspell with dictionary-en and dictionary-es, installed in the scratchpad only, and every flagged word was reviewed by hand. All scripts were throwaway and run from the scratchpad. No site code was edited.

## Evidence

| Requirement | Result |
|---|---|
| Spelling, EN | 0 errors. The 36 flagged tokens are all proper nouns or acronyms (Fraley, Fults, McFarlin, AVVO, TACDL, MTSU, DNJ, WCAG, GPC, Cloudflare, LinkedIn), Spanish phrases marked `lang="es"`, or valid terms (reflow, walk-throughs, pre-built, "5th Annual", the name of a certificate). |
| Spelling, ES | 0 errors. The flagged tokens are proper nouns, or valid Spanish the dictionary does not list: contrainterrogatorio, excónyuge, citatorio, bolsitas, and enclitic forms such as asesorarle, responderle, Escríbalo and Pregúntelo. No "?" appears without "¿" and no "!" without "¡" in Spanish text. Interrogatives (qué, cómo, dónde, cuándo, quién) carry accents wherever they ask a question. |
| Grammar spot checks | 0 hits for doubled words (every candidate was a heading followed by its own body text), space before punctuation, straight quotes or apostrophes (all ’ “ ”), wrong a/an, or common confusables. |
| Testimonial typos | Kept verbatim on purpose (law-firm rule 7), e.g. "Mr. Fraley is the man you." and "Mr. Fraley!!". English testimonials on ES pages are wrapped in `<figure class="quote" lang="en">`. |
| Firm name | Consistent: "Will Fraley, Attorney at Law" in prose, copyright, `og:site_name` and logo alt. Two styled lockups are layout, not errors: "Will Fraley · Attorney at Law" on the hero card, and the footer wordmark `Will Fraley<span>Attorney at Law</span>`. The name is kept in English on ES pages as a proper name. Murfreesboro, Rutherford, Tennessee, Fraley, Fults and Wilford have 0 misspelled variants. |
| Phone format | 781 of 781 visible instances read exactly `(615) 410-7290`. All 631 `tel:` hrefs are `tel:+16154107290`. Email: 78 instances of `inbox@willfraleylaw.com`. Address `509 W College St` is consistent. Hours are consistent: EN `9:00 a.m. – 5:00 p.m.`, ES `9:00 a. m. – 5:00 p. m.` |
| Practice names, EN | Consistent apart from case: nav and breadcrumbs use Title Case ("Child Custody") and body links use sentence case ("Child custody"), which is one convention per component. |
| Practice names, ES | **FAIL.** For 4 practice pages, the menu, breadcrumb and page-title label from `plan/sitemap.json` differs from the label used in the body links, cards and H1 from `copy/pages/es/**`. See the table below. |
| Banned phrases | 0. `BANNED_PHRASES` is empty. |
| Forbidden strings | 0 in visible text or raw HTML. Checked: Knoxville Web Design, jshwebdesigns, hostingersite.com, Murfreeesboro, and the "online or at to…" sentence variants. |
| Law-firm words | 0 in non-quote copy (specialist, specialize, expert, certified, guarantee, and the ES equivalents). "Best" appears only in a verbatim testimonial, in "best interests of the child/children" (the legal standard), and in the label "Best time to reach you". "Mejor" appears only in "mejor hora" and in the translated baseball quote. |
| Warn-list phrases (rule 8) | **0 hits** for all 24 phrases, in visible text, attributes and JSON-LD. A stem search (elevat-, leverag-, aggress-, robust-, holistic-, delv-, passionat-, and so on) also found 0. The nearest match is "Whether you will need to appear in person", which is not the "whether you're" cliché and is not flagged. |
| Leftover `{fact:}` tags | 0, in visible text and in raw HTML. |
| Component hints (`[hero]`, `[cards: n]`…) | 0. |
| Placeholders | 0 for TODO, TBD, FIXME, lorem/ipsum, XXX, `{{ }}`, undefined, null, NaN, `[object Object]` or `[vendor:…]` in `dist/**/*.html`. The `[vendor: …]` and `[vendor-off: …]` markers exist only in `src/` (the documented tracking and form slots) and none reaches the build. The input placeholders `name@example.com` and `nombre@ejemplo.com` are UI hints. |
| Spanish accents and ñ | All 60 pages declare `<meta charset="utf-8">`. 0 cases of mojibake (Ã, Â, â€, U+FFFD) and 0 double-encoded entities. The fonts' `unicode-range` covers U+00–FF. `document.fonts.check('16px "Newsreader"' / '"Public Sans"', 'ñáéíóú¿¡')` returns true for both. A rendered screenshot of `/es/preguntas-frecuentes/` shows á, ñ and ó correctly in the header, H1 and body. |
| English leaking onto ES pages | None outside proper names, verbatim testimonials, legal terms in parentheses (e.g. "(reckless driving)"), and lang-tagged links ("Read in English", "View this page in English", both with `lang="en"`). |
| ES quotation marks | **FAIL (1).** Spanish copy uses “ ” 12 times (privacy, divorce, visitation, accessibility, sex crimes, domestic assault, drug crimes) and « » once (`/es/sobre-nosotros/`). |

### ES practice-name mismatches (counts across 30 ES pages, raw HTML)

| Page | Label in menu, breadcrumb and title (`plan/sitemap.json`) | Label in body links, cards and H1 (`copy/pages/es`) |
|---|---|---|
| `/es/derecho-familiar/custodia/` | "Custodia de menores" ×61 | "Custodia de los hijos" ×15 (11 pages). H1: "Abogado de custodia de los hijos…" |
| `/es/abogado-casos-dcs/` | "Casos del DCS" ×61 | "Casos de DCS" ×7 (5 pages). H1: "Abogado en casos de DCS…". `copy/FACT-CHECK.md:52` records the decision "Casos del DCS became Casos de DCS", which the sitemap never received. |
| `/es/defensa-penal/violacion-de-libertad-condicional/` | "Violación de libertad condicional" ×62, plus the page `<title>` | "Violación de la libertad condicional" ×10 (9 pages). H1: "…por violación de la libertad condicional…" |
| `/es/defensa-penal/robo/` | "Robo y hurto" ×61 | "Robo" ×4 (4 pages). H1: "Abogado de defensa por robo…" |

A Spanish reader sees two different names for the same page in the menu and in the body. The EN counterparts (Child Custody, DCS Cases, Probation Violation, Theft) differ from their body text only in letter case.

### Advisory (does not count toward FAIL)

- `/family-law/visitation/` uses "cancelled" and "cancelling". These are accepted US variants. "Canceled" and "canceling" are the more common US forms, so the fixer may change them, but it is not required.

## Fixes

Five defects. Rebuild (`npx astro build`) after applying them.

1. **ES label "Custodia de menores" → "Custodia de los hijos"** (menu, breadcrumb, page title fallback)
   - `plan/sitemap.json` line 276: `"titleEs": "Custodia de menores",` → `"titleEs": "Custodia de los hijos",`
   - `plan/sitemap.json` line 676: `"labelEs": "Custodia de menores",` → `"labelEs": "Custodia de los hijos",`
   - Keep the human sitemap in step: `plan/SITEMAP.md` line 43, `Child Custody / Custodia de menores` → `Child Custody / Custodia de los hijos`.
2. **ES label "Casos del DCS" → "Casos de DCS"** (this applies the decision already recorded in `copy/FACT-CHECK.md:52`)
   - `plan/sitemap.json` line 370: `"titleEs": "Casos del DCS",` → `"titleEs": "Casos de DCS",`
   - `plan/sitemap.json` line 706: `"labelEs": "Casos del DCS",` → `"labelEs": "Casos de DCS",`
   - `plan/SITEMAP.md` line 48: `DCS Cases / Casos del DCS` → `DCS Cases / Casos de DCS`.
3. **ES label "Violación de libertad condicional" → "Violación de la libertad condicional"**
   - `plan/sitemap.json` line 198: `"titleEs": "Violación de libertad condicional",` → `"titleEs": "Violación de la libertad condicional",`
   - `plan/sitemap.json` line 650: `"labelEs": "Violación de libertad condicional",` → `"labelEs": "Violación de la libertad condicional",`
   - `copy/pages/es/criminal-defense/probation-violation.md` line 2: `title: "Violación de libertad condicional en Murfreesboro, TN"` → `title: "Violación de la libertad condicional en Murfreesboro, TN"` (56 chars, within the 60 limit).
   - `plan/SITEMAP.md` line 39: `Probation Violation / Violación de libertad condicional` → `Probation Violation / Violación de la libertad condicional`.
4. **ES label "Robo y hurto" → "Robo"** (matches the body cards, the H1, `copy/pages/es/criminal-defense/theft.md` title "Abogado de casos de robo…" and the EN label "Theft")
   - `plan/sitemap.json` line 121: `"titleEs": "Robo y hurto",` → `"titleEs": "Robo",`
   - `plan/sitemap.json` line 626: `"labelEs": "Robo y hurto",` → `"labelEs": "Robo",`
   - `plan/SITEMAP.md` line 35: `Theft / Robo y hurto` → `Theft / Robo`.
5. **ES quotation-mark consistency on `/es/sobre-nosotros/`**
   - `copy/pages/es/about.md` line 30: `En español: «El béisbol es el mejor juego, y la disciplina es la clave de la vida». {fact:F055}` → `En español: “El béisbol es el mejor juego, y la disciplina es la clave de la vida”. {fact:F055}`

After the rebuild, verify with `grep -rhoE ">(Custodia de menores|Casos del DCS|Violación de libertad condicional|Robo y hurto)" dist/es | wc -l`. It must print 0, and `grep -rc "«" dist/es` must find no matches.
