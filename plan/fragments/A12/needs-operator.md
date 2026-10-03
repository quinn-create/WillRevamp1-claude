### A12 — Direction A "Counsel"

- **Font fallback metrics (all pages, `mockups/A/tokens.css`):** the Public Sans fallback `size-adjust: 106%` is an estimate. When the production build runs, re-measure it at weight 400 with a tool that can instance variable woff2 (for example, Astro's font tooling or fontTools), so that CLS from the font swap stays at or below 0.05.

### A12 — Direction A "Counsel" (Stage 3, step 2)

- **Mockup helpers (`mockups/A/scripts/`):** `prep-images.mjs` regenerates `public/img` and `src/lib/images.json` from `images/generated/A` and the reused assets. Run it again if A15 replaces any A scene. `overflow.mjs`, `imgcheck.mjs` and `audit.mjs` are local QA helpers for the built `dist` (no network).
- **Contact form is not wired** (Contact page): the submit button is disabled in the mockup. In the build, wire it through `tools/configure.mjs` once a form endpoint key exists. Until then, keep the phone and email fallback note.
