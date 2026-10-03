
## G7

- **Accessibility Statement (/accessibility/), "Easy to see and read".** The page says text can be enlarged to 200% without losing content. Add a 200% browser-zoom check (desktop width) to the accessibility QA pass alongside the reflow check, or tell A17 to drop the bullet. This extends A16's list of claims the build must make true.
- **Accessibility Statement, "Our target".** The page now says the same tests "are there to run again whenever a page changes". Keep `tools/axe` and `tools/lighthouse` in the handover package with a one-line rerun instruction, so that sentence stays true after launch.
