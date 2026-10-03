# A21 — operator items (P500 contact form)

- **Turn the contact form on:** create a Web3Forms access key for inbox@willfraleylaw.com, then run
  `node tools/configure.mjs --web3forms <key>` and rebuild. Until then /contact-us/ and /es/contacto/ show the
  form disabled, with phone and email links. Rerun `node tools/form-test.mjs` after any form change.
- **Optional Turnstile:** add a Cloudflare Turnstile site key with `--turnstile <site key>`. Also enable
  Turnstile/captcha verification in the Web3Forms dashboard with the matching secret. Without server-side
  verification, the widget is only a client-side gate.
- **CSP (for A23's `_headers`):** once the form is on, allow `connect-src https://api.web3forms.com` and
  `form-action https://api.web3forms.com` (the no-JS fallback posts natively). With Turnstile, also allow
  `script-src` and `frame-src https://challenges.cloudflare.com`. The form script is an inline
  `<script type="module">` (Astro inlines small scripts), so script-src needs a hash or 'unsafe-inline' for it,
  same as the menu script.
- **Thank-you redirect (no-JS path):** the hidden `redirect` field uses `site.config.json siteUrl` +
  /thank-you/ or /es/gracias/. Change siteUrl before building if the site goes live on another domain.
