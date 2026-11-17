# Before launch: placeholders and unverified items

This file sits outside `docs/`, so GitHub Pages does not publish it.

## Placeholders to fill (search the code for these)

| What | Where | Search for |
|---|---|---|
| Contact email (a site-specific address is better than a personal one) | contact.html, privacy.html | `CONTACT_EMAIL` |
| 13 affiliate links (NVIDIA, AMD, Apple and Framework hardware plus PSU, NVMe, monitor, cloud GPU; each comment names the retailer to apply to) | home-setup.html | `AFFILIATE LINK` comments |
| 4 ad spots per guide page (3 in content, 1 sticky bottom) | every guide page + tool pages | `AD SPOT` comments |
| Domain: when you buy one, find-and-replace `https://welles-carbert.github.io/Local-setup/` with your domain in every file in docs/ (canonical tags, schema, robots.txt, sitemap.xml), then add a CNAME file | all of docs/ | `welles-carbert.github.io/Local-setup` |
| Site name: Local Setup (chosen by Welles) | every page header, footer, titles | `Local Setup` |
| Analytics service name, once chosen | privacy.html | "Analytics" section |
| Affiliate program names, once joined | disclosure.html | "Programs this site may take part in" |

Affiliate links already carry `rel="sponsored noopener"`. When a real link replaces the `#`, keep that attribute.
Ad slots are empty boxes with reserved height so the layout does not jump. When the ad network approves the site, its code goes inside each box and the dashed placeholder style can be removed.

## Unverified items (check on a real machine before launch)

1. Model table (Step 4) and Hardware Checker tool (what-can-i-run.html): sizes come from the Ollama library pages (Nov 6, 2026); the model picks per RAM/VRAM tier are starting suggestions, not formal vendor benchmarks. The "sizing to half available memory" rule and memory headroom thresholds are empirical rules of thumb, not formal vendor specifications.
2. Ollama on Mac asking to add its command link, and on Windows showing a tray icon: from memory and earlier draft, not re-checked on latest installer release.
3. Open WebUI: "first account becomes admin" and the menu names (Workspace > Knowledge, Workspace > Models, Admin Panel > Settings > Connections) need checking against the latest Open WebUI release.
4. Open WebUI Linux host-network command (`--network=host`, port 8080, `OLLAMA_BASE_URL`): standard Docker networking pattern for Linux local loopback; verify against latest Open WebUI documentation.
5. LibreChat: the repo URL `github.com/LibreChat-AI/LibreChat` is what LibreChat's docs page showed; it was historically `danny-avila/LibreChat`. The `version: 1.2.1` line in librechat.yaml is a guess at the current config version; check the docs. "Agents" as the project feature in LibreChat is from memory. On Linux, LibreChat may hit the same Ollama-only-listens-locally issue as Open WebUI.
6. Hermes Agent: install commands, `hermes setup` > Custom Endpoint, and the 64K context requirement come from the Hermes docs (read via fetch, Nov 6, 2026). The Modelfile path is simplified from their example. Their 2048-token "Ollama default context" claim may be out of date.
7. Docker Desktop being free for personal use and small businesses: from Docker's standard subscription service agreement; check the official pricing page for commercial thresholds.
8. Export paths for Claude, ChatGPT and Gemini (Step 1): from memory; check current settings menus.
9. Plan prices table and calculator defaults (savings.html and cost-calculator.html): list prices checked October 2026 from third-party summaries (Dupple, chudi.dev, BenchLM), not the providers' own pages. Check official pricing pages before launch.
10. Electricity default of $3/month in the calculators is an estimated example based on ~150W active generation for 1-2 hours daily at average US kWh rates.
11. LM Studio and AnythingLLM being free desktop apps that skip Docker: verify current licensing terms.
12. Add a "last tested" line (OS versions, Ollama, Docker, Open WebUI) once Welles has run through all steps on physical hardware.
13. Hardware page specs (checked Nov 17, 2026 on nvidia.com): RTX 5090 32 GB GDDR7, 575 W card / 1000 W system; RTX 5080 16 GB, 360 W / 850 W; RTX 5070 Ti 16 GB, 300 W / 750 W (Founders Edition figures from NVIDIA's compare page); RTX PRO 6000 Blackwell Workstation 96 GB GDDR7 ECC, 600 W; DGX Spark 128 GB LPDDR5x, 273 GB/s, 1 or 4 TB, "up to 200B parameters, 405B with two" (NVIDIA DGX Spark hardware docs). Not verified: that the RTX 5090 is faster per word than DGX Spark on models that fit both (inferred from memory bandwidth), that Ollama splits models across multiple NVIDIA cards, and the "16 GB runs 14B / 32 GB runs 30B / 96-128 GB runs 70B-class" sizing rule (rule of thumb from 4-bit model file sizes).
14. New "If this goes wrong" items merged from the AI Studio draft (Nov 17, 2026): the Open WebUI context-length menu path (Chat Controls > Advanced Params > Context Length) and the Windows Task Manager "More details" path are from that draft, not re-checked.
15. What-can-I-run tool: new 32 GB and 96 GB VRAM options; the 96 GB result ("70B-class models entirely on the card") is a rule of thumb.
16. Non-NVIDIA picks (checked Nov 17, 2026 on maker pages): Mac Studio M5 Max up to 128 GB (614 GB/s on the 40-core GPU), M5 Ultra 96 to 512 GB (1.2 TB/s) per apple.com/mac-studio/specs; AMD Radeon AI PRO R9700 32 GB per amd.com, listed as supported on Linux (not Windows) in docs.ollama.com/gpu; Framework Desktop Ryzen AI Max+ 395 up to 128 GB and Ryzen AI Max+ PRO 495 192 GB per frame.work. Not verified: R9700 memory type and power, "runs 70B-class models" on Framework (rule of thumb).
17. Retailer commission terms for the hardware slots: Amazon Associates pays 2.5% on "PC, PC Components" and 4% on "All Other Categories" (affiliate-program.amazon.com fee schedule, read Nov 17, 2026); whether Macs fall under 4% is not stated there. B&H: sources disagree (2% base in our Nov 6 research vs "8% per sale" on getlasso.co, updated Nov 13, 2026); confirm in B&H's own program terms when applying. Newegg: about 2.5% via Rakuten, some categories excluded (referly.so, third-party). Apple's own affiliate program does not pay on Macs (Nov 6 research). Framework: no affiliate program confirmed.
