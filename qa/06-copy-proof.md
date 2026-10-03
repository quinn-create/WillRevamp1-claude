# 06-copy-proof
Result: PASS

This is round 2. The reviewer re-read all 60 built pages in `dist/` after the round-1 fix commit `124a4bf`: 30 EN (including `404.html`) and 30 ES. `dist/index.html` was built at 16:49, after the last edits to copy, sitemap and templates, so the build is current. For each page the reviewer captured two things:

- the rendered `document.body.innerText`, using Chromium (Playwright 1.56.1) through `tools/lib.mjs#serve` over `dist/`;
- the raw HTML, parsed to include hidden menu and dialog markup, `<title>`, and the `alt`, `aria-label`, `placeholder`, `title`, `content` and `data-*` attributes.

The spell check used nspell with dictionary-en and dictionary-es. Every flagged token was reviewed by hand and compared with the round-1 list. All scripts ran from the scratchpad, and no site code was edited.

## Round-1 defects: verified fixed

| # | Round-1 defect | Count in `dist/` now |
|---|---|---|
| 1 | "Custodia de menores" vs "Custodia de los hijos" | Old label 0, new label 78. All 73 menu, card and breadcrumb anchors to `/es/derecho-familiar/custodia/` read "Custodia de los hijos". The other anchors are "custodia de los hijos" ×1 and "página de custodia" ×1 (in sentences). |
| 2 | "Casos del DCS" vs "Casos de DCS" | Old label 0. Anchors: "Casos de DCS" ×65, plus "página de casos de DCS" ×1. |
| 3 | "Violación de libertad condicional" vs "…de la libertad…" | Old label 0. Anchors: "Violación de la libertad condicional" ×68. The `<title>` now reads "Violación de la libertad condicional en Murfreesboro, TN". |
| 4 | "Robo y hurto" vs "Robo" | Old label 0. Anchors: "Robo" ×62, "Defensa en casos de robo" ×2, "página de robo" ×1. |
| 5 | « » on `/es/sobre-nosotros/` | `«` and `»` appear 0 times anywhere. Rendered text uses “ ” 35/35 (balanced) and ’ 203 times, with 0 straight `"` or `'`. |

## Evidence (current build)

| Requirement | Result |
|---|---|
| Spelling, EN | **0 errors.** The flagged-token list matches round 1 exactly (diff is empty). All flags are proper nouns or acronyms: Fraley, Fults, McFarlin, AVVO, TACDL, MTSU, DNJ, WCAG, GPC, Cloudflare, LinkedIn, HTTPS. Others are lang-tagged Spanish, such as "Se habla español" and the new `<span lang="es">Llame al … para una consulta gratuita.</span>` on `/about/`, or valid terms: reflow, walk-throughs, pre-built, autoplaying, 5th. |
| Spelling, ES | **0 errors.** The token list matches round 1. Flags are proper nouns or valid Spanish missing from the dictionary: contrainterrogatorio, excónyuge, citatorio, bolsitas, asesorarle, responderle, Escríbalo, Pregúntelo, ADN. |
| Inverted punctuation (ES) | 0 Spanish lines with "?" but no "¿", or "!" but no "¡". The 17 lines flagged are verbatim English testimonials inside `lang="en"` figures. |
| Grammar spot checks | 0 real doubled words. The 8 candidates are valid Spanish ("día a día", "acompaña a", "se envía a", "reseña a"). 0 cases of a space before punctuation and 0 wrong a/an. |
| Firm name | "Will Fraley, Attorney at Law" ×114 in rendered text. The styled lockup "Will Fraley · Attorney at Law" ×2 is the hero card, as in round 1. 0 variants such as "Fraley Law", "Law Office of" or "William Fraley". Fraley ×376, Fults ×4, Murfreesboro ×282, Rutherford ×40 and Tennessee ×108 all appear with 0 misspellings. |
| Phone format | 468 of 468 rendered instances read `(615) 410-7290`, with 0 other formats. 634 of 634 `tel:` hrefs are `tel:+16154107290`. `+1-615-410-7290` appears only inside JSON-LD `telephone`, which is not visible. Email: `inbox@willfraleylaw.com` ×78. |
| Hours | EN `Monday–Thursday: 9:00 a.m. – 5:00 p.m.` and `Friday: 9:00 a.m. – 4:00 p.m.`. ES `Lunes a jueves: 9:00 a. m. – 5:00 p. m.` and `Viernes: 9:00 a. m. – 4:00 p. m.`. Each appears 4 times outside the footer and is identical everywhere, including the new Office/Hours cards on `/about/` and `/es/sobre-nosotros/`. |
| Practice names, EN | Consistent. Nav and breadcrumbs use Title Case ("Child Custody" ×60) and body links use sentence case ("Child custody" ×13), which is one convention per component, unchanged from round 1. |
| Practice names, ES | **Consistent.** The anchor-text tally for each of the 14 ES practice and hub pages shows one label, plus sentence variants such as "Defensa en casos de…" and "página de…". |
| Banned phrases | 0 (`BANNED_PHRASES: []`). |
| Forbidden strings | 0 in visible text, attributes or raw HTML: Knoxville Web Design, jshwebdesigns, hostingersite.com, Murfreeesboro, and every variant of "online or at to…". |
| Law-firm words | 0 in non-quote copy. "Best" appears only in a verbatim testimonial, in "best interests of the child/children" (the legal standard) and in the form label "Best time to reach you". "Mejor" appears only in "Mejor hora", "servirle mejor" and the translated baseball quote. "Guarantee" and "garantizan" appear only in the required results disclaimer (18 EN and 18 ES occurrences). |
| Warn-list phrases (rule 8) | **0 hits** for all 24 phrases in visible text, `<title>` and attributes. |
| Leftover `{fact:}` tags | **0**: no `{fact`, `fact:F###` or bare `F###` in rendered text, attributes or raw HTML. |
| Component hints | 0 (`[hero]`, `[cards…]`, `[faq]`, `[cta-band]`, `[testimonial]`, `[steps]`, `[proof-strip]`). The new `[cards]` hint on the about pages rendered as cards and did not leak. 0 leftover Markdown (`**`, `](`, `#`). The only `__` matches are in OG image URLs, which follow the file-safe slug convention. |
| Placeholders | **0** for case-sensitive TODO, TBD, FIXME, XXX, lorem, ipsum, PLACEHOLDER, `{{ }}`, `undefined`, `NaN`, `[object Object]`, `[vendor:…]` and `[vendor-off:…]` in `dist/**/*.html`. The vendor markers remain only in `src/`, the documented slots. Case-insensitive hits for "todo" are Spanish words, and hits for "nan" are inside "finances". |
| Spanish accents and ñ | All 60 pages declare `<meta charset="utf-8">`. 0 cases of mojibake (Ã, Â, â€, U+FFFD) and 0 double-encoded entities. Both fonts load with `unicode-range` U+0-FF. `document.fonts.check('16px "Newsreader"' and '16px "Public Sans"', 'ñáéíóú¿¡')` returns `[true, true]` on `/es/preguntas-frecuentes/`. Accented H1 and title strings render intact, for example "Comuníquese", "Áreas de práctica" and "Régimen de visitas". |
| New round-1 copy | The new "Se habla español" section on `/about/` has a `lang="es"` H2 and lang-tagged Spanish spans, and the "Leer en español" link has `lang="es"`. On `/es/sobre-nosotros/`, "Atención en español" is in Spanish and the "Read in English" link has `lang="en"`. Each "free consultation" sits next to a `tel:` link. |

### Advisory (does not count toward the result)

- **`/es/defensa-penal/violacion-de-libertad-condicional/`:** the `<title>` "Violación de la libertad condicional en Murfreesboro, TN" (56 chars) is the only ES practice title without the "| Will Fraley" suffix that the other 21 ES practice and hub titles carry. This predates round 1. The firm name is missing, not misspelled. Optional fix: in `copy/pages/es/criminal-defense/probation-violation.md` line 2, change the title to `"Libertad condicional en Murfreesboro, TN | Will Fraley"` (54 chars).
- **`/about/` "Se habla español" section:** the H2 "Se habla español" is followed at once by "Se habla español." in the body (`copy/pages/about.md`, line 104), which is mildly repetitive. Optional fix: drop the leading `Se habla español. {fact:F092}` from that paragraph, keeping the F092 tag on the "Llame al…" sentence, which already cites it.
- **`/family-law/visitation/`:** "cancelled" and "cancelling" are accepted US variants. This is unchanged from round 1 and not required.

## Fixes

None required. The current build has 0 copy-proof defects. The advisories above are optional.
