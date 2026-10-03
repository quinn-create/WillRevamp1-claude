# Handoff — willfraleylaw.com (Will Fraley, Attorney at Law)

Release 1, packaged 2026-10-03. For the operator. The owner's report is `REPORT/Before-After.pdf`, and the
owner's questions are in `NEEDS-OWNER.md`.

**State of the package.** `npm run build` passed, `node tools/check.mjs --final` passed (GATE PASSED, nothing
failed), and `node tools/package.mjs` wrote `_UPLOAD_TO_CLOUDFLARE/` (60 pages: 30 English + 30 Spanish) and
`_UPLOAD_TO_CLOUDFLARE.zip`. QA is 10/10 PASS. `plan/BLOCKED.md` has nothing open.

**What is OFF at launch, on purpose.** The contact form shows phone and email until a Web3Forms key is added.
No analytics or ad pixels are configured, so no tracker loads and no consent banner shows. The blog is hidden.

---

## 1. Upload to Cloudflare Pages

1. Log in to Cloudflare and open **Workers & Pages → Create → Pages → Upload assets**.
2. Name the project (for example `willfraleylaw`) and click **Create project**.
3. Drag the whole **`_UPLOAD_TO_CLOUDFLARE/`** folder onto the upload area. You can drag the `.zip` instead.
   Then click **Deploy site**.
4. Open the `*.pages.dev` address Cloudflare gives you and spot-check it:
   - Home, `/es/`, `/contact-us/` and `/criminal-defense/dui/` load.
   - An old address such as `/feed/` redirects.
   - `/nonexistent/` shows the 404 page with the phone number.

Notes:

- `_headers` (security headers and the hashed Content-Security-Policy) and `_redirects` (67 one-hop 301s for the
  old addresses) are inside the folder. Cloudflare applies them automatically. Always upload the output of
  `npm run build` / `tools/package.mjs`, never `public/`: the CSP hashes are filled in at build time.
- The folder also contains a short `README.txt`. It is harmless if published.
- **Later updates:** open the project, go to **Deployments → Create deployment**, and drag the new
  `_UPLOAD_TO_CLOUDFLARE/` folder. A rollback is one click on an earlier deployment.
- **Spanish 404:** a missing `/es/...` address shows the English 404 page. That page still has the phone number
  and an "Español" link. Cloudflare serves the nearest `404.html`, and only `dist/404.html` exists. This is an
  accepted limitation.

## 2. Connect the domain willfraleylaw.com

1. **Put the domain's DNS on Cloudflare,** if it isn't already: **Add a domain → willfraleylaw.com → Free plan**.
   Cloudflare's import must keep the **email records** (MX, SPF/TXT, DKIM, autodiscover) exactly as they are.
   inbox@willfraleylaw.com must keep working. Compare against the current DNS at Hostinger before you switch
   nameservers at the registrar.
2. In the Pages project, go to **Custom domains → Set up a custom domain → `willfraleylaw.com`**. Cloudflare
   replaces the apex record that points at Hostinger with one pointing at Pages.
3. **www → apex:** follow `plan/WWW-REDIRECT.md` exactly. It covers the proxied `www` DNS record and a Bulk
   Redirect `www.willfraleylaw.com/` → `https://willfraleylaw.com/` (301, keep path and query). Add it before
   go-live. Every canonical tag, hreflang link and the sitemap already use `https://willfraleylaw.com/` without
   www.
4. **SSL/TLS → Edge Certificates → Always Use HTTPS: On.** The headers send HSTS (1 year, includeSubDomains).
   Confirm that no browsed subdomain is HTTP-only.
5. Check:
   - `curl -sI https://www.willfraleylaw.com/criminal-defense/dui/` returns 301 to the apex address.
   - `curl -sI http://willfraleylaw.com/` returns 301 to https.

## 3. Old WordPress shortlinks (`/?p=<id>`)

Cloudflare Pages `_redirects` cannot match query strings. 26 old addresses (`/?p=1` … `/?p=164`, `/?author=1`)
therefore open the home page with a 200 until you add one of these fixes. `NEEDS-OPERATOR.md` (section A23) has
the full ID → page table and both fixes.

- **If you upload by drag-and-drop (this handoff): use zone Redirect Rules.**
  1. Go to **willfraleylaw.com → Rules → Redirect Rules → Create rule**, choose **Static**, set status **301**
     and turn **Preserve query string OFF**.
  2. The free plan allows 10 rules. Use one rule for the three `/` targets:
     `http.request.uri.path eq "/" and http.request.uri.query in {"p=1" "p=46" "author=1"}`.
  3. Give the other nine rules to the most-linked pages: DUI (`p=95`), Criminal Defense (`p=89`), Family Law
     (`p=111`), Divorce (`p=106`), Custody (`p=105`), Contact (`p=115`), About (`p=60`), Personal Injury
     (`p=110`) and Drug Crimes (`p=92`).
  4. The www → apex redirect uses Bulk Redirects, so it does not use up one of these ten.
- **If you later deploy with Wrangler or a Git-connected build:** use the `functions/index.js` Pages Function
  given in `NEEDS-OPERATOR.md`. It covers all 26 addresses and runs only on `/`. Drag-and-drop uploads do not
  compile Functions.

## 4. Keys and tracking IDs, later

Nothing secret lives in this repository. When the keys arrive, run the instructions in **`FINISH-PROMPT.md`**.
`tools/configure.mjs` writes the public IDs into `site.config.json`, rebuilds, runs `check.mjs --final` and
repackages.

- **Web3Forms access key:** create it for **inbox@willfraleylaw.com**. It turns the EN and ES contact forms on.
  Success redirects to `/thank-you/` (EN) or `/es/gracias/` (ES).
- **Cloudflare Turnstile site key (optional):** also turn on captcha verification in the Web3Forms dashboard
  with the matching secret. Without that, the widget is only a check in the visitor's browser.
- **Tracking IDs (optional):** GA4, Meta Pixel, TikTok Pixel and Microsoft Clarity. The owner has not yet
  approved any of them (`NEEDS-OWNER.md`). The old site's GA4 property was `G-MN6QWEVWM4`. Ad pixels on a
  criminal and family law site deserve a second thought, because visitors' interest in these pages is sensitive.
- The CSP in `_headers` already allows the Web3Forms, Turnstile, GA4, Clarity, Meta and TikTok hosts. Rebuild
  after any key change so the inline-script hashes match.
- After keys are added, re-upload `_UPLOAD_TO_CLOUDFLARE/` as a new deployment (section 1).

## 5. How consent works

- **At launch, with no tracking ID set:** no banner appears and no consent script ships, except on Cookie
  Settings. The Cookie Settings page (`/cookie-settings/`, `/es/configuracion-de-cookies/`) still shows the
  three categories and says that no optional tool is on.
- **Once any tracking ID is configured:** a non-modal banner appears at the bottom, above the phone call bar. It
  has three equal buttons: **Accept all · Reject all · Settings**. Nothing optional loads before a choice. GA4
  and Clarity load only after **Analytics** is accepted. Meta and TikTok load only after **Marketing** is
  accepted. No tracker `<script>` is ever in the page HTML.
- **Storage:** the choice is kept in a first-party cookie named `consent` (180 days) plus a localStorage
  mirror. Nothing is stored on a server.
- **When visitors are asked again:** when the choice is older than 180 days, when a new vendor key is added, or
  when `consentPolicyVersion` in `site.config.json` is raised. Raise it and rebuild if the Privacy Policy changes
  in a way that needs fresh consent.
- **Global Privacy Control:** a GPC signal counts as Reject for both optional categories.
- **Withdrawing consent:** this stops the tool from the next page and clears its cookies.
- The footer's "Cookie settings" link reopens the choices on every page.
- The Privacy and Cookie Settings pages list only the vendors that are switched on. They are regenerated on
  every build from `site.config.json`.
- Test with `npm run build && node tools/consent-test.mjs`. It needs no real keys.

## 6. Editing copy

All words live in **`copy/pages/<slug>.md`** (English) and **`copy/pages/es/<slug>.md`** (Spanish). For
example, `/criminal-defense/dui/` is `copy/pages/criminal-defense/dui.md`.

1. Edit the Markdown.
2. Keep the frontmatter rules:
   - `title` is 60 characters or fewer.
   - `description` is 140–155 characters.
   - Leave `h1`, `primary_cta` and `schema_type` in place.
3. Keep the section hints on their own lines: `[hero]`, `[cards]`, `[faq]`, `[cta-band]` and so on.
4. **Fact tags.** Every factual sentence ends with `{fact:F###}`, and every sentence with a digit must have
   one. The ID points to an entry in `inventory/facts.json` that quotes the old site. A new fact from the owner
   needs a new ledger entry first, with its source (for example "owner email, date"). Never add a claim
   without one.
5. **Testimonials** stay verbatim: `> "exact text" — Attribution {fact:F0xx}`. Any page with a review or result
   keeps "Prior results do not guarantee a similar outcome."
6. **Spanish pages** may cite only fact IDs that their English twin cites.
7. **Words to avoid:** "specialist", "expert", "certified" and "guarantee" (except inside the results
   disclaimer), plus the warn-list in `CLAUDE.md`. `check.mjs` flags them.
8. Rebuild, check and package:

   ```
   npm run build
   node tools/check.mjs --final
   node tools/package.mjs
   ```

   Then upload the new `_UPLOAD_TO_CLOUDFLARE/` as a new deployment. If `check.mjs --final` fails, fix it
   before uploading. Never edit `tools/check.mjs`: it is hash-locked.
9. **Policy pages** show "Last reviewed: <build date>". To pin the date the owner actually reviewed them, run
   `POLICY_REVIEWED=YYYY-MM-DD npm run build`.
10. **Re-running the quality tests.** The Accessibility Statement promises these can be re-run:
    `node tools/axe.mjs --dist dist --out qa/axe.json` and
    `node tools/lighthouse.mjs --dist dist --out qa/lighthouse.json` (add `--runs 3` for stable numbers).

## 7. Spanish review (before launch)

The `/es/` pages are professionally written but **have not been read by a native speaker at the firm**. Ask
the owner to have a Spanish-speaking staff member read every `/es/` page once. Things to confirm:

- **Theft:** *robo* or *hurto*?
- **Spanish callers:** can a Spanish-only caller be helped at (615) 410-7290?
- **Labels:** do the consent and form labels read naturally?

Make corrections in `copy/pages/es/*.md`, keeping the fact tags. Then rebuild, check, package and re-upload as
in section 6. The web addresses under `/es/` are fixed in `plan/sitemap.json`. Renaming one means updating the
sitemap and adding a redirect from the old address, so avoid it after launch.

## 8. After go-live

- **Google Search Console:**
  1. Verify the domain property.
  2. Submit `https://willfraleylaw.com/sitemap-index.xml`.
  3. Remove the old `/sitemap_index.xml` submission. It now 301s to the new sitemap.
  4. Request indexing for `/` and `/es/`.
- **Google Business Profile:**
  - Set the website to `https://willfraleylaw.com/`.
  - Check that the hours say Friday 9:00–4:00.
  - Send the profile's Maps link to swap into the site (it currently links a Maps search for the address).
- **Social previews:** re-scrape Home, Contact, Legal Services, Criminal Defense, About and Family Law in the
  Facebook Sharing Debugger and the LinkedIn Post Inspector.
- **Directories:** update listings (Avvo, Nolo, USLegal, abogado.com with the `/es/` URL) with the exact name,
  address and phone. Do this by hand; no agent signs up for anything.
- **DNJ article link** (`/in-the-news/`): check by hand that it still opens. Our link checker was blocked by
  the site (403). Facebook, LinkedIn and Avvo also block automated checks, so click those footer links once too.

## 9. Take the old site down (after the new one is live and checked)

1. Wait until willfraleylaw.com and www both serve the new site and the redirect checks in section 2 pass.
2. **Hostinger staging host `beige-baboon-435532.hostingersite.com`:** the old site linked to it from DUI,
   Domestic Assault and Legal Services. Take it offline, or at least set it to noindex. Then delete it from the
   Hostinger account once the owner agrees.
3. **Old WordPress site:** once DNS points at Cloudflare and nothing serves from Hostinger, export a final
   backup (files + database), keep it with the firm's records, and then cancel or delete the WordPress hosting.
   **Do not cancel anything that also carries the firm's email or domain registration.** Check where the MX
   records and the registrar live first.
4. In Search Console, watch **Pages → Not found (404)** for two weeks. Add any missed old address to
   `plan/sitemap.json` redirects, rebuild and re-upload.
