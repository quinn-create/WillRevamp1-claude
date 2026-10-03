### Stage 0 — Bootstrap (2026-10-01 → 2026-10-03)

- **Runner:** Claude Code cloud session. PARALLEL groups run as one batch of agents through the Workflow tool (same agents, order fixed in a script). Briefs in `.claude/agents/`.
- **Higgsfield probe:** the Higgsfield MCP is connected (`mcp__Higgsfield__generate_image` callable; balance 1,091.07 credits, Ultra). Cost preflight (`get_cost: true`, no credits spent): `nano_banana_pro` 16:9 at 2k = **2 credits/image**; `gpt_image_2_5` high/2k = 2.75. Model: `nano_banana_pro` 2k. Caps: 100 credits for mockups, 250 for the build pass.
- **Operator instruction (2026-10-03): "Continue. Please finish without bothering me."** The kit's one planned stop (Gate 3) is therefore not a wait: the mockups, COMPARE.html and MOCKUPS-rev1.zip are still produced and pushed, then the run proceeds automatically with the Creative Director's recommended direction (recorded as the "Build" decision). The operator can still reply `Revise mockups: …` or `Build direction X` later; that reruns Stages 3b–7 on the other direction.
- **No pull request:** the GitHub repo was empty, so the first push made `claude/keen-hypatia-pjjiv1` its only/default branch; there is no base branch to open a PR against.
- **Astro scaffold:** `npm create astro --template minimal` (GitHub hosts excluded from the agent proxy so the template downloads). Playwright pinned to 1.56.1 to match the pre-installed Chromium 141 (build 1194).
- **Live-site browser loads ignore certificate errors** — the sandbox proxy re-signs TLS (verified: ERR_CERT_AUTHORITY_INVALID otherwise). Localhost runs unaffected.
- **Crawl delay:** the site's `Crawl-delay: 10` is honored as 10 s between page-level fetches; browser loads count as one fetch and only one agent loads the live site at a time.
- **check.mjs** hard-codes every kit threshold and word list (hash covers the gates themselves). It reads only stage-produced data.
- **Wiring changes to the kit:** (1) Stage 1 — A02's fact ledger waits for A01's text; assets download in parallel. (2) Stage 3 — designers write tokens + rationale → one A15 run → designers build (the kit's designers and A15 each wait on the other). (3) Shared ledgers use per-agent fragments merged by `tools/merge-fragments.mjs`.
- **Machine-readable sitemap:** `plan/sitemap.json` alongside `plan/SITEMAP.md`, so gates and builders read one source.
- **Plan-time decisions accepted by the operator (no vetoes):** experience shown as "18+ years"; firm name "Will Fraley, Attorney at Law"; Katie Fults kept on About only; both real building photos replaced by generated scenes (home civic building, Contact office exterior); testimonials verbatim incl. two garbled ones; SMS/TCPA consent sentence not carried over; same 7 form fields; ≤ 6 nav items; Wills/Murder cards get no pages; logo reused from WebP; all old URLs redirected; social links kept as published.

### Stage 1 — Capture
- Gate 1 passed: 24 pages, 315 facts (every quote verified on its page), 29 assets, 89 old URLs, 19 conflicts.
- **Years of experience:** the ledger supports "practicing law since 2004" as the safest true form (A02, C01). That replaces the plan-time "18+ years" wording; the owner is still asked for the exact number.
- Chromium's networking through the sandbox proxy is unreliable; live-site browser loads go through Node fetch (tools/lib.mjs). Lighthouse (separate Chrome) cannot be routed, so old-site numbers note failed requests.

### Stage 2 — Audit and voice
- Gate 2 and Gate 2b passed. 31 pages (24 kept URLs + 7 new), nav: Criminal Defense · Family Law · Personal Injury · About · FAQs · Contact; 66 redirects.
- **Form fields:** A08 recommends a 4-field form. The kit (A21: "same fields, better labels") and the plan-time decision keep the old site's 7 fields; "best time to reach you" and "new client?" become optional selects to reduce friction. Recorded here; A08's view is noted for the owner.
- **`/?p=<id>` shortlinks:** Cloudflare Pages `_redirects` cannot match query strings; they are listed for the operator (Pages Function or Redirect Rule) rather than shipped as broken rules.

### Stage 4 — Copy (run in parallel with Stage 3)
- Because the operator removed the Gate 3 stop, Stage 4 copy ran alongside the mockups (copy does not depend on the design direction). Gate 4 passed: 31 EN + 31 ES copy files, every factual sentence tagged, Spanish cites only English fact IDs.
- Spanish avoids "certificado" (reads as "certified"): the TACDL certificates are "constancias de finalización".

### Stage 3 — Mockups
- Gate 3 passed. Three real Astro mockups (Home, Criminal Defense, Contact + components sheet) with 390/1280 screenshots, design-QA'd; 9 Higgsfield scenes (nano_banana_pro 2k, 18 credits); COMPARE.html (self-contained) and MOCKUPS-rev1.zip (22.7 MB).
- **Gate 3 stop → Build A.** The Creative Director recommends A "Counsel" (borrowing B's full-number phone button and C's small photo of Will). Per the operator's instruction to finish without stopping, this is recorded as the Build decision; the run continues to Stages 3b–7.
- `tools/compare.mjs` also rewrites `imagesrcset`; web fonts cannot load over file:// in Chromium (expected — the unzipped folders fall back to system fonts; COMPARE.html screenshots show the real fonts).

### Stage 3b + 5 — Design system and build (direction A "Counsel")
- Borrowed elements (≤ 2): B's full-number header call button; C's small byline photo of Will beside his name.
- 24 site-wide Higgsfield scenes (54 credits incl. 3 rejected and regenerated). Run total: 33 images kept, 72 credits.
- Build phases P100–P800 each passed `npm run build` + `check.mjs --build`; `check.mjs --final` passed (60 pages: 30 EN + 30 ES incl. 404s/thank-you). Pages are rendered by catch-all EN/ES routes from the copy files plus a per-page verification pass (kit: "one pass per page").

### Stage 6 — QA
- Three QA rounds (A24): 9/10 checks passed; 01-visual had 3 small residual defects after round 3 (documented in BLOCKED). Gate 6 passed with that residue.
- **Orchestrator follow-up (beyond the kit's 3 loops):** the three residual defects were precise one-line fixes, so the orchestrator applied them (steps disclaimer as fine print; even footer social spacing with ≥ 44 px targets; Spanish home portrait caption "Abogado"), rebuilt, re-ran `check.mjs --final` (pass), re-captured screenshots and re-ran checks 01 and 07.
- **Lighthouse on noindex pages:** /cookie-settings/, /thank-you/ and their ES twins are noindex by design; `tools/lighthouse.mjs` skips only the `is-crawlable` audit on them and marks `noindex: true, skippedAudits: ["is-crawlable"]` in qa/lighthouse.json. All other audits run. Disclosed in the owner report.
