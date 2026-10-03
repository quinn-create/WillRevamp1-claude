# A05 operator items

- **Analytics, all pages.** The old site runs GA4 property `G-MN6QWEVWM4` (it appears in `inventory/html/index.html`). Please confirm whether to carry this property over. If yes, enable it with `tools/configure.mjs`; tracking stays OFF until then.
- **Before baseline, all pages.** `audit/lighthouse-before.json` was measured through the sandbox proxy, which dropped some requests: `failedRequests` was 2 to 6 on /criminal-defense/theft/, /criminal-defense/sex-crimes/ and /family-law/visitation/. If you want a clean before/after comparison, please re-run `node tools/lighthouse.mjs --url ...` from an unproxied network, or pull CrUX/PageSpeed field data for willfraleylaw.com.
