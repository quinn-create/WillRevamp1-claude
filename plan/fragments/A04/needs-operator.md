### From A04 (SEO and local)

- **Search Console at launch.**
  - Verify the domain property.
  - Submit `/sitemap-index.xml`.
  - Remove the old `/sitemap_index.xml` submission. That URL now 301s to the new sitemap.
  - Request indexing for `/` and `/es/`.
- **Google Business Profile.** Set the website field to `https://willfraleylaw.com/`. If the owner wants traffic measured, add UTM parameters once tracking is on. Check that the profile's hours read Fri 9:00–4:00, matching the site.
- **Host canonicalization.** In Cloudflare, add a 301 from `www.willfraleylaw.com/*` to `https://willfraleylaw.com/*`. The old site linked the www host in body copy.
- **Hostinger staging host.** Retire `beige-baboon-435532.hostingersite.com` or set it to `noindex`. Ten old body links point to it. This repeats A01's item.
