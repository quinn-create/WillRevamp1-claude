# FACT-CHECK — willfraleylaw.com revamp copy

Fact-checker: A17. Inputs: `copy/pages/**` (EN and ES), `inventory/facts.json` (315 facts), `inventory/CONFLICTS.md`
(C01–C19), `plan/rules/law-firm.md`, `plan/sitemap.json`. Gate: `node tools/check.mjs --gate 4`.

## Summary

| Item | Result |
|---|---|
| Pages checked | 31 EN + 31 ES = 62 copy files (29 published pages plus the hidden `/blog/` scaffold and `/404/`, in both languages). `copy/pages/blog/_template.md` is a draft-only template and was screened for rules but carries no facts. |
| Fact tags | 892 tag groups in EN and 892 in ES. 199 distinct fact IDs are cited in EN, and ES cites the same 199 (no ES page cites an ID its EN twin does not). 116 ledger facts are not used: legal statements left out under C17/C18, structured-data-only facts (C06, C07), duplicates and old-site defects. |
| Unsourced facts / banned phrases / frontmatter / law rules | 0 errors, EN and ES (gate 4). No warn phrases remain. |
| Sentences rewritten to match their source | 160 rows across the seven group reports below (G1 15, G2 36, G3 28, G4 41, G5 22, G6 11, G7 7). No number, name, date, phone, address or email was altered. |
| Claims removed or moved to the owner | 34 owner questions queued in `plan/fragments/A17/needs-owner.md` (G1 6, G2 4, G3 10, G4 4, G5 4, G6 4, G7 2), plus 1 note from the final pass. Each names the page and the sentence affected. Unsourced promises were either cut, softened to a form the ledger supports, or turned into an invitation to call. |
| Operator items | 2 (`plan/fragments/A17/needs-operator.md`, G7: a 200% zoom check, and shipping the axe/Lighthouse tools with the handover). |
| Testimonials | Every quote of Katherine S. (F133), Eddie W. (F134) and S.A. (F135) and every card headline (F136–F138) was machine-compared against the ledger and matches character for character, typos and truncation included. Testimonials stay in English on ES pages, each followed by the results disclaimer. |
| Results disclaimer | Present on every page that carries a testimonial or mentions an outcome ("Prior results do not guarantee a similar outcome." / "Los resultados anteriores no garantizan un resultado similar."). |
| Free consultation | Every body mention in EN and ES sits beside a `tel:+16154107290` link to (615) 410-7290; frontmatter CTAs carry the number. |
| Internal links | Every internal link resolves to a path in `plan/sitemap.json`: EN copy links to `path`, ES copy links to `esPath`. The only cross-language links are the deliberate language switchers on `/`, `/404/`, `/es/` and `/es/404/`. |

## Conflicts resolved (inventory/CONFLICTS.md)

| ID | Topic | How the copy resolves it |
|---|---|---|
| C01 | Years of experience | "Practicing law since 2004" / "Ejerce desde 2004" (F087) on every page; no year count anywhere. |
| C02 | Firm name | "Will Fraley, Attorney at Law" on every EN and ES page; no other firm-name variant appears. |
| C03 | Attorney name | "Will Fraley" in copy; "Raymond Wilford Fraley, III" only in the About bio (F009, F010). |
| C04 | Melissa Harris | Named only inside verbatim testimonials. |
| C05 | Solo vs team / Katie Fults | Will Fraley is the attorney; Katie Fults appears only on /about/ (and /es/sobre-nosotros/). "Our firm has represented…" (F212) is rendered "The firm has represented…". |
| C06 | Counties | "Murfreesboro and the surrounding counties", with Rutherford, Coffee and Wilson where a list is needed; "Murfreesboro and Rutherford County" on adoption and DCS (F044, F045); Bedford, Cannon and Grundy only in Katie Fults's bio. No federal-practice claim (F048 used without "federal"). |
| C07 | Hours | Footer hours only: Mon–Thu 9:00 a.m.–5:00 p.m., Fri 9:00 a.m.–4:00 p.m. (F031, F032); one format sitewide (final pass). |
| C08 | Memberships | TBA, Rutherford and Cannon County BA, TACDL; the trial-lawyers group is left out. |
| C09 | Wills | Not listed as a service anywhere. |
| C10 | Murder card | No separate Murder card on the criminal hub; murder is covered on Violent Crimes (F192). |
| C11 | One-off practice areas | Immigration, military families and corporate clients do not appear. |
| C12 | Personal injury | Kept as a practice area; no fee basis, case count or claim about who handles PI matters. |
| C13 | Spanish services | "Se habla español" and "Spanish-speaking services" only; no "fully bilingual" or claim that Will speaks Spanish. |
| C14 | Consultation wording | "Free consultation" / "free initial consultation" (F090, F096), always beside the tel: link. |
| C15 | Testimonials | Verbatim, truncation included; no stars or aggregate rating; /testimonials/ says "as first published". |
| C16 | In the News | Only the 2014 DNJ item, described neutrally (F140, F142). |
| C17 | Theft thresholds | No dollar thresholds or theft grading anywhere. |
| C18 | Outdated legal statements | No penalty figures or statutes. Legal statements kept are hedged ("can", "may", "generally") and queued for owner approval; "refuse the test", "first-degree criminal sexual conduct" and "the parent who takes the children" are left out. |
| C19 | Credentials | "Completed" TACDL training (F063, F064) and "course-completion certificates" (F064, F065); never "certified"; no bar-admission claim. |

## Final consistency pass (A17, all pages, EN and ES)

| Item | Change |
|---|---|
| Hours format | `/` and `/about/` said "9:00 to 5:00"; `/es/` said "de 9:00 a 5:00". All now use the a.m./p.m. form the other pages use ("9:00 a.m. to 5:00 p.m."; "9:00 a. m. a 5:00 p. m."). |
| F058/F059 wording | Seven pages (EN `/`, `/about/`, `/criminal-defense/`, `/legal-services/`, `/faqs/` and their ES twins plus `/es/defensa-penal/delitos-sexuales/` and `/es/defensa-penal/violacion-de-libertad-condicional/`) said "his staff" / "su personal". The source says "his team", so all now read "his team" / "su equipo", as G2 set. Eddie W.'s verbatim "He and his staff" (F134) is unchanged. |
| Underage DUI | The old site uses both "underage DWI" (F153, criminal hub) and "Underage DUI" (F158, F162, the DUI page). Pages disagreed (`/legal-services/` and `/faqs/` said DWI; `/criminal-defense/` and `/criminal-defense/dui/` said DUI). All pages now say "underage DUI" / "DUI de menores de edad" and cite F153 together with F158, so the term is sourced verbatim everywhere. G1's owner question stays open. |
| Spanish service names | "Cambios al plan de crianza" became "Modificación del plan de crianza" (the title, card headings and link labels now match the slug and the other ten links). "Casos del DCS" became "Casos de DCS"; "Todo sobre derecho familiar" became "Todo el derecho familiar". |
| Checked and consistent | Phone always "(615) 410-7290" with `tel:+16154107290`; email always inbox@willfraleylaw.com; address always "509 W College St, Murfreesboro, TN 37130"; "Se habla español" on every page; practice names match the sitemap in both languages; county lists match C06; "one lawyer about both" (F057) is stated the same way on `/`, the DUI, domestic-assault and probation-violation pages, with the one-consultation question left to the owner. |

## Gate result

`node tools/check.mjs --gate 4` passes after the final pass (0 unsourced facts, 0 banned phrases, frontmatter
valid, law rules EN + ES, every page has EN and ES copy, this file present).

---

# Per-group notes

The sections below are the per-group fact-check reports from `copy/fact-check/G1.md` – `G7.md`, included unchanged.


## G1

Scope: the English copy for `/legal-services/`, `/family-law/`, `/personal-injury/` and `/about/` (`copy/pages/<slug>.md`). Each tagged sentence was compared against its fact's `claim` and `exact_quote` in `inventory/facts.json`. For the About bio, the claims were also checked against the old page's HTML (`inventory/html/about.html`). Untagged sentences were checked for hidden factual claims. Each page was also checked for law-firm rule breaches (plan/rules/law-firm.md) and warn phrases. Every fact ID cited resolves, and every testimonial was checked against its fact verbatim (F133, F134, F135). Every page that carries a testimonial or a settlement reference keeps "Prior results do not guarantee a similar outcome." The memberships list follows the C08 safest form (TBA, Rutherford and Cannon County BA, TACDL; the trial-lawyers group is left out). The years follow C01 ("practicing law since 2004"). Katie Fults appears only on /about/, per C05 and rule 12. No warn phrases were found. `node tools/check.mjs --gate 4` reports no errors for these four files.

### Changes made

| Page | Line / section | Before | After | Reason |
|---|---|---|---|---|
| /legal-services/ | Hero, para 2 | "Most of his work happens in two courts." | "His practice centers on two courts." | F057 says he "dedicates his practice" to criminal and family court. It gives no share of his workload, so "most" was unsupported. |
| /legal-services/ | DUI card | "First and second offense, felony and underage DUI" | "First and second offense DUI, felony DUI and underage DWI" | The service name had been altered: F153 says "underage DWI". The new copy restores it, and an owner question asks whether to change it. |
| /legal-services/ | "When a charge and a family case meet" | "You can bring both matters to the same consultation, and you only have to tell your story once. {F057,F090}" | "If you are dealing with both, say so when you call (615) 410-7290 for a free consultation. {F013,F090}" | The old line was an unsourced service promise. The new line is an invitation, with the free consultation beside the `tel:` link. An owner question was queued. |
| /legal-services/ | FAQ | "Does Will Fraley handle personal injury cases himself? Yes. Will Fraley handles personal injury cases…" | "Does Will Fraley handle personal injury cases? Yes. Personal injury is one of his three practice areas…" | "Himself" implied personal handling of PI matters. No fact states that, and C12 asks the owner who handles them. F144 supports only the practice area. |
| /family-law/ | "Putting your children first" | "…on a plan your family can actually live with." (untagged) | "…on a parenting plan that gives them stability. {F210}" | This was an untagged claim about the firm's approach. It is now tied to F210 ("Developing a solid parenting plan … helps create stability for the child"). |
| /family-law/ | Divorce card | "Whether you are filing or your spouse already has, the work covers…" | "Filing for divorce, and the issues it brings with it: child support, property division and spousal support." | F205 covers only petitioning for divorce, so representing a responding spouse was unsupported. The old line also echoed the warn pattern "whether you're". An owner question was queued. |
| /family-law/ | Visitation card | "If visitation is being denied, a parent can ask the court to enforce it." | "A parent who is denied visitation can file a petition asking the court to enforce it." | This was tightened to match F227 ("they can file a petition for enforcement with the court"). |
| /family-law/ | Steps, step 3 | "Spouses can settle some disputes between themselves, or with help from a mediator." | "Spouses on amicable terms may be able to settle some disputes…" | F266 is flagged "verify current law". The source's own condition ("If you and your spouse are on amicable terms, you may be able to…") was restored, and an owner question was queued. |
| /personal-injury/ | "What a claim can cover" | "Nobody can tell you that honestly before looking at those facts, and Will won't try." | "…so the conversation starts with those facts, not with a number." | The old line implied a comparison with other lawyers and made an untagged promise about conduct (RPC 7.1). |
| /personal-injury/ | Steps, step 4 | "Most personal injury cases are settled directly with the at-fault party's insurance company." | "Many injury claims are resolved by negotiating directly with the at-fault party's insurance company." | F288 is a legal or statistical statement flagged "verify current law". It was softened to a form that is true under every version, and an owner question was queued. |
| /personal-injury/ | FAQ "Will my case go to trial?" | "Most personal injury cases are settled… Whether yours may be different is something to ask…" | "Not necessarily. Many injury claims are resolved through negotiation… How your own case is likely to go is a good question to ask at your consultation." | Same reason as step 4. The old line also echoed the warn pattern "whether you're". |
| /about/ | Hero | "Will Fraley grew up around the law. His parents both practiced law…" | "Will Fraley grew up around the law: his parents both practiced law… {F052}" | The first sentence was an untagged factual claim. Joining the two sentences puts it under the F052 tag. |
| /about/ | "Will's story" | "At MTSU he played on the baseball team." | "At MTSU he was a member of the baseball team." | F054 says "was a member of the baseball team". "Played on" claims more than the source does. |
| /about/ | Baseball quote | `> "Baseball is…" — Will Fraley` | `> "Baseball is…"`, introduced by "To this day, Will shares this philosophy:" | The old page says Will "shares the philosophy". It never credits him with the words, so the new copy no longer credits them to him. An owner question was queued. |

### Checked and kept (no change)

- **/legal-services/:** all practice-area cards (F048 without the federal claim, per C06; F153–F238; F243–F248). The counties come from F035 and F036. Spanish service is limited to "Se habla español" and "Spanish-speaking services" (F092, F094; C13). Eddie W. is quoted verbatim, typo included (F134), and the results disclaimer is present.
- **/family-law/:** the custody, parenting-plan, paternity, adoption and DCS cards and the domestic-violence section (F207, F186). The steps cite F204, F201–F203, F313, F223 and F221. Katherine S. is quoted verbatim, including the truncation (F133). It mentions a "fair settlement", and the page carries the disclaimer.
- **/personal-injury/:** the case types (F243, F244, F248). "Wrongful death" is confirmed in the old /legal-services/ text ("serious injury or wrongful deaths"). Damages come from F245. The page claims no fee basis and no size of experience (C12).
- **/about/:** the full name (F009, F010), 1992 and MTSU (F053), Nashville School of Law 2004 (F060), Judge Ben Hall McFarlin, Jr. (F061), "Later he opened…" (supported by "With over 10 years of experience, he opened…", F062), "dedicated trial attorney" (F056), and the TACDL certificates (F063–F066; never "certified"). The memberships follow C08. Katie Fults's bio drops the old "top law firms" (F118; no comparisons). The DNJ item (F140) is described neutrally, per C16. The address and hours come from F021, F031 and F032. S.A. is quoted verbatim (F135); the client's comparison stays because testimonials are reproduced verbatim (rule 7), and the disclaimer is present.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G1")

1. Whether one free consultation can cover both a criminal and a family matter (/legal-services/).
2. "underage DWI" versus "underage DUI" (/legal-services/).
3. Whether the firm represents spouses who are responding to a divorce petition (/family-law/).
4. Approval of the mediation wording, and whether to state when Tennessee requires mediation (/family-law/, F266).
5. "Most" versus "many" for injury claims that settle with the insurer (/personal-injury/, F288).
6. Whether the baseball philosophy may be quoted in Will's name (/about/, F055).

## G2

Scope: copy/pages/criminal-defense/dui.md, drug-crimes.md, theft.md, violent-crimes.md (EN). I checked every tagged sentence against the cited facts in inventory/facts.json (claim and exact_quote). I checked the testimonials programmatically against their facts, and all are verbatim (S.A. F135 on DUI and Theft; Eddie W. F134 on Drug Crimes and Violent Crimes). I also screened for warn phrases and law-firm rule terms (best/top/leading, expert/specialist/certified, guarantee outside the disclaimer, federal claims). No hits were found. No number, name or date had been altered. "Practicing law since 2004" (F087) follows C01. Each page carries the results disclaimer.

### /criminal-defense/dui/
| # | Before | After | Why |
|---|---|---|---|
| 1 | "That is what the free consultation is for. {F090,F099}" | "…the free consultation at [(615) 410-7290](tel:…) is for. {F013,F090,F099}" | Rule 7: "free consultation" must sit beside the tel: link |
| 2 | "For most people, the first worry is the driver's license." | "Your first question may be about your driver's license." | Untagged "most people" frequency claim |
| 3 | "What a person faces depends on the facts. That includes the blood alcohol level and any prior DUI on their record. {F304}" | "…depends on the facts of the case. Possible jail time, for example, can vary with the blood alcohol level and with any prior DUI on the driver's record. {F304}" | F304 covers jail time only; legal statement now hedged (C18) |
| 4 | "A DUI is not only about alcohol. A driver may be considered under the influence of other substances…" | One tagged sentence: "…under the influence of other intoxicants and controlled substances, including marijuana. {F305}" | First sentence was an untagged legal claim; wording now matches F305 |
| 5 | "At your consultation, Will explains what applies to your charge…" | "At your consultation, you and Will discuss your legal options for your charge…" | Matches F099 ("discuss your legal options") |
| 6 | Step 3: "Will goes over the reports… He looks for the weak points in the case." (untagged) | "Will and his team personally handle your case, big or small. {F058} The review covers the reports, the reason for the stop and how any test was given, looking for weak points in the case." | Untagged claim about Will's process → owner |
| 7 | "Parents often make the first call…" | "A parent can make the first call…" | Untagged frequency claim |
| 8 | FAQ "Can we talk in Spanish?" | "Can I get help in Spanish?" | "We" could imply the attorney speaks Spanish; rule 10 keeps only "Se habla español"/Spanish services (F092, F094) |
| 9 | Related: Probation violation (untagged service) | + {F185} | Service claim untagged |

### /criminal-defense/drug-crimes/
| # | Before | After | Why |
|---|---|---|---|
| 1 | "Will Fraley and his staff personally handle…" (×2) | "…his team…" | F058 says "team" |
| 2 | Manufacture card: "…or of being part of where it was made." | "…or of helping to make one." | Unclear wording that implied a legal theory; F163 names only the charge |
| 3 | "These are the kinds of questions Will works through when he reviews a charge." | "…questions worth working through with your lawyer." | Untagged claim about Will's process |
| 4 | Step 3: "Will studies the reports, the search and the lab results…" | "Your defense looks hard at the reports, the search and the lab results…" | Untagged claim about Will's process → owner |
| 5 | "Families are often the first to call, and many of them have never dealt with a criminal case before." | "A family member can make the first call, even one who has never dealt with a criminal case before." | Untagged frequency claim |
| 6 | Related: DUI {F305} | {F169,F305} | Cites the DUI service fact |
| 7 | Related: Probation violation (untagged) | + {F185} | Service claim untagged |

### /criminal-defense/theft/
| # | Before | After | Why |
|---|---|---|---|
| 1 | Hero: "…theft, robbery and burglary… {F001,F165,F166,F035} He and his staff…" | {F001,F168,F165,F166,F035} "He and his team…" | Theft service was not sourced (F168); F059 says "team" |
| 2 | Step 3: "Will reviews the reports, any video… He checks whether the story holds together." | "Your defense goes through the reports, any video, the witness statements and the paper trail, and checks whether the story holds together." | Untagged claim about Will's process → owner |
| 3 | "These cases often turn on records rather than witnesses." | "These cases can turn on records as much as on witnesses." | Untagged generalization softened |
| 4 | FAQ employer: {F167,F172} | {F168,F167,F172} | "theft charges" is now sourced |
| 5 | FAQ: "Will Fraley and his staff…" | "…his team…" | F059 says "team" |
| 6 | Related: Fraud {F172,F184} | {F171,F172,F184} | F184 only defines forgery; F171 sources the white-collar service |
| 7 | Related: Probation violation (untagged) | + {F185} | Service claim untagged |

### /criminal-defense/violent-crimes/
| # | Before | After | Why |
|---|---|---|---|
| 1 | Proof strip: "Completed TACDL advanced cross-examination training {F063}" | {F063,F064} | F063 says "attended"; "completed" rests on the certificate of completion (F064). Not "certified" |
| 2 | "A violent-crime charge moves fast" | "…can move fast" | Untagged generalization softened |
| 3 | "Will has represented people facing serious allegations, from murder to hit-and-runs. {F152}" | "Will Fraley, Attorney at Law, has served many people facing serious allegations, from murder to hit-and-runs. {F001,F152}" | F152 is a firm ("we") claim, not a claim about Will personally → owner |
| 4 | "Manslaughter charges, including vehicular manslaughter after a crash. {F193}" | "Manslaughter charges, including charges that follow a fatal car crash. {F193}" | Tennessee's charge is "vehicular homicide" (F160); the old site's term should not be presented as current law → owner |
| 5 | Murder card: "The most serious charge a person can face, and one that calls for the most careful preparation." | "Murder and attempted murder charges are among the most serious a person can face, and they call for careful preparation from the start. {F192}" | Superlative softened |
| 6 | Step 3: "Will reviews the police reports… He looks at the whole timeline…" | "Your defense goes through the police reports… It looks at the whole timeline…" | Untagged claim about Will's process → owner |
| 7 | "Violent-crime cases often come down to what witnesses say." | "…can come down to…" | Untagged generalization softened |
| 8 | FAQ: "Will Fraley does, with his staff." | "…with his team." | F058 says "team" |
| 9 | Related: Probation violation (untagged) | + {F185} | Service claim untagged |

### Reviewed and kept
- Legal statements F281, F304, F305 and F306 (DUI) are figure-free, hedged and ledgered. The A16 owner question covers them (C18). The robbery and burglary glosses on Theft are hedged with "usually", and A16 queued them. They are accurate as general descriptions.
- Theft keeps "misdemeanor or something more serious" (F168). This avoids the open federal claim (C06). No page claims federal practice.
- Verbatim testimonials keep "best experiences" and "cheap service in plenty of places" (rule 7). Every S.A. quote is followed by the results disclaimer.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G2")
1. Will's personal review of reports, video, lab results and witness statements (step 3 on all four pages).
2. "Vehicular manslaughter" vs vehicular homicide (Violent Crimes, Manslaughter card).
3. "From murder to hit-and-runs": firm vs Will personally (F152).
4. DUI: F304 narrowed to jail time (adds to A16's DUI wording question).

### Gate 4
`node tools/check.mjs --gate 4`: "0 unsourced facts, 0 banned phrases, frontmatter valid, law rules (EN + ES)" PASS. The remaining FAILs are missing ES copy files and copy/FACT-CHECK.md (an orchestrator roll-up). Neither concerns these four EN files.


## G3

Scope: the English copy for `/criminal-defense/sex-crimes/`, `/criminal-defense/fraud/`, `/criminal-defense/probation-violation/` and `/criminal-defense/domestic-assault/` (`copy/pages/<slug>.md`). Each tagged sentence was compared against its fact's `claim` and `exact_quote` in `inventory/facts.json`, and against the old page text (`inventory/text/criminal-defense__<page>.md`). Untagged sentences were checked for hidden factual claims. Each page was also checked for law-firm rule breaches (plan/rules/law-firm.md) and warn phrases.

Results:
- Every fact ID cited resolves.
- Eddie W. (F134) and S.A. (F135) are quoted verbatim, typos included.
- Every page carries "Prior results do not guarantee a similar outcome."
- The years follow C01 ("Practicing law since 2004", F087).
- The memberships follow C08 (TACDL only, F068/F067).
- The counties follow C06 (F035/F037).
- The free consultation always sits beside the `tel:` link.
- No "specialist", "expert", "certified", comparison or warn phrase appears in firm copy. "Best" appears only inside S.A.'s verbatim testimonial (G1 decision).
- `node tools/check.mjs --gate 4` reports no errors for these four files.

### Changes made

| Page | Line / section | Before | After | Reason |
|---|---|---|---|---|
| /sex-crimes/ | Rape card | "Rape accusations, including cases charged as violent crimes. {F188,F195}" | "Rape accusations. Rape and other sex crimes are often considered violent offenses. {F188,F195}" | F195 says sex crimes are "often considered as violent offenses". It says nothing about how they are charged. |
| /sex-crimes/ | "Keeping it private" | "Who else learns about the accusation is your decision." | "Who you tell about the accusation is your decision." | The old line was misleading (RPC 7.1): charges and court records can become public whatever the client decides. |
| /sex-crimes/ | Steps, step 3 | "Will goes through the reports… He looks for what does not fit together." | "Your defense goes through the reports, the statements and the timeline, looking for what does not fit together." | No fact describes Will's personal review process. This follows the G2 convention. |
| /sex-crimes/ | FAQ "Does Will handle the case himself?" | "Will Fraley and his staff personally handle…" | "Will Fraley and his team personally handle… {F058}" | F058 says "his team" (G2 convention). |
| /sex-crimes/ | Related pages, Violent crimes | "when a sex offense is charged as a violent crime. {F195}" | "rape and other sex crimes are often considered violent offenses. {F195}" | Same reason as the Rape card. |
| /fraud/ | "A paper case…" | "Stacked together, they can look like the whole story. They rarely are." | "…They may not be." | "Rarely" was an untagged frequency claim with no source. |
| /fraud/ | Embezzlement card | "Accusations of taking money you were trusted to handle for an employer or a business. {F172}" | "Embezzlement charges. {F172} Write down what your duties were and who else could reach the accounts or the money." | The old site lists embezzlement but never defines it, so the definition was unsourced legal content. An owner question was queued. |
| /fraud/ | Wire, mail and tax fraud card | "Fraud charged through emails…" | "Fraud alleged to have been committed through emails, calls or texts, through the mail, or through false statements on a tax return." | F177–F179 describe how the fraud is committed, not how it is charged. "Alleged" keeps the accused's footing. |
| /fraud/ | Money laundering, counterfeiting and bribery card | "Other white-collar charges listed among the cases Will takes. {F173,F174,F175}" | "These are white-collar crimes too, and Will defends white-collar charges. {F173,F174,F175,F164}" | The old page lists these as examples of white-collar crime, not as "cases Will takes". The sentence now links the list to F164. An owner question was queued. |
| /fraud/ | Steps, step 1 | "Many fraud cases start quietly…" | "Some fraud cases start quietly…" | "Many" was an untagged frequency claim. "Some" is true under every reading. |
| /fraud/ | Steps, step 4 | "Will reads the records the case rests on…" | "Your defense reads the records the case rests on…" | G2 convention: no fact describes Will's personal review. |
| /fraud/ | "When the accuser is someone you know" | "…so nothing you say is used against you." | "…so you don't hand anyone words that could be used against you." | The old line read as a promise of an outcome. |
| /fraud/ | FAQ "Do you handle identity theft and card fraud?" | "…are among the charges Will defends. {F183,F182}" | "Will defends fraud charges, and identity theft and credit or debit card fraud are types of fraud. {F171,F183,F182}" | F182 and F183 only describe fraud types. F171 is the fact that he defends fraud. |
| /fraud/ | Related charges, Probation violation | untagged | "{F185}" added | G2 convention. |
| /probation-violation/ | "You were almost through it" | "Probation usually means the end of a case is in sight." | "Probation often means…" | The old page says "often signifies that you are on your way to freedom". "Usually" overstated it. |
| /probation-violation/ | Steps, step 2 | "You learn exactly what you are accused of and what your options are. {F099}" | "You go over what you are accused of and what your options are. {F099}" | F099 covers discussing options only. "Exactly" was a promise. |
| /probation-violation/ | Steps, step 3 | "Will puts the accusation next to the terms…" | "Your defense puts the accusation next to the terms…" | G2 convention. |
| /probation-violation/ | Steps, step 4 | "Will prepares you for the hearing and presents your side in court. He and his staff handle your case personally. {F058}" | "You may have to attend a hearing on the accusation. Will Fraley and his team personally handle your case, no matter how big or small. {F058}" | Hearing preparation and presentation had no source. F058's own words were restored. An owner question was queued. |
| /probation-violation/ | FAQ "Can you help with the new charge too?" | "…ask about both at the same consultation." | "…mention both when you call." | This matches G1's change on /legal-services/. Whether one consultation covers both matters is an open owner question. |
| /domestic-assault/ | Bond conditions | "…your papers list the conditions you must follow." | "…your release papers should list any conditions you must follow." | The old line was an untagged absolute statement about every bond. |
| /domestic-assault/ | "What 'domestic' can mean" | "It can apply to any close relationship, not only romantic ones, and that includes roommates. {F275,F276}" | "It is not limited to romantic relationships: it can also apply to family members and to people who live together, including roommates. {F275,F276}" | F275 is flagged "verify current law", and "any close relationship" is broader than the relationships Tennessee lists. The new wording is true under both the old page's list and current law. An owner question was queued. |
| /domestic-assault/ | "What 'domestic' can mean", para 2 | "…the charge may be assault, assault and battery, or aggravated assault instead. {F187} Will defends those charges too. {F194}" | "…the accusation may be charged as another assault offense instead, such as assault or aggravated assault. {F187} Will defends those charges too, along with assault and battery. {F187,F194}" | The copy no longer presents "assault and battery" as a Tennessee charge label. It is kept only as a service the firm names. An owner question was queued. |
| /domestic-assault/ | Aggravated assault card | "Aggravated assault charges, the more serious form of an assault accusation. {F187}" | "Aggravated assault charges. {F187} Bring every page you were handed, including your bond conditions, to your consultation." | "The more serious form" was an unsourced legal characterization. |
| /domestic-assault/ | Steps, step 3 | "Will goes through the report…" | "Your defense goes through the report…" | G2 convention. |
| /domestic-assault/ | Steps, step 4 | "…both cases can be looked at together. {F057}" | "…tell Will about it. His practice covers family court as well as criminal court. {F057}" | F057 supports only that he practices in both courts. The joint-handling promise joins G1's owner question. |
| /domestic-assault/ | FAQ, roommates | "Domestic assault can apply to any close relationship, including roommates." | "Domestic assault is not limited to couples: people who live together, including roommates, can be covered. {F275,F276}" | Same reason as "What 'domestic' can mean". |
| /domestic-assault/ | Related charges, Probation violation | untagged | "{F185}" added | G2 convention. |

### Checked and kept (no change)

- **/sex-crimes/:**
  - The offense list (F188–F191).
  - The counties (F035, F037).
  - The proof strip (F087, F056, F050).
  - The 2019 TACDL Advanced Cross-Examination training (F063, F064; never "certified").
  - DCS representation (F045).
  - "Every lawful way to get the charges reduced or dismissed" (F150, no guarantee).
  - "Dedicated trial attorney" (F056).
  - The registration sentence and FAQ (F274). These match the source's "many … required to register". The fact is flagged "verify current law", so an owner question was queued.
  - The old "first-degree criminal sexual conduct" section (F273) stays out of the new page (C18).
- **/fraud/:**
  - The TACDL membership only (C08).
  - The forgery, identity-theft, card-fraud and insurance-fraud cards (F184, F183, F182, F180).
  - "Many fraud charges are felonies" (F278). This is softer than the source's "almost always" and true under every version. An owner question was queued.
  - S.A. is quoted verbatim, and the disclaimer is present.
- **/probation-violation/:**
  - F185 ("get back to living your life").
  - F048, without the federal claim (C06).
  - Spanish service limited to F092 and F094 (C13).
  - The old "preponderance of evidence" statement (F271) is not used.
- **/domestic-assault/:**
  - F186, F057 and F207 (counsel on domestic violence).
  - The bond-conditions advice. It is general and points to the consultation.
  - Eddie W. is quoted verbatim, and the disclaimer is present.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G3")

1. Wording for sex-offender registration (/sex-crimes/, F274).
2. Whether to add a Tennessee sex-offense grading section, replacing the dropped "first-degree criminal sexual conduct" (/sex-crimes/, F273).
3. "Many" versus "almost always" for fraud felonies, and whether to restore "forgery is a felony" (/fraud/, F278, F277).
4. A plain-English definition of embezzlement (/fraud/, F172).
5. Whether the firm takes money laundering, counterfeiting and bribery cases, and whether to add back piracy and bankruptcy fraud (/fraud/, F173–F176, F181).
6. Domestic-assault relationship wording (/domestic-assault/, F275, F276).
7. Whether to rename or remove "assault and battery" across the criminal pages (/domestic-assault/, /violent-crimes/; F187, F194).
8. Whether to state the standard of proof at a probation violation hearing (/probation-violation/, F271).
9. Hearing preparation and presentation (/probation-violation/, step 4).
10. One lawyer and one consultation for a criminal matter plus a family matter or a new charge (/probation-violation/, /domestic-assault/; joins G1 item 1).


## G4

Scope: the English copy for `/family-law/divorce/`, `/family-law/child-custody/`, `/family-law/visitation/` and `/family-law/parenting-plan-modifications/` (`copy/pages/<slug>.md`). Each tagged sentence was compared against its fact's `claim` and `exact_quote` in `inventory/facts.json`, and against the old page text (`inventory/text/family-law__*.md`). Untagged sentences were checked for hidden factual claims. Every page was screened for law-firm rule breaches (plan/rules/law-firm.md) and warn phrases. No warn phrases were found, and no expert/specialist/certified/best/top/leading wording. Every cited fact ID resolves. The testimonials are verbatim: Katherine S. (F133, divorce), S.A. (F135, custody), Eddie W. (F134, visitation) and the Katherine S. card headline (F136, modifications). Each page with a results-bearing testimonial keeps "Prior results do not guarantee a similar outcome." No number, name or date had been altered. "Practicing law since 2004" follows C01 (F087). The counties follow C06/F036. Spanish service is limited to "Se habla español" and "Spanish-speaking services" (F092, F094; C13). Melissa Harris appears only inside verbatim testimonials (C04). Every "free consultation" sits beside the `tel:` link. `node tools/check.mjs --gate 4` reports no errors for these four files.

### Changes made

| Page | Section | Before | After | Reason |
|---|---|---|---|---|
| /family-law/divorce/ | "Where you may be right now" | "…learn your legal options. {F099} From there, you and Will set goals you can actually reach." | "…discuss your legal options. {F099} From there, you can decide on a next step with a clearer picture." | F099 says "discuss your legal options". "Set goals you can actually reach" is an untagged promise that echoes the testimonial (F133). A testimonial cannot source a firm claim. |
| /family-law/divorce/ | Cards intro | "Divorce disputes usually come down to four things…" | "The disputes in a divorce can include custody and visitation, child support, property division and spousal support." | F201–F204 say these disputes are among those "included". They give no frequency and no closed list. |
| /family-law/divorce/ | Child support card | "…so you don't have to work out every detail face to face… {F201}" | "…settle every detail face to face… {F201,F147}" | Added F147 (negotiating divorce disputes) to support the negotiation claim. |
| /family-law/divorce/ | Custody card | "Custody is often the most emotional part of a divorce." | "Custody of minor children can be one of the hardest issues in a divorce." | The superlative had no source. The old text says only that custody "can be a contentious issue". |
| /family-law/divorce/ | Spousal support card | {F203,F208} | {F203,F208,F217} | "Spousal maintenance" comes from F217. |
| /family-law/divorce/ | Property card | "Who keeps what is often the hardest thing to agree on. In Tennessee, a judge divides property…" | "Who keeps what can be hard to agree on. In Tennessee divorce cases, a judge divides property under a principle called "equitable distribution"…" | This was a second unsourced superlative on the same page. The legal sentence now follows F267's own wording ("In divorce cases in Tennessee…"). F267 is flagged "verify current law", so an owner question was queued. |
| /family-law/divorce/ | Adoption card | "Custody of a child you adopted together still has to be decided. Will reviews…" | "If you adopted a child during your marriage, custody still has to be decided, and Will can review the adoption paperwork with you and talk through what to file in court. {F220}" | The first sentence was an untagged claim, and "adopted together" changed the source's "adopted a child during your marriage". Joining the sentences puts it under the F220 tag. |
| /family-law/divorce/ | Steps, step 2 | "**Filing or answering.** One spouse petitions… Will can represent you on either side. {F205,F057}" | "**Filing.** A divorce case begins with a petition, and Will helps clients petition for divorce. {F205}" | F205 covers only petitioning. Representing a responding spouse is unsupported (same issue as G1 /family-law/). An owner question was queued. |
| /family-law/divorce/ | Steps, step 4 | "Spouses can settle some disputes themselves or with help from a mediator. {F266} Will looks for cooperative solutions where they can work. {F313}" | "Spouses on amicable terms may be able to settle some disputes themselves, or with help from a mediator. {F266} Will works toward agreement through cooperative negotiation. {F313,F147}" | The source's condition was restored, matching G1's F266 wording (verify-law fact; G1 owner question covers it). The second sentence now matches F313 and F147. |
| /family-law/divorce/ | FAQ "My spouse already filed…" | Q "Is it too late to get a lawyer?" A "No. Will advocates for spouses… whether they filed first or are responding. {F057,F205}" | Q "What should I do?" A "Call soon, and bring the papers you received to your consultation so you can discuss your legal options. {F099} Call (615) 410-7290 for a free initial consultation. {F013,F096}" | The responding-spouse claim was unsupported. The unconditional "No, not too late" was also an unsourced legal assurance, since response deadlines apply. Owner question queued. |
| /family-law/divorce/ | FAQ "How is property divided…" | "A judge divides property under… equitable distribution…" | "In Tennessee divorce cases, a judge divides property under a principle called "equitable distribution"…" | Wording now follows the F267 source. Owner question queued (verify law). |
| /family-law/divorce/ | FAQ "Will our divorce go to trial?" | "Some divorce disputes are settled by agreement or through mediation. {F266} Others are decided by a judge after each side argues its case. {F313}" | "Spouses on amicable terms may be able to settle some disputes by agreement or through mediation. {F266} When they can't, Will argues your side before the court. {F313}" | The F266 condition was restored. F313 is a statement about the firm ("arguing before the court"), not a general legal rule. |
| /family-law/divorce/ | Related links | "Parenting plan modifications: changing a plan after the divorce is final. {F221}"; "Paternity: establishing or contesting parenthood. {F211}" | "…changing an existing parenting plan. {F205,F221}"; "…establishing parenthood, or answering a claim that you are the father. {F211,F225}" | F205 says "existing parenting plan". "Contesting" is now sourced to F225 in its own terms. |
| /family-law/child-custody/ | "A plan your child can count on" | "What helps most is predictability…" | "Stability helps…" | The superlative had no source. The new word matches F210 ("stability"). |
| /family-law/child-custody/ | Same | "…custody agreement creates that stability and eases… {F210} Building one is the center of Will's custody work." | "…helps create that stability and ease… {F210} Will works with parents to build one. {F210,F312}" | F210 says "helps create": "creates" overstated it. "The center of his custody work" was an unsourced characterization. |
| /family-law/child-custody/ | "Who makes the decisions" card | "…is one of the first questions to settle. {F312}" | "Who will make decisions on your child's behalf is one of the key questions in a custody case. {F312}" | F312 gives no order ("first"). The wording now follows F312's "who will make decisions on the child's behalf". |
| /family-law/child-custody/ | Child support card | "Child support comes up whenever parents with children separate…" | "If you have children with your partner, child support will likely need to be addressed…" | "Whenever" overstated F215 ("will likely need to be addressed"). |
| /family-law/child-custody/ | Paternity card and FAQ | "…the court will require proof before a custody or support order." | "…before a custody or support agreement goes forward." | F314 says "before pursuing either type of agreement". "Order" altered the source. F314 is a verify-law fact, so an owner question was queued. |
| /family-law/child-custody/ | Paternity FAQ | "Will can guide you through it, and he recommends DNA testing. {F211,F213}" | "Will handles paternity suits, and he recommends DNA testing as the gold standard. {F211,F213}" | The wording now follows F211 and F213. |
| /family-law/child-custody/ | "How a court looks at custody" | "{F290,F270} The judge is not keeping score between the parents. The question is what arrangement serves your child. / That is why a strong custody case is built on… It is not built on…" | "Custody decisions focus on the best interests of the child, so the question is what arrangement serves your child, not which parent wins an argument. {F290,F270} / That is why it helps to build your side of a custody case on the everyday facts… rather than on the conflict between the adults." | Two untagged statements about how judges decide were folded into the tagged best-interests sentence. The rest is now framed as advice, not as a statement of how courts act. F290 and F270 are verify-law facts, so an owner question was queued. |
| /family-law/child-custody/ | Steps, step 3 | "Many family issues can be worked out by cooperative negotiation between the parents. {F313}" | "Will works toward agreement through cooperative negotiation where it can succeed. {F313,F147}" | F313 describes the firm's approach. It does not say how often negotiation succeeds ("many"). |
| /family-law/child-custody/ | FAQ "Does custody affect child support?" | "The two often come up in the same case. If you have children…" | Joined into one tagged sentence | The first sentence was untagged. |
| /family-law/child-custody/ | Related: Paternity | "proving or contesting parenthood. {F211}" | "proving parenthood, or answering a claim that you are the father. {F211,F225}" | Sourced to F225. |
| /family-law/visitation/ | "Two kinds of visitation problems" | "Will helps with both. Visitation cases directly affect your relationship with your child, and he treats them that way. {F226}" | "Will helps with both, because visitation cases directly affect your relationship with your child. {F226,F200,F227}" | "Will helps with both" was untagged. F200 (negotiating visitation) and F227 (enforcement) now support it. "He treats them that way" was vague and unsourced. |
| /family-law/visitation/ | "Visitation that is being denied" card | "…petition for enforcement with the court. {F227} Will can help you prepare and file it." | "…petition for enforcement with the court, and Will can help you with it. {F227,F226}" | The service claim was untagged. |
| /family-law/visitation/ | "Residential and non-residential parents" card | "If that isn't you, your time with your child still matters, and the schedule should protect it." | "If that isn't you, the visitation schedule sets out your time with your child. {F222}" | This was an untagged normative claim. It is now a factual statement from F222. (The old page's "in most cases, be entitled to regular communication" is not in the ledger and was not used.) |
| /family-law/visitation/ | "If your visits are being denied" list | "**Don't trade one wrong for another.** Holding back support or keeping the child past your time can hurt your own case." | "**Don't take matters into your own hands.** Talk to a lawyer before you hold back support or keep the child past your time." | The old line was an unsourced statement of legal consequence. It is now advice. |
| /family-law/visitation/ | "How the court sets a schedule" | "So the strongest request is about your child's needs…" | "So it helps to frame your request around your child's needs…" | This was an unsourced superlative and legal prediction. F270 is a verify-law fact, so an owner question was queued. |
| /family-law/visitation/ | Steps, step 2 | "Will reviews any existing order, parenting plan or proposed schedule with you. {F226,F222}" | "Any existing order, parenting plan or proposed schedule gets a close look, since the visitation schedule is set out in the parenting plan. {F226,F222}" | The old site does not describe Will's review process. This follows G2/G3. |
| /family-law/visitation/ | Steps, step 3 | "Many schedules can be worked out by cooperative negotiation between the parents. {F313}" | "Will works toward an agreed schedule through cooperative negotiation where it can succeed. {F313,F147}" | The frequency claim had no source. |
| /family-law/parenting-plan-modifications/ | "A plan is not set in stone" | "Parents move, remarry or simply stop seeing eye to eye. A schedule built for a toddler rarely fits a teenager." | "Parents move, or simply stop seeing eye to eye. A schedule built for a toddler may not fit a teenager." | On a page about grounds for modification, "remarry" read as a ground the source never lists (F223). "Rarely" was an unsourced generalization. |
| /family-law/parenting-plan-modifications/ | Same | "…from the filing for modification onward. {F205}" | "…starting with the filing for modification of the existing plan. {F205}" | Matches F205. |
| /family-law/parenting-plan-modifications/ | "A parent is moving" card | "A move, especially a long one, can make the current schedule impossible to keep. {F223} The plan has to catch up…" | "When one parent plans on moving away, the current schedule may no longer work. {F223} The plan may need to catch up…" | F223 says "plans on moving away". "Especially a long one" and "impossible" added to the source. |
| /family-law/parenting-plan-modifications/ | "Money has changed" card | "A new job, a lost job or a big change in either parent's finances…" | "A change in either parent's financial situation, such as a new job or a lost one…" | F223 says only "financial situation has changed". The source does not say "big". |
| /family-law/parenting-plan-modifications/ | "You no longer agree" card | "Sometimes the terms that worked for both parents no longer do. When parents no longer agree…" | "Sometimes terms that once worked no longer do. When one parent, or both, no longer agree…" | Restores the source's "A parent or both parents" (F223). |
| /family-law/parenting-plan-modifications/ | "Asking for a change, or answering one" | "So the question is less whether a parent agrees with the change, and more how the change affects the children." (untagged) | "So expect the focus to be on how the change affects the children, not only on whether a parent agrees with it. {F270}" | This was an untagged legal characterization. It is now softened and tied to F270. Owner question queued (verify law). |
| /family-law/parenting-plan-modifications/ | Steps, step 2 | "Will reviews what the plan says today… {F222}" | "The plan you have today, with its support, schedule and other terms, is the starting point. {F222}" | The old site does not describe Will's review process (G2/G3 convention). |
| /family-law/parenting-plan-modifications/ | Steps, step 4 | "Parents can often work out a change through cooperative negotiation. {F313}" | "Will works toward an agreed change through cooperative negotiation where it can succeed. {F313,F147}" | The frequency claim had no source. F147 names parenting plan modifications. |
| /family-law/parenting-plan-modifications/ | FAQ "Do both parents have to agree…?" | "No. Some changes are worked out by agreement; others are argued before the court. {F313}" | "Not necessarily. If your former spouse proposes a change you don't agree with, Will can help you respond, and a disputed change can be argued before the court. {F221,F313}" | The flat legal "No" was softened, and the answer now rests on F221 and F313. Owner question queued. |
| /family-law/parenting-plan-modifications/ | Related: Divorce | "where most parenting plans begin. {F205}" | "filing for divorce, and the custody and support issues that come with it. {F205,F204,F201}" | "Most" had no source. |

### Checked and kept (no change)

- **All four pages:** the hero, proof strip, CTA band, consultation and Spanish FAQs (F001, F013, F015, F036, F050, F056, F057, F087, F092, F094, F096, F097, F105). The consultation facts are page-specific: F096 for /family-law/, F097 for the visitation meta description and F105 for modifications.
- **/family-law/divorce/:** the child support (F215), custody bid (F216), spousal maintenance (F217), property presentation (F218), paternity-during-divorce (F219) and post-divorce disputes (F208) claims; the documents checklist (advice, no facts); Katherine S. verbatim, truncation included (F133), with the disclaimer.
- **/family-law/child-custody/:** "Native to Tennessee" (F050), F222 parenting-plan contents, F269 primary residential parent, DCS link (F235), the "What to write down now" list and its "talk to a lawyer first" line (cautious advice, the opposite of the risky F292 statement in C18), and S.A. verbatim (F135). The testimonial's comparison stays, because testimonials are reproduced verbatim (rule 7). The disclaimer is present.
- **/family-law/visitation/:** F207 domestic-violence counsel, F204/F200 divorce card, F227 enforcement statements, F223 modification FAQ, the custody-versus-visitation FAQ (F312, F222), and Eddie W. verbatim, typo included (F134), with the disclaimer.
- **/family-law/parenting-plan-modifications/:** the F222 list, F221 propose-or-respond claims and the "Dedicated trial attorney" bullet (F056). The Katherine S. card headline (F136) is quoted verbatim. It contains no result, so no disclaimer is required.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G4")

1. Whether the firm represents spouses who are responding to a divorce petition (/family-law/divorce/: step 2, FAQ, and the "Maybe your spouse already has" scenario). This extends G1 item 3.
2. Approval of the Tennessee legal statements kept on these pages, each flagged "verify current law": equitable distribution and fault (F267), primary residential parent (F269), best interests of the child (F270, F290) and proof of paternity (F314).
3. Whether the modifications FAQ may say a parenting plan can be changed without both parents' agreement, and whether to describe the burden on a parent who opposes a change (the old page's "you must prove that the proposed change does not serve the best interests", which is not in the ledger).
4. May the pages describe Will personally reviewing orders, parenting plans and proposed schedules (visitation step 2, modifications step 2)? This extends the G2 case-review question.


## G5

Scope: the English copy for `/family-law/paternity/`, `/adoption/`, `/dcs-case-attorney/` and `/testimonials/` (`copy/pages/<slug>.md`). Every tagged sentence was compared against its fact's `claim` and `exact_quote` in `inventory/facts.json`. Untagged sentences were checked for hidden factual claims, and each page was checked against plan/rules/law-firm.md and the warn-phrase list. Every cited fact ID resolves. All testimonial quotes were machine-compared against F133–F135 and match verbatim (S.A. on paternity, Eddie W. on adoption, all three on /testimonials/). The card headlines match F136–F138, typos and the Katherine S. truncation included. Every page that carries a testimonial keeps "Prior results do not guarantee a similar outcome." The years follow C01 ("Practicing law since 2004", F087). Counties follow C06: Rutherford, Coffee and Wilson on paternity (F037); Murfreesboro and Rutherford County on DCS (F045); Murfreesboro and the surrounding counties on adoption (F034). Spanish service is limited to "Se habla español" and "Spanish-speaking services" (F092, F094; C13). The pages contain no warn phrases, no comparisons, no best, top or leading, and no expert, specialist, certified or guarantee outside the results disclaimer. Katie Fults is not named (rule 12). `node tools/check.mjs --gate 4` reports no errors for these four files.

### Changes made

| Page | Line / section | Before | After | Reason |
|---|---|---|---|---|
| /family-law/paternity/ | Hero, para 1 | "Custody, parenting time and child support can all wait on one question: who is the father?" (untagged) | "Custody and child support can both wait on one question: who is the father? {F314}" | This was an untagged legal claim. F314 names only custody and child support, so "parenting time" was dropped. |
| /family-law/paternity/ | Hero, para 2 | "He helps parents establish paternity, and he helps a man contest a claim that he is the father when he is not. {F225}" | "The firm has represented both fathers and mothers working to establish paternity, and it handles paternity actions in which a man is falsely named as a child's father. {F212,F224,F225}" | F225 only describes when a person may be involved in a paternity action. The firm's role comes from F212 and F224, so the sentence now cites them. |
| /family-law/paternity/ | "Why paternity comes first" | "That puts paternity at the front of the line. A father … may have to settle it first. So may a mother…" (untagged) | The same idea in one sentence, tagged {F314} | These were untagged legal inferences. They are kept hedged ("may have to") and tied to F314. |
| /family-law/paternity/ | "Where you might be standing" (two bullets) and FAQ "I'm not with the mother…" | "Will has represented fathers… / mothers…" | "The firm has represented fathers… / mothers…" | F212 says "Our firm has represented". A personal-experience claim was unsupported. Owner question queued. |
| /family-law/paternity/ | Card "Paternity during a divorce" | "Parenthood questions sometimes surface inside a divorce. Will can take care of the paperwork…" | "When a parenthood question surfaces inside a divorce, Will can advise you and take care of the paperwork… {F219}" | The untagged first sentence was folded into the tagged one, and the card now carries F219's full scope ("advise you"). |
| /family-law/paternity/ | CTA band | "A clear answer on paternity lets the rest of your case move." (untagged) | "A clear answer on paternity lets custody and support questions move forward. {F314}" | This was an untagged claim. It now says only what F314 supports. |
| /adoption/ | Hero, para 1 | "It still takes careful paperwork and a judge's approval." (untagged) | Same text + {F214,F234} | Untagged factual sentence; now tied to the paperwork (F214) and judge (F234) facts. |
| /adoption/ | Hero, para 2 | {F001,F228,F034} | {F001,F228,F229,F230,F034} | F228 is phrased as "Whether you're pursuing…". The direct service facts (F229 stepparent and relative adoptions, F230 private and agency adoptions) were added. |
| /adoption/ | "Making a family bond legal" | "Your part is to get the details right, so the day in court is a celebration and not a surprise." | "Getting the paperwork right is the lawyer's job, so you can walk into court prepared. {F214,F234}" | The draft gave the client's job as the lawyer's and promised the hearing would hold no surprises, which is an outcome promise (RPC 7.1). The new line is tagged. |
| /adoption/ | "What Will does for you" intro | "Will's job is to carry them so you can focus on your child." (untagged) | Same text + {F234} | This was an untagged claim about services. |
| /adoption/ | Steps, step 2 | "Will looks at who is involved and whose rights the case must address… that comes up here." | "Who is involved, and whose rights does the case have to address? If the adoption may be contested, or a parent's rights may need to be ended, those are matters Will handles too. {F233,F231}" | No fact describes Will's review process (the G2 convention). F233 and F231 support only the services. |
| /adoption/ | FAQ "Do I have to go to court to adopt?" | "An adoption is decided by a judge, and Will represents you in court." | "An adoption becomes final through a court order, and Will represents you before the judge. {F234} Whether you will need to appear in person is a good question for your consultation." | The draft implied every adoption needs a hearing, an unverified legal statement. The new form is true in every case and uses F234's own wording. Owner question queued. |
| /dcs-case-attorney/ | Hero, para 2 | "He helps you respond to DCS…" | "He helps you respond appropriately to DCS inquiries…" | Matches F242's wording. |
| /dcs-case-attorney/ | Cards intro | "These are the matters Will handles. {F235}" | "… {F236,F237,F238,F239,F240,F241}" | F235 only defines a DCS case. The list of matters handled is F236–F241. |
| /dcs-case-attorney/ | Card "Protective custody and removal hearings" | "the court holds hearings about it. Will represents parents at those hearings. {F237}" | "the court may hold hearings about it. … {F237,F045}" | Not every placement goes through court, so this was an unverified legal statement. "Parents" is now tied to F045. Owner question queued. |
| /dcs-case-attorney/ | Card "Termination of parental rights" | "This is the most serious kind of case a parent can face, and Will handles it." | "A case to end a parent's legal rights is one of the most serious a family can face. Will handles these cases. {F239}" | An absolute superlative was softened. |
| /dcs-case-attorney/ | "When a criminal charge is part of it" | "You can talk through both with one lawyer." (untagged) | "If you are facing both, say so when you call (615) 410-7290 for a free consultation. {F013,F090}" | This was an unsourced service promise. It is now an invitation, with the free consultation beside the `tel:` link (G1 and G3 pattern). Owner question queued. |
| /dcs-case-attorney/ | FAQ "My child was removed…" | "There will be court hearings." | "Court hearings may follow." | This was an unverified absolute legal statement. Owner question queued. |
| /testimonials/ | Frontmatter `description` | "…quoted word for word as they wrote it." | "…quoted word for word as first published." (155 chars) | Katherine S.'s review is cut off mid-sentence on the old site (C15), so "as they wrote it" cannot be verified. |
| /testimonials/ | Hero, para 2 | "Each one is quoted word for word, exactly as the client wrote it." (untagged) | "Each one is quoted word for word, exactly as it was first published, with nothing corrected or trimmed. {F133,F134,F135}" | Same reason as the description. The sentence is now tagged. |
| /testimonials/ | "What happens when you call" | "You tell the office what happened, and a consultation is set up. {F098}" | "You call or send a message, and the office schedules a consultation. {F090,F098}" | No fact describes callers giving an account to the office. F090 and F098 support calling or messaging to schedule a consultation. |

### Checked and kept (no change)

- **/family-law/paternity/:** the counties (F037; the old paternity page says "Rutherford, Coffee, & Wilson Counties"), the steps (F225, F314, F213, F313, F211), the DNA-testing recommendation (F213), the related links (F312, F226, F227, F219, F229) and S.A., quoted verbatim (F135) with the disclaimer. The FAQ advice "Talk to a lawyer before you sign anything that names you as the father" stays, because A16/G5 already queued it. F314 is kept in the old site's wording: A16/G5 and A17/G4 already queued its "verify current law" question.
- **/adoption/:** the six service cards (F229–F233, F231), filings, communication and court (F234, F214), divorce after adoption (F220), the confidential consultation (F106), the related links (F225, F210, F241, F220) and Eddie W., quoted verbatim with the missing word "the man you" (F134; C15) and the disclaimer. "Free consultation" stays under C14; A16 queued that question. The client checklists ("What to gather first") are practical guidance and make no claims about the firm.
- **/dcs-case-attorney/:** parents and guardians in Murfreesboro and Rutherford County (F045), the investigation, removal, dependency and neglect, permanency, review and TPR matters (F236–F242), the confidential consultation (F107), F057 for the criminal overlap, F186 for domestic assault, and the Katherine S. card headline (F136) with the disclaimer. The first-steps list and the grandparent FAQ stay as written; A16/G5 already queued both.
- **/testimonials/:** the three reviews and three headlines (F133–F138) match verbatim, and the page uses no stars or aggregate rating (C15). The disclaimer is present. The practice summary matches C12's safest form (F057, F144). The links cite F298, F299 and F247.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G5")

1. Whether Will personally represented the paternity clients described in F212, so the page may say "Will has represented…" (/family-law/paternity/).
2. Whether one free consultation can cover a criminal matter and a related DCS matter (/dcs-case-attorney/). This joins the G1 and G3 question.
3. Approval of "Court hearings may follow" and "the court may hold hearings" after a removal, and whether to state when a removal hearing is held (/dcs-case-attorney/).
4. Approval of the adoption FAQ wording, and whether adoptive parents attend the final hearing (/adoption/).


## G6

Scope: the English copy for `/faqs/`, `/in-the-news/` and `/blog/` (`copy/pages/<slug>.md`). Each tagged sentence was compared against its fact's `claim` and `exact_quote` in `inventory/facts.json`, and against the old page text (`inventory/text/faqs.md`, `family-law.md`, `family-law__child-custody.md`). Untagged sentences were checked for hidden factual claims. Every page was screened for law-firm rule breaches (plan/rules/law-firm.md) and warn phrases.

Results of the screen:
- No warn phrases were found.
- No best/top/leading, expert, specialist or certified wording was found. "Guarantee" appears only inside the results disclaimer.
- Every cited fact ID resolves.
- "Practicing law since 2004" follows C01 (F087). The counties follow C06 (F035), and federal cases are not claimed.
- Spanish service is limited to "Se habla español" and "Spanish-speaking services" (F092, F094, F093; C13).
- Every "free consultation" sits beside the `tel:` link.
- /faqs/ carries "Prior results do not guarantee a similar outcome." twice, because it mentions reducing or dismissing charges (F150).
- No phone number, address, hours, date or name had been altered, apart from the DWI term listed below.
- `node tools/check.mjs --gate 4` reports no errors for these three files. The only gate FAILs are the missing ES copy files and copy/FACT-CHECK.md.

### Changes made

| Page | Section | Before | After | Reason |
|---|---|---|---|---|
| /faqs/ | Hero | "Most people who call have the same first questions. Here are plain answers to the common ones." | "Here are plain answers to the questions people often have before they call." | The old version made an unsourced claim about callers ("most"). |
| /faqs/ | Getting started FAQ | Q "Will I deal with Will Fraley himself?" A "Will Fraley and his staff personally handle criminal cases, no matter how big or small. {F058}" | Q "Who will handle my case?" A "On a criminal matter, Will Fraley and his staff personally handle your case, no matter how big or small it may be. {F058}" | F058 covers criminal cases only. Under the old question, the answer read as a promise for every matter. Owner question queued. |
| /faqs/ | Criminal FAQ "Do I really need a lawyer?" | "No honest lawyer can promise you a result, and Will won't." | "No lawyer can promise you a particular result." | The old line made an unsourced claim about Will's conduct and implied a comparison with other lawyers (RPC 7.1). |
| /faqs/ | DUI FAQ "What DUI-related charges…" | "…felony DUI and underage DUI. {F153}" | "…felony DUI and underage DWI. {F153}" | The source says "underage DWI", so the term had been altered. The fix matches G1, where the owner question is already queued. |
| /faqs/ | Family FAQ "What is joint custody?" | "Joint custody can mean shared time, shared decisions, or both. {F291}" | "In general terms, joint custody can mean… {F291}", plus the untagged advice "The terms used in your own case may differ, so ask how they apply to you at your consultation." | F291 is a verify-law fact. The definitions are now framed as general usage, not as current Tennessee law. Owner question queued. |
| /faqs/ | Family FAQ "How does a judge decide custody?" | "Many custody questions are worked out by agreement; others are argued before the court. {F313}" | "Will handles custody matters through cooperative negotiation or by arguing before the court. {F313}" | F313 describes the firm's approach and gives no frequency ("many"). The fix matches G4. |
| /faqs/ | Family FAQ "Do courts still favor mothers?" | "Will Fraley advocates for parents in family court, and that includes fathers. {F057}" | "Will Fraley advocates for parents in family court. {F057} The firm has represented fathers who are trying to prove a child is theirs, as well as mothers who are attempting to establish paternity. {F212}" | F057 does not mention fathers. The fathers claim is now sourced to F212 in the form G5 used ("The firm has represented…"). |
| /faqs/ | Family FAQ "What does a divorce have to settle?" | "Will negotiates each of these with you. {F201}" | "Will can guide you through these disputes, including child custody negotiations. {F147}" | F201 is a list item ("child support;"), not a statement about the firm's work. F147 states the negotiation claim. |
| /faqs/ | Injury FAQ "Do I have to take the other person to court?" | "Usually not. Most personal injury cases are settled… {F288}" | "Often not. Many personal injury cases are settled… {F288}" | F288 is a verify-law fact. The change follows G1's "many" softening, and the owner question is already queued under G1. |
| /in-the-news/ | DNJ card | "A business story about Will Fraley and his private practice. {F140}" | "A story from the Daily News Journal's business section. {F140,F142}" | C16 says to describe the item neutrally, without characterizing it. "About Will Fraley and his private practice" was an inference from the URL slug. Owner question queued. |

### Checked and kept

- **/faqs/ legal statements:** F280 (federal trafficking, "can become"), F281 (DUI penalty types), F304 (BAC and prior DUIs), F284 (declining to answer), F287 (four elements), F286 and F245 (damages), F285 ("partly at fault does not always end a claim", with no 50% figure), F289 (totaled, "generally") and F290 (best interests). Each is hedged and close to the old site's wording. One owner approval item covers them all.
- **/faqs/ material left out on purpose:** theft thresholds (F279, C17), "refuse the test without penalty" (F283, C18) and "family court favors the parent who takes the children" (F292, C18). An owner question asks whether any should return.
- **/in-the-news/:** The date (October 5, 2014), outlet name (F142), link URL and headline-from-slug (F140) were checked character for character. The facts in "About Will Fraley" (F052, F051, F087) and the press contact (F013, F019) match the ledger.
- **/blog/:** Every claim matches its fact (F035, F111, F048, F299, F144, F112, F013, F090, F092). "Will Fraley also handles personal injury cases" is the C12 safe form. No changes were needed.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G6")

1. Who handles family-law, DCS and personal-injury matters (the personal-handling FAQ on /faqs/).
2. Approval of the ten hedged Tennessee legal statements on /faqs/.
3. Whether to restore the theft-threshold or roadside-test answers, using owner-supplied wording.
4. The exact headline and description of the 2014 DNJ story on /in-the-news/.


## G7

Scope: the English copy for `/privacy-policy/`, `/accessibility/`, `/cookie-settings/`, `/thank-you/` and `/404/` (`copy/pages/<slug>.md`). All five set `policy_page: true`. Every tagged sentence was compared against its fact's `claim` and `exact_quote` in `inventory/facts.json`. The IDs checked were F001, F013, F015, F019, F020, F021, F026, F031, F032, F046, F064, F065, F090, F092, F098, F099, F111, F112 and F299, plus F133 and F134, which were added. Every ID resolves, and every one supports its sentence. The phone, email, address and hours match the ledger exactly; only the hours format changed ("9:00am - 5:00pm" became "9:00 a.m. – 5:00 p.m."). Untagged sentences were checked for hidden firm facts. Statements about how the new site works were checked against plan/REVAMP-BRIEF.md (§5 items 9–12, §8, §9), site.config.json, tools/configure.mjs and A16's G7 decisions and operator list. Each page was checked against plan/rules/law-firm.md and the warn-phrase list. Every "free consultation" sits beside a `tel:+16154107290` link. Spanish service appears only as "Se habla español" (F092). The pages make no comparisons and contain no best, top or leading. The words expert, specialist, certified and guarantee do not appear, and no page reports results, so no disclaimer is needed. The privacy page carries "not legal advice" (F111). No warn phrase was found.

### Changes made

| Page | Line / section | Before | After | Reason |
|---|---|---|---|---|
| /accessibility/ | "Our target" | "The site is tested before launch and again whenever it changes." | "The site is tested before launch, and the same tests are there to run again whenever a page changes." | The draft promised re-testing after handover, which nobody has committed to. The tests (axe, Lighthouse) do exist in tools/. An operator item asks for them to ship with the handover. |
| /accessibility/ | Known limitations, "Certificate scans" | "two training certificates {F064,F065}" | "two course-completion certificates {F064,F065}" | F064 and F065 are certificates of completion. Law-firm rule 3 uses "course-completion" so they cannot be read as specialty certification. |
| /accessibility/ | Known limitations, testimonials | "Testimonials appear exactly as clients wrote them. That includes their original spelling and one review that stops mid-sentence." (untagged) | "Testimonials appear exactly as published. That includes one review with a missing word and one that stops mid-sentence. {F133,F134}" | No ledger entry describes spelling errors. The real quirks are F134 ("the man you.") and F133 (ends "I highly recommend"; C15). "As clients wrote them" claimed knowledge of the originals; the ledger only shows what was published. |
| /accessibility/ | Known limitations, "Other websites" | "Links to Google Maps, Facebook, news sites and attorney directories open sites we do not control." | "Links to other websites, such as Google Maps and the newspaper story on In the News, open sites we do not control." | No page on the new site links to an attorney directory (the AVVO link, F029, was not carried over). Only one news story is linked (F140). |
| /accessibility/ | Report a barrier | "Mail or in person: 509 W College St… {F021}" | "Mail: 509 W College St… {F021} To come by in person, call ahead to set a time." | This matches the Contact page ("Call ahead to set up a time to meet."). It does not imply walk-in availability, which is not ledgered. |
| /thank-you/ | Step 1 | "It goes straight to the office inbox. {F019}" | "It is delivered to the office inbox. {F019}" | The Privacy Policy says the form travels through Web3Forms, so "straight" contradicted it. |

### Checked and kept (no change)

- /privacy-policy/: "Sending a message does not create an attorney-client relationship. {F112}". F112 is the old site's disclaimer that viewing the site does not create an attorney-client relationship. Law-firm rules 5 and 8 require this sentence, extended to contacting the firm, so the tag stays.
- /privacy-policy/: "Some pages link to … the firm's Facebook page. {F026}". This is true because the privacy page itself carries the link. The tag stays so that no fact ID is lost for the Spanish twin. Whether the page is still active is queued for the owner.
- /thank-you/: steps 2 and 3 (F098, F099). F098 supports scheduling an initial consultation and F099 supports discussing legal options. The promise that the office will reach out was already queued by A16 (G7). No response time is stated.
- /404/: "Divorce, custody, visitation, adoption and DCS cases. {F299}". All five appear in the old family-law menu.
- /cookie-settings/: no firm facts beyond the email and the CTA, both tagged correctly. The vendor and consent wording matches A16's decisions (the `consent` cookie, GPC treated as "no").
- The "while you wait" tips on /thank-you/ are practical, not legal statements. They state no rule of law.

### Claims moved to the owner list (plan/fragments/A17/needs-owner.md, "## G7")

- /privacy-policy/: the commitments "We do not sell your personal information. We do not trade it or rent it" and "We use what you send for one purpose", plus the "disclose when the law requires" line. These are office commitments with no ledger source. The text is kept, pending confirmation, because a privacy policy needs them.
- /privacy-policy/: whether the Facebook page (F026) is still active and should be linked.
- Already queued by A16 (G7) and not repeated: retention, deletion and children's information; texting; ad pixels; alternative formats on /accessibility/; the thank-you response promise.

### Operator items (plan/fragments/A17/needs-operator.md, "## G7")

- Add a 200% text-zoom check to accessibility QA, so the "Text can be enlarged to 200%" bullet stays true.
- Ship the axe and Lighthouse tools with the handover, with a rerun instruction.

### Gate

`node tools/check.mjs --gate 4` reports no errors for these five English files, before or after the edits. No fact ID was removed. F133 and F134 were added to /accessibility/.

