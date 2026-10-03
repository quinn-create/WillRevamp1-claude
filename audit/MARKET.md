# MARKET — competitor and local-search audit (A10)

Score: 4/10

willfraleylaw.com competes in a crowded field with a thin site: 24 pages, no H1, no reviews. It still holds two assets no rival matches: Spanish service and a DCS page.

## Evidence

**SERPs (WebSearch, 2026-10-03).** Directories (Cornell LII, Avvo, Nolo, abogado.com) dominate all five queries. Ranking firms: attorneydavidscott.com (3 of 5), Raybin & Weissman, McCarter East, Cordell & Cordell. willfraleylaw.com appeared in none. "abogado Murfreesboro TN" returned only directories.

**Sites reviewed.** I downloaded each homepage, grep-verified the claims below and counted sitemap URLs.

| Site | H1 / hero image | Proof | CTA / phone | Spanish | Schema | URLs |
|---|---|---|---|---|---|---|
| murfreesborolawyer.com | "…Proven Record of Success" / courthouse | Avvo 10.0 | header tel, no form | none | Organization, FAQPage | 161 |
| crainlawtn.com | "You Are Innocent Until Proven Guilty." / attorney | "4.9 Rating on Google", "1,000+ Cases Handled" | header tel ×3, form | none | Organization | 116 |
| ddrakelaw.com | "Darren Drake" / headshot | Avvo, NTL, TACDL | no tel link | none | none | 26 |
| mcelaw.com | practice list + 2 towns / team | results page | 2 phones ×6, "no-cost consultation" form | "Traductor de español disponible bajo petición" | LegalService | 151 |
| bosslawtn.com | "You Are Not Alone" / attorneys | "Over 800 Divorces Handled", "$2.3M", AggregateRating 4.1/37 | sticky call ×7 | "Abogado Habla Español" | LegalService, AggregateRating | 55 |
| fiolaparkerlaw.com | "Ready To Protect Your Rights" / banner | Super Lawyers, NTL, AggregateRating 4.1/53 | sticky call ×6 | none | LegalService, AggregateRating | 358 |
| murfreesborolawyernow.com | "For English: 615-796-6299" / stock | NTL, BBB, results | Spanish phone line, chat widget | 1 page | LocalBusiness | 209 |
| borolawgroup.com | "Put a Decade of Legal Experience to Work for You" / headshot | "66 Google reviews" | tel ×8, free-consult form | none | Attorney | 42 |

**Not fully reviewed.** santelgarner.com was summary-only (badges, no Spanish). mitchellattorneys.com returned 403.

**Patterns.**
- 7 of 8 put `tel:` in the header. Only 3 say "free/no-cost consultation" on the homepage.
- All 8 declare `lang="en"`, and none uses hreflang.
- Two sites self-serve an AggregateRating. Google ignores this markup, and it carries Tennessee RPC 7.1 risk.

**Keyword gaps.** Counts are across 469 competitor URLs.
- **Location pages:** Smyrna ×5, La Vergne ×5. Our site has none.
- **Child support (×10) and alimony (×6):** our site only mentions these in body copy on 6 pages.
- **Other topics:** order of protection ×3, expungement ×3, juvenile ×3, uncontested divorce ×4.
- **Trust pages:** results ×3.
- **Spanish search:** "abogado criminal / de divorcio Murfreesboro" is uncontested.

The gap topics after child support and alimony appear nowhere in `inventory/text/`, so they are owner-only.

**Three things none of them do**
1. **A full Spanish mirror.** The best in market is a single Spanish page (Clarke). Our `/es/` mirror with hreflang has no rival, and "Se habla español" is sourced (F092).
2. **A DCS page.** 0 of 469 competitor URLs contain "dcs"; our /dcs-case-attorney/ (F045) is the only one in this market.
3. **A bridge between criminal and family cases.** Every firm that practices both keeps them apart. No page explains how a domestic-assault charge, probation or a DUI affects custody or a parenting plan. Will's practice sits exactly there (F067, F076). Also missing everywhere: an accessibility statement (0 URLs).

## KEEP
- All 24 URLs. DCS and adoption are low-competition intent.
- "Se habla español", moved from a sidebar bullet to the header.
- Free consultation beside `tel:(615) 410-7290`.
- Bar memberships as plain text (F067/F068).
- The three verbatim testimonials, with no stars (C15).

## FIX
- **Hero.** Add a real H1 that names Murfreesboro and both practices, over the attorney photo. Put the phone and "Free consultation" in the first viewport, and add a sticky mobile call bar.
- **Proof strip.** Use sourced facts only: years (safest C01 form), memberships, Tennessee native (F050), Spanish.
- **Child support and alimony.** Give each an H2 section on the divorce and custody pages.
- **Schema.** One LegalService + Attorney graph with `knowsLanguage` en/es.
- **Visibility.** The site appears in zero of five SERPs. GBP and citations go to the operator.

## KILL
- Badge walls, "Top 100" and Super Lawyers-style awards.
- Self-served star ratings and AggregateRating markup.
- Heroes built on result numbers ("800 divorces", "$2.3M") without sourced figures and the disclaimer.
- An H1 that is only a phone number or a name.
- Chat widgets and heavy builder pages (Clarke's homepage: 688 KB of HTML).

## Top 5 moves
1. **Own Spanish search.** Build the full `/es/` mirror with hreflang and `knowsLanguage`. Every EN page gets a Spanish CTA band linking to its twin.
2. **Build a criminal-meets-family hub** on /legal-services/. Cross-link domestic assault, probation, DUI, custody, visitation and parenting plans, using ledgered facts only.
3. **Make DCS and adoption first-class.** Give them home cards plus FAQ blocks with FAQPage schema.
4. **Match the market on conversion.** Add the sticky call bar, phone and free consultation in the hero, and a CTA band on every page, all `tel:`-first.
5. **Queue owner-gated gap pages.** Order of protection, expungement, juvenile, uncontested divorce, Smyrna and La Vergne get built only after the owner confirms.
