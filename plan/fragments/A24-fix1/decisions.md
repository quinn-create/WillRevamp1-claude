### A24 fixer — Stage 6 QA round 1

- **Lighthouse on noindex pages.** Lighthouse skips `is-crawlable` only on pages whose built HTML carries `noindex` (cookie-settings, thank-you and their ES twins), because they are noindex by design (DECISIONS 272/898). All other SEO audits still run on them. `qa/lighthouse.json` marks them `noindex: true` with `skippedAudits: ["is-crawlable"]`. The noindex meta stays, and the pages stay in the run (performance, accessibility, best practices are still measured).
- **Sitemap.** The XML sitemap leaves out every noindex page: thank-you, gracias, cookie-settings, configuracion-de-cookies and the 404s.
- **Hero scenes.** The `scene-3x2` frame gains a 768w step and hero scenes are encoded at quality 64 (AVIF 45) to keep mobile LCP under 2 s on the heaviest heroes (paternity, probation violation).
- **JSON-LD.** The firm node is typed `["LegalService", "Attorney"]`. `FAQPage` is emitted on `/faqs/` and `/es/preguntas-frecuentes/` only; other pages keep their visible FAQ accordions without FAQ structured data. The A20 JSON-LD note was amended to match.
- **ES practice labels.** Menu, breadcrumb and title labels now match the body copy: "Custodia de los hijos", "Casos de DCS" (the FACT-CHECK decision), "Violación de la libertad condicional", "Robo".
- **About page.** "Visit the office" renders as info items (Office, Hours), and About gains the Spanish panel (DS 7.16, "Home and About"), reusing the home panel's sentences and fact tags (F092, F094, F013, F090).
- **Hub paired columns.** On a hub, two consecutive prose sections right before the first `[cards]` render as paired columns (DS 7.23); today that is `/criminal-defense/` and `/es/defensa-penal/`. Hub card sections sit on linen.
