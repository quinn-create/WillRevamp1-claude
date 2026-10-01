# STATE

stage: 0 (Bootstrap) — IN PROGRESS, paused by operator
phase: tools written; nothing hash-locked yet

## Done
- Astro 7.3.5 starter at repo root (`npm run build` passes); deps: @astrojs/sitemap, sharp, yaml, playwright@1.56.1 (matches pre-installed Chromium 1194), @axe-core/playwright, lighthouse, lucide-static.
- Verified: live site loads in Playwright only with ignoreHTTPSErrors (sandbox proxy re-signs TLS); Node fetch works through the proxy.
- tools/: lib, crawl, shots, lighthouse, axe, links, images, compare, package, configure, merge-fragments, check (all pass `node --check`).

## Next (Stage 0 remainder)
1. Self-test tools/check.mjs once more (it is NOT yet hash-locked; review before locking).
2. CLAUDE.md + AGENTS.md (standing rules 1–14 + fragment convention), plan/rules/law-firm.md, plan/DECISIONS.md (fragments), NEEDS-OWNER.md, NEEDS-OPERATOR.md.
3. 25 agent briefs in .claude/agents/.
4. site.config.json (empty keys), .mcp.json (Higgsfield), Higgsfield probe recorded (no credits).
5. `node tools/check.mjs --record-hash`, `--gate 0`, commit `stage0: bootstrap`, push.
Then Stage 1 onward per the approved plan (scratchpad PLAN.md is not in the repo; the kit file is the source of truth).

## Waiting on
Operator: resume with "Continue the website revamp from plan/STATE.md."
