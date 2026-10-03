# 05-content-parity
Result: FAIL

Round 1. Reviewer checked `inventory/facts.json` (315 facts, 24 source pages) against every `copy/pages/**/*.md`
file (31 EN + 31 ES, plus the blog template), the built site in `dist/` (60 HTML pages), `src/lib/site.ts`, and
`NEEDS-OWNER.md` (370 lines). It also checked them against `inventory/CONFLICTS.md` (C01–C19), including the
range "F250–F262" in C18. Scripts were throwaway and run from the scratchpad. No site code was edited.

## 1. Ledger facts vs new site (per old page)

Where each of the 315 ledger facts ended up:

| Outcome | Facts |
|---|---|
| Cited `{fact:}` on the matching new EN page | 176 |
| Cited on another EN page, or rendered from `src/lib/site.ts` (NAP, hours, geo, socials) | 30 |
| Not used, covered by an owner question (C-code in NEEDS-OWNER, or the ID named there) | 69 |
| Not cited by ID | 40 |

Here is how the 40 facts not cited by ID break down:

- **24: the content is on the new site under another fact ID, or in the form or JSON-LD.** Each was checked in `dist/`:
  - F014 and F018: the phone is on all 60 pages.
  - F022 and F023: the JSON-LD has `509 W College St` and `37130` (sourced via F021).
  - F145, F297 and F300: the Criminal Defense, Family Law and Personal Injury areas are in the home cards and footer.
  - F301: this eyebrow label is covered by the H1 "Criminal defense and family law in Murfreesboro" and by F001/F038.
  - F012 and F075: these are headings. The memberships render on /about/.
  - F110: the form has a "new / current / neither" select (`#cf-client`).
  - F114: the message box has `maxlength="600"` and says "Up to 600 characters".
  - F149, F049, F109 and F206: the services and Murfreesboro wording are covered by other cited facts. "Child support" appears on 11 EN pages.
  - F198: the Parenting plan modifications card is on /family-law/.
  - F155 and F162: the DUI page has "Underage DUI" and "Vehicular homicide" cards.
  - F249: the PI page says "car wreck".
  - F315: /adoption/ exists and is linked.
  - F294, F295 and F296: the attributions "Katherine S.", "Eddie W." and "S.A." are rendered with F133, F134 and F135.
- **5: an owner note exists in prose, without the ID:**
  - F282 ("DUI, DWI or OWI"): NEEDS-OWNER.md line 221.
  - F272 (the death-penalty sentence): line 178.
  - F268 (the parenting plan lasts until age 18): line 196.
  - F311 (a test refusal can be used in court): line 175, the test-refusal question.
  - F303 (DUI "misdemeanor"): the same statement as F252, which is in C18 at line 47 and line 174.
- **11: DROPPED WITHOUT AN OWNER NOTE. These are the defects, listed below.**

| # | Fact | Old page | What was dropped | Where the drop is recorded (not an owner note) |
|---|---|---|---|---|
| 1 | F263 | /family-law/ | Divorce residency: one spouse must have lived in Tennessee for 6 months (Tenn. Code Ann. § 36-4-104(a)) | DECISIONS.md:565 and 599 cite "C18", but C18 and its owner question cover only DUI, Sex Crimes and FAQs |
| 2 | F264 | /family-law/ | No-fault divorce takes 2–6 months; a contested divorce takes months to years | same |
| 3 | F265 | /family-law/ | Fault-grounds examples (adultery, impotence, criminal conduct) | not recorded anywhere |
| 4 | F132 | /family-law/child-custody/ | "we have earned the respect of both the judiciary and our peers" | DECISIONS.md:604 ("unverifiable comparison") |
| 5 | F307 | /criminal-defense/dui/ | A first-offense DUI likely also requires an alcohol and drug treatment program | DECISIONS.md:90. F303–F311 were added after C18, so the "F250–F262" range does not include them |
| 6 | F308 | /criminal-defense/dui/ | After a second DUI, license restrictions (probation, work-release permits) can apply after the license is returned | same |
| 7 | F309 | /criminal-defense/dui/ | Felony DUI: a judge may order restitution if anyone was harmed | same |
| 8 | F310 | /criminal-defense/dui/ | Harsher consequences with a passenger under 18 | same |
| 9 | F089 | / (footer) | "© 2019-2026 All Rights Reserved." The new footer reads "© 2026 Will Fraley, Attorney at Law", so the 2019 start year is gone | not recorded |
| 10 | F113 | /about/ (form) | The SMS/automated-contact consent sentence | DECISIONS.md:245 (D-A09-1). The NEEDS-OWNER line 229 "texting" note does not tell the owner the old line was removed |
| 11 | F115 | / (footer) | Footer credit "Knoxville Web Design" | not recorded |

## 2. Copy file vs built page

- I split the 31 EN and 31 ES copy files into 1,763 `{fact:}`-tagged sentences. I then searched for the first 45 characters of each in the built page, after normalizing whitespace and punctuation spacing.
  - 1,758 were found.
  - 5 were not found as written. All 5 are expected:
    - /in-the-news/: the date line renders in a different order, but the facts are present.
    - /contact-us/ and /es/contacto/: the Maps link label is "Open the address in Google Maps", and the address is present.
    - /privacy-policy/ and /es/politica-de-privacidad/: the Web3Forms paragraph is gated off while the form is off (`[vendor: web3forms]`). The `[vendor-off]` paragraph that renders carries the same email.
  - /blog/ is hidden by design. 404 is built as `dist/404.html`.
- EN/ES fact parity: 31 pairs, 0 IDs only in ES, 0 IDs only in EN.

## 3. Testimonials verbatim

- 46 testimonial blockquotes in copy (EN + ES) carry F133, F134, F135 or F136. All 46 match the ledger `exact_quote` character for character. This includes the truncated "…I highly recommend" (C15).
- 48 `<blockquote>` elements in `dist/`:
  - 46 contain a ledger testimonial verbatim.
  - The other 2 are the About baseball quote (F055), which is verbatim.
- 0 mismatches.

## 4. NAP and hours consistency (60 built pages)

- **Phone:** 60/60 pages show only "(615) 410-7290". `tel:` links are only `tel:+16154107290`, on 60/60 pages. JSON-LD `telephone` is "+1-615-410-7290" on all 50 pages with LegalService.
- **Email:** only `inbox@willfraleylaw.com` in text and `mailto:` (60/60), and in JSON-LD (50/50).
- **Address:**
  - Text: "509 W College St" plus "Murfreesboro, TN 37130" on 60/60 pages, and footer 60/60.
  - JSON-LD: `{"streetAddress":"509 W College St","addressLocality":"Murfreesboro","addressRegion":"TN","postalCode":"37130","addressCountry":"US"}` is identical on all 50 pages.
  - No other street or ZIP strings appear.
- **Hours:**
  - Footer: 30 EN pages read "Monday–Thursday 9:00 a.m. – 5:00 p.m. Friday 9:00 a.m. – 4:00 p.m.", and 30 ES pages read "Lunes a jueves 9:00 a. m. – 5:00 p. m. Viernes 9:00 a. m. – 4:00 p. m.".
  - Body text uses the same times: Contact, Home, About, FAQs, Accessibility and Thank-you, EN and ES.
  - JSON-LD `openingHoursSpecification`: Mon–Thu 09:00–17:00 and Fri 09:00–16:00, identical on all 50 pages. This follows C07, the footer form; the old 17:00 Friday (F033) is queued to the owner as C07.
- The 10 pages without JSON-LD are the policy, thank-you, cookie and 404 pages in EN and ES. They still carry the full footer NAP.
- Footer legal line: "not legal advice" or "no constituye asesoramiento legal" is on 60/60 pages.

The NAP, hours and testimonial checks pass. The check fails only on the 11 facts in section 1 that were dropped without an owner note.

## Fixes

Do not edit `NEEDS-OWNER.md` directly. Add each bullet to the fragment named below, then run
`node tools/merge-fragments.mjs` to regenerate `NEEDS-OWNER.md`. No copy or site code changes are needed.

1. **F263, F264, F265 (defects 1–3).** In `plan/fragments/A16/needs-owner.md`, insert a new bullet right after line 38, which is the "Temporary and permanent parenting plans" bullet at the end of the G4 section:
   `- **Divorce rules left out (/family-law/ and /family-law/divorce/).** The old Family Law page stated three Tennessee divorce rules that the new pages leave out: the six-month residency requirement under Tenn. Code Ann. § 36-4-104(a) (F263); that a no-fault divorce generally takes 2–6 months and a contested one months to years (F264); and examples of fault grounds such as adultery, impotence and criminal conduct (F265). Do you want any of these back, in wording you approve as current law?`
2. **F132 (defect 4).** In the same file, insert another bullet after the one added in fix 1:
   `- **"Respect of the judiciary and our peers" (/family-law/child-custody/).** The old Child Custody page said "we have earned the respect of both the judiciary and our peers" (F132). The new page leaves it out because the claim can't be verified under Tennessee RPC 7.1. Do you want it back, and if so can you point to something that supports it?`
3. **F307, F308, F309, F310 (defects 5–8).** In `plan/fragments/A16/needs-owner.md`, insert a new bullet right after line 17, the "DUI page, implied consent" bullet in the G2 section:
   `- **Other DUI consequences left out (/criminal-defense/dui/).** Besides the fines, jail minimums and revocation periods (C18), the old DUI page also said that a first offense likely requires an alcohol and drug treatment program (F307), that license restrictions such as probation or work-release permits may continue after a second-offense license is returned (F308), that a judge may order restitution if anyone was harmed (F309), and that consequences are more severe with a passenger under 18 (F310). The new page states none of these. Do you want any of them back, in wording you approve as current law?`
4. **F089, F113, F115 (defects 9–11).** In `plan/fragments/A00-orchestrator/needs-owner.md`, append a new bullet after line 3, the "Logo" bullet:
   `- **Old footer and form lines not carried over (footer on every page; /contact-us/ form).** The old footer read "© 2019-2026 All Rights Reserved." (F089) and credited "Knoxville Web Design" (F115). The new footer reads "© 2026 Will Fraley, Attorney at Law" with no designer credit. The old form's SMS consent sentence ("By submitting, you agree to be contacted about your request & other information using automated technology…", F113) is also gone, because the new form does not sign anyone up for texts. Should the copyright show 2019 as the first year? Does your web-design agreement require a credit? Do you plan to contact form senders by text message?`
5. After fixes 1–4, run `node tools/merge-fragments.mjs`. Then confirm that `grep -c "F263\|F264\|F265\|F132\|F307\|F308\|F309\|F310\|F089\|F113\|F115" NEEDS-OWNER.md` covers all 11 IDs.
