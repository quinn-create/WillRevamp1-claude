# A21 decisions (P500 — contact form)

- **D-A21-1: Required fields follow the approved copy (D-A14-20), not the P500 task line.** The P500 brief
  marks Email* and "How can we help?"* as required. But the contact copy rendered directly above the form says
  "Leave your name and phone number… Email and a short note are optional" (EN and ES), and the design system
  (D-A14-20) already settled on that. Requiring them would make the page contradict itself. Result: First name,
  Last name and Phone are required. Email, Best time, New client and How can we help? are marked "(optional)".
  All 7 fields from inventory/forms.json gform_1 are present. If the owner wants email or the message required,
  change `required` in `src/components/forms/ContactForm.astro` (defs) and the sentence in copy/pages/contact-us.md
  together.
- **D-A21-2: Configured-off state = disabled fieldset, no action, no submit, no script.** With
  `forms.web3formsAccessKey` empty, all fields render disabled (`<fieldset disabled>`), the `<form>` has no
  action, there is no submit button, and the form script is not shipped. A note at the top of the form says
  online messages are not on yet and gives the tel: and mailto: links. This follows the P500 task ("renders
  DISABLED … no fake submit"). It is stricter than DESIGN-SYSTEM 7.9 ("fields enabled"), which would let people
  type a message they cannot send.
- **D-A21-3: Non-confidentiality notice comes from the copy, rendered inside the form directly above Submit.**
  PageView.astro (one small integration edit) takes the copy's "Please read before you send" paragraph (the
  one that mentions an attorney-client relationship) out of the section prose and passes it to the form as
  `notice`. So the text appears once, in the copy's wording, as an info notice above Submit (law-firm rule 8,
  D-A13-16). If no copy block is passed, the component falls back to the same wording in its own EN/ES strings.
- **D-A21-4: Progressive enhancement.** With a key set, the form is a plain `POST` to
  https://api.web3forms.com/submit with hidden `access_key`, `subject`, `from_name`, `language` and `redirect`
  (absolute thank-you URL of the page language). Without JS it still works natively, and Web3Forms redirects to
  the thank-you page. With JS (`src/components/forms/contact-form.ts`, about 1.1 KB gzipped, inlined only on
  /contact-us/ and /es/contacto/), the script turns off native bubbles and validates on blur. It clears an error
  once the value is fixed, never while the person is still typing. On submit it shows an error summary
  (role=alert, focused, links to fields). It sends with fetch (Accept: application/json, `redirect` removed,
  `name` = first + last), shows a success notice that replaces the form (role=status, focused), then goes to
  /thank-you/ or /es/gracias/ after 0.9 s. On failure it shows an error notice with the phone link, keeps the
  typed text and re-enables the button.
- **D-A21-5: Spam.** Honeypot input `botcheck`: off-screen, aria-hidden, tabindex -1, autocomplete off. Web3Forms
  also rejects it server side, so it works without JS too. Time-trap: a JS submit less than 3 s after page load is
  rejected with "That was very fast…". Cloudflare Turnstile: the widget div and
  challenges.cloudflare.com/turnstile/v0/api.js render only when `forms.turnstileSiteKey` is set. When it is
  set, the script holds back a submit that has no `cf-turnstile-response` token.
- **D-A21-6: Labels and messages.** Labels sit above the fields, with "(optional)" in muted text and no
  asterisks. There is helper text under the Email, Phone and message labels. Error copy is specific (EN/ES)
  and is shown with an icon, `aria-invalid` and `aria-describedby`. Option lists are lightly reworded from
  forms.json ("ASAP" → "As soon as possible"; "Yes, I am a potential new client." → "Yes, I may be a new
  client"). The 600-character limit comes from the old form. Phone needs 10–15 digits (native `pattern` too).
  autocomplete uses given-name, family-name, email and tel.
- **D-A21-7: Test harness `tools/form-test.mjs`** writes results to plan/checks/form-test.json. It checks the
  off state on dist/. It builds into a temp outDir with a dummy key, restoring site.config.json byte-for-byte in
  `finally`. It mocks Web3Forms with Playwright routing and aborts every other external request. It covers EN
  and ES: empty submit, blur, time-trap, honeypot, endpoint failure, and a valid submit that must reach the
  thank-you page. A second build with Cloudflare's public test site key checks that the Turnstile script loads
  only then and that a submit without a token is held back. Result: 100/100 assertions pass.
