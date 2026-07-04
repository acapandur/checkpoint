# Map Without Stigma · Karta bez stigme

A bilingual (Croatian / English) campaign prototype arguing that Croatia needs
clearer routes to HIV/STI testing, PrEP, PEP and counseling without stigma,
including CheckPoint-style community access beyond one city — plus **Three
Nights / Tri noći**, an episodic, choice-driven browser story in a night Art
Deco style.

Live: https://acapandur.github.io/checkpoint/

## What's inside

- **11 static pages**, every string in both languages inline
  (`.lang-en` / `.lang-hr` spans; `<html data-lang>` decides which shows).
  The site defaults to Croatian, and the header switch stores language choice
  in `localStorage` through `assets/js/app.js`. Titles and meta descriptions
  swap via a per-page
  `window.PAGE_META` object.
- **Three Nights** (`play.html`): a small visual-novel engine
  (`assets/js/game.js`) plus the full bilingual script, scene paintings and
  character cameos as inline SVG (`assets/js/story.js`). Three episodes:
  - **I — 72 Hours / 72 sata** · Ema, a broken condom at 2:47 and the PEP route
  - **II — The Question / Pitanje** · Ivan asks about PrEP without shame
  - **III — The Test / Test** · Petra & Sara, testing and the access gap
  Choices move three support meters, each night ends in a "Night Ledger" that
  unlocks one campaign demand, and the finale points to the demand page.
  Progress lives only in the player's browser (`mws-save`).
- **Night Art Deco design system** (`assets/css/site.css`): midnight blues,
  brass/gold, jade and garnet; system font stacks; chamfered geometry, a
  sunburst hero, a marquee frame with bulbs around the game, scroll reveals,
  `prefers-reduced-motion` support and visible keyboard focus everywhere.
- **Original SVG art** in `assets/img/`: three hero paintings (skyline,
  lighthouse, Croatia-as-constellation), brand mark, favicon, footer sunburst
  and a share card (SVG + pre-rendered `share-card.png` for social scrapers).

## Principles kept from v1

- **Zero build step** — plain HTML/CSS/JS, deploys to GitHub Pages as-is.
- **Privacy-minimal static site** — no accounts, analytics or forms; the only
  app values stored by this site are the language choice and story progress, in
  the visitor's own browser. GitHub Pages and external links may still process
  standard technical connection data.
- **Cautious medical wording** — PEP: start as soon as possible, no later than
  72 h, typically a 28-day course, via emergency/infectious-disease care;
  PrEP: prevention for HIV-negative people via prescription and regular
  check-ups. No drug names, no dosing. Official Croatian routes and review TODOs
  are surfaced on the site; international clinical references (CDC, WHO) are
  linked on the PrEP & PEP page.

## Before public launch

1. Medical expert review of all health copy, in both languages.
2. Named responsible organizer, public press contact and confirmed permission
   for any use of CheckPoint naming in advocacy materials.
3. Verification with organizations running real services, so descriptions match
   actual hours, locations and offerings.
4. Replace the petition TODO with a vetted external platform and clear privacy
   terms only when the campaign is ready.

## Development

No tooling required. To preview locally:

```
python3 -m http.server 8000
```

then open http://localhost:8000/.

All characters and events in Three Nights are fictional. Educational campaign
prototype — not medical advice.
