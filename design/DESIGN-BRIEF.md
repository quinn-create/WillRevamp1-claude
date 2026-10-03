# DESIGN BRIEF — three directions for willfraleylaw.com

Owner: A11 (creative director). For A12 "Counsel", A13 "Verdict", A14 "Neighbor" and A15 (image director).
Read with `plan/REVAMP-BRIEF.md` (message, audiences, nav), `audit/A07.md` (brand evidence) and
`copy/VOICE.md` once A16 writes it.

**Mockup pages (all three directions):** Home `/`, Criminal Defense `/criminal-defense/`, Contact
`/contact-us/`, plus `components.html` showing every button, link, card, form field, nav and alert state
(default, hover, focus-visible, active, disabled, error). Build them in Astro under `mockups/<A|B|C>/`, take
screenshots at 390 and 1280, and write `tokens.css` with at least 6 `@pair` declarations, all passing AA.

**The one question the mockups answer:** which look makes a frightened person in Rutherford County trust Will
Fraley enough to tap the phone number? Every direction is judged on that first, and on taste second.

---

## Fixed for all three directions

- **Brand anchor:** the logo blue **#447CB7** (sampled from IMG01 by A07). It passes 4.36:1 on white, so use
  it only for large text (24 px and up, or 18.66 px bold and up), fills and UI. Text-size links use a darker
  derivative (#356BA6 is 5.52:1 on white; each direction tunes its own) and navy **#1D478A** (white on it is
  9.05:1). Directions may shift neutrals and add one accent. They may not replace the blue.
- **Logo:** the redrawn SVG wordmark (same letterforms) with a solid tagline. Below 200 px wide, the tagline is
  dropped. No direction redesigns the logo.
- **Real photos only for people:** Will (IMG03 at the desk, IMG02 at the brick doorway, IMG04 only if flipped
  back and unframed) and Katie Fults (IMG05, small avatar, About only). All are low-res (673–910 px), so place
  them framed, split or inset, never as a full-bleed hero. Crop and color-correct them only. The certificate
  scans IMG06 and IMG07 are shown as documents.
- **Generated images are scenes only** (A15, Higgsfield `nano_banana_pro`, 2k): Middle Tennessee landscapes and
  townscapes, historic courthouse-square architecture with no readable signage, law-office interiors,
  textures and objects. **No people, no faces, no hands, no silhouettes, no text, no signage.** Every prompt
  ends "no people, no faces, no text, no signage, no lettering". A generated building is never captioned or
  implied to be the actual office at 509 W College St. Generated scenes are decorative (`alt=""`) unless
  they carry meaning.
- **Never:** gavels, handcuffs, scales-of-justice clip art, crime-scene tape, stock people, Mac screenshots,
  gradient offset frames, star ratings, badge walls, autoplay carousels, parallax.
- **Phone-first header:** logo · 6 nav items · **(615) 410-7290** (`tel:+16154107290`) with "Free consultation ·
  Se habla español" · Español/English toggle. Mobile: logo · phone icon · menu, plus a 48 px bottom call bar.
- **Spanish strings run about 20% longer.** Buttons, nav and H1s must survive the ES copy at 390 px without
  truncation. Test with the ES nav labels in `plan/sitemap.json`.

---

## Direction A — "Counsel"

*Restrained editorial authority: deep neutral, one brand hue, serif display, generous white space.*

**What it must prove:** A small-town practice can look as composed and credible as a top Nashville firm without
looking expensive or cold. Restraint reads as competence. The phone CTA stays unmistakable even in a quiet
layout. Typography carries the authority, so the design needs almost no imagery to feel premium.

**Palette direction:** warm paper ground, blue-black ink, the logo blue as the only hue. Hairline rules
replace boxes.

| Role | Proposal | Check |
|---|---|---|
| Paper (ground) | #F7F6F2 | — |
| Ink (body, headings) | #16202C | 15.21:1 on paper |
| Muted text | #5A6472 | 5.55:1 on paper |
| Link / text-blue | #2E5F96 | 6.08:1 on paper |
| Brand blue (large type, rules, fills) | #447CB7 | large/UI only |
| Deep band / footer | #16202C, with white text (16.44:1) and #9DBEE3 accents (8.54:1) | — |
| Primary button | #2E5F96 fill, white text | 6.58:1 |
| Hairline | #C9D2DC | decorative only; never the only boundary of a control |

**Type pairing candidates** (Google Fonts, variable, Latin Extended; self-hosted woff2, 2 families maximum):
1. **Newsreader** (opsz and wght axes) for display + **Public Sans** for text. This is the lead option: a
   newspaper-grade serif with optical sizes, and a plain civic sans.
2. **Source Serif 4** (opsz, wght) + **Source Sans 3**: a matched superfamily and the safest metrics.
3. **Newsreader** + **Inter**: a crisper UI if Public Sans looks too soft at small sizes.

Use a 1.25 scale and a 64–72 character measure. Optionally, small caps or tracked caps for eyebrows, echoing
"ATTORNEY AT LAW".

**Imagery direction:** Few images, used large and calm. Overcast Middle Tennessee light, cool blue shadow,
warm brick in low saturation, plenty of negative space for type. Will's portrait (IMG03) sits in a quiet split
beside the H1 on Home. Generated scenes are architectural and still: they read like the opening plate of a
book.

**Image slots (A15 generates these for set `A`):**

| Slot | Ratio | Use | Scene | Mood words |
|---|---|---|---|---|
| `A-hero` | 16:9 | Home hero background or split panel beside Will's portrait | Historic Southern courthouse-square architecture at early morning: limestone columns, tall windows and brick storefront cornices in soft overcast light, deep shade on one side, wide clear sky for type | composed, civic, quiet, early, stone-and-brick, unhurried |
| `A-practice` | 3:2 | Criminal Defense hub header | Interior of a courthouse corridor or stair hall: worn marble or terrazzo floor, tall windows, wooden benches, long perspective, empty | gravity, order, stillness, cool daylight, depth |
| `A-contact` | 4:5 | Contact page side panel | Law-office desk detail: a leather-bound legal pad, a fountain pen, a brass desk lamp, warm wood, a window with soft daylight, shallow depth of field | readiness, discretion, warmth-within-restraint, paper, brass |

**Layout signatures:** a left-aligned editorial grid; large serif H1 with a short answer-first deck; hairline
rules between sections; a proof strip set as a quiet line of small caps; the phone CTA as a solid blue button
paired with a text link; a numbered `[steps]` block set like a table of contents.

---

## Direction B — "Verdict"

*Bold, high contrast, large type, strong color blocking, decisive CTAs.*

**What it must prove:** Urgency without panic. The person charged last night sees what to do in the first
viewport, and the call button is the most obvious object on every screen. This direction must show that bold
can still be lawful (no fear-selling, no "aggressive") and premium rather than billboard-cheap. Its
conversion design is the benchmark the other two are measured against.

**Palette direction:** navy and near-black color blocks with white type. One signal color reserved only for
the call-to-action.

| Role | Proposal | Check |
|---|---|---|
| Ground | #FFFFFF, plus #EAF1F9 tint blocks | ink on tint 16.45:1 |
| Ink | #0B1220 | 18.72:1 on white |
| Navy block | #1D478A, with white text | 9.05:1 |
| Brand blue block | #447CB7, white text at 24 px and up only (4.36:1), or ink text (4.29:1, large only) | large/UI only |
| Night block (hero, footer) | #0B1220, with white text | 18.72:1 |
| Signal CTA | #F2B544 fill with #0B1220 text | 10.23:1. It also reads as UI on navy (4.94:1) |
| Text-blue on white | #1D478A | 9.05:1 |

The signal gold appears only on the call and submit buttons and the mobile call bar, never as decoration.
If gold reads as cheap in the mockup, the fallback is a brick #8A3F2A fill with white text (7.43:1).

**Type pairing candidates:**
1. **Archivo** (wdth 62–125, wght axes) set expanded and heavy for display + **Inter** for text. This is the
   lead option: decisive and very legible.
2. **Archivo** alone for both display and text, using the width axis to separate them. One family keeps the
   budget smallest.
3. **Bricolage Grotesque** (opsz, wdth, wght) + **Public Sans**: more character, still sober.

Use a larger scale (1.333) with H1s of 48–72 px on desktop and 36–40 px on mobile. Tight leading on display
only; body stays at 1.5–1.6.

**Imagery direction:** Image as a color block, not decoration. Scenes are graphic and high-contrast: strong
architectural geometry, hard light, deep shadow, often duotoned to navy in CSS so type can sit on them.
Will's portrait sits in a crisp rectangular frame on a navy block. No dark crime-mood imagery.

**Image slots (set `B`):**

| Slot | Ratio | Use | Scene | Mood words |
|---|---|---|---|---|
| `B-hero` | 16:9 | Home hero, duotoned behind or beside the H1 block | Bold low-angle view of classical courthouse columns and a cornice against a clear deep-blue sky, hard late-afternoon sun with crisp shadows, strong verticals | decisive, upright, strong, high-contrast, clear |
| `B-practice` | 3:2 | Criminal Defense hub color-block panel | Steep stone courthouse steps rising toward closed heavy wooden doors, raked side light, graphic shadow pattern, minimal and geometric | resolve, forward motion, clarity, weight |
| `B-contact` | 4:5 | Contact panel | A desk phone and a closed case folder on a dark wood desk under a single focused lamp, deep navy shadows, everything else dark | ready, direct, now, focused light |

**Layout signatures:** full-width color bands that alternate night, white and navy; an oversized H1 with a
one-line answer; the gold call button repeated at hero, mid-page and footer; `[steps]` as big numbered tiles;
the proof strip as four bold stat-free tiles (Since 2004 · Tennessee native · Se habla español · Free
consultation).

---

## Direction C — "Neighbor"

*Warm, human, Tennessee-rooted: warm neutrals, photographic hero, approachable type.*

**What it must prove:** That this is Murfreesboro's own lawyer. He is a Tennessee native, came for MTSU and
made it home (F051, F053), and he is approachable for a parent in a custody fight or a Spanish-speaking family
calling for the first time. Warmth must not tip into casual or folksy. The work is serious. This direction
also proves that a photographic hero can work with no people in the generated image, by pairing a real place
with Will's real photo.

**Palette direction:** cream and sand neutrals, deep warm ink, red-brick accent from the A07 equity, logo blue
kept for links and the primary action.

| Role | Proposal | Check |
|---|---|---|
| Cream (ground) | #F6F1EA | — |
| Sand (alternate bands, cards) | #E9DFD1 | ink on sand 11.59:1 |
| Warm ink | #2B2420 | 13.58:1 on cream |
| Muted text | #6B5E55 | 5.57:1 on cream |
| Brick accent (eyebrows, rules, secondary button) | #9C4A32 | 5.43:1 on cream; white on brick 6.11:1 |
| Link / primary button | #2F5F95 (white text 6.58:1; on cream 5.86:1) | — |
| Deep band / footer | #1D478A with cream text | 8.05:1 |

Note: #356BA6 on cream is only 4.91:1, which passes but leaves little margin. Prefer #2F5F95 for body links.

**Type pairing candidates:**
1. **Fraunces** (opsz and wght axes; keep SOFT low and WONK off for seriousness) + **Figtree**. This is the
   lead option: a warm old-style display with a friendly, clear sans.
2. **Literata** (opsz, wght) + **Source Sans 3**: bookish and calm, with excellent Spanish diacritics.
3. **Fraunces** + **Public Sans**, if Figtree looks too casual beside the legal copy.

Use a 1.25 scale, rounded-but-not-bubbly radii (6–8 px), and generous line height.

**Imagery direction:** Photographic and place-based, in golden or late-afternoon light. The home hero is a
generated Murfreesboro-like townscape with Will's real photo (IMG03) in an inset card that carries the H1 and
phone. Warm brick, trees, porches and storefront cornices, with no readable signs. Family-law warmth comes
from objects and places (a porch swing, a kitchen table), never from people.

**Image slots (set `C`):**

| Slot | Ratio | Use | Scene | Mood words |
|---|---|---|---|---|
| `C-hero` | 16:9 | Home photographic hero, with Will's real photo inset | A historic Middle Tennessee courthouse-square townscape at golden hour: red-brick two-story storefronts with ornate cornices, mature trees, a quiet sidewalk, a warm low sun, the courthouse cupola in soft background, no readable signs | rooted, warm, neighborly, golden, familiar, home |
| `C-practice` | 3:2 | Criminal Defense hub header | A tree-lined Murfreesboro-style street of red-brick buildings in the soft light just after rain, wet pavement reflecting warm windows, calm and quiet | steady, after-the-storm, hopeful, grounded |
| `C-contact` | 4:5 | Contact panel | A welcoming law-office reception corner: two upholstered chairs, a side table with a glass of water and a notepad, warm wood floor, sunlight through tall old windows onto exposed brick | welcome, calm, unhurried, safe, sunlit brick |

**Layout signatures:** a full-bleed photographic hero with an inset "card" holding the H1, phone and Will's
photo; sand-colored alternate bands; the proof strip as friendly icon-free chips; testimonials set large in
the display serif (verbatim); a brick eyebrow above section heads; a map-and-hours block on Contact.

---

## The shared Premium Standard (every direction obeys)

These are the kit §4 standards as applied to this project. QA and `tools/check.mjs` enforce the numbers.

**Craft**
- One spacing system (an 8 px base) and one type scale per direction, defined only in `tokens.css`. No inline
  colors and no one-off sizes.
- Left-aligned text, never justified. Measure of 75 characters or fewer, body text 17–18 px or more on mobile,
  line height of at least 1.5.
- Every image is the right size for its slot: AVIF/WebP, `srcset`, explicit `width` and `height`, lazy below
  the fold, `fetchpriority="high"` on the hero. Scenes are graded consistently within a direction.
- Real states for everything: hover, `:focus-visible` (a 2 px or larger ring at 3:1 or better against both
  the element and its background), active, disabled, error and success. `components.html` shows them all.
- Empty and edge states designed: the long ES strings, the thank-you page, the 404, the form with errors.

**Accessibility (WCAG 2.2 AA)**
- Every text and background token pair is declared with `@pair --fg on --bg text|ui` in `tokens.css` and
  passes (4.5:1 text, 3:1 large text and UI). At least 6 pairs.
- A skip link, one H1, a sequential outline, named landmarks, a keyboard-operable nav and dropdowns, tap
  targets of 44 px or more, and nothing obscuring focus (sticky header and call bar included).
- No autoplay or scroll-linked motion. Any transition lives under `prefers-reduced-motion: no-preference` and
  lasts 200 ms or less.

**Performance**
- Static HTML. JS of 50 KB gzipped or less per page (aim for 30 KB): islands only for the mobile nav, the form
  and consent. FAQs use native `<details>`.
- At most **2 font families**, self-hosted woff2 subset to Latin and Latin Extended, one preloaded display
  weight, `font-display: swap` with metric-matched fallbacks. No Google Fonts requests at runtime.
- Lighthouse mobile of 95 or more in every category, LCP of 2.0 s or less, CLS of 0.05 or less, TBT of 150 ms
  or less.

**Conversion and trust**
- A `tel:+16154107290` link in the first 390 px viewport of every page. "Free consultation" is never shown
  without the `tel:` link beside it.
- One primary action per screen. The secondary action is the short form via an in-page anchor.
- Proof comes only from the ledger (since 2004, Tennessee native, Se habla español, Nashville School of Law,
  TACDL training, the three shared memberships). Testimonials are verbatim with the results disclaimer, and
  there are no stars.
- The footer legal line on every page ("not legal advice" / "no constituye asesoramiento legal"), NAP and
  hours.

**Law-firm guardrails in the design itself**
- No "specialist", "expert", "certified" or "guarantee" in any UI string, alt text, image file name or
  caption.
- No visual that implies results (trophies, "wins" counters, verdict graphics).
- Katie Fults appears on About only. Nothing visual suggests a multi-attorney firm.
