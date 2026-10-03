### Stage 1 completeness critic (acting for A01/A02)

- **Facts F293–F315 added** after re-reading home, about, contact-us, criminal-defense/dui, family-law/child-custody, testimonials and the home footer. Each quote was checked against the saved page with the same normalization `tools/check.mjs` uses. The additions:
  - **Katie Fults's title** "Attorney at Law" (F293).
  - **Testimonial attributions** Katherine S., Eddie W. and S.A. (F294–F296). Before this, the names appeared only inside the F133–F135 claims, not in any quote.
  - **Practice-area name lists:** the home cards, both header-menu groups and the footer "Areas of Practice" list (F297–F300).
  - **The "Murfreesboro Lawyer" heading** (F301).
  - **The DUI page's "handles … and more"** service line (F302).
  - **Nine DUI legal statements** the ledger was missing (F303–F311). These cover: misdemeanor; jail time by BAC and priors; marijuana and other intoxicants; zero tolerance; treatment program; work-release restrictions; restitution; a passenger under 18; and a refusal used in court. All are typed `other` and marked "verify current law before reuse", the same as C18.
  - **Child Custody facts** (F312–F315): custody decision-making, negotiation or court, a legal statement on proof of paternity, and adoption help.
- **Testimonials:** a copy attribution such as "— Katherine S." should cite the attribution fact (F294–F296) together with the text fact (F133–F135).
- **Checked with no gaps found:** the assets and old URLs.
  - All 29 page image URLs, including size variants and the 6 og:images, map to an `assets.json` entry.
  - Of the 4 person entries, all are Will Fraley or Katie Fults. Every anonymous stock person is typed `scene` with verdict replace or drop.
  - `old-urls.json` has the 13 `pages.json` redirects, both broken links, the 4 staging-host paths and the 6 og:image media files.
- **Known data gap, not fixed here** because it is outside this critic's files: `inventory/text/about.md` leaves out Will's bio block (1992 MTSU, Nashville School of Law 2004, court officer for Judge McFarlin, began practice 2004, Affiliations). The facts F051–F062 and F068–F074 still verify, because their quotes are found in `inventory/html/about.html`. Copywriters must read the About HTML, not only the text file.
- **Heads-up for the build gate:** `tools/check.mjs` requires every path in `old-urls.json` to resolve to 200 or 301→200 after launch, including paths that do not answer 200 today.
  - **404 or 403 today:** `/?p=1`, `/?author=1`, `/blog/`, `/news/` and the 6 broken-link paths.
  - **Also included:** `/wp-json/`, the feeds, the sitemaps and the 6 `/wp-content/uploads/...` og:image paths.
  - **What the build needs:** `_redirects` must map each of these (for example `/news/` → `/in-the-news/`, `/feed/` → `/`, uploads → the new image URLs). Query-string shortlinks need the Function or Redirect Rule A01 noted.
