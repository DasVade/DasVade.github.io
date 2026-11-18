# Yixiao Liu — academic portfolio

Buildless HTML/CSS/JavaScript website, served by GitHub Pages from `main` at the repository root. Pushing to `main` can trigger deployment. The live site is https://yixiaoliu.me/.

## Local workflow

```powershell
python scripts/build_site.py
python scripts/build_site.py --check
python scripts/check_site.py
python -m http.server 8840 --bind 127.0.0.1
```

Open http://127.0.0.1:8840/. No npm installation or production compilation is required. `scripts/build_site.py` renders the shared header and footer into all ten static pages; commit the generated HTML alongside component changes. Edit page content outside the shared marker regions.

Routes: `/`, `/publications/`, `/projects/`, `/experience/`, plus the six project-detail routes under `/projects/`.

The same renderer installs the Cloudflare Web Analytics beacon once per public
HTML page, immediately before `</body>`. Update its site token in
`scripts/build_site.py` and regenerate the pages instead of adding a second
script by hand. Analytics uses the manual snippet with GitHub Pages.

Google Analytics 4 is optional. The English preferences notice distinguishes
it from Cloudflare, and the footer button lets visitors change their choice.
The shared `assets/js/analytics.js` uses basic consent mode: no Google tag or
measurement request before opt-in. A separate collector document reports one
page view per permitted page load using the canonical path with no query,
fragment, referring URL or personal title. Google advertising consent stays
denied. Withdrawal stops Google Analytics and clears its cookies for the site.
Re-enabling after withdrawal reloads the page so the tag starts once in a fresh
document rather than issuing a second configuration on the same page.

Publication content is stored once in `content/publications.json`; the static renderer reuses it on the homepage and Publications page. The Experience page lists the UAES Software Engineer internship, Jun 2025 – Aug 2025. `content/data.json` is historical, unused placeholder data and is not used to generate the website.

Selected figures and media retain their existing provenance notes under `assets/projects/`; university logo notes are under `assets/logos/`. Project-index cards use still images, never video autoplay. Detail-page playback controls and reduced-motion behavior are retained.
