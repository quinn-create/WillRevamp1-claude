// A22 P600 consent manager (client). Kit section 5 + DESIGN-SYSTEM 7.20.
// - Reads the page's consent config (data-consent-config JSON: policy version + configured vendors, public IDs).
// - Choice is stored first-party: cookie "consent" (180 days, SameSite=Lax, Secure on https) + a localStorage
//   mirror, both holding {v: policy version, ts: ISO time, analytics, marketing, vendors: [ids known when chosen]}.
//   A stored choice is ignored (asked again) when the policy version changed, it is older than 180 days, or a vendor
//   was configured after it was made.
// - Global Privacy Control (navigator.globalPrivacyControl) forces Analytics and Marketing off: no banner, no load.
// - A vendor loads only when its category is accepted AND its ID is configured (only configured vendors are in the
//   config). Nothing loads before a choice: no implied consent, no scroll-to-consent, no cookie wall.
import { LOADERS, COOKIE_PREFIXES, type Grants } from './loaders';

type Cat = keyof Grants;
interface Cfg { v: number; vendors: Record<string, { c: Cat; k: string }> }
interface Stored extends Grants { v: number; ts: string; vendors: string[] }

const NAME = 'consent';
const MAX_AGE = 180 * 24 * 60 * 60; // seconds
const CATS: Cat[] = ['analytics', 'marketing'];
const OFF: Grants = { analytics: false, marketing: false };
const loaded = new Set<string>();

function readCfg(): Cfg {
  try {
    const c = JSON.parse(document.querySelector('[data-consent-config]')?.textContent || '');
    if (c && typeof c.v === 'number' && c.vendors && typeof c.vendors === 'object') return c;
  } catch { /* fall through */ }
  return { v: 1, vendors: {} };
}
const gpc = () => (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;

function parse(raw: string | null | undefined): Stored | null {
  if (!raw) return null;
  try {
    const r = JSON.parse(raw);
    if (r && typeof r.v === 'number' && typeof r.ts === 'string' && typeof r.analytics === 'boolean' && typeof r.marketing === 'boolean' && Array.isArray(r.vendors)) return r;
  } catch { /* ignore */ }
  return null;
}
function cookieRaw(): string | null {
  const m = document.cookie.match(/(?:^|;\s*)consent=([^;]*)/);
  if (!m) return null;
  try { return decodeURIComponent(m[1]); } catch { return null; }
}
function setCookie(r: Stored) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${NAME}=${encodeURIComponent(JSON.stringify(r))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
}
function read(cfg: Cfg): Stored | null {
  let r = parse(cookieRaw());
  if (!r) {
    try { r = parse(localStorage.getItem(NAME)); } catch { r = null; }
    if (r) setCookie(r); // restore the cookie from the mirror
  }
  if (!r || r.v !== cfg.v) return null;
  const age = Date.now() - Date.parse(r.ts);
  if (!(age >= 0 && age <= MAX_AGE * 1000)) return null;
  return r;
}
function write(cfg: Cfg, g: Grants): Stored {
  const r: Stored = { v: cfg.v, ts: new Date().toISOString(), analytics: g.analytics, marketing: g.marketing, vendors: Object.keys(cfg.vendors) };
  setCookie(r);
  try { localStorage.setItem(NAME, JSON.stringify(r)); } catch { /* storage blocked: the cookie still holds it */ }
  return r;
}
/** What may run now: GPC wins; no stored choice = everything optional off. */
const effective = (r: Stored | null): Grants => (gpc() || !r ? { ...OFF } : { analytics: r.analytics, marketing: r.marketing });
/** Ask when an optional vendor exists, GPC is not set, and there is no current choice covering every vendor. */
const needsAsk = (cfg: Cfg, r: Stored | null) => {
  const ids = Object.keys(cfg.vendors);
  if (!ids.length || gpc()) return false;
  return !r || ids.some((id) => !r.vendors.includes(id));
};

function clearCookies(cat: Cat) {
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim();
    if (!COOKIE_PREFIXES[cat].some((p) => name.startsWith(p))) continue;
    for (const d of domains) document.cookie = `${name}=; Path=/; Max-Age=0${d ? `; Domain=${d}` : ''}`;
  }
}
function apply(cfg: Cfg, g: Grants) {
  for (const [id, v] of Object.entries(cfg.vendors)) {
    if (!g[v.c] || loaded.has(id) || !LOADERS[id]) continue;
    loaded.add(id);
    LOADERS[id](v.k, g);
  }
  const w = window as unknown as Record<string, any>;
  if (typeof w.gtag === 'function') {
    const ad = g.marketing ? 'granted' : 'denied';
    w.gtag('consent', 'update', { analytics_storage: g.analytics ? 'granted' : 'denied', ad_storage: ad, ad_user_data: ad, ad_personalization: ad });
  }
  for (const c of CATS) if (!g[c]) clearCookies(c);
}

// ------------------------------------------------------------------ UI
const boxes = (root: ParentNode) => [...root.querySelectorAll<HTMLInputElement>('input[data-consent-cat]')];
function reflect(root: ParentNode, g: Grants) {
  for (const b of boxes(root)) {
    b.checked = g[b.dataset.consentCat as Cat] === true;
    if (gpc()) b.disabled = true;
  }
}
const fromBoxes = (root: ParentNode): Grants => {
  const g = { ...OFF };
  for (const b of boxes(root)) g[b.dataset.consentCat as Cat] = b.checked && !gpc();
  return g;
};

export function init() {
  const cfg = readCfg();
  let stored = read(cfg);
  apply(cfg, effective(stored));

  const banner = document.querySelector<HTMLElement>('[data-consent="banner"]');
  const panel = banner?.querySelector<HTMLElement>('[data-consent-panel]');
  const toggle = banner?.querySelector<HTMLButtonElement>('[data-consent-action="settings"]');
  const pages = [...document.querySelectorAll<HTMLElement>('[data-consent="controls"]')];
  let returnTo: HTMLElement | null = null;

  const fit = () => {
    if (!banner || banner.hidden) return;
    document.documentElement.style.setProperty('--consent-h', `${banner.offsetHeight}px`);
  };
  const setPanel = (open: boolean) => {
    if (!panel || !toggle) return;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    banner!.querySelector<HTMLElement>('[data-consent-action="save"]')!.hidden = !open;
    fit();
  };
  const showBanner = (withPanel: boolean) => {
    if (!banner) return;
    reflect(banner, effective(stored));
    banner.hidden = false;
    document.documentElement.classList.add('consent-open');
    setPanel(withPanel);
  };
  const hideBanner = () => {
    if (!banner || banner.hidden) return;
    const hadFocus = banner.contains(document.activeElement);
    banner.hidden = true;
    document.documentElement.classList.remove('consent-open');
    if (hadFocus) (returnTo && returnTo.isConnected ? returnTo : document.getElementById('main'))?.focus({ preventScroll: true });
    returnTo = null;
  };

  const renderCurrent = (root: HTMLElement) => {
    const out = root.querySelector<HTMLElement>('[data-consent-current]');
    if (!out) return;
    const d = root.dataset;
    if (!stored) { out.textContent = d.sNone || ''; return; }
    const when = new Intl.DateTimeFormat(document.documentElement.lang === 'es' ? 'es-US' : 'en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(stored.ts));
    const g = effective(stored);
    out.textContent = `${d.sCurrent} ${d.sAnalytics} ${g.analytics ? d.sOn : d.sOff} · ${d.sMarketing} ${g.marketing ? d.sOn : d.sOff} · ${when}`;
  };
  const save = (g: Grants, from: HTMLElement | null) => {
    stored = write(cfg, gpc() ? { ...OFF } : g);
    apply(cfg, effective(stored));
    for (const p of pages) {
      reflect(p, effective(stored));
      renderCurrent(p);
    }
    if (banner) reflect(banner, effective(stored));
    if (from && from !== banner) {
      const status = from.querySelector<HTMLElement>('[data-consent-status]');
      const text = status?.querySelector<HTMLElement>('[data-consent-status-text]');
      if (status && text) {
        text.textContent = '';
        status.classList.add('is-on');
        // Cleared first, filled on the next frame, so assistive tech announces it again after a second save.
        requestAnimationFrame(() => { text.textContent = from.dataset.sSaved || ''; status.focus(); });
      }
    }
    hideBanner();
  };

  // Banner: equal-weight Accept all / Reject all / Settings; Save appears with the settings panel.
  if (banner) {
    banner.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-consent-action]');
      if (!btn) return;
      const act = btn.dataset.consentAction;
      if (act === 'accept') save({ analytics: true, marketing: true }, banner);
      else if (act === 'reject') save({ ...OFF }, banner);
      else if (act === 'save') save(fromBoxes(banner), banner);
      else if (act === 'settings') {
        const open = toggle?.getAttribute('aria-expanded') !== 'true';
        setPanel(open);
        if (open) boxes(banner)[0]?.focus();
      }
    });
    addEventListener('resize', fit, { passive: true });
    if (needsAsk(cfg, stored)) showBanner(false);
  }

  // Cookie Settings page controls.
  for (const p of pages) {
    const form = p.querySelector<HTMLFormElement>('form');
    const fs = p.querySelector<HTMLFieldSetElement>('fieldset[data-consent-enable]');
    if (fs) fs.disabled = false;
    reflect(p, effective(stored));
    renderCurrent(p);
    const gpcNote = p.querySelector<HTMLElement>('[data-consent-gpc]');
    if (gpcNote) gpcNote.hidden = !gpc();
    p.querySelectorAll<HTMLButtonElement>('[data-consent-action="accept"]').forEach((b) => { if (gpc()) b.disabled = true; });
    form?.addEventListener('submit', (e) => { e.preventDefault(); save(fromBoxes(p), p); });
    p.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-consent-action]');
      if (!btn) return;
      if (btn.dataset.consentAction === 'accept') { e.preventDefault(); save({ analytics: true, marketing: true }, p); }
      if (btn.dataset.consentAction === 'reject') { e.preventDefault(); save({ ...OFF }, p); }
    });
  }

  // Footer "Cookie settings" (every page): re-open the manager in place. On the Cookie Settings page it moves to
  // the controls; elsewhere it opens the banner with the settings panel; with no banner it is a plain link.
  document.querySelectorAll<HTMLAnchorElement>('[data-cookie-settings]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (pages[0]) {
        e.preventDefault();
        pages[0].scrollIntoView({ block: 'start' });
        boxes(pages[0])[0]?.focus({ preventScroll: true });
      } else if (banner) {
        e.preventDefault();
        returnTo = a;
        showBanner(true);
        boxes(banner)[0]?.focus();
      }
    });
  });
}
