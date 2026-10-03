### A25 — release manager

- **Upload and domain:** follow HANDOFF.md sections 1–3 (Pages upload, domain + `plan/WWW-REDIRECT.md`, `/?p=` Redirect
  Rules). When moving DNS to Cloudflare, keep the MX/SPF/DKIM records so inbox@willfraleylaw.com keeps working.
- **`_UPLOAD_TO_CLOUDFLARE/README.txt`** (written by tools/package.mjs) is published with the site at /README.txt. It is
  harmless; delete it from the folder before dragging if you prefer.
