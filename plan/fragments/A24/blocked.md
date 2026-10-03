## 01-visual

**Status:** `qa/01-visual.md` is still `Result: FAIL` after QA round 3. Three visual defects remain. The other nine
checks (02–10) pass.

**What still fails (3 defects, measured on the 17:41 `dist/` build of commit 2e0944e):**
1. **The steps results disclaimer renders as body text, not fine print.** This affects 26 pages: every `[steps]`
   section with a trailing disclaimer, EN and ES. Examples: criminal-defense, criminal-defense/dui,
   family-law/divorce and es/defensa-penal.
   - The built paragraph is 17–18 px in `--color-text`, inside `<div class="flow steps-after">`.
   - Mockup A uses `.fineprint` (small, muted).
   - The same sentence under each testimonial is already fine print, so the page shows the disclaimer in two styles.
   - Source: `src/components/Steps.astro:36`.
2. **The footer social links are unevenly spaced.** This affects every page, EN and ES, at all widths.
   - Gaps between labels (Facebook→LinkedIn→X→AVVO) are 20 / 37 / 37 px at 1280 and 20 / 37 / 39 px at 390.
   - Cause: `shell.css:318–319` centers each short label in a 44 px `min-width` box and also adds a flex gap. The
     round-1 target-size fix introduced this.
3. **The ES home portrait caption is in English.** On `/es/` at 1280 (y≈755) it reads "Will Fraley · Attorney at
   Law".
   - `src/pages/_templates/PageView.astro:144` builds the caption from `firm.jobTitle.value` for both languages.
   - The ES eyebrow and byline say "Abogado". This breaks DS 11 and DS 7.21.

**What was tried:**
- Round 1 found 12 visual defects, and all 12 were fixed (commit 124a4bf).
- Round 2 found 4 defects (nav rhythm, missing section eyebrows, the Cookie Settings "Strictly necessary"
  checkbox, About "Visit the office"). All 4 were fixed (commit 2e0944e), and round 3 confirmed them fixed.
- Round 3 found the 3 defects above. The round-3 reviewer did not edit code, but it checked the footer fix by
  injecting CSS in Playwright (EN and ES, at 1280, 390 and 320). With the fix, the gaps become 32 / 33 / 32 px, every
  target stays at least 44×44, and nothing scrolls sideways.

**Why it could not be fixed inside this run:** Stage 6 allows at most 3 QA loops (measure → fix → re-run). Round 3
was the last one. The defects were found in that round, so no fix-and-verify round was left. Applying the fixes
without a re-run would put unverified changes into the build. The QA Lead's job in this step was reporting only.

**Recommended next step:** apply the three fixes written out in `qa/01-visual.md` → "Fixes". Each is one or two
lines, and none touches copy or facts.
1. `Steps.astro:36`: `class="steps-after"` → `class="steps-after fineprint"`.
2. `shell.css:318–319`: change the social row to `gap: 0`, add `padding-inline: var(--space-4)` on the links, and
   set a negative start margin of the same size. Add a `@media (max-width: 22.49em)` rule that switches both to
   `--space-3` so AVVO stays on one row at 320.
3. `PageView.astro:144`: `firm.jobTitle.value` → `lang === 'en' ? firm.jobTitle.value : ui.attorneyAtLaw`.

Then rebuild with `npm run build`, retake the after-shots and re-run check 01 for criminal-defense, dui, divorce,
es/defensa-penal, `/es/` and the footer at 1280, 390 and 320. Finally run `node tools/check.mjs --final` and
`--gate 6`. None of these defects affects content accuracy, accessibility (03 PASS), performance (02 PASS) or links
(04 PASS), so launch is not blocked on these grounds. They are visual polish.
