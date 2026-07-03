# Map Without Stigma · Karta bez stigme

A bilingual (English / Croatian) campaign prototype arguing that Croatia needs a
connected network of **CheckPoint** centers for HIV/STI testing, PrEP, PEP and
counseling without stigma — plus **Three Nights / Tri noći**, an episodic,
choice-driven browser story in a night Art Deco style.

Live: https://acapandur.github.io/checkpoint/

## What's inside

- **11 static pages**, every string in both languages inline
  (`.lang-en` / `.lang-hr` spans; `<html data-lang>` decides which shows).
  The header switch, `localStorage` and browser-language detection are handled
  by `assets/js/app.js`. Titles and meta descriptions swap via a per-page
  `window.PAGE_META` object.
- **Three Nights** (`play.html`): a small visual-novel engine
  (`assets/js/game.js`) plus the full bilingual script, scene paintings and
  character cameos as inline SVG (`assets/js/story.js`). Three episodes:
  - **I — 72 Hours / 72 sata** · Ema, a broken condom at 2:47 and the PEP route
  - **II — The Question / Pitanje** · Ivan asks about PrEP without shame
  - **III — The Test / Test** · Petra & Sara, testing and the access gap
  Choices move three meters (Calm / Clarity / Trust), each night ends in a
  "Night Ledger" that unlocks one petition demand, and the finale points to the
  petition. Progress lives only in the player's browser (`mws-save`).
- **Night Art Deco design system** (`assets/css/site.css`): midnight blues,
  brass/gold, jade and garnet; "Poiret One" + "Jost" from Google Fonts
  (both cover Croatian diacritics); chamfered geometry, a sunburst hero,
  a marquee frame with bulbs around the game, scroll reveals, full
  `prefers-reduced-motion` support and visible keyboard focus everywhere.
- **Original SVG art** in `assets/img/`: three hero paintings (skyline,
  lighthouse, Croatia-as-constellation), brand mark, favicon, footer sunburst
  and a share card (SVG + pre-rendered `share-card.png` for social scrapers).

## Principles kept from v1

- **Zero build step** — plain HTML/CSS/JS, deploys to GitHub Pages as-is.
- **Zero data collection** — no accounts, analytics or forms; the only stored
  values are the language choice and story progress, in the visitor's own
  browser.
- **Cautious medical wording** — PEP: start as soon as possible, no later than
  72 h, typically a 28-day course, via emergency/infectious-disease care;
  PrEP: prevention for HIV-negative people via prescription and regular
  check-ups. No drug names, no dosing. Official references (CDC, WHO) are
  linked on the PrEP & PEP page.

## Before public launch

1. Medical expert review of all health copy, in both languages.
2. Partnership with the organizations running real CheckPoint services, so
   descriptions match actual hours, locations and offerings.
3. Replace the placeholder petition button with a vetted external platform.
4. Optional: self-host the two fonts to remove the last third-party request
   (download the WOFF2 files, add `@font-face` rules, drop the Google Fonts
   `<link>` from each page).

## Development

No tooling required. To preview locally:

```
python3 -m http.server 8000
```

then open http://localhost:8000/.

All characters and events in Three Nights are fictional. Educational campaign
prototype — not medical advice.
