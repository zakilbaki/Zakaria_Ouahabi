# Zakaria Ouahabi Portfolio

A static Data Science and AI Engineering portfolio published with GitHub Pages. No framework, dependency installation or model execution is required.

## Local preview

```bash
npm run dev
```

Open http://localhost:5173. The equivalent command is `python3 -m http.server 5173`.

## Content and presentation

- `index.html`: homepage, professional experience and engineering notes.
- `assets/js/projects.js`: seven project case studies in display order.
- `assets/js/main.js`: filters, dialogs, chapter synchronization, shared URLs and browser history.
- `assets/js/investigation.js`: Fraud Investigation architecture and record diagrams.
- `assets/js/explorers.js`: client-side retrieval weighting, documented fraud thresholds and technical visuals.
- `assets/css/styles.css` and `refinements.css`: existing visual system.
- `assets/css/investigation.css` and `enhancements.css`: scoped project styling and lightweight additions.
- `assets/docs/Zakaria_Ouahabi_CV.pdf`: supplied resume, preserved byte for byte.

Project media is served locally. Large photographic covers use resized JPEG derivatives; source PNGs remain available. The Fraud Investigation GIF is a local copy of the project's public demonstration. Its captions and enlargement link remain disabled as requested.

## Build and verify

After changing content or the homepage:

```bash
npm run build
npm run check
```

The build creates static `projects/<id>/index.html` pages with unique metadata, canonical URLs and readable project content. It also writes `sitemap.xml` and `robots.txt`. JavaScript opens the same immersive case-study experience on these URLs. Back/Forward and direct project links preserve navigation.

The check validates JavaScript syntax, project IDs, generated pages and local media references. Before publishing UI changes, verify the affected interactions at desktop and mobile sizes, including keyboard access and reduced motion. The optional legacy `scripts/verify-portfolio.cjs` requires a separately installed Playwright/Chrome environment.

GitHub Pages deploys the static repository on pushes to `main` through `.github/workflows/pages.yml`. No Next.js or TypeScript build is used.

## Evidence conventions

Use the resume for professional and academic history; use project artifacts and methodological documentation for project metrics. Keep selection results distinct from independent evaluation.

- Fraud Investigation: 20 documented routing scenarios are not a pass-rate claim. CatBoost metrics describe a separate synthetic PaySim evaluation.
- PaperPal: the recorded local retrieval experiment is distinct from generated-answer quality and the broader product experience. The weight explorer uses documentation excerpts and explicitly illustrative component scores.
- Vélib: the map is a product illustration, not a set of recorded predictions. No prediction explorer is offered without saved forecast records.
- Retail: Average Precision is stored under `PR_AUC` in the source implementation. The two displayed periods are development validation.
- Credit cards: the four thresholds and some feature iterations used the evaluated period; scores are not calibrated probabilities.
- Industrial defects: the notebook ensemble/PCA result is separate from the reusable Elastic Net pipeline.
- Brain MRI: metrics are from 51 validation images; Grad-CAM is an inspection aid, not a causal explanation.

Other repositories are linked as sources, never modified by this site's build.
