# A06 decisions

- A06-D1: The new site's accessibility target is WCAG 2.2 AA. Build gate: zero serious or critical axe violations on every EN and ES page, a skip link present, one H1 per page, and visible focus on 100% of tab stops.
- A06-D2: No autoplaying carousels or scroll-linked effects. Any motion is wrapped in `prefers-reduced-motion: no-preference`. Testimonials render as a static list.
- A06-D3: Consultation form fields keep visible labels (placeholders are not used as labels), never use positive tabindex, and carry autocomplete tokens. The form stays off until configured (CLAUDE.md rule 5).
- A06-D4: Every phone link uses `tel:+16154107290`. The sticky mobile call bar must not obscure focused elements (WCAG 2.4.11).
