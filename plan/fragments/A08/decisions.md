# A08 decisions

- A08-D1: Primary action on every page is the phone call (`tel:+16154107290`); secondary is the on-page consultation form reached by in-page anchor. One CTA wording site-wide; every "free consultation" CTA sits beside the `tel:` link.
- A08-D2: Navigation renders once per page (no duplicate desktop/sticky/dropdown copies), max 2 levels; practice-page link sidebars are dropped in favour of in-content related links.
- A08-D3: Consultation form = Name, Phone, Email (optional), short message (optional). "Best time to reach you" and "Are you a new client?" are removed. Form carries a no-confidential-info / no attorney–client relationship note and stays OFF until configured.
- A08-D4: Mobile bottom call bar >= 48 px with safe-area and scroll padding so it never covers inputs or focus; all tap targets >= 44x44 px; practice cards keep text labels at all widths.
- A08-D5: Trust strip next to each CTA uses ledgered facts only: "Practicing law since 2004" (F087, per CONFLICTS C01), Se habla español (F092), office hours (F031/F032), one verbatim testimonial.
- A08-D6: Build gate proposal: fail on `href="#"`, any hostingersite.com URL, `tel:` without `+`, or a page lacking a primary CTA in the first 390 px viewport.
