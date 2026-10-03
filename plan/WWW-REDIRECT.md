# www → apex redirect (operator, Cloudflare dashboard)

Cloudflare Pages `_redirects` matches paths only, never hosts, so `www.willfraleylaw.com` cannot be normalized
from `public/_redirects`. Every page's `<link rel="canonical">`, `og:url`, hreflang links and the XML sitemap
already use `https://willfraleylaw.com/` (no www). Add this once, before go-live.

## 1. DNS (so requests to www reach Cloudflare)

| Type | Name | Content | Proxy |
|---|---|---|---|
| `AAAA` | `www` | `100::` | Proxied (orange cloud) |

(If `www` already has a proxied CNAME to the Pages project, keep it; the redirect below runs first.)

## 2. Bulk Redirect (Account → Bulk Redirects → Create Bulk Redirect List, then a rule that enables it)

List name: `willfraleylaw_www`

| Source URL | Target URL | Status | Preserve query string | Include subdomains | Subpath matching | Preserve path suffix |
|---|---|---|---|---|---|---|
| `www.willfraleylaw.com/` | `https://willfraleylaw.com/` | 301 | ✔ | ✘ | ✔ | ✔ |

Then **Create Bulk Redirect Rule** → name `www to apex` → list `willfraleylaw_www` → Save and Deploy.

### Equivalent single Redirect Rule (zone → Rules → Redirect Rules), if you prefer one rule

- When incoming requests match: Custom filter expression
  `(http.host eq "www.willfraleylaw.com")`
- Then: Dynamic, expression `concat("https://willfraleylaw.com", http.request.uri.path)`, status **301**,
  **Preserve query string: ON**.

## 3. Check after go-live

```
curl -sI https://www.willfraleylaw.com/criminal-defense/dui/   # → 301, location: https://willfraleylaw.com/criminal-defense/dui/
curl -sI http://willfraleylaw.com/                             # → 301 to https (enable "Always Use HTTPS" under SSL/TLS → Edge Certificates)
```

One hop each: `www` + `http` together should land on `https://willfraleylaw.com/…` in at most two hops; turn on
"Always Use HTTPS" so the http hop happens at the edge before the www rule.
