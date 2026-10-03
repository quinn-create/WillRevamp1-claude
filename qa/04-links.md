# 04-links
Result: PASS

Round 1. Sources: `qa/links.json` (generated 2026-10-03T15:06:02Z by `tools/links.mjs --external`, after the
`dist/` build at 15:05:53Z, so it reflects the current build), plus my own independent re-crawl of `dist/`.

## Evidence

### Internal links: 0 broken
- `qa/links.json`: 60 HTML pages scanned, `brokenInternal: []`.
- Independent re-crawl, which is stricter than `tools/links.mjs`. It parses `href`, `src`, `srcset`,
  `imagesrcset`, `action`, `poster` and URL-valued `content` (og:image and similar), in double-quoted,
  single-quoted and unquoted forms, with HTML entities decoded. It also follows CSS `url()` in `dist/_astro/*.css`,
  self-host URLs in `sitemap-*.xml` and `robots.txt`, and icon `src`s in `site.webmanifest`. Each one is resolved
  to a file in `dist/`, or through `dist/_redirects` to a file. Result: **0 broken**, 0 empty `href`/`src`,
  0 `javascript:` links.
- Fragment links: every `#id` and `page#id` target exists as an `id` on the target page (0 missing).
- `dist/_redirects` health: all 66 destinations resolve to a built file. No exact-path rule shadows a built file,
  and no splat (`/feed/*`, `/comments/feed/*`, `/wp-content/uploads/*`) shadows one. This matters because
  Cloudflare Pages applies `_redirects` before assets.

### href="#": none
- `qa/links.json` `hashOnlyLinks: []`. My re-crawl also found 0 bare `href="#"` across all 60 pages.

### Old URLs: 89/89 OK
Old URLs come from `inventory/pages.json` (24 pages) and `inventory/old-urls.json` (89 entries), which give 89
unique paths. All 89 appear in `qa/links.json` (none missing, none extra), and `oldUrlFailures: []`.
- **200 direct (49):** `/`, the 24 inventoried pages, plus `/?author=1` and 23 `/?p=N` query URLs. The query
  URLs resolve to `/index.html` because static hosting ignores the query string.
- **301 → 200, one hop (40):** for example `/dui/` → `/criminal-defense/dui/`, `/contact/` → `/contact-us/`,
  `/legal-services/criminal-defense/` → `/criminal-defense/`, `/news/` → `/in-the-news/`, `/sitemap_index.xml` →
  `/sitemap-index.xml`, `/blog/` → `/`, and 6 `/wp-content/uploads/2025/10/*` images → their pages. No chains:
  every redirect has `hops: 1`.

### External links: report only (bot walls are not failures)
| URL | Status | Pages |
|---|---|---|
| https://goo.gl/maps/5UGDFjKCfam | 200 | 60 (footer) |
| https://x.com/fraley37 | 200 | 60 (footer) |
| https://www.google.com/maps/search/?api=1&query=509+W+College+St+Murfreesboro+TN+37130 | 200 | 2 (`/contact-us/`, `/es/contacto/`) |
| https://www.facebook.com/WillFraleyLaw/ | 400 | 60: bot wall (Facebook rejects non-browser GETs) |
| https://www.linkedin.com/in/will-fraley-b745416/ | 999 | 60: bot wall (LinkedIn's anti-scrape code) |
| https://www.avvo.com/attorneys/37130-tn-raymond-fraley-1707380.html | 403 | 60: bot wall (Cloudflare challenge) |
| http://www.dnj.com/story/money/business/2014/10/05/fraley-follows-familys-footsteps-private-practice/16772235/ | 403 | 2 (`/in-the-news/` EN/ES): bot wall (Gannett) |

### Notes (not defects)
- `qa/links.json` shows the Google Maps URL with a literal `&amp;`. That comes from `tools/links.mjs`, which does
  not decode HTML entities. The built HTML (`dist/contact-us/index.html`, `dist/es/contacto/index.html`) correctly
  contains `&amp;`, which decodes to `&`.
- The `/?p=N` and `/?author=1` URLs return 200 with the homepage instead of 301 to their specific pages.
  Cloudflare `_redirects` cannot match on query strings, and the header comment in `dist/_redirects` already
  defers this to NEEDS-OPERATOR.md. It still meets the "200" requirement.
- The DNJ article link uses `http://`. It works through the publisher's own redirect. Switching it to `https://`
  would be optional polish, not a requirement of this check.

## Fixes
None. No defects found against the 04-links requirements.
