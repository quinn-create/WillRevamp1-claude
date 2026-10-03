# SITEMAP — willfraleylaw.com rebuild

Human-readable twin of `plan/sitemap.json` (same data, generated together). Written by A11, Stage 2.

**Rules this map follows**
- All **24 existing URLs are kept exactly** — no renames, no merges. Their search history stays with them.
- `/legal-services/` stays the practice-areas hub; Criminal Defense, Family Law and Personal Injury hang under it in breadcrumbs.
- **New pages:** In the News, Privacy Policy, Accessibility Statement, Cookie Settings, Thank You, the `/blog/` scaffold (built only when `blog.enabled` is true) and the 404 page.
- Every page has a **Spanish twin under `/es/`** with a natural Spanish slug. Copy files keep the English slug (`copy/pages/es/<slug>.md`).
- Three pages are **mockup pages**: Home, Criminal Defense, Contact.
- **Every old URL** (89 in `inventory/old-urls.json`, including the 24 pages) either still exists or 301-redirects in one hop to a real page.

## Navigation (6 items + phone + language toggle)

| # | Label (EN) | Label (ES) | Links to | Dropdown |
|---|---|---|---|---|
| 1 | Criminal Defense | Defensa penal | `/criminal-defense/` · `/es/defensa-penal/` | DUI, Drug Crimes, Theft, Violent Crimes, Sex Crimes, Fraud, Probation Violation, Domestic Assault |
| 2 | Family Law | Derecho familiar | `/family-law/` · `/es/derecho-familiar/` | Divorce, Child Custody, Visitation, Parenting Plan Modifications, Paternity, Adoption, DCS Cases |
| 3 | Personal Injury | Lesiones personales | `/personal-injury/` · `/es/lesiones-personales/` | — |
| 4 | About | Sobre nosotros | `/about/` · `/es/sobre-nosotros/` | About Will Fraley, Testimonials, In the News |
| 5 | FAQs | Preguntas frecuentes | `/faqs/` · `/es/preguntas-frecuentes/` | — |
| 6 | Contact | Contacto | `/contact-us/` · `/es/contacto/` | — |

Right side of the header: **(615) 410-7290** as `tel:+16154107290` with the micro-label "Free consultation · Se habla español", then the **English / Español** toggle (links to the current page's twin). Footer adds: Practice Areas (`/legal-services/`), Privacy Policy, Accessibility, Cookie Settings, Sitemap.

## Pages

| # | EN path | ES path | Title (EN / ES) | Parent | Intent | Primary CTA | Old URLs that land here | Flags |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | `/es/` | Home / Inicio | — | Tell a stressed visitor in five seconds who Will Fraley is (Murfreesboro attorney practicing since 2004; criminal defense and family law, plus personal injury), that Spanish is spoken, and how to reach him now. Route to the right practice page. | Call (615) 410-7290 — free consultation | `/`, `/category/uncategorized/`, `/page/2/`, `/wp-json/`, `/feed/`, `/comments/feed/`, `/wp-content/uploads/2025/10/mainstage-v1-img.webp`, `/wp-content/uploads/*`, `/?p=1`, `/?author=1`, `/?p=46` | **mockup** |
| 2 | `/legal-services/` | `/es/servicios-legales/` | Practice Areas / Áreas de práctica | `/` | Practice-areas hub: every service in one scannable list, grouped Criminal / Family / Personal injury, plus the criminal-meets-family bridge (how a charge can affect custody or a parenting plan). Fixes the staging-host links and the "our attorneys" claims. | Call (615) 410-7290 — free consultation | `/legal-services/`, `/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-12.58.05-PM.png`, `/?p=65` |  |
| 3 | `/criminal-defense/` | `/es/defensa-penal/` | Criminal Defense / Defensa penal | `/legal-services/` | Criminal hub for someone just charged or arrested, and for their family: what to do now, the eight charge pages (Sex Crimes added, Murder card removed), what happens next, and a call-first CTA. | Call (615) 410-7290 — free consultation | `/criminal-defense/`, `/legal-services/criminal-defense/`, `/legal-services/criminal-defense/index.html`, `/wp-content/uploads/2025/10/Screenshot-2025-10-20-at-6.04.57-PM.png`, `/?p=89` | **mockup**, nav |
| 4 | `/criminal-defense/dui/` | `/es/defensa-penal/dui/` | DUI / DUI | `/criminal-defense/` | DUI arrest in Rutherford County: process in plain terms, license concerns, what to bring to the consultation. No penalty figures unless the owner approves them (C18). | Call (615) 410-7290 — free consultation | `/criminal-defense/dui/`, `/dui/`, `/?p=95` |  |
| 5 | `/criminal-defense/drug-crimes/` | `/es/defensa-penal/delitos-de-drogas/` | Drug Crimes / Delitos de drogas | `/criminal-defense/` | Someone charged (not convicted) with a drug offense. Rebuilt past stub length from ledgered facts; speaks to the accused and the family. | Call (615) 410-7290 — free consultation | `/criminal-defense/drug-crimes/`, `/drug-crimes/`, `/?p=92` |  |
| 6 | `/criminal-defense/theft/` | `/es/defensa-penal/robo/` | Theft / Robo y hurto | `/criminal-defense/` | Theft or shoplifting charge: what the charge means in general terms and next steps. No dollar thresholds (C17). Rebuilt past stub length. | Call (615) 410-7290 — free consultation | `/criminal-defense/theft/`, `/theft/`, `/?p=97` |  |
| 7 | `/criminal-defense/violent-crimes/` | `/es/defensa-penal/delitos-violentos/` | Violent Crimes / Delitos violentos | `/criminal-defense/` | Serious violent-offense charges (assault through homicide, per F192): calm, direct reassurance that the case gets a real defense; absorbs the old "Murder" card. | Call (615) 410-7290 — free consultation | `/criminal-defense/violent-crimes/`, `/violent-crimes/`, `/legal-services/criminal-defense/violent-crimes/`, `/?p=99` |  |
| 8 | `/criminal-defense/sex-crimes/` | `/es/defensa-penal/delitos-sexuales/` | Sex Crimes / Delitos sexuales | `/criminal-defense/` | Accused of a sex offense: discretion, confidentiality of the consultation, what not to do. Drops the "criminal sexual conduct" wording (C18). | Call (615) 410-7290 — free consultation | `/criminal-defense/sex-crimes/`, `/legal-services/criminal-defense/sex-crimes/`, `/?p=104` |  |
| 9 | `/criminal-defense/fraud/` | `/es/defensa-penal/fraude/` | Fraud / Fraude | `/criminal-defense/` | Fraud or white-collar charge for an individual: process and documents to gather. No commercial-organization claims (C11). | Call (615) 410-7290 — free consultation | `/criminal-defense/fraud/`, `/fraud/`, `/?p=101` |  |
| 10 | `/criminal-defense/probation-violation/` | `/es/defensa-penal/violacion-de-libertad-condicional/` | Probation Violation / Violación de libertad condicional | `/criminal-defense/` | Probation violation warrant or hearing: urgency, what happens at the hearing, link to family-law effects. | Call (615) 410-7290 — free consultation | `/criminal-defense/probation-violation/`, `/probation-violation/`, `/?p=102` |  |
| 11 | `/criminal-defense/domestic-assault/` | `/es/defensa-penal/agresion-domestica/` | Domestic Assault / Agresión doméstica | `/criminal-defense/` | Domestic assault charge: next steps, bond conditions in general terms, and the bridge to custody and visitation pages. | Call (615) 410-7290 — free consultation | `/criminal-defense/domestic-assault/`, `/domestic-assault/`, `/?p=103` |  |
| 12 | `/family-law/` | `/es/derecho-familiar/` | Family Law / Derecho familiar | `/legal-services/` | Family-law hub for parents and spouses in Rutherford, Coffee and Wilson counties: divorce, custody, visitation, parenting plans, paternity, plus DCS and adoption. No "Wills" card (C09). | Call (615) 410-7290 — free consultation | `/family-law/`, `/legal-services/family-law/`, `/legal-services/family-law/index.html`, `/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-2.23.01-PM-1024x842.png`, `/?p=111` | nav |
| 13 | `/family-law/divorce/` | `/es/derecho-familiar/divorcio/` | Divorce / Divorcio | `/family-law/` | Divorce in Tennessee explained plainly; adds child support and alimony sections from ledgered facts (market gap). | Call (615) 410-7290 — free consultation | `/family-law/divorce/`, `/divorce/`, `/?p=106` |  |
| 14 | `/family-law/child-custody/` | `/es/derecho-familiar/custodia/` | Child Custody / Custodia de menores | `/family-law/` | Parent in a custody dispute: how decisions get made in general terms, what to document, and links to visitation and parenting plans. Drops the risky "favors the parent who takes custody" advice (C18). | Call (615) 410-7290 — free consultation | `/family-law/child-custody/`, `/child-custody/`, `/?p=105` |  |
| 15 | `/family-law/visitation/` | `/es/derecho-familiar/visitas/` | Visitation / Régimen de visitas | `/family-law/` | Parent seeking or defending parenting time: rewritten to its own intent, distinct from custody. Removes the broken "online or at" sentence. | Call (615) 410-7290 — free consultation | `/family-law/visitation/`, `/visitation/`, `/?p=109` |  |
| 16 | `/family-law/parenting-plan-modifications/` | `/es/derecho-familiar/modificacion-plan-de-crianza/` | Parenting Plan Modifications / Modificación del plan de crianza | `/family-law/` | Parent whose circumstances changed and needs an existing parenting plan changed: when it is possible, what the process looks like. | Call (615) 410-7290 — free consultation | `/family-law/parenting-plan-modifications/`, `/parenting-plan-modifications/`, `/?p=107` |  |
| 17 | `/family-law/paternity/` | `/es/derecho-familiar/paternidad/` | Paternity / Paternidad | `/family-law/` | Father or mother establishing or contesting paternity: why it matters for custody, visitation and support. | Call (615) 410-7290 — free consultation | `/family-law/paternity/`, `/paternity/`, `/?p=108` |  |
| 18 | `/adoption/` | `/es/adopcion/` | Adoption / Adopción | `/family-law/` | Adoptive families in Murfreesboro and Rutherford County: a warm, clear overview and first step. Gets the missing meta description. | Call (615) 410-7290 — free consultation | `/adoption/`, `/?p=162` |  |
| 19 | `/dcs-case-attorney/` | `/es/abogado-casos-dcs/` | DCS Cases / Casos del DCS | `/family-law/` | Parent or guardian contacted by the Department of Children's Services: urgent, calm first steps; the only DCS page in the local market. Gets the missing meta description. | Call (615) 410-7290 — free consultation | `/dcs-case-attorney/`, `/?p=164` |  |
| 20 | `/personal-injury/` | `/es/lesiones-personales/` | Personal Injury / Lesiones personales | `/legal-services/` | Injured person in the Murfreesboro area: modest, singular, factual (Will Fraley handles personal injury cases, C12); a clear next step instead of a dead end. | Call (615) 410-7290 — free consultation | `/personal-injury/`, `/legal-services/personal-injury/`, `/legal-services/personal-injury/index.html`, `/?p=110` | nav |
| 21 | `/about/` | `/es/sobre-nosotros/` | About / Sobre nosotros | `/` | Who Will Fraley is: Tennessee native, MTSU, Nashville School of Law 2004, practicing since 2004, TACDL training with the two certificate scans, the three shared memberships; Katie Fults shown here only, as published. | Call (615) 410-7290 — free consultation | `/about/`, `/wp-content/uploads/2025/10/content-v10-img-attorney.webp`, `/?p=60` | nav |
| 22 | `/testimonials/` | `/es/testimonios/` | Testimonials / Testimonios | `/about/` | The three published client testimonials, verbatim, no stars, with the results disclaimer. | Call (615) 410-7290 — free consultation | `/testimonials/`, `/?p=118` |  |
| 23 | `/in-the-news/` | `/es/en-las-noticias/` | In the News / En las noticias | `/about/` | NEW. Replaces the dead "#" menu item: lists only the October 2014 Daily News Journal story, linked and described neutrally (C16). | Call (615) 410-7290 — free consultation | `/news/` | NEW |
| 24 | `/faqs/` | `/es/preguntas-frecuentes/` | FAQs / Preguntas frecuentes | `/` | Answers to common questions, grouped by practice area, on native details/summary; one FAQPage schema. Only owner-safe answers (C17, C18). | Call (615) 410-7290 — free consultation | `/faqs/`, `/?p=135` | nav |
| 25 | `/contact-us/` | `/es/contacto/` | Contact / Contacto | `/` | Reach the office now: tap-to-call first, then a 4-field form (OFF until configured) with the non-confidentiality notice, address, hours, map link and "Se habla español". | Call (615) 410-7290 — or send a short message | `/contact-us/`, `/contact/`, `/contact/index.html`, `/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-2.27.41-PM-924x1024.png`, `/?p=115` | **mockup**, nav |
| 26 | `/privacy-policy/` | `/es/politica-de-privacidad/` | Privacy Policy / Política de privacidad | `/` | NEW. What the site collects (form fields, optional analytics after consent), why, and how to ask for deletion. Shows a last-reviewed date. | Call (615) 410-7290 — free consultation | — | policy_page, NEW |
| 27 | `/accessibility/` | `/es/accesibilidad/` | Accessibility Statement / Declaración de accesibilidad | `/` | NEW. WCAG 2.2 AA commitment, known limits, and how to report a barrier by phone or email. Shows a last-reviewed date. | Call (615) 410-7290 — free consultation | — | policy_page, NEW |
| 28 | `/cookie-settings/` | `/es/configuracion-de-cookies/` | Cookie Settings / Configuración de cookies | `/` | NEW. Re-open the consent choices; explains that tracking is off until the visitor opts in. | Call (615) 410-7290 — free consultation | — | policy_page, noindex, NEW |
| 29 | `/thank-you/` | `/es/gracias/` | Thank You / Gracias | `/` | NEW. Confirms the message was sent, says what happens next, and repeats the phone number for anything urgent. | Call (615) 410-7290 if it cannot wait | — | policy_page, noindex, NEW |
| 30 | `/blog/` | `/es/blog/` | Blog / Blog | `/` | NEW scaffold. Built only when site.config.json blog.enabled is true (no posts exist today). Copy is still written so the hub is ready. | Call (615) 410-7290 — free consultation | `/blog/` (old 404; 301 → `/` until blog.enabled, see redirect 29) | publish:false, copy:true, noindex, NEW |
| 31 | `/404/` | `/es/404/` | Page Not Found / Página no encontrada | — | NEW. Friendly not-found page in EN and ES: phone, search-free links to the main practice hubs, never a dead end. Emitted as dist/404.html. | Call (615) 410-7290 | — | policy_page, publish:false, copy:true, noindex, NEW |

**Count:** 31 EN pages (24 kept + 7 new), each with an ES twin = 62 routes; 2 of them (blog, 404) are not routed by default.

## Redirects (all 301)

Order matters on Cloudflare Pages (first match wins): the specific `/wp-content/uploads/…` rules sit above the `/wp-content/uploads/*` splat.

| # | Old path | → New path | Why | Notes |
|---|---|---|---|---|
| 1 | `/domestic-assault/` | `/criminal-defense/domestic-assault/` | Legacy short URL; already 301 on the old site. | — |
| 2 | `/drug-crimes/` | `/criminal-defense/drug-crimes/` | Legacy short URL; already 301 on the old site. | — |
| 3 | `/dui/` | `/criminal-defense/dui/` | Legacy short URL; already 301 on the old site. | — |
| 4 | `/fraud/` | `/criminal-defense/fraud/` | Legacy short URL; already 301 on the old site. | — |
| 5 | `/violent-crimes/` | `/criminal-defense/violent-crimes/` | Legacy short URL; already 301 on the old site. | — |
| 6 | `/probation-violation/` | `/criminal-defense/probation-violation/` | Legacy short URL; already 301 on the old site. | — |
| 7 | `/theft/` | `/criminal-defense/theft/` | Legacy short URL; already 301 on the old site. | — |
| 8 | `/divorce/` | `/family-law/divorce/` | Legacy short URL; already 301 on the old site. | — |
| 9 | `/child-custody/` | `/family-law/child-custody/` | Legacy short URL; already 301 on the old site. | — |
| 10 | `/visitation/` | `/family-law/visitation/` | Legacy short URL; already 301 on the old site. | — |
| 11 | `/parenting-plan-modifications/` | `/family-law/parenting-plan-modifications/` | Legacy short URL; already 301 on the old site. | — |
| 12 | `/paternity/` | `/family-law/paternity/` | Legacy short URL; already 301 on the old site. | — |
| 13 | `/contact/` | `/contact-us/` | Legacy short URL; already 301 on the old site. | — |
| 14 | `/legal-services/criminal-defense/` | `/criminal-defense/` | Old /legal-services/<area>/ scheme. | — |
| 15 | `/legal-services/family-law/` | `/family-law/` | Old /legal-services/<area>/ scheme. | — |
| 16 | `/legal-services/personal-injury/` | `/personal-injury/` | Old /legal-services/<area>/ scheme. | — |
| 17 | `/legal-services/criminal-defense/sex-crimes/` | `/criminal-defense/sex-crimes/` | 404 today; linked from /criminal-defense/violent-crimes/ body copy. | — |
| 18 | `/legal-services/criminal-defense/violent-crimes/` | `/criminal-defense/violent-crimes/` | 404 today; linked from /criminal-defense/domestic-assault/ body copy. | — |
| 19 | `/contact/index.html` | `/contact-us/` | Staging-host link path (404 today). | — |
| 20 | `/legal-services/criminal-defense/index.html` | `/criminal-defense/` | Staging-host link path (404 today). | — |
| 21 | `/legal-services/family-law/index.html` | `/family-law/` | Staging-host link path (404 today). | — |
| 22 | `/legal-services/personal-injury/index.html` | `/personal-injury/` | Staging-host link path (404 today). | — |
| 23 | `/category/uncategorized/` | `/` | Empty WordPress category archive. Point to /blog/ instead once blog.enabled is true. | — |
| 24 | `/page/2/` | `/` | WordPress paged duplicate of the home page. | — |
| 25 | `/wp-json/` | `/` | WordPress REST API index; no API on the static site. | — |
| 26 | `/feed/` | `/` | Empty RSS feed. Point to /blog/ instead once blog.enabled is true. | — |
| 27 | `/comments/feed/` | `/` | Empty comments feed. | — |
| 28 | `/news/` | `/in-the-news/` | Natural alias for the new In the News page (404 today). | — |
| 29 | `/blog/` | `/` | Only while blog.enabled is false (the /blog/ scaffold is not built). The build MUST omit this rule when blog.enabled is true. | only while blog.enabled === false |
| 30 | `/sitemap.xml` | `/sitemap-index.xml` | Old Yoast sitemap; the Astro sitemap index replaces it. | — |
| 31 | `/sitemap_index.xml` | `/sitemap-index.xml` | Old Yoast sitemap; the Astro sitemap index replaces it. | — |
| 32 | `/page-sitemap.xml` | `/sitemap-index.xml` | Old Yoast sitemap; the Astro sitemap index replaces it. | — |
| 33 | `/post-sitemap.xml` | `/sitemap-index.xml` | Old Yoast sitemap; the Astro sitemap index replaces it. | — |
| 34 | `/wp-content/uploads/2025/10/mainstage-v1-img.webp` | `/` | Old og:image cached by social platforms; lands on the page it represented. | — |
| 35 | `/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-2.27.41-PM-924x1024.png` | `/contact-us/` | Old og:image cached by social platforms; lands on the page it represented. | — |
| 36 | `/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-12.58.05-PM.png` | `/legal-services/` | Old og:image cached by social platforms; lands on the page it represented. | — |
| 37 | `/wp-content/uploads/2025/10/Screenshot-2025-10-20-at-6.04.57-PM.png` | `/criminal-defense/` | Old og:image cached by social platforms; lands on the page it represented. | — |
| 38 | `/wp-content/uploads/2025/10/content-v10-img-attorney.webp` | `/about/` | Old og:image cached by social platforms; lands on the page it represented. | — |
| 39 | `/wp-content/uploads/2025/10/Screenshot-2025-10-21-at-2.23.01-PM-1024x842.png` | `/family-law/` | Old og:image cached by social platforms; lands on the page it represented. | — |
| 40 | `/wp-content/uploads/*` | `/` | Catch-all for every other old WordPress upload indexed via the Yoast image sitemap. MUST come after the specific /wp-content/uploads/ rules. | splat |
| 41 | `/?p=1` | `/` | Query-string URL; without a rule the static host serves the home page (200), which is acceptable. | query string — Pages Function / zone rule |
| 42 | `/?author=1` | `/` | Query-string URL; without a rule the static host serves the home page (200), which is acceptable. | query string — Pages Function / zone rule |
| 43 | `/?p=46` | `/` | Query-string URL; without a rule the static host serves the home page (200), which is acceptable. | query string — Pages Function / zone rule |
| 44 | `/?p=60` | `/about/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 45 | `/?p=65` | `/legal-services/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 46 | `/?p=89` | `/criminal-defense/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 47 | `/?p=92` | `/criminal-defense/drug-crimes/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 48 | `/?p=95` | `/criminal-defense/dui/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 49 | `/?p=97` | `/criminal-defense/theft/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 50 | `/?p=99` | `/criminal-defense/violent-crimes/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 51 | `/?p=101` | `/criminal-defense/fraud/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 52 | `/?p=102` | `/criminal-defense/probation-violation/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 53 | `/?p=103` | `/criminal-defense/domestic-assault/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 54 | `/?p=104` | `/criminal-defense/sex-crimes/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 55 | `/?p=105` | `/family-law/child-custody/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 56 | `/?p=106` | `/family-law/divorce/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 57 | `/?p=107` | `/family-law/parenting-plan-modifications/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 58 | `/?p=108` | `/family-law/paternity/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 59 | `/?p=109` | `/family-law/visitation/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 60 | `/?p=110` | `/personal-injury/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 61 | `/?p=111` | `/family-law/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 62 | `/?p=115` | `/contact-us/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 63 | `/?p=118` | `/testimonials/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 64 | `/?p=135` | `/faqs/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 65 | `/?p=162` | `/adoption/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |
| 66 | `/?p=164` | `/dcs-case-attorney/` | WordPress shortlink. Query-string redirect: needs a Pages Function (functions/_middleware) or a Cloudflare zone Redirect Rule; _redirects cannot match ?p=. | query string — Pages Function / zone rule |

**Total:** 66 redirect rules (26 query-string, 1 splat, 1 conditional).

## Coverage check — every old URL

Every one of the 89 entries in `inventory/old-urls.json` is accounted for: 24 are kept pages (listed in the Pages table) and the rest appear in the Redirects table above. `www.` variants are normalized to the apex at the Cloudflare zone (operator item).
