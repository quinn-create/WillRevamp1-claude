# A23: operator items

- **Query-string redirects (26 old WordPress URLs).** Cloudflare Pages `_redirects` cannot match a query
  string, so `/?p=<id>` and `/?author=1` are not in `public/_redirects`. Today they would serve the home page
  with a 200 (no harm, but the old page’s link equity is not passed on). Pick ONE of the two fixes after deploy.
  Pages affected: every page whose sitemap “old” list has a `/?p=` entry (Home, About, Legal Services, all
  criminal-defense and family-law pages, Adoption, DCS, Personal Injury, Testimonials, FAQs, Contact).

  **Option A (recommended): a Pages Function that runs only on `/`.** Create `functions/index.js` in the
  project root (next to `dist/`) with exactly this content. It only runs for requests to `/`; every other URL
  stays static. Pages Functions are compiled only by Git-connected builds or `npx wrangler pages deploy dist`
  (run from the folder that holds `functions/`); a dashboard drag-and-drop upload does not compile them. If the
  site is uploaded by drag-and-drop, use Option B for the most-linked pages instead.

  ```js
  // functions/index.js — 301 old WordPress shortlinks (/?p=<id>, /?author=<n>) to their new pages.
  const P = {
    "1": "/",
    "46": "/",
    "60": "/about/",
    "65": "/legal-services/",
    "89": "/criminal-defense/",
    "92": "/criminal-defense/drug-crimes/",
    "95": "/criminal-defense/dui/",
    "97": "/criminal-defense/theft/",
    "99": "/criminal-defense/violent-crimes/",
    "101": "/criminal-defense/fraud/",
    "102": "/criminal-defense/probation-violation/",
    "103": "/criminal-defense/domestic-assault/",
    "104": "/criminal-defense/sex-crimes/",
    "105": "/family-law/child-custody/",
    "106": "/family-law/divorce/",
    "107": "/family-law/parenting-plan-modifications/",
    "108": "/family-law/paternity/",
    "109": "/family-law/visitation/",
    "110": "/personal-injury/",
    "111": "/family-law/",
    "115": "/contact-us/",
    "118": "/testimonials/",
    "135": "/faqs/",
    "162": "/adoption/",
    "164": "/dcs-case-attorney/",
  };
  export async function onRequest({ request, next }) {
    const url = new URL(request.url);
    const p = url.searchParams.get("p");
    if (p && P[p]) return Response.redirect(new URL(P[p], url.origin).toString(), 301);
    if (url.searchParams.has("p") || url.searchParams.has("author") || url.searchParams.has("page_id"))
      return Response.redirect(new URL("/", url.origin).toString(), 301);
    return next();
  }
  ```

  **Option B: zone Redirect Rules** (Rules → Redirect Rules → Create rule → Static, status 301, “Preserve query
  string” OFF). One rule per row. The free plan allows 10 rules: the three rows that go to `/` fit in one rule
  (`http.request.uri.path eq "/" and http.request.uri.query in {"p=1" "p=46" "author=1"}`); give the other nine
  to the practice pages with the most old links (DUI, criminal defense, family law, divorce, custody, contact,
  about, personal injury, drug crimes).

| Old URL | Target | Expression |
|---|---|---|
| `/?p=1` | `/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=1"` |
| `/?author=1` | `/` | `http.request.uri.path eq "/" and http.request.uri.query eq "author=1"` |
| `/?p=46` | `/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=46"` |
| `/?p=60` | `/about/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=60"` |
| `/?p=65` | `/legal-services/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=65"` |
| `/?p=89` | `/criminal-defense/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=89"` |
| `/?p=92` | `/criminal-defense/drug-crimes/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=92"` |
| `/?p=95` | `/criminal-defense/dui/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=95"` |
| `/?p=97` | `/criminal-defense/theft/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=97"` |
| `/?p=99` | `/criminal-defense/violent-crimes/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=99"` |
| `/?p=101` | `/criminal-defense/fraud/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=101"` |
| `/?p=102` | `/criminal-defense/probation-violation/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=102"` |
| `/?p=103` | `/criminal-defense/domestic-assault/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=103"` |
| `/?p=104` | `/criminal-defense/sex-crimes/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=104"` |
| `/?p=105` | `/family-law/child-custody/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=105"` |
| `/?p=106` | `/family-law/divorce/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=106"` |
| `/?p=107` | `/family-law/parenting-plan-modifications/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=107"` |
| `/?p=108` | `/family-law/paternity/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=108"` |
| `/?p=109` | `/family-law/visitation/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=109"` |
| `/?p=110` | `/personal-injury/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=110"` |
| `/?p=111` | `/family-law/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=111"` |
| `/?p=115` | `/contact-us/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=115"` |
| `/?p=118` | `/testimonials/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=118"` |
| `/?p=135` | `/faqs/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=135"` |
| `/?p=162` | `/adoption/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=162"` |
| `/?p=164` | `/dcs-case-attorney/` | `http.request.uri.path eq "/" and http.request.uri.query eq "p=164"` |

- **www → apex.** Cloudflare Pages cannot redirect by host from `_redirects`. Add the Bulk Redirect in
  `plan/WWW-REDIRECT.md` (exact values there) before pointing DNS at the new site.
- **Security headers.** `dist/_headers` (from `public/_headers` + `tools/csp.mjs`) sets HSTS
  (max-age 1 year, includeSubDomains), a hashed CSP and the other headers. Always deploy the output of
  `npm run build`, never `public/` by hand: the CSP hash list is filled in at build time. If you add a tracking
  key with `tools/configure.mjs`, rebuild so the hashes match. HSTS includeSubDomains assumes every subdomain
  of willfraleylaw.com serves HTTPS (check mail/autodiscover hosts before go-live; they are DNS-only and
  unaffected unless browsed).
