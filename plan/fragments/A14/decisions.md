# A14 decisions (Direction C "Neighbor"), Stage 3 step 1

- **D-A14-01: The spacing base is 4 px.** The kit's Premium Standard (§4, binding in the A14 task) sets a 4 px
  base. DESIGN-BRIEF says 8 px. The kit wins, and every 8 px step still exists (`--space-2`, `-4`, `-6`, `-8`
  and up). This matches D-A13-01.
- **D-A14-02: The type pair is Fraunces (display; opsz and wght axes) and Figtree (text; wght).** This is the
  lead option in DESIGN-BRIEF.
  - `--display-variation` holds SOFT 0 and WONK 0. Only the opsz and wght axes were downloaded, so both stay
    at their defaults.
  - The variable WOFF2 files (latin and latin-ext) come from Google Fonts v38 (Fraunces) and v9 (Figtree). They
    were downloaded once to `mockups/C/public/fonts/`.
  - Two files are preloaded: `fraunces-latin.woff2` and `figtree-latin.woff2`.
  - The fallback metric overrides are computed from the files' own metrics with @capsizecss/unpack. The
    Fraunces-to-Georgia `size-adjust` (110%) is estimated and should be tuned in the build step if CLS shows.
- **D-A14-03: The palette follows the DESIGN-BRIEF Neighbor table, with two adjustments.**
  - The brick accent moves from #9C4A32 to **#96452F**, so eyebrows on sand have margin: 5.00:1 instead of
    4.64:1.
  - Body links use #2F5F95. #356BA6 is only 4.91:1 on cream.
- **D-A14-04: Roles of brand and accent.**
  - The brand hue is the logo blue #447CB7, with three tints (#E3ECF6, #B9CFE8, #7FA5D2) and two shades:
    #2F5F95 (links, primary fill, call bar) and #1D478A (navy deep band, link hover).
  - The one accent is brick #96452F, with #F0B9A3 as its on-dark form. It is used sparingly: the focus ring,
    eyebrows, step numerals and the secondary button.
  - The kit gives links to the accent. Here that role stays with the brand blue, because blue links are the
    logo equity and the convention people expect.
  - The primary button stays a solid brand fill, as the kit requires.
- **D-A14-05: The focus ring is brick on light grounds (5.00–6.58:1) and #F0B9A3 on navy (5.25) and ink
  (8.85).** It sits 2 px off the element, so it is measured against the ground it is drawn on.
  - A ring cannot reach 3:1 against both cream and the blue fill unless it is near-black.
  - The 2 px offset gap of ground color separates the ring from the button. A13 used the same reasoning.
- **D-A14-06: There is one radius, 8 px (`--radius`).** It is rounded but not bubbly, per the brief's 6–8 px.
- **D-A14-07: There are two deep grounds.**
  - Navy #1D478A is for the brand band and its CTA. On navy, the primary button inverts to a cream fill with
    navy text.
  - Warm ink #2B2420 is the footer, which keeps the warmth through to the end of every page.
- **D-A14-08: Durations are 160/180/200 ms.** This satisfies both the kit's 160–220 ms and the brief's
  ≤200 ms. Reveals are 520 ms, rise 14 px and stagger 60 ms. Everything is zeroed under
  `prefers-reduced-motion: reduce`.
- **D-A14-09: The type scale is fluid at 1.25, for viewports from 360 px to 1280 px.**
  - Body text is 17–18 px with 1.6 leading and a 68ch measure.
  - H1 (`--step-5`) runs from 40 px to 56 px, with tracking −0.022em.
  - `--step-6` (44–68 px) is for short display lines only, never for ES H1s. This keeps ~20% longer Spanish
    headings intact at 390 px.
- **D-A14-10: No dark-mode theme for the mockup.** The brief does not ask for one, and a second palette would
  double the pair surface. This can be revisited at build time.
- **D-A14-11: Image-slot mood cues.**
  - hero ← IMG08 (brick with white trim, civic tower, mature trees; re-lit golden).
  - practice ← IMG08 (street, trees, brick frontage, after rain), plus IMG09 for brick tone and window
    muntins only.
  - contact ← IMG09 (brick, white multi-pane windows, dark wood), carried indoors.
  - All three are graded to match IMG03's warmth, because the hero sits beside that photo.
  - No slot reproduces either real building or the 509 W College St entrance.
- **Contrast verification:** all 67 `@pair` declarations in `mockups/C/tokens.css` were recomputed with a node
  script. It uses WCAG relative luminance and the same first-declaration-wins, `var()`-resolving parse as
  `tools/check.mjs`. 67/67 pass.
  - The lowest text pairs are muted on sand (4.75), link on sand (4.99), brick on sand (5.00) and
    `--color-eyebrow-on-deep` (5.25).
  - The lowest UI pairs are `--color-brand` on cream (3.88) and `--input-border` on cream (3.94).

# A14 decisions (Direction C "Neighbor"), Stage 3 step 2: the Astro mockup

- **D-A14-12: Copy is read at build time and never rewritten.** `mockups/C/src/lib/copy.mjs` reads
  `copy/pages/<slug>.md`, strips every `{fact:…}` tag and splits sections at the component hints. An H2 that
  follows content opens an untyped "prose" section, so no paragraph is dropped. Every section of the three
  pages renders in its copy order. Only typography changes: curly quotes and apostrophes, and non-breaking
  spaces inside times ("9:00 a.m.").
- **D-A14-13: Chrome labels are design, not claims.** Eyebrows ("Practice areas", "The process", "Common
  questions", "Today", "For family") and the hero byline ("Attorney at Law · Will Fraley · 509 W College St,
  Murfreesboro") use only F001/F021 wording. NAP and hours in the header, footer, call bar and menu come from
  F013, F015, F019, F021, F024, F031 and F032.
- **D-A14-14: One full-bleed treatment per page.** That treatment is the Home hero photograph. Sand bands are
  tonal steps. The CTA band is an inset navy panel inside the container, so it is not full-bleed.
- **D-A14-15: The hero inset card holds the H1, the phone CTA and Will's real photo.** The photo is a 4:5
  head-and-shoulders crop of IMG03 (350×438 source, shown at 72–96 px). The desktop scene uses
  `object-position: 34% 45%`, so the cupola sits clear of the card. On phones the scene runs 4:3.3 above the
  card at 64% across, which keeps the cupola and one cornice in frame.
- **D-A14-16: The attorney photos are never shown wider than their pixels.** IMG02 is shown at 416 px or less
  (673 px source). IMG03's desk frame is prepared at 910 and 640 px; it does not appear in these three pages.
  The prep script (`mockups/C/scripts/prep-images.mjs`) only crops, applies a gentle warm grade and encodes
  AVIF/WebP. It never upscales. IMG04 is not used.
- **D-A14-17: The logo is color-corrected, not redrawn.** The IMG01 tagline and rules ship at about 55% alpha
  (2.2:1). The script raises that alpha (×1.85, capped at 255) so "ATTORNEY AT LAW" renders solid. Below
  760 px, a wordmark-only crop (400×40) is used, per the DESIGN-BRIEF "drop the tagline below 200 px".
- **D-A14-18: Header breakpoints.** The full nav shows from 1240 px up. Below that, the menu is a `<dialog>`
  opened with `showModal()`, which traps focus; Esc closes it and focus returns to the opener. The phone number
  shows as text in the header at every width. Below 380 px, the logo shrinks to 104 px so the logo, number, ES
  and menu fit on one row at 320–379 px. Overflow was checked at 360, 390, 760, 1239, 1240, 1280 and 1440:
  there is no horizontal scroll.
- **D-A14-19: The mobile call bar is `position: fixed`, 48 px, and phones only (<760 px).** The footer adds
  48 px of bottom padding so nothing hides under the bar. Full-page screenshots draw the bar once, at the
  first-viewport fold; that is a capture artifact. The bar is never scroll-linked.
- **D-A14-20: Form required fields follow the approved copy, not the old Gravity Form.** Copy says "Leave your
  name and phone number… Email and a short note are optional." So first name, last name and phone are
  required. Email, best time, new-client and message are optional. All seven fields from
  `inventory/forms.json` are present. The owner question is queued.
- **D-A14-21: The form has no JS validation in the mockup.** The task allows only the menu and reveal
  scripts. The inline error state is shown statically on the email field (`aria-invalid`, a specific message
  and an icon). The success state and the error summary are shown on the components sheet. Submit is disabled
  and has a phone and email fallback note.
- **D-A14-22: Shipped JS is two inline scripts, about 0.6 KB gzipped.** One sets the `.js` class; the other
  runs the menu dialog and an IntersectionObserver for reveals (14 px rise, 520 ms, 60 ms stagger, once).
  Under reduced motion, everything is visible at once.
- **D-A14-23: The portrait below the fold loads eagerly at low priority with sync decoding.** Chromium's
  full-page capture otherwise left that offscreen image unpainted. The cost is one image of about 20–35 KB.
  All other below-the-fold images are lazy.
