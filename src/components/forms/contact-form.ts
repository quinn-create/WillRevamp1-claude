// Contact form: progressive enhancement over a plain POST to Web3Forms (no framework).
// Without JS the form still posts natively (Web3Forms then redirects to the thank-you page via the hidden
// "redirect" field; its server-side "botcheck" honeypot still applies). With JS: inline validation on blur,
// an error summary on submit, honeypot + time-trap (< 3 s) rejection, optional Turnstile token check,
// fetch() submission, a success state that replaces the form, then a redirect to the current language's
// thank-you page. All copy comes from data-* attributes rendered at build time (EN or ES).
// The configured-off form has no action and a disabled fieldset, so this script never touches it.

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
const MIN_MS = 3000;
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

const form = document.querySelector<HTMLFormElement>('form[data-contact-form][action]');
if (form) init(form);

function init(form: HTMLFormElement) {
  const t0 = Date.now();
  form.noValidate = true; // our messages replace the browser bubbles
  const $ = <T extends Element>(s: string) => form.querySelector<T>(s)!;
  const fields = [...form.querySelectorAll<Field>('[data-v]')];
  const summary = $<HTMLElement>('[data-summary]');
  const fail = $<HTMLElement>('[data-fail]');
  const reason = $<HTMLElement>('[data-fail-reason]');
  const btn = $<HTMLButtonElement>('button[type="submit"]');
  const label = btn.querySelector<HTMLElement>('.btn__label')!;
  const idle = label.textContent;
  const success = document.getElementById(form.dataset.success!)!;

  const check = (el: Field): string => {
    const v = el.value.trim();
    if (!v) return el.required ? el.dataset.required || '' : '';
    if (el.type === 'email' && !EMAIL.test(v)) return el.dataset.invalid || '';
    if (el.type === 'tel') {
      const d = v.replace(/\D/g, '').length;
      if (d < 10 || d > 15 || /[^\d\s().+-]/.test(v)) return el.dataset.invalid || '';
    }
    return '';
  };
  const show = (el: Field, msg: string) => {
    const err = document.getElementById(`${el.id}-err`)!;
    err.hidden = !msg;
    err.lastElementChild!.textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true');
    else el.removeAttribute('aria-invalid');
    el.closest('.field')!.classList.toggle('is-error', !!msg);
    return msg;
  };
  for (const el of fields) {
    el.addEventListener('blur', () => show(el, check(el)));
    // Once flagged, clear the error as soon as the value is fixed (never flag while typing).
    el.addEventListener('input', () => { if (el.hasAttribute('aria-invalid') && !check(el)) show(el, ''); });
  }

  const failWith = (msg: string) => {
    reason.textContent = msg;
    fail.hidden = false;
    fail.focus();
  };
  const busy = (on: boolean) => {
    btn.disabled = on;
    btn.classList.toggle('is-loading', on);
    btn.toggleAttribute('aria-busy', on);
    label.textContent = on ? btn.dataset.sending! : idle;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fail.hidden = true;
    const bad = fields.filter((el) => show(el, check(el)));
    const list = summary.querySelector('ul')!;
    list.replaceChildren(
      ...bad.map((el) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${el.id}`;
        a.textContent = check(el);
        a.addEventListener('click', (ev) => { ev.preventDefault(); el.focus(); });
        li.append(a);
        return li;
      }),
    );
    summary.hidden = !bad.length;
    if (bad.length) return summary.focus();

    const m = fail.dataset;
    if ((form.elements.namedItem('botcheck') as HTMLInputElement | null)?.value) return failWith(m.spam!);
    if (Date.now() - t0 < MIN_MS) return failWith(m.fast!);
    if (form.querySelector('.cf-turnstile') && !(form.elements.namedItem('cf-turnstile-response') as HTMLInputElement | null)?.value) return failWith(m.captcha!);

    const body = new FormData(form);
    body.delete('redirect'); // the JSON reply replaces Web3Forms' own redirect
    body.set('name', `${body.get('first_name')} ${body.get('last_name')}`.trim());
    busy(true);
    fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body })
      .then((r) => r.json().then((j) => { if (!r.ok || !j.success) throw 0; }))
      .then(() => {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        setTimeout(() => location.assign(form.dataset.thanks!), 900);
      })
      .catch(() => {
        busy(false);
        (window as any).turnstile?.reset();
        failWith(m.net!);
      });
  });
}
