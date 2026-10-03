### A19 — design-system engineer

- **Spanish 404 file name (deploy).** Cloudflare Pages serves the nearest `404.html`. The build currently writes `dist/404.html` (EN) and `dist/es/404/index.html` (ES). Until A23 adds a post-build copy to `dist/es/404.html`, a missing `/es/…` URL shows the English 404 page (still with the phone number and an "Español" link). Check `dist/es/404.html` exists before the first deploy.
