# 02-lighthouse
Result: PASS

Round 2. Source: `qa/lighthouse.json` (generated 2026-10-03T17:12:09Z, 1 run per page, mobile preset, simulated
throttling). It covers 58 pages, 29 EN and 29 ES; `tools/lighthouse.mjs:63` leaves out 404 and `/_*`. It was measured
against `dist/` built 2026-10-03 16:49:31, which is after the round-1 fix commit ("stage6 qa round 1: fixes",
16:48:47). No file in `src/`, `public/`, `astro.config.mjs` or `tools/lighthouse.mjs` is newer than that build.
Cross-checked with `qa/lighthouse-rerun.json` (3 runs, median) for the 6 heaviest-hero pages.
Thresholds: performance, accessibility, best-practices and seo >= 95; LCP <= 2000 ms; CLS <= 0.05; TBT <= 150 ms.

## Summary (58/58 pages pass every threshold)

| Metric | Min / Max over 58 pages | Threshold | Status |
|--------|------------------------|-----------|--------|
| Performance | min 99 (`/`, `/es/`, `/family-law/paternity/`, `/es/derecho-familiar/paternidad/`, `/es/defensa-penal/violacion-de-libertad-condicional/`); all others 100 | >= 95 | pass |
| Accessibility | 100 on every page | >= 95 | pass |
| Best practices | 100 on every page | >= 95 | pass |
| SEO | 100 on every page | >= 95 | pass |
| LCP | max 1965 ms (`/family-law/paternity/`); then `/` 1963, `/es/derecho-familiar/paternidad/` 1957, `/es/defensa-penal/violacion-de-libertad-condicional/` 1956, `/es/` 1955; min 1652 | <= 2000 ms | pass |
| CLS | 0 on every page | <= 0.05 | pass |
| TBT | max 30 ms (`/family-law/visitation/`) | <= 150 ms | pass |

- `failedAudits` is `[]` on all 58 pages, and `failedRequests` is 0 on all of them.
- Payload per page: 113–177 KB total, JS 0–3 KB, CSS 11 KB, fonts 90 KB.

## Round-1 defects, re-verified

| Round-1 defect | Fix | Evidence now |
|----------------|-----|--------------|
| 1–4: SEO 69 on noindex pages (`/cookie-settings/`, `/es/configuracion-de-cookies/`, `/thank-you/`, `/es/gracias/`) | F1: `tools/lighthouse.mjs:73-79` skips only `is-crawlable`, and only on pages whose built HTML carries `noindex` | SEO 100 on all four, each marked `noindex: true, skippedAudits: ["is-crawlable"]`. The noindex meta is still in all four `dist/.../index.html` files, and perf, a11y and BP were still measured on them (100/100/100). |
| 5–8: LCP 2104–2255 ms (probation-violation EN/ES, paternity EN/ES) | F2: 768w step at `src/components/Frame.astro:24`. F3: `quality={64}` on the hero at `src/pages/_templates/PageView.astro:152`, passed through at `Frame.astro:18,20,33` | LCP 1810 / 1956 / 1965 / 1957 ms. `dist/family-law/paternity/index.html` srcset includes `fl-paternity…avif 768w`. Rerun medians are 1957 / 1954 / 1955 / 1963 ms, with perf runs [99,99,100], [99,99,100], [99,99,100], [99,99,99]. |
| 9: noindex cookie pages listed in the XML sitemap | F4: `astro.config.mjs:37` filter now excludes `/cookie-settings/` and `/configuracion-de-cookies/` | `dist/sitemap-0.xml` has 0 matches for `cookie` or `configuracion`. |

## Notes (not defects)

- The LCP margin is thin on the five pages at 1955–1965 ms, which are 35–45 ms under the limit. Run-to-run variance seen
  in round 1 was up to ~150 ms. All recorded runs pass, so this is not a failure. If a later change makes any of these
  heroes or the home hero heavier, re-run with `--runs 3` before signing off.
- `qa/lighthouse-rerun.json` (16:22Z) is older than the final build (16:49Z). It agrees with the main run, but the
  main run on the current build is the evidence of record.

## Fixes

None. There are no open defects for 02-lighthouse.
