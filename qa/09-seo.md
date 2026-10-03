# 09-seo
Result: FAIL

Round 1. Source: `dist/` as built (60 HTML files: 58 routed pages plus `dist/404.html` and `dist/es/404/index.html`), parsed with BeautifulSoup. Every `<script type="application/ld+json">` was put through `json.loads`. OG images were measured with PIL. Reference spec: plan/REVAMP-BRIEF.md item 5, plan/DECISIONS.md A04 "Schema", design/DESIGN-SYSTEM.md (FAQ, line 476).

## Evidence

| Requirement | Result | Detail |
|---|---|---|
| Titles ≤ 60 chars, unique (EN+ES) | PASS | All 60 titles are ≤ 60 characters, with 0 duplicates. |
| Descriptions 140–155, unique | PASS | All 60 descriptions are 140–155 characters, with 0 duplicates. og:description, twitter:description and the JSON-LD page node `description` all match the meta description. |
| Canonical = `https://willfraleylaw.com/<path>/` | PASS (58/58 routed pages) | Every routed page has exactly one canonical, and it equals the expected URL. og:url and the JSON-LD page `url` match it. The two 404 documents (`/404.html`, `/es/404/`) are `noindex, follow` and have no canonical, by design (DECISIONS A19 "404"). That is accepted and not counted as a defect. |
| JSON-LD parses | PASS | There is 1 block per page, and 60/60 parse with 0 errors. |
| No rating markup | PASS | 0 `AggregateRating`, `Review`, `reviewRating` or `ratingValue` nodes on any page. |
| NAP/hours match footer | PASS | One identical firm node on all 52 non-policy pages: "Will Fraley, Attorney at Law", 509 W College St, Murfreesboro, TN 37130, +1-615-410-7290, inbox@willfraleylaw.com, Mo–Th 09:00–17:00, Fr 09:00–16:00. The EN and ES footers show the same values ("Friday 9:00 a.m. – 4:00 p.m."). areaServed is Murfreesboro + Rutherford/Coffee/Wilson. knowsLanguage is en-US, es-US. |
| BreadcrumbList | PASS | On every non-home page that shows a visible trail, the JSON-LD names and URLs match `nav.breadcrumbs` item for item (EN and ES). |
| LegalService **also typed Attorney** | **FAIL** | The firm node is `"@type": "LegalService"` only, on all 52 pages. The brief (item 5: "LegalService plus Attorney") and DECISIONS A04 ("`LegalService` (also typed `Attorney`)") require both types. |
| FAQPage **on /faqs/ (+ES twin) only** | **FAIL** | 42 pages carry an `FAQPage` node. Only 2 may (`/faqs/`, `/es/preguntas-frecuentes/`). The other 40 are `/`, `/es/`, `/legal-services/`, `/es/servicios-legales/`, all 3 hubs and their ES twins, all practice pages (criminal ×8, family ×5, personal-injury, adoption, dcs-case-attorney) and their ES twins. These break the brief (item 5: "FAQPage on `/faqs/` only"), DECISIONS A04 ("A single `FAQPage`, on /faqs/ only"), DECISIONS A08 (line 620) and DESIGN-SYSTEM line 476 ("FAQPage schema only on `/faqs/` (and its ES twin)"). The A20 note (DECISIONS line 916, "any page with an `[faq]`") contradicts the design and is the cause. The FAQ question and answer text does match the visible accordions. |
| og:image exists, 1200×630 | PASS | 60/60 pages have a page-specific `/og/<slug>.png` file (no image is reused). Every file exists in `dist/og/` and measures exactly 1200×630, with matching `og:image:width`/`height` and `twitter:image`. The firm `image` `/og/default.jpg` exists (1200×630). |
| sitemap lists every published page + hreflang | **FAIL** (1 defect) | `dist/sitemap-index.xml` points to `dist/sitemap-0.xml`, which has 56 `<url>`s. All 54 indexable pages are listed, and each carries en/es/x-default alternates that match the page's `<link rel="alternate">` exactly. The 2 extra URLs are `https://willfraleylaw.com/cookie-settings/` and `https://willfraleylaw.com/es/configuracion-de-cookies/`. Both pages carry `<meta name="robots" content="noindex, follow">` (designed noindex: SITEMAP.md row 28, DECISIONS A04 line 272). Submitting noindexed URLs in the sitemap is a conflicting signal (Search Console: "Submitted URL marked 'noindex'"). thank-you, gracias and the 404s are correctly excluded. |
| robots.txt | PASS | `User-agent: * / Allow: /` and `Sitemap: https://willfraleylaw.com/sitemap-index.xml`. The noindexed pages are not disallowed, so crawlers can read their noindex. `_redirects` sends `/sitemap.xml`, `/sitemap_index.xml`, `/page-sitemap.xml` and `/post-sitemap.xml` to `/sitemap-index.xml`. |
| hreflang reciprocity | PASS | On all 58 routed pages: `<html lang>` is correct (en/es), there are exactly en + es + x-default, the self link is correct, x-default is the EN URL, and the twin exists and points back. 0 non-reciprocal pairs. |

Observation, not counted (outside this check's list): DECISIONS A19 "404" asks for `dist/es/404.html` to be copied from `dist/es/404/index.html` in an `astro:build:done` hook, so Cloudflare serves the Spanish 404 for missing `/es/*` URLs. The file is not in `dist/`, so `/es/<missing>` falls back to the English 404.

Defects: 3.

## Fixes

1. **Sitemap lists noindex pages.** File `astro.config.mjs`, line 36 (`sitemap({ filter })`). Replace
   `filter: (page) => !/\/_|\/thank-you\/|\/gracias\/|\/404\//.test(page),`
   with
   `filter: (page) => !/\/_|\/thank-you\/|\/gracias\/|\/404\/|\/cookie-settings\/|\/configuracion-de-cookies\//.test(page),`
   After the rebuild, `dist/sitemap-0.xml` should list exactly 54 `<url>`s.

2. **Firm node is not typed Attorney.** File `src/pages/_lib/pages.ts`, line 235 (in `firmNodes()`). Replace
   `'@type': 'LegalService',`
   with
   `'@type': ['LegalService', 'Attorney'],`
   Keep `name` "Will Fraley, Attorney at Law". Any downstream code or test that compares `@type === 'LegalService'` must accept the array form (check with `Array.isArray(t) ? t.includes('LegalService') : t === 'LegalService'`).

3. **FAQPage emitted on 40 pages besides /faqs/.** File `src/pages/_lib/pages.ts`, lines 289–291 (in `pageJsonLd()`). Replace
   ```
   // FAQPage wherever the page has an FAQ section.
   const faqs = copy.sections.filter((s) => s.hint === 'faq').flatMap((s) => splitH3(s.blocks).items);
   if (faqs.length) {
   ```
   with
   ```
   // FAQPage on /faqs/ and its ES twin only (REVAMP-BRIEF 5, DECISIONS A04, DESIGN-SYSTEM FAQ).
   const FAQ_PATHS = new Set(['/faqs/', '/es/preguntas-frecuentes/']);
   const faqs = FAQ_PATHS.has(path) ? copy.sections.filter((s) => s.hint === 'faq').flatMap((s) => splitH3(s.blocks).items) : [];
   if (faqs.length) {
   ```
   The visible FAQ accordions on the other pages stay as they are. Only the structured data changes. Also amend the A20 JSON-LD note in `plan/DECISIONS.md` line 916 through the fixer's fragment: change "any page with an `[faq]` adds an `FAQPage` node" to "`/faqs/` and `/es/preguntas-frecuentes/` add an `FAQPage` node". After the rebuild, `grep -l '"FAQPage"' -r dist --include=*.html` should return exactly 2 files.
