# A01: operator items

- **Query-string redirects for WordPress shortlinks.** The 23 `/?p=<id>` URLs (see `kind: wordpress` in `inventory/old-urls.json`) each 301 to a page today. Cloudflare Pages `_redirects` ignores query strings, so these need a Pages Function (`functions/_middleware`) or a Cloudflare zone Redirect Rule matching `http.request.uri.query eq "p=<id>"`. If neither is set up, they will serve the home page with a 200 instead of the right page.
- **Hostinger staging host.** `beige-baboon-435532.hostingersite.com` is linked from the live site. At launch, confirm it is offline or set to noindex, and remove it from the Hostinger account if the owner agrees.
- **Search Console.** `/sitemap_index.xml` is declared in robots.txt today. After launch, submit the new sitemap and keep `/sitemap_index.xml`, `/page-sitemap.xml` and `/sitemap.xml` redirecting (301) to it.
