# 09-seo
Result: PASS

Round 2. This round re-checks the three round-1 defects after the fixer's rebuild. `dist/` was built at 16:49, after the source changes to `astro.config.mjs` and `src/pages/_lib/pages.ts` at 16:11. That gives 60 HTML documents: 58 routed pages, plus `dist/404.html` and `dist/es/404/index.html`. They were parsed with BeautifulSoup. Every `<script type="application/ld+json">` was put through `json.loads`. OG images were measured with PIL. The sitemap was parsed with ElementTree.

## Evidence

| Requirement | Result | Detail |
|---|---|---|
| Titles ≤ 60 chars, unique (EN+ES) | PASS | All 60 titles are ≤ 60 characters, with 0 duplicates. |
| Descriptions 140–155, unique | PASS | All 60 descriptions are 140–155 characters, with 0 duplicates. On each page, the JSON-LD page node `description` equals the meta description. |
| Canonical = `https://willfraleylaw.com/<path>/` | PASS (58/58) | Each routed page has exactly one canonical, and it equals the expected URL. `og:url` and the page node `url` match it. Both 404 documents are `noindex, follow` and have no canonical, by design (DECISIONS A19). |
| JSON-LD parses | PASS | 60/60 blocks parse, with 0 errors. |
| No rating markup | PASS | 0 `AggregateRating`, `Review`, `reviewRating`, `ratingValue` or `reviewCount` on any page. |
| LegalService + Attorney | PASS (round-1 defect fixed) | The firm node is `"@type": ["LegalService","Attorney"]` on 50 pages. Those are all pages except the 10 policy/utility documents (privacy, accessibility, cookie settings, thank-you and 404, each EN+ES), which emit no firm node by design (`template === 'policy'`). There is a `Person` node on the same 50 pages and a `Service` node on 36 practice and hub pages. |
| FAQPage on /faqs/ (+ES) only | PASS (round-1 defect fixed) | `FAQPage` appears on exactly 2 pages: `/faqs/` and `/es/preguntas-frecuentes/`. Each has 31 questions, and all 31 question texts are visible on the page. |
| BreadcrumbList | PASS | There are 54 pages with BreadcrumbList. On each one, names and URLs match the visible `nav.breadcrumbs` item for item. Pages with no trail (home EN/ES, thank-you/gracias, 404 ×2) have neither visible crumbs nor schema. |
| NAP/hours match footer | PASS | There is 1 firm-node variant across all 50 pages: "Will Fraley, Attorney at Law", 509 W College St, Murfreesboro, TN 37130, +1-615-410-7290, inbox@willfraleylaw.com, Mo–Th 09:00–17:00 and Fr 09:00–16:00. The EN footer matches it ("(615) 410-7290", "Monday–Thursday 9:00 a.m. – 5:00 p.m.", "Friday 9:00 a.m. – 4:00 p.m."), and so does the ES footer ("Lunes a jueves 9:00 a. m. – 5:00 p. m.", "Viernes 9:00 a. m. – 4:00 p. m."). |
| og:image exists, 1200×630 | PASS | 60/60 pages have an `og:image` that resolves to a file in `dist/og/`. Every file measures exactly 1200×630, with matching `og:image:width`/`height` meta. `twitter:image` equals `og:image`. |
| Sitemap lists every published page + hreflang | PASS (round-1 defect fixed) | `sitemap-index.xml` points to `sitemap-0.xml`, which holds 54 `<url>`s, matching the 54 indexable routed pages exactly. No URL is missing, and none is extra or noindexed. Cookie settings and configuracion-de-cookies are now excluded, along with thank-you, gracias and the 404s. Each URL's en/es/x-default alternates equal the page's `<link rel="alternate">` set. `plan/sitemap.json` lists 31 pairs. Its only paths absent from `dist/` are `/blog/` and `/es/blog/` (hidden until a first post, CLAUDE.md rule 12) and `/404/` (served as `/404.html`). The footer "Sitemap" link goes to `/sitemap-index.xml`. |
| robots.txt | PASS | `User-agent: *`, `Allow: /`, `Sitemap: https://willfraleylaw.com/sitemap-index.xml`. Noindex pages stay crawlable. `_redirects` sends `/sitemap.xml`, `/sitemap_index.xml`, `/page-sitemap.xml` and `/post-sitemap.xml` to `/sitemap-index.xml` (301). |
| hreflang reciprocity | PASS | Checked on all 58 routed pages: `<html lang>` is correct (en/es), the set is exactly en + es + x-default, the self link is correct, x-default equals the EN URL, and the twin exists and points back. There are 0 non-reciprocal pairs. |

Observation, not counted (outside this check's list, carried from round 1): `dist/es/404.html` still does not exist (DECISIONS A19 "404"), so a missing `/es/*` URL on Cloudflare Pages falls back to the English `404.html`.

Defects: 0.

## Fixes

None required. Optional, for the observation above: in `astro.config.mjs`, add an `astro:build:done` integration hook that copies `dist/es/404/index.html` to `dist/es/404.html`.
