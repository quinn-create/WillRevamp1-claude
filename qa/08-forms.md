# 08-forms
Result: PASS

Round 1 · run 2026-10-03T16:00:50Z · `node tools/form-test.mjs` (full run, Turnstile included) · exit code 0 ·
**100/100 assertions passed** · results in `plan/checks/form-test.json` (passed: true, failures: 0).
`site.config.json` was byte-identical after the run (both temporary builds restored it; `git diff` is clean;
`web3formsAccessKey` and `turnstileSiteKey` are still empty).

## Evidence by requirement

| Requirement | Pages | Result |
|---|---|---|
| Disabled fallback with the real (empty-key) config shows tel: + mailto: | `dist/contact-us/`, `dist/es/contacto/` | PASS: 12/12 off-state assertions. No `action`, no submit button, `<fieldset disabled>`, `data-form-off` note with `href="tel:+16154107290"` and `href="mailto:inbox@willfraleylaw.com"`, no `access_key`/web3forms/turnstile string anywhere in the page, 0 form scripts shipped. EN note: "Online messages are not switched on yet. Please call (615) 410-7290 or email inbox@willfraleylaw.com." ES: "Los mensajes en línea todavía no están activados. Llame al (615) 410-7290 o escriba a inbox@willfraleylaw.com." Screenshot `REPORT/shots/after/contact-us-390.jpg` shows the disabled form with the note. |
| Dummy-key build posts to a local mock and reaches the thank-you page | EN `/contact-us/` → `/thank-you/`; ES `/es/contacto/` → `/es/gracias/` | PASS, in both builds (key only, and key + Turnstile). One POST to the mocked `https://api.web3forms.com/submit` with `Accept: application/json`. The payload carries the dummy key, all 7 fields, the combined `name`, `language` = en/es, an empty `botcheck` and no `redirect`. The success state replaces the form and takes focus, then the browser lands on the thank-you page for that language. Endpoint failure (mocked 500): an error notice with the phone link appears, the typed message is kept, the button works again, and exactly 1 request is sent. |
| Empty submit gives specific errors | EN + ES | PASS ×4 (2 builds × 2 languages). EN: "Enter your first name." / "Enter your last name." / "Enter your phone number so the office can call you back." ES: "Escriba su nombre." / "Escriba su apellido." / "Escriba su número de teléfono para que la oficina pueda llamarle." Optional fields are not flagged. The summary is shown and focused, and it links to `#cf-first,#cf-last,#cf-phone`. `aria-invalid` is set on exactly 3 fields, and 0 requests are sent. Blur validation works: invalid email gets specific copy, a short phone number is flagged, and the error clears once fixed. |
| Honeypot filled is rejected | EN + ES | PASS ×4. With `botcheck` filled and a wait of more than 3 s, the spam reason is shown, 0 requests are sent and the URL does not change. The honeypot is positioned off-screen, has `tabindex=-1` and sits in an `aria-hidden` wrapper. |
| Time-trap works | EN + ES | PASS ×4. A valid submit less than 3 s after load is rejected with the "too fast" reason. 0 requests are sent and the URL does not change (`MIN_MS = 3000` in `src/components/forms/contact-form.ts`). |
| Non-confidentiality notice above Submit | EN + ES | PASS ×4 (key builds), and the notice is inside the form in the off state ×2. DOM order: `[data-confidentiality]` notice, then the hidden `[data-fail]` notice, then `.form-actions` with the submit button. No CSS `order` or reversed flex applies to them. EN text: "Do not include confidential information in this form. Sending a message does not create an attorney-client relationship." ES: "…no crea una relación entre abogado y cliente." The ES privacy link goes to `/es/politica-de-privacidad/`. |
| Turnstile (extra) | EN + ES | PASS. The script is loaded only in the Turnstile build. A submit without a token is held back with 0 requests. A submit with the stub token goes through and carries the token. |
| Script scope / page errors | site-wide | PASS. The form script is inline on the contact page only and absent from `/`. No page errors in any of the 4 runs. |

## Fixes

None. No defects found.
