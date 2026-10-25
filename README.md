# Yixiao Liu — academic portfolio

Buildless HTML/CSS/JavaScript website, served by GitHub Pages from `main` at the repository root. Pushing to `main` can trigger deployment. The live site is https://yixiaoliu.me/.

## Local workflow

```powershell
python scripts/build_site.py
python scripts/build_site.py --check
python scripts/check_site.py
python -m http.server 8840 --bind 127.0.0.1
```

Open http://127.0.0.1:8840/. No npm installation or production compilation is required. `scripts/build_site.py` renders the shared header and footer into all eight static pages; commit the generated HTML alongside component changes. Edit page content outside the shared marker regions.

Routes: `/`, `/publications/`, `/projects/`, `/experience/`, plus the four project-detail routes under `/projects/`.

Publication content is stored once in `content/publications.json`; the static renderer reuses it on the homepage and Publications page. Formal research/industry appointments have not been supplied in verified website content; the Experience page retains its concise empty state. Coursework and team project contributions remain on project pages and are not presented as formal appointments. `content/data.json` is historical, unused placeholder data and is not used to generate the website.

Selected figures and media retain their existing provenance notes under `assets/projects/`; university logo notes are under `assets/logos/`. Project-index cards use still images, never video autoplay. Detail-page playback controls and reduced-motion behavior are retained.
