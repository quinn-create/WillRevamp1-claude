Finish the website revamp. Run:
node tools/configure.mjs --domain "willfraleylaw.com" --web3forms "<key>" --turnstile "<site key or blank>" --ga4 "<G-ID or blank>" --meta "<pixel or blank>" --tiktok "<pixel or blank>" --clarity "<id or blank>"
Then rebuild, run node tools/check.mjs --final, re-run QA checks 2 3 8 9 10, update the Privacy
page and consent manager to reflect what is now enabled, repackage with node tools/package.mjs,
update HANDOFF.md and LOGBOOK-ENTRY.md, and commit "finish: keys and domain".
