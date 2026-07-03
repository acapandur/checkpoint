# Map Without Stigma

Map Without Stigma is a static, search-discoverable campaign website with an embedded browser game. The site explains why Croatia needs a connected CheckPoint network for testing, PrEP, PEP, counseling and sexual-health care without stigma.

This repository is built as a zero-cost MVP: no build step, no backend, no login, no health-data collection.

## Structure

- `index.html` - campaign homepage and game entry
- `play.html` - interactive night-shift dispatch game
- `what-is-checkpoint.html` - CheckPoint explainer
- `after-sex.html` - calm post-sex uncertainty explainer
- `prep-pep.html` - PrEP and PEP explainer with safety wording
- `testing-sti.html` - STI testing and confidentiality page
- `map-network.html` - proposed Croatian network page
- `petition.html` - petition demands and external petition placeholder
- `privacy.html` - privacy and no sensitive data collection policy
- `about.html` - public anonymity statement
- `press.html` - press kit starter
- `assets/css/site.css` - shared responsive styling
- `assets/js/game.js` - playable MVP game logic
- `assets/img/` - original SVG campaign visuals
- `robots.txt` and `sitemap.xml` - SEO discovery files

## Run locally

Open `index.html` directly in a browser.

For a local server:

```powershell
python -m http.server 5173
```

Then visit `http://localhost:5173`.

## Production notes

- Replace placeholder petition links before launch.
- Replace example canonical URLs if the site is not hosted at `https://acapandur.github.io/checkpoint/`.
- Medical wording must be reviewed by qualified experts before public launch.
- The site intentionally avoids forms, accounts and analytics that could collect sensitive sexual-health data.
