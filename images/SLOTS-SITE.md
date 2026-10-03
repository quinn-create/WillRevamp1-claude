# Site-wide image slots — direction A "Counsel" (set `site`)

Owner: A15 (Image Director). One scene per page that carries a hero image, plus a social default and a section texture.
All generated with Higgsfield `nano_banana_pro` at `resolution: "2k"` (2 credits each), pulled and optimized by
`tools/images.mjs` into `images/generated/site/<slot>.png` + AVIF/WebP at 640/960/1280/1920 (2560 for 16:9), logged in
`images/generated/site.json` and merged into `images/GENERATED.json`. Scenes only: no people, faces, hands, silhouettes, text,
signage or lettering (CLAUDE.md rule 6). Generated scenes are decorative (`alt=""`) and never captioned or implied to be the
firm's office or a real courthouse. ES twins (`/es/...`) reuse the EN page's slot.

| Page | Slot | Ratio | Subject | Prompt file | Master | Credits |
|---|---|---|---|---|---|---|
| `/` | `A-hero` (set A, reused mockup image) | 16:9 | (mockup pass) | `images/prompts/A-hero.txt` | `images/generated/A/hero.png` | 0 (already spent in mockup pass) |
| `/criminal-defense/` | `A-practice` (set A, reused mockup image) | 3:2 | (mockup pass) | `images/prompts/A-practice.txt` | `images/generated/A/practice.png` | 0 (already spent in mockup pass) |
| `/contact-us/` | `A-contact` (set A, reused mockup image) | 4:5 | (mockup pass) | `images/prompts/A-contact.txt` | `images/generated/A/contact.png` | 0 (already spent in mockup pass) |
| `/legal-services/` | `services` | 3:2 | courthouse-square cornices and brick storefront row under high overcast | `images/prompts/site-services.txt` | `images/generated/site/services.png` | 2 |
| `/family-law/` | `family` | 3:2 | kitchen table by a window, two empty chairs, closed folder, morning light | `images/prompts/site-family.txt` | `images/generated/site/family.png` | 2 |
| `/personal-injury/` | `injury` | 3:2 | quiet two-lane road between fields after rain, guardrail, overcast | `images/prompts/site-injury.txt` | `images/generated/site/injury.png` | 4 (1 rejected + kept) |
| `/about/` | `about` | 3:2 | quiet law-office interior in an older brick building, tall window, walnut desk | `images/prompts/site-about.txt` | `images/generated/site/about.png` | 4 (1 rejected + kept) |
| `/testimonials/` | `testimonials` | 3:2 | open front gate and tree-lined lane to a white farmhouse, morning | `images/prompts/site-testimonials.txt` | `images/generated/site/testimonials.png` | 2 |
| `/faqs/` | `faqs` | 3:2 | closed law book and blank legal pad on a walnut table | `images/prompts/site-faqs.txt` | `images/generated/site/faqs.png` | 2 |
| `/in-the-news/` | `news` | 3:2 | white cupola rising above courthouse-square rooftops and trees, morning | `images/prompts/site-news.txt` | `images/generated/site/news.png` | 2 |
| `/criminal-defense/dui/` | `cd-dui` | 3:2 | empty Middle Tennessee two-lane road at dusk | `images/prompts/site-cd-dui.txt` | `images/generated/site/cd-dui.png` | 2 |
| `/criminal-defense/drug-crimes/` | `cd-drug-crimes` | 3:2 | empty bench under an old oak on a courthouse lawn in morning mist | `images/prompts/site-cd-drug-crimes.txt` | `images/generated/site/cd-drug-crimes.png` | 4 (1 rejected + kept) |
| `/criminal-defense/theft/` | `cd-theft` | 3:2 | brick storefront facade without signage, closed door, early morning | `images/prompts/site-cd-theft.txt` | `images/generated/site/cd-theft.png` | 2 |
| `/criminal-defense/violent-crimes/` | `cd-violent-crimes` | 3:2 | closed paneled doors in a pale limestone civic portico, overcast | `images/prompts/site-cd-violent-crimes.txt` | `images/generated/site/cd-violent-crimes.png` | 2 |
| `/criminal-defense/sex-crimes/` | `cd-sex-crimes` | 3:2 | rain on a tall office window overlooking blurred brick rooftops | `images/prompts/site-cd-sex-crimes.txt` | `images/generated/site/cd-sex-crimes.png` | 2 |
| `/criminal-defense/fraud/` | `cd-fraud` | 3:2 | neat stack of blank manila folders, closed ledger, brass clip on walnut desk | `images/prompts/site-cd-fraud.txt` | `images/generated/site/cd-fraud.png` | 2 |
| `/criminal-defense/probation-violation/` | `cd-probation` | 3:2 | Stones River greenway path under autumn trees, morning mist | `images/prompts/site-cd-probation.txt` | `images/generated/site/cd-probation.png` | 2 |
| `/criminal-defense/domestic-assault/` | `cd-domestic-assault` | 3:2 | calm river bend under a limestone bluff, still water, overcast | `images/prompts/site-cd-domestic-assault.txt` | `images/generated/site/cd-domestic-assault.png` | 2 |
| `/family-law/divorce/` | `fl-divorce` | 3:2 | single set of house keys on an entry table by a closed front door, morning | `images/prompts/site-fl-divorce.txt` | `images/generated/site/fl-divorce.png` | 2 |
| `/family-law/child-custody/` | `fl-custody` | 3:2 | empty wooden porch swing on a front porch, morning | `images/prompts/site-fl-custody.txt` | `images/generated/site/fl-custody.png` | 2 |
| `/family-law/visitation/` | `fl-visitation` | 3:2 | gravel driveway under a big oak leading to a farmhouse, late afternoon | `images/prompts/site-fl-visitation.txt` | `images/generated/site/fl-visitation.png` | 2 |
| `/family-law/parenting-plan-modifications/` | `fl-parenting-plan` | 3:2 | open blank notebook and pencil on a kitchen counter by a window | `images/prompts/site-fl-parenting-plan.txt` | `images/generated/site/fl-parenting-plan.png` | 2 |
| `/family-law/paternity/` | `fl-paternity` | 3:2 | old oak with spreading roots on a Middle Tennessee hillside, morning | `images/prompts/site-fl-paternity.txt` | `images/generated/site/fl-paternity.png` | 2 |
| `/adoption/` | `adoption` | 3:2 | sunlit empty window seat with a folded quilt in an old house | `images/prompts/site-adoption.txt` | `images/generated/site/adoption.png` | 2 |
| `/dcs-case-attorney/` | `dcs` | 3:2 | front porch of a modest brick house, door closed, two empty rocking chairs | `images/prompts/site-dcs.txt` | `images/generated/site/dcs.png` | 2 |
| site-wide social share image (1200x630 crop) | `og-default` | 16:9 | courthouse-square cornices and limestone cupola, centered for a 1.9:1 crop | `images/prompts/site-og-default.txt` | `images/generated/site/og-default.png` | 2 |
| section backgrounds (site-wide) | `texture` | 16:9 | subtle warm paper-white cotton paper texture | `images/prompts/site-texture.txt` | `images/generated/site/texture.png` | 2 |

**Total this pass:** 24 slots generated, 27 billed generations, **54 credits** (cap 250). One additional submission (`cd-probation`, job `4d5b97c6…`) failed server-side and was not billed. Higgsfield balance 643.07 before, 589.07 after.

**Usage notes for builders (A19/A20/A23):**

- 3:2 heroes: the right two-thirds hold the subject; the left third is quiet (object-position about 60% 50% on phones).
- `og-default` (16:9, 2752x1536): crop centered to 1200x630 for `og:image` on pages without their own; subject sits in the central band.
- `texture` (16:9): near-uniform warm paper-white; for linen/paper section backgrounds only, never behind body text at a contrast cost (it is lighter than `--color-surface`; check contrast if used).
- The design system (9.2) listed `A-services`, `A-family`, `A-injury`, `A-adoption`, `A-dcs`; those subjects were kept and are delivered as set `site` slots `services`, `family`, `injury`, `adoption`, `dcs`. The orchestrator's site-wide brief extends imagery to practice child pages, About, Testimonials, FAQs and In the News; per design-system 9.1 ("one image-led moment per page at most", "frame omitted" if absent) builders may still omit any of these frames for speed.
