# A01 decisions: old-URL inventory (inventory/old-urls.json)

- **What it holds.** 89 old URLs that should still answer 200, or 301 to a 200, after launch: 24 pages, 16 redirects, 6 broken-links, 31 wordpress, 2 feeds, 4 sitemaps and 6 media files. Each entry records the status observed today and the current redirect target.
- **Sources.** I took the 24 pages, 13 short-URL redirects and 2 broken entries from `inventory/pages.json`. To find every internal `<a href>` and every `<link rel=shortlink|alternate>`, I scanned all 24 files in `inventory/html/*.html`, deduped the results and resolved them against the crawled pages.
- **What I left out.** Fragment `#` anchors, `tel:` and `mailto:` links, `/wp-content/plugins|themes/*` and `/wp-content/uploads/elementor/css/*` assets, the `/wp-json/oembed/*` and `/wp-json/wp/v2/pages/*` head links, and `xmlrpc.php?rsd`. www variants are left to Cloudflare. Two internal links use the www host: `www.willfraleylaw.com/contact/` and `www…/legal-services/criminal-defense/{sex-crimes,violent-crimes}/`. I recorded them under their bare paths.
- **Live probes.** I sent 50 single GETs with `redirect: manual`, 11 s apart and in sequence:
  - WordPress and sitemap paths: `/feed/`, `/comments/feed/`, `/category/uncategorized/`, `/page/2/`, `/?p=1`, `/sitemap.xml`, `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml`, `/wp-json/`, `/blog/`, `/news/`, `/?author=1`
  - Old service-area paths: `/legal-services/{criminal-defense,family-law,personal-injury}/`
  - The 4 staging paths on willfraleylaw.com
  - All 24 `/?p=<id>` shortlinks, including front page ID 46
  - The 6 og:image files

  Results:
  - `/legal-services/<area>/` → 301 to `/<area>/`
  - `/sitemap.xml` → 301 to `/sitemap_index.xml`
  - Every `/?p=<id>` → 301 to its page
  - `/?p=1`, `/blog/` and `/news/` → 404
  - `/?author=1` → 403. Author enumeration is blocked, and no author slug appears in any HTML, feed or sitemap, so there is no `/author/<slug>/` URL to keep.
  - The feeds return 200 but have no posts. `/post-sitemap.xml` returns 200 with an empty urlset.
  - `/page/2/` returns 200 as a duplicate of the home page, with its canonical set to `/`.
  - `/category/uncategorized/` returns 200 as an empty archive.
- **Broken links.**
  - `/legal-services/criminal-defense/sex-crimes/` (404) is linked from the body of `/criminal-defense/violent-crimes/`, anchor "sex crimes".
  - `/legal-services/criminal-defense/violent-crimes/` (404) is linked from the body of `/criminal-defense/domestic-assault/`, anchor "violence".
  - pages.json had `linkedFrom: []` for both because the links use the www host. Map each one to `/criminal-defense/<same slug>/`.
- **Hostinger staging links (beige-baboon-435532.hostingersite.com).** I recorded these as broken-link entries using the same paths on willfraleylaw.com, where each currently returns 404:
  - `/contact/index.html` is linked from `/criminal-defense/domestic-assault/`, `/criminal-defense/dui/` and `/legal-services/`. Map it to `/contact-us/`.
  - `/legal-services/{criminal-defense,family-law,personal-injury}/index.html` are the 3 service cards on `/legal-services/`. Map them to the matching area hub.
- **Media.** I kept only og:image files under `/wp-content/uploads/`, as the task scoped. There are 6, including the 4 `Screenshot-*.png` files, and all return 200. No page sets `twitter:image`. The Yoast page-sitemap lists about 30 more `image:image` uploads (service JPGs, `Screenshot-2025-10-20-at-6.05.23-PM.png` and others). I did not add them because they are not social-cache URLs.
- **Note for the redirect builder.** Cloudflare Pages `_redirects` cannot match query strings. Without a rule, every `/?p=<id>` would serve the home page with a 200. To keep the 23 per-page 301s, use a small Pages Function middleware or a zone Redirect Rule (filed in needs-operator.md).
