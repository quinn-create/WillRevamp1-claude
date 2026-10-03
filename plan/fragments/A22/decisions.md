# A22 decisions (P600 — consent + legal)

- **D-A22-1: No banner while no tracking ID is configured (launch state).** The P600 task left the choice open
  ("one sentence … or not shown at all"); DESIGN-SYSTEM 7.20 says no banner. With every `tracking.*` key empty
  there is nothing optional to ask about, so `ConsentManager.astro` renders nothing and no consent script ships on
  any page except Cookie Settings (EN/ES). Cookie Settings still shows the three categories, lets a visitor save a
  choice (stored for later, as its copy promises) and says no tool is on via the copy's `[vendor-off]` blocks.
- **D-A22-2: Banner buttons = Accept all · Reject all · Settings as three identical secondary buttons.** The kit
  (§5, binding) asks for equal visual weight for all three; DESIGN-SYSTEM 7.20 had Settings as a text link. The kit
  wins. Settings expands the category rows in place and reveals "Save my choices" (also secondary, so the call
  button stays the only solid blue block). Non-modal `<section aria-label>` region, fixed bottom, above the phone
  call bar; `html.consent-open` adds scroll-padding/body padding so focused content and the footer are not hidden
  (WCAG 2.4.11). On Cookie Settings, "Save my choices" is primary with Accept all / Reject all secondary (7.20).
- **D-A22-3: Storage.** First-party cookie `consent` (Path=/, Max-Age 180 days, SameSite=Lax, Secure on https)
  plus a localStorage mirror, both `{v: consentPolicyVersion, ts: ISO time, analytics, marketing, vendors: [ids
  configured when chosen]}`. A choice is asked again when the version differs, it is older than 180 days, or a
  vendor was configured after it (so tools/configure.mjs adding a key re-asks even without a version bump, which
  is what the Cookie Settings copy promises). The mirror restores a lost cookie.
- **D-A22-4: GPC = Reject, no banner.** `navigator.globalPrivacyControl === true` forces Analytics and Marketing
  off even over a stored Accept; the optional switches show off and disabled, with a notice saying why.
- **D-A22-5: Vendor loading.** `vendors.ts` puts only configured vendors (public IDs, shape-validated at build so
  a pasted secret or snippet fails the build) into an inert JSON config; `loaders.ts` injects GA4 (gtag + Consent
  Mode mirroring the choice), Clarity (`clarity('consent')`), Meta Pixel and TikTok Pixel only after their category
  is accepted. No static tracker `<script src>` exists in any page. Withdrawing a category stops it from the next
  page and clears that category's first-party cookies (_ga, _clck, _fbp, _ttp …).
- **D-A22-6: "Last reviewed" = build date** (America/Chicago) on Privacy, Accessibility and Cookie Settings, per
  the P600 task. The policy pages are regenerated from site.config.json on every build (vendor sections follow the
  keys). `POLICY_REVIEWED=YYYY-MM-DD npm run build` pins a date. Implemented by changing `LAST_REVIEWED` in
  src/pages/_lib/pages.ts (A20 left it for A22).
- **D-A22-7: Edits outside src/components/consent/** (all integration points prepared by A19/A20 or legal pages):
  `src/layouts/Site.astro` mounts `<ConsentManager>` (its header said "A22 adds consent"); `src/pages/_lib/pages.ts`
  `LAST_REVIEWED`; `copy/pages/cookie-settings.md` and `copy/pages/es/cookie-settings.md` gain the
  `Last reviewed: {{last_reviewed}}` / `Última revisión: {{last_reviewed}}` hero line the other two policy pages
  already had (no fact changes). The footer "Cookie settings" link (A19, `data-cookie-settings`) re-opens the
  banner with settings in place when a vendor is configured, moves to the controls on Cookie Settings, and is a
  plain link to Cookie Settings otherwise.
- **D-A22-8: Test tool `tools/consent-test.mjs`** (pattern of A21's form-test): off-state checks on dist/, then a
  temporary build with dummy IDs (site.config.json restored byte-for-byte) driving EN + ES in Playwright with
  tracker hosts intercepted: 80 assertions, all pass (plan/checks/consent-test.json). axe (WCAG 2.2 AA tags) on the
  banner and on Cookie Settings at 375 and 1280 px: 0 violations.
