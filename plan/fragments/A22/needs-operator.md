# A22 operator items (P600)

- **CSP when a tracking key is added (A23 / `dist/_headers`).** Each vendor needs its hosts in the
  Content-Security-Policy once its key is set with tools/configure.mjs: GA4 `script-src https://www.googletagmanager.com`,
  `connect-src https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com`;
  Clarity `script-src https://www.clarity.ms https://*.clarity.ms`, `connect-src https://*.clarity.ms`;
  Meta `script-src https://connect.facebook.net`, `img-src/connect-src https://www.facebook.com`; TikTok
  `script-src https://analytics.tiktok.com`, `connect-src https://analytics.tiktok.com`. The consent config is an
  inert `<script type="application/json">` and the consent module ships as an external /_astro/*.js file.
  Pages: Cookie Settings, Privacy Policy and every page (banner) — page: all; placeholder: none.
- **Re-asking visitors.** Adding a new vendor key re-asks automatically. If the Privacy Policy changes in a way that
  needs fresh consent from everyone, raise `consentPolicyVersion` in site.config.json and rebuild.
- **Verify after configuring:** `npm run build && node tools/consent-test.mjs` (needs no real keys).
