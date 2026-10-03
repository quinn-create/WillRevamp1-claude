// A22 P600 vendor loaders. Called ONLY by consent.ts after the visitor accepted the vendor's category, Global
// Privacy Control is not set, and site.config.json holds the vendor's public ID (no ID → the vendor is not in the
// page's consent config at all). Each loader injects the vendor's script once; nothing here runs at import time.
// Script hosts (allow them in the CSP when a key is added; A23 / tools/configure.mjs):
//   GA4 www.googletagmanager.com (+ *.google-analytics.com beacons) · Clarity www.clarity.ms (+ *.clarity.ms)
//   Meta connect.facebook.net (+ www.facebook.com/tr) · TikTok analytics.tiktok.com
type W = Window & Record<string, any>;
const w = window as unknown as W;

function inject(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export type Grants = { analytics: boolean; marketing: boolean };

/** Google Analytics 4 (gtag.js) with Consent Mode values that mirror the visitor's choice. */
function ga4(id: string, g: Grants) {
  w.dataLayer = w.dataLayer || [];
  // gtag must push the arguments object itself (gtag.js reads it that way).
  // eslint-disable-next-line prefer-rest-params
  w.gtag = w.gtag || function gtag() { w.dataLayer.push(arguments); };
  const ad = g.marketing ? 'granted' : 'denied';
  w.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: ad, ad_user_data: ad, ad_personalization: ad });
  w.gtag('js', new Date());
  w.gtag('config', id, { anonymize_ip: true });
  inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
}

/** Microsoft Clarity; `consent` tells Clarity the visitor agreed (cookies allowed). */
function clarity(id: string) {
  w.clarity = w.clarity || function clarityQ(...a: unknown[]) { (w.clarity.q = w.clarity.q || []).push(a); };
  inject(`https://www.clarity.ms/tag/${encodeURIComponent(id)}`);
  w.clarity('consent');
}

/** Meta Pixel (fbq stub + fbevents.js), PageView only. */
function meta(id: string) {
  if (!w.fbq) {
    const n: any = function fbq(...a: unknown[]) { n.callMethod ? n.callMethod(...a) : n.queue.push(a); };
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    inject('https://connect.facebook.net/en_US/fbevents.js');
  }
  w.fbq('init', id);
  w.fbq('track', 'PageView');
}

/** TikTok Pixel (ttq stub + events.js), page view only. */
function tiktok(id: string) {
  const name = 'ttq';
  w.TiktokAnalyticsObject = name;
  const ttq: any = (w[name] = w[name] || []);
  const methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
  const stub = (t: any, m: string) => { t[m] = (...a: unknown[]) => { t.push([m, ...a]); }; };
  methods.forEach((m) => stub(ttq, m));
  ttq.methods = methods;
  ttq._i = ttq._i || {}; ttq._t = ttq._t || {}; ttq._o = ttq._o || {};
  ttq.load = (pid: string) => {
    ttq._i[pid] = []; ttq._i[pid]._u = 'https://analytics.tiktok.com/i18n/pixel/events.js'; ttq._t[pid] = +new Date(); ttq._o[pid] = {};
    inject(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(pid)}&lib=${name}`);
  };
  ttq.load(id);
  ttq.page();
}

export const LOADERS: Record<string, (id: string, g: Grants) => void> = { ga4, clarity, meta, tiktok };

/** Cookie name prefixes each category's vendors set (cleared when the visitor withdraws consent). */
export const COOKIE_PREFIXES: Record<keyof Grants, string[]> = {
  analytics: ['_ga', '_gid', '_gat', '_clck', '_clsk', 'CLID', 'MUID'],
  marketing: ['_fbp', '_fbc', '_ttp', '_tt_', '_gcl'],
};
