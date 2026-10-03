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
