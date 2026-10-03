# A13 decisions (Direction B "Verdict"), Stage 3 step 1

- **D-A13-01: Spacing base is 4 px.** The kit's Premium Standard (§4, binding in the A13 task) sets a 4 px base;
  DESIGN-BRIEF says 8 px. The kit wins. Every 8 px step still exists (`--space-2`, `-4`, `-6`, `-8`, ...).
- **D-A13-02: Type pair is Archivo (display, wdth and wght axes) + Inter (text).** This is the lead option in
  DESIGN-BRIEF. Display uses wdth 112 on desktop and 100 on phones and for long ES headings, so Spanish H1s fit
  at 390 px. Two preloads: Archivo latin and Inter latin.
- **D-A13-03: Focus ring is contextual.** Signal gold fails as a ring on white (1.83:1), so light grounds use
  navy `--focus-ring` (9.05:1), and night/navy blocks set the ring to gold `--focus-ring-inverse` (10.23:1 /
  4.94:1). The accent's sparing roles on light grounds are taken by navy (links, focus). Gold stays the one
  CTA color.
- **D-A13-04: Gold button gets a 1.5 px darker-gold edge (`--btn-primary-edge` #B7801A, 3.43:1 on white)** so
  that, on white, it meets the 3:1 UI-boundary rule. On night and navy blocks the fill alone passes.
- **D-A13-05: Alpha colors are derived.** Every base color token is opaque hex. Hairlines (10% ink), glass
  header (82% white), shadows and the duotone scrim come from `color-mix()` on those hex tokens.
- **D-A13-06: One radius, 4 px.** Crisp corners suit the color-block language.
- **D-A13-07: H1 scale is 38–72 px** (`--step-4`, 1.333 ratio), within the brief's 36–40 mobile and 48–72
  desktop ranges. Body text is 17–18 px with 1.6 leading and a 68ch measure.
- **D-A13-08: Brick #8A3F2A stays the documented fallback** if gold reads cheap in review. It is not
  tokenized yet, to keep the gold unique.
- **D-A13-09: Image-slot mood cues.** hero ← IMG08 (sky and light only); practice ← IMG08 (stone, steps,
  light), plus IMG09 for the door tone only; contact ← IMG09 (wood tone, cool sky carried indoors). No slot
  reproduces either real building. IMG10–IMG29 are rejected as sources.
- **Contrast verification:** all 45 `@pair` declarations in `mockups/B/tokens.css` were recomputed with a node
  script that uses WCAG relative luminance and the same first-declaration-wins, `var()`-resolving parse as
  `tools/check.mjs`. 45/45 pass. The lowest are `--btn-primary-edge` on bg (ui, 3.43), `--color-brand` on bg
  (ui, 4.36) and `--color-on-dark-muted` on navy (text, 4.85).

## Stage 3, step 2: the Verdict mockup build (mockups/B)

- **D-A13-10: Copy is read at build time, never retyped.** `src/lib/copy.mjs` parses `copy/pages/<slug>.md`
  (frontmatter via `yaml`), strips every `{fact:…}` tag, and splits sections at the component hints. An H2
  belongs to the hint it directly follows; any other H2 opens a plain section. Each page renders every
  section, and a "leftover" renderer catches anything a layout did not place, so nothing in the copy is
  dropped. Straight quotes become typographic quotes and apostrophes at render time.
- **D-A13-11: The repo root is found by walking up from `import.meta.url` (`src/lib/root.mjs`).** Astro bundles
  the page code into `dist/.prerender/`, so a fixed `../../../` path breaks at build time. Nothing depends on
  `process.cwd()`.
- **D-A13-12: Header logo = the wordmark only.** IMG01 is cropped to rows 0–39 (WILL FRALEY) for the header
  and the mobile menu, which render at 136–176 px. The design brief drops the tagline below 200 px wide. The
  full logo (tagline set solid navy #1D478A, or white on night) appears only in the footer at 208 px. The
  white knockout is made from the same pixels, with no redraw.
- **D-A13-13: Gold is limited to the call action and the submit button.** The header phone is a solid navy
  button with the number and "Free consultation · Se habla español" in it. Gold appears on the hero call
  button, the CTA band, the mobile call bar, the mobile-menu call button and the (disabled) submit.
- **D-A13-14: The nav has 6 items and needs ≥ 1240 px (77.5rem).** Below that, the header shows logo + phone
  + Menu (a native `<dialog>`). Between 1240 and 1439 px, the language toggle shortens to "ES" (`<abbr
  title="Español">`) so the header never overflows. On phones the language link lives in the menu dialog.
  It links to `/es/`, as the brief requires, even though the mockup has no Spanish page.
- **D-A13-15: Contact form follows the copy over the old form.** The copy says "Leave your name and phone
  number … Email and a short note are optional." So first name, last name, phone and best time are required;
  email, new-client and message are optional. Option lists come from inventory/forms.json, lightly reworded
  ("ASAP" → "As soon as possible"; "current existing client" → "current client"). The 600-character limit
  comes from the old form. Submit is disabled, and a fallback note gives the phone and email. The email
  field shows the inline error state ("maria@"). There is no validation script: the brief allows JS only for
  the menu dialog and reveals. Inline-on-blur validation and the success swap are shown as states on
  /components/.
- **D-A13-16: The "Please read before you send" paragraph renders inside the form, right above submit.**
- **D-A13-17: Lazy loading.** Below-the-fold scenes and photos are `loading="lazy"`. The Criminal Defense
  portrait (IMG02, 27 KB AVIF) loads eagerly at normal priority, so full-page review screenshots show it.
- **D-A13-18: Photos are never upscaled.** IMG03 is cropped to 880×715 and shown at most about 635 CSS px.
  IMG02 is cropped to 672×896 and shown at most 352 CSS px. IMG04 is not used. Colour correction is a light
  saturation and contrast trim only.
- **D-A13-19: Steps.** Five steps sit in a 3 + 2 bento at desktop, because five columns of 220 px read
  cramped. Four steps (Contact) sit in one row.
- **D-A13-20: Header hairline on scroll uses a CSS scroll-driven animation (`animation-timeline: scroll()`)**,
  with no script. It only changes a 1 px box-shadow, so it is a state change rather than motion. Browsers
  without support show no hairline.
