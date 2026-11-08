# Before launch: placeholders and unverified items

This file sits outside `docs/`, so GitHub Pages does not publish it.

## Placeholders to fill (search the code for these)

| What | Where | Search for |
|---|---|---|
| Contact email (a site-specific address is better than a personal one) | contact.html, privacy.html | `CONTACT_EMAIL` |
| Donation link (for example Buy Me a Coffee) | index.html, Support box | `data-placeholder="donation"` |
| 9 affiliate links | home-setup.html | `data-aff=` |
| 4 ad spaces per guide page: 3 in the content plus 1 sticky bottom banner | every guide page | `data-ad-slot=` |
| Site domain | robots.txt, sitemap.xml | `SITE_DOMAIN` |
| Site name: Local Setup (chosen by Welles) | every page header, footer, titles | `Local Setup` |
| Analytics service name, once chosen | privacy.html | "Analytics" section |
| Affiliate program names, once joined | disclosure.html | "Programs this site may take part in" |

Affiliate links already carry `rel="sponsored noopener"`. When a real link replaces the `#`, keep that attribute.
Ad slots are empty boxes with reserved height so the layout does not jump. When the ad network approves the site, its code goes inside each box and the dashed placeholder style can be removed.

## Unverified items (check on a real machine before launch)

1. Model table (Step 4): sizes come from the Ollama library pages (Nov 6, 2026); the model picks per RAM tier are starting suggestions, not tested. The "half your RAM" rule and "20 GB free" figure are rules of thumb, not sourced.
2. Ollama on Mac asking to add its command link, and on Windows showing a tray icon: from memory and earlier draft, not re-checked.
3. Open WebUI: "first account becomes admin" and the menu names (Workspace > Knowledge, Workspace > Models, Admin Panel > Settings > Connections) need checking against the current version.
4. Open WebUI Linux host-network command (`--network=host`, port 8080, `OLLAMA_BASE_URL`): from memory of Open WebUI's troubleshooting docs, not re-read.
5. LibreChat: the repo URL `github.com/LibreChat-AI/LibreChat` is what LibreChat's docs page showed; it was historically `danny-avila/LibreChat`. The `version: 1.2.1` line in librechat.yaml is a guess at the current config version; check the docs. "Agents" as the project feature in LibreChat is from memory. On Linux, LibreChat may hit the same Ollama-only-listens-locally issue as Open WebUI.
6. Hermes Agent: install commands, `hermes setup` > Custom Endpoint, and the 64K context requirement come from the Hermes docs (read via fetch, Nov 6, 2026). The Modelfile path is simplified from their example. Their 2048-token "Ollama default context" claim may be out of date.
7. Docker Desktop being free for personal use and small businesses: from memory of Docker's terms; check the pricing page.
8. Export paths for Claude, ChatGPT and Gemini (Step 1): from memory; check current screens.
9. Plan prices table: from the earlier blueprint, sourced to third-party summaries (Dupple, chudi.dev, BenchLM) in October 2026, not the providers' own pages. Check the official pricing pages before launch and update the "checked" date.
10. Electricity default of $3/month in the calculator is an example, not sourced.
11. LM Studio and AnythingLLM being free desktop apps that skip Docker: from memory.
12. Add a "last tested" line (OS versions, Ollama, Docker, Open WebUI) once Welles has run the steps.
