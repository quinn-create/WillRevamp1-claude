// A22 P600 consent: build-time vendor table (site.config.json → what the consent manager may load).
// Kit section 5: categories Strictly necessary (always on) · Analytics (GA4, Clarity) · Marketing (Meta, TikTok).
// A vendor exists only when its public ID is set in site.config.json (tools/configure.mjs writes them); a rebuild
// switches it on. Nothing here ships to the browser except the small JSON object from `clientConfig()`.
import { config } from '../../lib/site';

export type Category = 'analytics' | 'marketing';
export type VendorId = 'ga4' | 'clarity' | 'meta' | 'tiktok';
export interface Vendor { id: VendorId; category: Category; name: string; key: string }

const T = config.tracking as Record<string, string | undefined>;
const ALL: Vendor[] = [
  { id: 'ga4', category: 'analytics', name: 'Google Analytics 4', key: (T.ga4 || '').trim() },
  { id: 'clarity', category: 'analytics', name: 'Microsoft Clarity', key: (T.clarity || '').trim() },
  { id: 'meta', category: 'marketing', name: 'Meta Pixel', key: (T.metaPixel || '').trim() },
  { id: 'tiktok', category: 'marketing', name: 'TikTok Pixel', key: (T.tiktokPixel || '').trim() },
];

// Public IDs only (GA4 "G-…", Clarity project id, Meta pixel id, TikTok pixel id). Anything else is refused at
// build time so a pasted secret or script fragment can never reach the page.
const SHAPE: Record<VendorId, RegExp> = {
  ga4: /^G-[A-Z0-9]{4,20}$/,
  clarity: /^[a-z0-9]{6,20}$/i,
  meta: /^\d{6,20}$/,
  tiktok: /^[A-Z0-9]{10,30}$/i,
};
for (const v of ALL) {
  if (v.key && !SHAPE[v.id].test(v.key)) throw new Error(`consent/vendors.ts: site.config.json ${v.id} id "${v.key}" is not a valid public ${v.name} id`);
}

/** Vendors whose ID is configured (launch state: none). */
export const vendors: Vendor[] = ALL.filter((v) => v.key);
export const vendorsIn = (c: Category) => vendors.filter((v) => v.category === c);
/** True when at least one optional (non-essential) vendor is configured; only then is a banner shown. */
export const anyOptional = vendors.length > 0;
/** consentPolicyVersion from site.config.json; a stored choice with another version is asked again. */
export const policyVersion = Number((config as any).consentPolicyVersion ?? 1) || 1;

/** The JSON the client script reads (data-consent-config). Public IDs only. */
export function clientConfig() {
  return {
    v: policyVersion,
    vendors: Object.fromEntries(vendors.map((v) => [v.id, { c: v.category, k: v.key }])),
  };
}
