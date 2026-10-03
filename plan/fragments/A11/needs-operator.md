### A11 — creative director

- **Conditional `/blog/` redirect (`_redirects`).** `plan/sitemap.json` has `/blog/ → /` with `conditional: "blog.enabled === false"`. When you turn the blog on with `tools/configure.mjs`, rebuild so the rule is dropped. At the same time, consider pointing `/feed/` and `/category/uncategorized/` at `/blog/`.
- **Old social previews.** The six old og:image files now 301 to their pages. After launch, re-scrape the home, contact, legal-services, criminal-defense, about and family-law URLs in the Facebook Sharing Debugger and the LinkedIn Post Inspector, so the new preview images replace the old screenshots.
