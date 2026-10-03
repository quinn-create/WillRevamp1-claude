### A16 — copy director

- **Map link (Contact page and footer).** The old footer used `https://goo.gl/maps/5UGDFjKCfam` (F024), which depends on Google's retired goo.gl shortener. The copy uses `https://www.google.com/maps/search/?api=1&query=509+W+College+St+Murfreesboro+TN+37130`. Once the Google Business Profile is claimed, swap in its place URL.

### A16 — G5 (paternity, adoption, DCS, testimonials)

- **Testimonials page rendering (/testimonials/).** Each `[testimonial]` block is one bold card headline line followed by one blockquote. Render the headline as the card title and the quote with its attribution. Show no star graphics and add no Review or AggregateRating schema (C15).

### A16 — G6 (In the News, blog)

- **DNJ link (/in-the-news/).** The page links to the ledgered URL `http://www.dnj.com/story/money/business/2014/10/05/fraley-follows-familys-footsteps-private-practice/16772235/` (F140). Before launch, check that it still resolves (Gannett archive URLs sometimes move). If it redirects, use the final https URL. If it is dead, keep the listing and remove the link.
- **Blog scaffold.** `copy/pages/blog.md` is `publish: false` and `noindex: true`. Enabling `blog.enabled` must also drop the `/blog/ → /` redirect. Strip the HTML comment from `copy/pages/blog/_template.md` content at build, and never build files whose names start with `_` or that are marked `draft: true`.

### A16 — G7 (privacy, accessibility, cookie settings, thank-you, 404)

- **Vendor markers in policy copy (/privacy-policy/, /cookie-settings/).** Implement `[vendor: <key>]` and `[vendor-off: <key or category>]` as described in A16 decisions (G7), driven by site.config.json `forms.*` and `tracking.*`. Never render the marker lines themselves.
- **`{{last_reviewed}}`** on /privacy-policy/ and /accessibility/ must be filled at build time. Use the date the copy was last reviewed, not the build date, unless no other date is set.
- **Cookie Settings (/cookie-settings/) `[consent-controls]`.** Render analytics and marketing switches, plus "Save my choices", "Accept all" and "Reject all". Show a GPC notice when `navigator.globalPrivacyControl` is true, and force both switches off. The strictly necessary row is shown as always on.
- **Claims the build must make true.** The privacy and accessibility pages state the following. Please confirm each one, or tell A16 to change the copy.
  - The consent cookie is first-party and named `consent`, mirrored in localStorage with version and timestamp.
  - No marketing or analytics tool receives contact-form contents.
  - Clarity, if enabled, masks form input.
  - Fonts and images are self-hosted.
  - Each certificate image on About has a text description.
  - The contact page offers phone and email while the form is off.
  - Form errors include an error summary.
  - Keyboard walk-throughs of the menu, contact page and cookie settings are part of QA.
- **Thank-you page (/thank-you/)** should be the Web3Forms redirect target only after a successful submit, and stay noindex.
