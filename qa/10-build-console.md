# 10-build-console
Result: PASS

Round 1 · 2026-10-03 · reviewer: QA check 10 (build + console + CSP + gate + secrets)

## 1. Clean build — `npm run build`

- Pipeline: `tools/og.mjs` → `tools/redirects.mjs` → `astro build` → `tools/csp.mjs`; exit code **0**.
- og: 63 cards (1200x630) plus the favicon/icon set; redirects: 67 rules (3 splats), 26 query-string URLs queued for the operator.
- Astro: **60 pages** built in 5.65 s, 236 image variants (all from the cache), `sitemap-index.xml` written.
- csp: 1 inline-script hash, 1 `<style>` hash, 0 style-attribute hashes → `dist/_headers` (CSP 1090 chars).
- **Errors: 0. Warnings: 0.** (`grep -i warn` and `grep error` on the full build log both return 0 lines.)
- The build is deterministic: it changed no tracked files under `public/` or `src/`.

## 2. Browser console + CSP — `qa/console.json`

Harness: `tools/console.mjs`. It serves `dist/` locally and applies the production `Content-Security-Policy` from
the `/*` block of `dist/_headers` as a response header on every document. `upgrade-insecure-requests` is dropped
for the local http:// test only. The harness listens to `page.on('console')` (errors and warnings),
`page.on('pageerror')` and `requestfailed`/`>=400` responses. It injects a `securitypolicyviolation` listener with
`addInitScript` before any page script runs, and it aborts and logs any request to a host that is not local.
Each page is scrolled to the bottom so lazy images load, then the harness waits for `networkidle`.

| metric | value |
|---|---|
| pages | 60 (30 EN + 30 ES) |
| widths | 1280, 390 |
| page loads | 120 |
| console errors | **0** |
| console warnings | 0 |
| uncaught page errors | **0** |
| CSP violations | **0** |
| failed / >=400 subresources | 0 |
| external requests (tracking is off) | 0 |
| load errors | 0 |

Note on the 404 page: the harness's first pass took the page list from `distPages()`, which maps `dist/404.html`
to the URL `/404/`. No such file exists, so the local server answers with the 404 page and **HTTP status 404**.
Chromium then logs its own network message, "Failed to load resource: the server responded with a status of 404"
(1 per width = 2). This message is not from page code. A real not-found URL (`/some-missing-page/`) produces the
same message in every browser, and it is the correct behaviour for a 404 page. The isolation run gave these results:
- `/404.html` (the page served with status 200): 0 console errors, 0 page errors, 0 CSP violations at both widths.
- `/es/404/`: 0 at both widths.
- `/some-missing-page/`: only that one network-status line. No script errors and no CSP violations.

The final `qa/console.json` was written by a run over all 60 pages, with the 404 page loaded at its real file
path `/404.html`. Its summary is all zeros (above). This is not a site defect.

## 3. Gate — `node tools/check.mjs --final`

- Exit code 0. **23/23 PASS**, "GATE PASSED — final". The output is saved in `qa/check-final.txt`.
- Among the passes: page rules on 60 pages, shipped JS 3.3 KB gzipped, no secrets in src/dist/config,
  `_headers` with HSTS/nosniff/Referrer-Policy/Permissions-Policy/CSP, and every old URL 200 or 301→200 (89).

## 4. `tools/check.mjs` hash

- `sha256sum tools/check.mjs` = `41bec76efdd2fe4317a883a5ebe3d6c8836882d47d9664ccd95a1148d2c64f69`, which is
  identical to `plan/CHECK-HASH`.
- `git diff HEAD -- tools/check.mjs plan/CHECK-HASH` is empty. The file was last touched in commit `8e43cad`
  (stage0: bootstrap).

## 5. Secrets scan

- Scope: 508 tracked text files, excluding binaries and `package-lock.json`. Patterns: AWS `AKIA…`,
  `sk-…`/`sk_live_`/`pk_live_`, GitHub `ghp_`/`github_pat_`, Slack `xox?-`, Google `AIza…`, PEM private keys,
  `hf_…` tokens, JWTs, Turnstile `0x4AAA…`, UUIDs, and generic `api_key|secret|token|password|bearer = "<12+ chars>"`.
- Hits: **0 secrets.**
  - UUID matches in `images/GENERATED.json` and `images/PROMPTS.md` are Higgsfield job IDs (not credentials).
  - `G-MN6QWEVWM4` in `NEEDS-OPERATOR.md`, `NEEDS-OWNER.md` and `audit/A05.md`/`A09.md` is the old site's public
    GA4 measurement ID, quoted as a question for the owner. It is not a secret and is not wired into the build.
- No `.env`, `.pem`, `.key`, `.npmrc` or credentials files are tracked or present at the repo root.
- History: `git log --all -p` added lines contain 0 matches for the high-confidence key patterns.
- `dist/` holds no `access_key` hidden input and no `data-sitekey`, because forms and Turnstile are off.

## 6. `site.config.json` keys

- `forms.web3formsAccessKey` = "", `forms.turnstileSiteKey` = "", and `tracking.ga4`, `metaPixel`, `tiktokPixel`
  and `clarity` are all "". **0 non-empty keys.**

## Fixes

None required: 0 defects. Optional harness hardening (not site code, not blocking):
- `tools/console.mjs`, in `main()` where `paths` is computed: map `/404/` to `/404.html`
  (`.map((p) => p === '/404/' ? '/404.html' : p)`). Default runs then load the 404 page at its real path, and the
  expected document-status network log is no longer counted as a console error.
