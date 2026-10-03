# A09 — operator items

- Analytics (all pages): GA4 stays OFF. If the owner approves it, add the measurement ID with `tools/configure.mjs` and gate it behind the Cookie Settings consent. It must never load before consent.
- Form endpoint (contact form, every page): keep forms OFF until an endpoint is configured. The endpoint's privacy terms must match the Privacy page's "Who receives form submissions" section.
- SMS consent (contact form): keep it disabled unless the owner confirms a texting provider. If it is enabled, the checkbox must be optional and unchecked and must link Privacy. Do not reuse the old "Acceptable Use Policy" text.
