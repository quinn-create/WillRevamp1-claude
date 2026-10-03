# A07 decisions: visual brand (audit/A07.md)

- **Logo colors (sampled from `inventory/assets/Logo-3.webp` with sharp).**
  - Wordmark: #447CB7 (median of 1,916 opaque pixels).
  - Tagline and rules: #113964 at about 40% alpha (renders near #A0B0C1 on white).
  - The Elementor kit's custom color #457CB7 matches the wordmark, so the brand blue is #447CB7.
- **Proposed token direction (the design stage finalizes it):**

  | Token | Hex | Use |
  |---|---|---|
  | Brand | #447CB7 | Large type, rules, fills. White on it is 4.36:1, so large text only. |
  | Text-blue | about #356BA6 | Links and small type (5.5:1 on white) |
  | Navy | #1D478A | Deep ground (9.05:1 with white) |
  | Accent | warm brick | Secondary accent |
  | Neutrals | paper and ink | Background and body text |

  Retire sky #6EC1E4 (2.02:1), #00CCFF, #3366FF, the Gravity Forms blues and the default kit colors.
- **Brand equity to preserve:** the wordmark and its blue; the attorney photos IMG03 and IMG02; Katie Fults (IMG05) as a small avatar only; Murfreesboro rootedness; the persistent phone band.
- **Logo:** rebuild as SVG for the new site, matching the raster's letterforms and color. Make the tagline solid (no alpha) and contrast-compliant, or omit it when the logo is narrower than 200 px. Generate the favicon from the wordmark (an initials mark). No new logo design.
- **Kit CSS fetch.** `post-6.css`, `post-57.css` and `post-10.css` were fetched read-only from the old site with curl: 3 requests, 10 s apart, no browser.
