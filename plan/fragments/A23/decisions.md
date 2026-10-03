# A23 decisions (P700 routing & SEO, P800 performance)

## P700
- **Build pipeline.** `npm run build` = `node tools/og.mjs && node tools/redirects.mjs && astro build && node tools/csp.mjs`.
  Social cards, favicons and `_redirects` are regenerated from the plan on every build; `dist/_headers` gets the CSP
  hash list after Astro writes the HTML.
- **`_redirects` is generated** (`tools/redirects.mjs`) from `plan/sitemap.json` redirects, each page's `old` list
  and `inventory/old-urls.json`: 67 rules, all 301, one hop, chains collapsed, every target checked to be a real
  built page. Directory-style old URLs get both `/x/` and `/x` forms; `index.html` and `.xml`/media files stay
  exact. Splats only for gone WordPress trees (`/feed/*`, `/comments/feed/*`, `/wp-content/uploads/*`), placed
  after the exact rules (Cloudflare applies the first match). No `:placeholder` syntax. Sources that are real
  pages are dropped automatically; `/blog/` → `/` is emitted only while `site.config.json` `blog.enabled` is false.
- **Query-string URLs** (`/?p=<id>` ×25, `/?author=1`) cannot be matched by `_redirects`; they go to the operator
  with a ready Pages Function (`functions/index.js`, runs only on `/`) and Redirect Rule expressions.
- **www → apex** is a Bulk Redirect the operator adds (`plan/WWW-REDIRECT.md`); every canonical, og:url,
  hreflang and sitemap URL is `https://willfraleylaw.com/…`.
- **Headers** (`public/_headers` → `dist/_headers`): HSTS 1 year + includeSubDomains (no `preload`: preload is
  hard to undo and is the owner's call), nosniff, strict-origin-when-cross-origin, Permissions-Policy (camera,
  microphone, geolocation, interest-cohort, payment, usb off), X-Frame-Options DENY + `frame-ancestors 'none'`,
  COOP same-origin. CSP: `default-src 'self'`, scripts `'self'` + sha256 of each executable inline script
  (JSON-LD and JSON data blocks are not governed by script-src), styles `'self'` (+ hashes if Astro ever inlines
  CSS), Web3Forms in connect-src/form-action, Turnstile in script/frame/connect, GA4/Clarity/Meta/TikTok hosts
  allowed but only contacted after consent + a configured key. Immutable caching for `/_astro/*`, 30 days for
  `/fonts/*` (names not hashed), 1 day for `/og/*`. Verified in Chromium with the CSP applied: no violations on
  Home, Contact (EN/ES), Cookie Settings, DUI, Thank-you; the inline menu script runs.
- **Sitemap hreflang.** The integration's i18n pairing only matches identical paths under `/es/`, and the ES
  slugs are translated, so only Home was paired. `astro.config.mjs` now adds `en` / `es` / `x-default`
  `xhtml:link` alternates to all 56 URLs from `plan/sitemap.json` (same codes as the `<link rel="alternate">` tags).
- **robots.txt** allows everything and names `https://willfraleylaw.com/sitemap-index.xml`. Thank-you pages are
  not disallowed: they carry `noindex`, which crawlers must be able to read.
- **OG cards** (`tools/og.mjs`): 1200×630 PNG per page and language (63 incl. 404 and a default), named by file
  slug (`/es/defensa-penal/dui/` → `og/es__defensa-penal__dui.png`), ~13 KB each (palette PNG). Content: WF
  tile, "WILL FRALEY · ATTORNEY AT LAW", the page's own H1 from its copy file, phone (615) 410-7290, "Murfreesboro,
  Tennessee · Se habla español" (F092) — firm facts only. Colors read from `src/styles/tokens.css`.
  `Base.astro` points og:image/twitter:image at the page's card (fallback `og/default.png`), alt = page title.
- **Fonts for rendering.** No network download: `tools/fonts/build-fonts.py` (fontTools) instances the already
  self-hosted Google Fonts files (OFL) into static TTFs — Newsreader wght 460/560 opsz 60, Public Sans 400/600 —
  committed under `tools/fonts/`. `tools/fonts/fonts.conf` exposes only those; og.mjs sets `FONTCONFIG_FILE` to it
  before sharp loads, so the cards cannot silently fall back to a system face.
- **Favicon set.** The logo is a raster wordmark with no mark, so the icon is a monogram tile: "WF" outlines from
  Newsreader (wght 560, opsz 60) in paper `#F7F6F2` on Counsel blue `#2E5F96`. `favicon.svg` (glyphs as paths, no
  font dependency), `favicon.ico` (16/32/48), `apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`,
  `icon-maskable-512.png`, `site.webmanifest` (linked from Base). Replaces A19's interim stroke "W". Owner
  question about a square mark stays open (A02).
