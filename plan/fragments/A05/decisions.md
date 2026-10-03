# A05 decisions: performance (audit/A05.md)

- **Old-site baseline.** These are the median figures from `audit/lighthouse-before.json` (24 pages, mobile):

  | Metric | Median |
  |---|---|
  | Performance score | 54 |
  | LCP | 8,081 ms |
  | TBT | 369 ms |
  | CLS | 0.003 |
  | Total weight | 846 KB |
  | JS | 430 KB |
  | CSS | 160 KB |
  | Fonts | 219 KB |
  | Requests | 81 |

  The weights are a floor, not the true figure: the proxy dropped some requests, and Elementor lazy-loads background images.
- **Budgets for the new site.** These apply to every EN and ES page (mobile Lighthouse, median of 3 runs):

  | Metric | Budget |
  |---|---|
  | LCP | 2.5 s or less (target 2.0 s) |
  | CLS | 0.05 or less |
  | TBT | 150 ms or less |
  | JS | 30 KB or less |
  | CSS | 30 KB or less |
  | Fonts | 100 KB or less, in 4 files or fewer |
  | Total weight | 500 KB or less |
  | Requests | 25 or fewer |

- **Fonts.** Self-host at most 2 families as subset `woff2` (Latin + Latin-1 for Spanish), using `font-display: swap` with metric-matched fallbacks. Load nothing from Google Fonts at runtime.
- **Frameworks.** Ship no jQuery, Swiper, Font Awesome or emoji script. Icons are inline SVG.
- **Contact form.** The form script loads only on pages that render the form.
- **Images.** All images go through Astro `<Image>` (AVIF/WebP, `srcset`, explicit width and height). The hero uses `fetchpriority="high"`, and everything below the fold uses `loading="lazy"`.
- **Analytics.** GA4 is scaffolded OFF and loads only after consent, when the page is idle.
