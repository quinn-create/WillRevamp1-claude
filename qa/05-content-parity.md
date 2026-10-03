# 05-content-parity
Result: PASS

Round 2. The reviewer re-ran every round-1 measurement against the current tree.

- **Inputs:**
  - `inventory/facts.json`: 315 facts from 24 old pages.
  - `inventory/text/*.md`: 24 files.
  - `copy/pages/**/*.md`: 31 EN and 31 ES files.
  - `dist/`: 60 HTML pages, built at 16:49. No copy, src, inventory or sitemap file is newer than the build.
  - `src/lib/site.ts`, `NEEDS-OWNER.md` (374 lines) and `inventory/CONFLICTS.md` (C01–C19).
- **Method:** throwaway scripts in the scratchpad. No site code was edited and nothing was committed.

## 1. Ledger facts vs new site (per old page)

All 24 old pages map through `plan/sitemap.json` `old[]` to a new EN copy file, an ES copy file and a built page (24/24).

| Outcome | Round 1 | Round 2 |
|---|---|---|
| Cited `{fact:}` on the matching new EN page | 176 | 176 |
| Cited on another EN page | 30 (combined with the row below) | 23 |
| Rendered from `src/lib/site.ts` (NAP, hours, geo, socials) | (in the row above) | 7 |
| Not used, but covered by an owner question (ID, or a C-code in NEEDS-OWNER) | 69 | **80** |
| Not cited by ID, content present on the site or covered by a prose owner note | 29 | 29 |
| **Dropped without an owner note** | **11** | **0** |

Per old page, the columns below are: total / same page / other page / site.ts / owner note / present under another ID or prose note.

| Old page | Total | Same page | Other page | site.ts | Owner note | Other ID or prose note |
|---|---|---|---|---|---|---|
| / | 69 | 19 | 13 | 7 | 23 | 7 |
| /about/ | 33 | 25 | 0 | 0 | 5 | 3 |
| /contact-us/ | 9 | 2 | 1 | 0 | 3 | 3 |
| /criminal-defense/ | 7 | 3 | 2 | 0 | 2 | 0 |
| /criminal-defense/dui/ | 33 | 11 | 0 | 0 | 18 | 4 |
| /criminal-defense/fraud/ | 17 | 14 | 0 | 0 | 3 | 0 |
| /criminal-defense/sex-crimes/ | 7 | 6 | 0 | 0 | 1 | 0 |
| /criminal-defense/violent-crimes/ | 7 | 6 | 0 | 0 | 0 | 1 |
| /criminal-defense/theft/, drug-crimes/, domestic-assault/, probation-violation/ | 4, 1, 4, 3 | 4, 1, 4, 2 | 0 | 0 | 0, 0, 0, 1 | 0 |
| /faqs/ | 21 | 13 | 1 | 0 | 4 | 3 |
| /family-law/ | 16 | 9 | 1 | 0 | 5 | 1 |
| /family-law/child-custody/ | 12 | 7 | 2 | 0 | 2 | 1 |
| /family-law/visitation/ | 7 | 4 | 0 | 0 | 2 | 1 |
| /family-law/divorce/, paternity/, parenting-plan-modifications/ | 7, 3, 5 | 7, 3, 5 | 0 | 0 | 0 | 0 |
| /legal-services/ | 13 | 1 | 3 | 0 | 8 | 1 |
| /personal-injury/ | 8 | 6 | 0 | 0 | 1 | 1 |
| /adoption/ | 9 | 8 | 0 | 0 | 1 | 0 |
| /dcs-case-attorney/ | 10 | 10 | 0 | 0 | 0 | 0 |
| /testimonials/ | 10 | 6 | 0 | 0 | 1 | 3 |

### Round-1 defects

All 11 are now covered in `NEEDS-OWNER.md`:

- **F089, F113, F115:** line 12, the A00-orchestrator "Old footer and form lines" bullet.
- **F307–F310:** line 177, the A16 G2 "Other DUI consequences left out" bullet.
- **F263, F264, F265:** line 199, the A16 G4 "Divorce rules left out" bullet.
- **F132:** line 200, the A16 G4 "Respect of the judiciary" bullet.

Each ID appears once. The notes come from the fragments (`plan/fragments/A00-orchestrator/needs-owner.md` and `plan/fragments/A16/needs-owner.md`). A dry run of `tools/merge-fragments.mjs`'s logic gives output byte-identical to the current `NEEDS-OWNER.md`, so a later merge will not lose them.

### The 29 facts not cited by ID

Each of these was re-checked in `dist/`. All are present on the site or covered by a prose owner note.

**Present on the site under other IDs or in components:**

| Facts | Where they appear in `dist/` |
|---|---|
| F014, F018 | The phone is on 60/60 pages. |
| F022, F023 | JSON-LD on 50/50 pages. |
| F145, F297, F300 | Home cards and footer: "Criminal Defense" 8×, "Family Law" 6×, "Personal Injury" 3× on /. |
| F012, F075 | /about/ lists TBA, the Rutherford and Cannon County Bar Association, and TACDL. |
| F110, F114 | `#cf-client` select, `maxlength="600"` and "Up to 600 characters" on /contact-us/. |
| F155, F162 | "Underage DUI" and "Vehicular homicide" cards on /criminal-defense/dui/. |
| F198 | "Parenting Plan Modifications" card on /family-law/. |
| F249 | "Car wrecks" on /personal-injury/. |
| F315 | /family-law/child-custody/ links to /adoption/ (2 links). |
| F294, F295, F296 | The attributions are paired correctly with their quotes in 42/42 rendered blockquotes. |
| F049, F109, F206 | Covered by cited facts; "child support" appears on 8 EN pages. |
| F301 | Covered by the H1 and F001/F038. |

**Covered by a prose owner note:**

| Fact | NEEDS-OWNER.md |
|---|---|
| F282 | Line 225 ("DUI, DWI or OWI"). |
| F272 | Line 180 (the death-penalty sentence). |
| F268 | Line 198 ("until … the child turns 18"). |
| F311 | Lines 176 and 287 (test refusal). |
| F303 | C18 (line 48). `CONFLICTS.md:325` quotes "Considered a misdemeanor by law" under C18. |

## 2. Copy file vs built page

- **Sentences:** 1,777 `{fact:}`-tagged sentences from the EN and ES copy (the blog scaffold is excluded because it is hidden). The first 45 normalized characters of each were searched for in the matching built page.
  - 1,774 were found.
  - All 3 misses are expected:
    - /in-the-news/: the date line renders in a different order, and the facts are present.
    - /privacy-policy/ and /es/politica-de-privacidad/: the Web3Forms paragraph is gated off while the form is off, and the `[vendor-off]` paragraph shows the same email.
- **EN/ES fact parity:** 30 pairs checked. No ID appears only in ES, and no ID appears only in EN.

## 3. Testimonials verbatim

- **Copy:** all 46 testimonial blockquotes (EN and ES, citing F133, F134, F135 or F136) match the ledger `exact_quote` character for character. 0 mismatches.
- **Built pages:** all 48 `<blockquote>` elements in `dist/` contain a ledger quote verbatim: 46 testimonials plus 2 of the About baseball quote, F055.
  - The F135 text renders with a typographic apostrophe ("I’m") because `smart()` is applied in `src/components/Testimonial.astro:30` and `src/pages/_templates/Quotes.astro:40`.
  - The ledger, the copy and the old site use a straight `'`. The locked `tools/check.mjs:72` treats ‘’ as `'` when it checks verbatim quotes, so this is the project's accepted typography, not a wording change.
  - Every word and punctuation mark is otherwise identical. The truncated F133 keeps "…I highly recommend" with a marked omission (C15).
- **Attributions:** all 42 rendered testimonials of F133, F134 and F135 are followed by the correct name: Katherine S., Eddie W. and S.A.

## 4. NAP and hours consistency (60 built pages)

- **Phone:**
  - The only phone string in visible text is "(615) 410-7290" (60/60 pages).
  - The only `tel:` link is `tel:+16154107290` (60/60).
  - JSON-LD `telephone` is "+1-615-410-7290" on all 50 pages that have JSON-LD, on both the LegalService node and the nested person node.
- **Email:** the only address is `inbox@willfraleylaw.com`, in visible text (60/60), in `mailto:` links (60/60) and in JSON-LD `email` (50/50).
- **Address:**
  - "509 W College St" and "TN 37130" are the only street and ZIP strings (60/60 pages).
  - The footer has the full NAP on 60/60 pages.
  - JSON-LD `address` is identical on all 50 pages: `{"streetAddress":"509 W College St","addressLocality":"Murfreesboro","addressRegion":"TN","postalCode":"37130","addressCountry":"US"}`.
- **Hours:**
  - EN footer: "Monday–Thursday 9:00 a.m. – 5:00 p.m. Friday 9:00 a.m. – 4:00 p.m." (30/30).
  - ES footer: "Lunes a jueves 9:00 a. m. – 5:00 p. m. Viernes 9:00 a. m. – 4:00 p. m." (30/30).
  - Body text (Contact and the other pages that state hours, EN and ES) uses the same times. No other time strings appear.
  - JSON-LD `openingHoursSpecification` is Mon–Thu 09:00–17:00 and Fri 09:00–16:00, identical on 50/50 pages. The old schema's Friday 17:00 (F033) is queued to the owner as C07.
- **Pages without JSON-LD:** 10, the 404, accessibility, cookie-settings, privacy and thank-you pages in EN and ES. All carry the full footer NAP.
- **Footer legal line:** "not legal advice" or "no constituye asesoramiento legal" on 60/60 pages.

Every requirement is met:

- 0 ledger facts are dropped without an owner note.
- Testimonials are verbatim.
- Phone, address, email and hours are identical in the footer, on Contact and in JSON-LD on every page.

## Fixes

None required. All 11 round-1 defects are resolved by the owner notes listed in section 1, and no new defects were found.
