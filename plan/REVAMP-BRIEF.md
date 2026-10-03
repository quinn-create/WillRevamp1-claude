# REVAMP BRIEF — willfraleylaw.com

Owner: A11 (creative director). Inputs: `audit/AUDIT.md` and the eight audits behind it, `inventory/facts.json`,
`inventory/CONFLICTS.md`, `plan/rules/law-firm.md`. This brief binds copy (A16), design (A12–A14), images (A15)
and build. Where it names a fact, the fact ID is given; copy must still tag every factual sentence.

---

## 1. Positioning

**One line (internal, not a tagline):**
> The Murfreesboro attorney you call when a criminal charge or a family-court fight lands on your doorstep.
> He has practiced since 2004, the consultation is free and one tap away, and se habla español.

**What the site must make obvious in five seconds**

| Message | Source |
|---|---|
| Will Fraley, Attorney at Law, Murfreesboro | F001, F046 |
| Defends people in criminal court and stands with parents and spouses in family court. Personal injury is also handled. | F057, F144 |
| Practicing law since 2004 | F087 (C01 safest form; no year counts) |
| Free consultation: call (615) 410-7290 | F090 + phone fact; always a `tel:` link |
| Se habla español | F092 |
| Murfreesboro, Rutherford County and the surrounding counties (Rutherford, Coffee, Wilson where a list is needed) | F034, F035 (C06) |

**Where we win (from MARKET):** No rival has (1) a full Spanish mirror, (2) a DCS page, or (3) a bridge between
criminal and family cases. Will's practice sits exactly at that crossing (F057). The site leads with being
local, reachable and fluent in both kinds of trouble, and backs it with plain facts rather than badges.

**What we never claim:** "best", "top", "leading", "premier", "expert", "specialist", "certified",
"aggressive", year counts (18, 20, 20+, decades), "our attorneys" or a team of lawyers, results figures,
star ratings. Katie Fults appears only on About, as published (law-firm rule 12, C05).

## 2. Audiences

In priority order. Each practice page names its primary reader in the intent column of `plan/SITEMAP.md`.

1. **The person just charged.** DUI, domestic assault, drugs, theft, probation violation, violent or sex
   offense. They are on a phone, often at night or the morning after, scared and short on attention. They need
   the number, what happens next, and a reason to believe this lawyer will take it seriously.
2. **The family of someone arrested.** A parent, spouse or adult child, often the one who actually calls and
   pays. They need to know what they can do today. The criminal hub gets a "If someone you love was
   arrested" section. A03 found no page that speaks to them.
3. **The parent in family court.** Divorce, custody, visitation, parenting-plan changes, paternity. Anxious
   and worried for their children. They need calm, clear process and to feel heard (the testimonials say
   exactly this: F133, F136).
4. **The parent or guardian contacted by DCS.** Urgent and frightened. No competitor serves them (MARKET).
5. **Adoptive families.** Hopeful rather than in crisis. A warm, simple next step.
6. **Spanish-speaking residents of Rutherford County.** This audience cuts across 1–5. They are served by the
   full `/es/` mirror and the "Se habla español" label beside the phone everywhere.
7. **The injured person (personal injury).** A secondary audience. The page is modest and accurate (C12).
8. **Referring lawyers and returning clients.** These readers come for the About page, the credentials and the
   phone number (F134: a client was referred by another attorney).

## 3. Voice direction

A16 turns this into `copy/VOICE.md`.

- **Steady, plain, local.** Write like a calm Murfreesboro lawyer across a desk, not like an ad. Short
  sentences, everyday words, reading grade 8 (at most 10 on the legal-process pages). Today's median is grade
  9.3, and the Contact page is 11.2.
- **Answer first.** The first paragraph under every H1 tells the reader what to do now and how to reach Will.
  Explanation comes after.
- **Second person, active voice.** Write "You've been charged. Here's what happens next." Avoid "Individuals
  who have been charged may…".
- **Firm but never threatening.** Never write "aggressive", "fight hard for you", "crush" or fear-selling.
  Seriousness comes from specifics: what the process is, what Will does, what to bring.
- **Singular and honest.** Write "Will Fraley", "Will" (after the first mention) and "our office". Never "our
  attorneys" or "our legal team". Personal injury copy names Will only.
- **Respect the reader's situation.** For criminal pages, say "charged", not "convicted" (A03 found the Drug
  Crimes page asks "Have you been convicted…"). For family pages, put the children first.
- **No legal figures or statutes** unless the owner approves them (C17, C18). Describe the process in general
  terms and point to the consultation.
- **Facts are frozen, voice is free.** Every factual sentence carries `{fact:F###}`. Any digit needs a tag.
  Testimonials are quoted verbatim, typos and truncation included.
- **Avoid** every warn phrase in CLAUDE.md rule 8 and the old site's clichés: "peace of mind", "navigate",
  "dedicated team", "premier", "Call us today!".
- **One CTA wording site-wide.** Use "Free consultation" and "Call (615) 410-7290" (ES: "Consulta gratuita",
  "Llame al (615) 410-7290"), always rendered as a `tel:+16154107290` link. Use "Send a short message" for
  the form.

## 4. Brand equity to keep

| Keep | How | Source |
|---|---|---|
| Wordmark "WILL FRALEY / ATTORNEY AT LAW" | Redrawn as SVG with a solid tagline that meets 4.5:1 contrast, plus a favicon and a monogram mark. Same letterforms and proportions; no redesign. | A07, IMG01 |
| Logo blue **#447CB7** | The anchor hue in all three directions. Use it for large type and fills. Text-size blue is about **#356BA6** (5.5:1 on white). | A07 |
| Navy **#1D478A** | The deep ground for bands and the footer (white on it is 9.05:1). | A07 |
| Will's photographs | IMG03 (at his desk) and IMG02 (brick doorway), cropped, color-matched and AVIF. Both are low-res, so use framed or split layouts, never full-bleed. IMG04 only if flipped back and unframed. | A07, ASSETS |
| Katie Fults's photo | IMG05, small avatar on About only. | C05 |
| Certificate scans | IMG06 and IMG07, shown as documents ("completed training"), linking to the full-size file. | C19 |
| The persistent phone band | Kept as a 48 px mobile bottom bar with the full number and the micro-label "Free consultation · Se habla español". It never covers content. | A07, A08 |
| Murfreesboro rootedness | Tennessee native, came to Murfreesboro for MTSU in 1992, made it home (F051, F053). Red-brick and courthouse-square warmth appears in generated scenes, never captioned as the office. | A07 |
| The three testimonials | Verbatim, no stars, results disclaimer on the same page. | F133–F136, C15 |
| The disclaimer's substance | In the footer of every EN and ES page. | A09, law-firm rule 5 |

## 5. Must-fix list

Each item is a release blocker. The audit that found it is shown in brackets.

1. **Phone first.** `tel:+16154107290` in the header, hero, mid-page CTA band, footer and mobile bottom bar
   on every page, EN and ES. Every "free consultation" sits beside it. No "online or at" sentence. [A03, A08,
   A09]
2. **Zero dead links.** No `href="#"`, no staging-host (`hostingersite.com`) links, no links that pass through
   a 301 on the way, no "Read More" icon links. [A04, A08]
3. **One H1 per page**, naming the service and Murfreesboro, followed by a sequential H2/H3 outline. Sidebar
   and footer headings are not headings. [A04, A06]
4. **Titles of 60 characters or fewer and descriptions of 140–155 characters, unique per page.** Never
   "Murfreeesboro". Adoption and DCS get descriptions. [A04]
5. **One schema graph:** LegalService plus Attorney "Will Fraley, Attorney at Law", Friday closing 16:00,
   `areaServed` set to Murfreesboro, Rutherford, Coffee and Wilson, `knowsLanguage` en and es, Person,
   BreadcrumbList. FAQPage on `/faqs/` only. No AggregateRating or Review. [A04, A10]
6. **Safest-form facts** from CONFLICTS: "Practicing law since 2004"; the singular firm name; the three shared
   memberships with "Defenses" corrected; no Wills card; no Murder card (Sex Crimes added to the grid); no
   immigration, military-family or commercial-defense claims; no DUI or theft figures. [A03, A09]
7. **Compliance language:** none of the forbidden words; the results disclaimer on every page that has a
   testimonial or outcome; "focuses on" and "handles" instead. [A09, law-firm.md]
8. **Rebuild Theft and Drug Crimes** to full pages from ledgered facts. Replace the 21-page "Why" block with
   one proof strip. [A03, A04]
9. **4-field form** (name, phone, email optional, short note optional) with visible labels, autocomplete, a
   natural tab order, an error summary, the non-confidentiality notice above Submit, a Privacy link and
   `tel:` beside Submit. It stays OFF until keys are added, and SMS consent is removed. The Spanish form sets
   "Prefiero español". [A06, A08, A09]
10. **Accessibility:** a skip link, named landmarks, a `:focus-visible` ring with at least 3:1 contrast,
    tokens contrast-checked (4.5:1 for text, 3:1 for UI), no autoplay, motion only under
    `prefers-reduced-motion: no-preference`, tap targets of at least 44 px, left-aligned text with lines of 75
    characters or fewer. [A06]
11. **Performance:** static output, JS of 50 KB gzipped or less per page (aim for 30 KB), at most 2
    self-hosted font families, AVIF/WebP with `srcset`, `fetchpriority` on the hero, LCP of 2.0 s or less on
    mobile, CLS of 0.05 or less. [A05]
12. **Privacy, Cookie Settings and Accessibility pages** (EN and ES) with last-reviewed dates. GA4 scaffolded
    OFF and loaded only after consent. [A09]
13. **Full redirect map** in `plan/sitemap.json`: all 89 old URLs land on a real page in one hop. The
    query-string shortlinks get a Pages Function or a zone rule. [A04]
14. **Kill list:** stock photos, Mac-screenshot heroes and OG images, star graphics, the testimonial
    carousel, the 18-link sidebar, the duplicate menus, social icons in the header, the designer credit, the
    feeds, the `/page/2/` and category archives, and the "For Sitemap Click Here." link. [A04–A08]

## 6. Page-by-page intent and primary CTA

`plan/sitemap.json` holds the source of truth. The full table, with Spanish paths and redirects, is in
`plan/SITEMAP.md`. Every page's secondary CTA is "Send a short message" (`/contact-us/#form`, or the
in-page form anchor on practice pages).

<!-- PAGES:START -->
| EN path | ES path | Page | Intent (who it serves, what it must do) | Primary CTA |
|---|---|---|---|---|
| `/` | `/es/` | Home (mockup) | Tell a stressed visitor in five seconds who Will Fraley is (Murfreesboro attorney practicing since 2004; criminal defense and family law, plus personal injury), that Spanish is spoken, and how to reach him now. Route to the right practice page. | Call (615) 410-7290 — free consultation |
| `/legal-services/` | `/es/servicios-legales/` | Practice Areas | Practice-areas hub: every service in one scannable list, grouped Criminal / Family / Personal injury, plus the criminal-meets-family bridge (how a charge can affect custody or a parenting plan). Fixes the staging-host links and the "our attorneys" claims. | Call (615) 410-7290 — free consultation |
| `/criminal-defense/` | `/es/defensa-penal/` | Criminal Defense (mockup) | Criminal hub for someone just charged or arrested, and for their family: what to do now, the eight charge pages (Sex Crimes added, Murder card removed), what happens next, and a call-first CTA. | Call (615) 410-7290 — free consultation |
| `/criminal-defense/dui/` | `/es/defensa-penal/dui/` | DUI | DUI arrest in Rutherford County: process in plain terms, license concerns, what to bring to the consultation. No penalty figures unless the owner approves them (C18). | Call (615) 410-7290 — free consultation |
| `/criminal-defense/drug-crimes/` | `/es/defensa-penal/delitos-de-drogas/` | Drug Crimes | Someone charged (not convicted) with a drug offense. Rebuilt past stub length from ledgered facts; speaks to the accused and the family. | Call (615) 410-7290 — free consultation |
| `/criminal-defense/theft/` | `/es/defensa-penal/robo/` | Theft | Theft or shoplifting charge: what the charge means in general terms and next steps. No dollar thresholds (C17). Rebuilt past stub length. | Call (615) 410-7290 — free consultation |
| `/criminal-defense/violent-crimes/` | `/es/defensa-penal/delitos-violentos/` | Violent Crimes | Serious violent-offense charges (assault through homicide, per F192): calm, direct reassurance that the case gets a real defense; absorbs the old "Murder" card. | Call (615) 410-7290 — free consultation |
| `/criminal-defense/sex-crimes/` | `/es/defensa-penal/delitos-sexuales/` | Sex Crimes | Accused of a sex offense: discretion, confidentiality of the consultation, what not to do. Drops the "criminal sexual conduct" wording (C18). | Call (615) 410-7290 — free consultation |
| `/criminal-defense/fraud/` | `/es/defensa-penal/fraude/` | Fraud | Fraud or white-collar charge for an individual: process and documents to gather. No commercial-organization claims (C11). | Call (615) 410-7290 — free consultation |
| `/criminal-defense/probation-violation/` | `/es/defensa-penal/violacion-de-libertad-condicional/` | Probation Violation | Probation violation warrant or hearing: urgency, what happens at the hearing, link to family-law effects. | Call (615) 410-7290 — free consultation |
| `/criminal-defense/domestic-assault/` | `/es/defensa-penal/agresion-domestica/` | Domestic Assault | Domestic assault charge: next steps, bond conditions in general terms, and the bridge to custody and visitation pages. | Call (615) 410-7290 — free consultation |
| `/family-law/` | `/es/derecho-familiar/` | Family Law | Family-law hub for parents and spouses in Rutherford, Coffee and Wilson counties: divorce, custody, visitation, parenting plans, paternity, plus DCS and adoption. No "Wills" card (C09). | Call (615) 410-7290 — free consultation |
| `/family-law/divorce/` | `/es/derecho-familiar/divorcio/` | Divorce | Divorce in Tennessee explained plainly; adds child support and alimony sections from ledgered facts (market gap). | Call (615) 410-7290 — free consultation |
| `/family-law/child-custody/` | `/es/derecho-familiar/custodia/` | Child Custody | Parent in a custody dispute: how decisions get made in general terms, what to document, and links to visitation and parenting plans. Drops the risky "favors the parent who takes custody" advice (C18). | Call (615) 410-7290 — free consultation |
| `/family-law/visitation/` | `/es/derecho-familiar/visitas/` | Visitation | Parent seeking or defending parenting time: rewritten to its own intent, distinct from custody. Removes the broken "online or at" sentence. | Call (615) 410-7290 — free consultation |
| `/family-law/parenting-plan-modifications/` | `/es/derecho-familiar/modificacion-plan-de-crianza/` | Parenting Plan Modifications | Parent whose circumstances changed and needs an existing parenting plan changed: when it is possible, what the process looks like. | Call (615) 410-7290 — free consultation |
| `/family-law/paternity/` | `/es/derecho-familiar/paternidad/` | Paternity | Father or mother establishing or contesting paternity: why it matters for custody, visitation and support. | Call (615) 410-7290 — free consultation |
| `/adoption/` | `/es/adopcion/` | Adoption | Adoptive families in Murfreesboro and Rutherford County: a warm, clear overview and first step. Gets the missing meta description. | Call (615) 410-7290 — free consultation |
| `/dcs-case-attorney/` | `/es/abogado-casos-dcs/` | DCS Cases | Parent or guardian contacted by the Department of Children's Services: urgent, calm first steps; the only DCS page in the local market. Gets the missing meta description. | Call (615) 410-7290 — free consultation |
| `/personal-injury/` | `/es/lesiones-personales/` | Personal Injury | Injured person in the Murfreesboro area: modest, singular, factual (Will Fraley handles personal injury cases, C12); a clear next step instead of a dead end. | Call (615) 410-7290 — free consultation |
| `/about/` | `/es/sobre-nosotros/` | About | Who Will Fraley is: Tennessee native, MTSU, Nashville School of Law 2004, practicing since 2004, TACDL training with the two certificate scans, the three shared memberships; Katie Fults shown here only, as published. | Call (615) 410-7290 — free consultation |
| `/testimonials/` | `/es/testimonios/` | Testimonials | The three published client testimonials, verbatim, no stars, with the results disclaimer. | Call (615) 410-7290 — free consultation |
| `/in-the-news/` | `/es/en-las-noticias/` | In the News | NEW. Replaces the dead "#" menu item: lists only the October 2014 Daily News Journal story, linked and described neutrally (C16). | Call (615) 410-7290 — free consultation |
| `/faqs/` | `/es/preguntas-frecuentes/` | FAQs | Answers to common questions, grouped by practice area, on native details/summary; one FAQPage schema. Only owner-safe answers (C17, C18). | Call (615) 410-7290 — free consultation |
| `/contact-us/` | `/es/contacto/` | Contact (mockup) | Reach the office now: tap-to-call first, then a 4-field form (OFF until configured) with the non-confidentiality notice, address, hours, map link and "Se habla español". | Call (615) 410-7290 — or send a short message |
| `/privacy-policy/` | `/es/politica-de-privacidad/` | Privacy Policy | NEW. What the site collects (form fields, optional analytics after consent), why, and how to ask for deletion. Shows a last-reviewed date. | Call (615) 410-7290 — free consultation |
| `/accessibility/` | `/es/accesibilidad/` | Accessibility Statement | NEW. WCAG 2.2 AA commitment, known limits, and how to report a barrier by phone or email. Shows a last-reviewed date. | Call (615) 410-7290 — free consultation |
| `/cookie-settings/` | `/es/configuracion-de-cookies/` | Cookie Settings | NEW. Re-open the consent choices; explains that tracking is off until the visitor opts in. | Call (615) 410-7290 — free consultation |
| `/thank-you/` | `/es/gracias/` | Thank You | NEW. Confirms the message was sent, says what happens next, and repeats the phone number for anything urgent. | Call (615) 410-7290 if it cannot wait |
| `/blog/` | `/es/blog/` | Blog (not routed) | NEW scaffold. Built only when site.config.json blog.enabled is true (no posts exist today). Copy is still written so the hub is ready. | Call (615) 410-7290 — free consultation |
| `/404/` | `/es/404/` | Page Not Found (not routed) | NEW. Friendly not-found page in EN and ES: phone, search-free links to the main practice hubs, never a dead end. Emitted as dist/404.html. | Call (615) 410-7290 |
<!-- PAGES:END -->

**Section pattern for practice pages** (the copy uses component hints):
`[hero]` H1, answer-first paragraph, phone CTA → `[proof-strip]` since 2004 · Tennessee native · Se habla
español · free consultation → what this charge or matter means, in plain terms → `[steps]` what happens next →
"If someone you love…" (criminal) or "Putting your children first" (family) → `[faq]` 3–5 owner-safe
questions → `[testimonial]` one verbatim review, the most relevant available, with the disclaimer →
related pages (criminal ↔ family bridge links) → `[cta-band]`.

**Criminal ↔ family bridge.** Domestic Assault, Probation Violation and DUI link to Child Custody,
Visitation and Parenting Plan Modifications, and back. `/legal-services/` carries a short section on how a
charge and a family case can affect each other, using ledgered facts only (F057). Any specific legal effect
waits for the owner.

## 7. Spanish strategy

- **A full mirror, not a sample.** Every EN page has an ES twin under `/es/` with a natural Spanish slug
  (`/es/defensa-penal/dui/`, `/es/derecho-familiar/custodia/`, `/es/contacto/`, `/es/sobre-nosotros/`). The
  Spanish home is `/es/`. Copy files stay keyed by the EN slug (`copy/pages/es/<slug>.md`).
- **Written in Spanish, not machine-translated.** Use neutral Latin-American Spanish, "usted", and the same
  grade-8 plainness. On first mention, a court term carries its English form in parentheses, because the
  reader's court papers will be in English: "plan de crianza (parenting plan)", "violación de libertad
  condicional (probation violation)", "DCS (Departamento de Servicios para Niños)".
- **No claim the English page doesn't make** (law-firm rule 9). ES pages cite only the fact IDs their EN page
  cites.
- **Spanish-service claims stay exactly as ledgered.** Use "Se habla español" (F092) and "Spanish-speaking
  services available" (F094; ES: "Servicios disponibles en español"). Hold "full bilingual Spanish services"
  (F093) until the owner answers C13. Never say Will personally speaks Spanish.
- **Findable.** Every page pair gets `hreflang` en, es and x-default (EN), ES titles and descriptions written
  for Spanish search terms ("abogado de defensa penal en Murfreesboro", "abogado de divorcio en
  Murfreesboro", "abogado de custodia"), an XML sitemap with alternates, and `knowsLanguage` in the schema.
- **Reachable.** The header label "Se habla español" sits beside the phone on EN pages too, linking to `/es/`.
  The language toggle goes to the current page's twin, never to the home page. The ES form posts with
  "Prefiero español" set. The ES footer legal line contains "no constituye asesoramiento legal". The ES
  results disclaimer is "Los resultados anteriores no garantizan un resultado similar."
- **Same number, same hours.** There is no separate Spanish line unless the owner provides one.

## 8. Navigation

**Six items, plus the phone CTA and the language toggle**, rendered once and two levels deep at most.

| # | EN | ES | Path | Dropdown |
|---|---|---|---|---|
| 1 | Criminal Defense | Defensa penal | `/criminal-defense/` | DUI, Drug Crimes, Theft, Violent Crimes, Sex Crimes, Fraud, Probation Violation, Domestic Assault |
| 2 | Family Law | Derecho familiar | `/family-law/` | Divorce, Child Custody, Visitation, Parenting Plan Modifications, Paternity, Adoption, DCS Cases |
| 3 | Personal Injury | Lesiones personales | `/personal-injury/` | — |
| 4 | About | Sobre nosotros | `/about/` | About Will Fraley, Testimonials, In the News |
| 5 | FAQs | Preguntas frecuentes | `/faqs/` | — |
| 6 | Contact | Contacto | `/contact-us/` | — |
| — | **(615) 410-7290** | **(615) 410-7290** | `tel:+16154107290` | Micro-label: "Free consultation · Se habla español" |
| — | Español / English | Español / English | the current page's twin | — |

- **Desktop:** a sticky header no taller than 64 px. The logo links home. Dropdowns open on click or keyboard
  (not hover-only), with `aria-expanded`.
- **Mobile:** the logo, a phone icon button and a menu button. The menu is a full-height accordion. A 48 px
  bottom call bar has safe-area padding and `scroll-padding-bottom`.
- **Footer:** NAP (509 W College St, Murfreesboro, TN 37130 · (615) 410-7290 · inbox@willfraleylaw.com), hours
  (Mon–Thu 9:00–5:00, Fri 9:00–4:00), Practice Areas (`/legal-services/`), Privacy Policy, Accessibility,
  Cookie Settings, Sitemap, and the legal line ("…not legal advice…").
- **Hub access:** `/legal-services/` is reachable from the footer, the home "All practice areas" link and
  every practice page's breadcrumb (Home › Practice Areas › Criminal Defense › DUI).

## 9. Success measures

- Lighthouse mobile of 95 or more in all four categories on every EN and ES page. LCP of 2.0 s or less, CLS of
  0.05 or less, TBT of 150 ms or less.
- axe: 0 serious or critical issues, visible focus on 100% of tab stops.
- 0 unsourced facts, 0 forbidden words, and the results disclaimer wherever results appear.
- All 89 old URLs return 200, or a single 301 to a 200.
- A tap-to-call link in the first 390 px viewport of every page.
