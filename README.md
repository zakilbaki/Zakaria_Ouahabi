# Zakaria Ouahabi Portfolio

Static portfolio for Zakaria Ouahabi, focused on data science, applied AI and ML systems.

## Structure

- `index.html`: main page.
- `assets/css/styles.css`: original visual system and project-specific diagrams.
- `assets/css/refinements.css`: current homepage, typography, case-study navigation and responsive reading layouts.
- `assets/js/projects.js`: editable case-study content.
- `assets/js/main.js`: project rendering, filters, accessible dialogs, chapter navigation and scroll transitions.
- `scripts/verify-portfolio.cjs`: browser checks and screenshots at four viewport sizes.
- `tools/generate_visuals.py`: local PNG visual generator.
- `tools/build_paperpal_gifs.py`: rebuilds the PaperPal workflow and chatbot GIFs.
- `paperpal-showcase/`: frontend-only Streamlit interface used for PaperPal portfolio media.

## Edit Projects

Add or update a project object in `assets/js/projects.js`. The homepage uses `id`,
`title`, `subtitle`, `category`, `filterCategory`, `image`, `imageAlt`, `repo` and
`cardStack` (three key technologies). Category filters and the project count update
automatically. Keep IDs unique and stable.

For a complete case study, set `caseStudyDemo: true` and provide:

- `caseStudyTitle`, `caseStudyCategory`, `caseStudySubtitle`: the opening cover text.
- `overview`: three `{ label, text }` entries for the question, contribution and output.
- `story`: ordered chapters with `eyebrow`, `title`, `body` and optional `points`.
- `stack`: the complete technology list, shown with local logos at the end.

An image chapter needs `image` and `imageAlt`. Use a full-resolution local file;
the reader can enlarge it without leaving the story. A chapter can instead set
`visualType` to a supported diagram in `storyVisualTemplate` in `main.js`.
Keep the numeric inputs next to the relevant story chapter where supported.

On desktop, chapters share a sticky visual area. On mobile the same figures move
into their corresponding chapters, without duplicate images. Chapter navigation,
keyboard focus, reduced motion and the full-image dialog work in both layouts.

Prefer a concrete question, your implementation decisions and contextualized
results. State the evaluation split next to reported scores. Distinguish a product
concept or planned integration from a shipped feature. Do not present an example
station forecast or payment as a live result.

## Run Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then open `http://127.0.0.1:5173`.

The portfolio itself is plain HTML, CSS and JavaScript. No framework build is
needed to preview or publish these files.

## Verify

With Playwright and Chrome available in the Node environment, start the static
server, then run:

```bash
PORTFOLIO_URL=http://127.0.0.1:5173 node scripts/verify-portfolio.cjs
```

The check covers all five case studies at 1440, 820, 390 and 320 pixels, image
loading, filters, chapter activation, image enlargement, keyboard focus, reduced
motion and expanded experience entries. Screenshots go to
`/tmp/portfolio-verification`; override with `PORTFOLIO_SCREENSHOTS`.

## Source Notes

Content is based on `assets/docs/Zakaria_Ouahabi_CV.pdf` and the public GitHub repositories under `zakilbaki`.
