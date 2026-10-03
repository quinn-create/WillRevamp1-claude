### A25 — release manager (Stage 7)

- **Before/after medians.** The owner report compares the old site (median of 24 pages, `audit/lighthouse-before.json`)
  with the new site on the same 24 paths (median of 24) and on every tested page (median of 58, `qa/lighthouse.json`;
  404 pages are not Lighthouse-tested). LOGBOOK uses the same-24 medians: Perf 54→100, A11y 90→100, BP 81→100,
  SEO 100→100, weight 846→131 KB, LCP 8.1 s→1.7 s. axe: 73 serious + 0 critical on 24 old pages → 0 on 60 new pages.
- **Reading grade.** Old ≈ 9.3 (audit/A03.md). New ≈ 5.6 = median Flesch-Kincaid of the 30 English copy files
  (prose lines only; headings, hints, fact tags and link URLs stripped; vowel-group syllable counter). The same
  counter gives 8.5 on `inventory/text/*.md`, disclosed in the report as a cross-check.
- **Credit reconciliation.** `images/GENERATED.json` = 33 kept images, 66 credits (9 mockup + 24 site). Billed in
  total: 26 (A15 mockups, 4 rejected) + 54 (site, 3 rejected) = 80 credits. The "72 credits" in the Stage 3b+5
  DECISIONS line and STATE mixed kept-mockup (18) with billed-site (54); the report and LOGBOOK use 66 kept / 80 spent.
- **Reused images = 6** in the build (IMG01 logo, IMG02 + IMG03 Will, IMG05 Katie, IMG06–07 certificates). IMG04 is
  ledgered "reuse" but not used (mirror of IMG02).
- **PDF.** `tools/report-pdf.mjs` renders REPORT/Before-After.md with a small built-in Markdown subset, embeds the
  site's own fonts and images as data URIs (no network), crops old/new phone captures to the first 390×844 screen,
  and prints A4 via `launchBrowser()`.
- **Owner questions count.** 151 top-level items in NEEDS-OWNER.md (many duplicates); the report groups them into 23.
