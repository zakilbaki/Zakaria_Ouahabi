# Zakaria Ouahabi Portfolio

Static portfolio for Zakaria Ouahabi, focused on data science, applied AI and ML systems.

## Structure

- `index.html`: main page.
- `assets/css/styles.css`: visual system and responsive layout.
- `assets/js/projects.js`: editable case-study content.
- `assets/js/main.js`: project rendering, filters, mobile navigation and scroll reveals.
- `tools/generate_visuals.py`: local PNG visual generator.
- `tools/build_paperpal_gifs.py`: rebuilds the PaperPal workflow and chatbot GIFs.
- `paperpal-showcase/`: frontend-only Streamlit interface used for PaperPal portfolio media.

## Edit Projects

Add or update projects in `assets/js/projects.js`. Each project needs:

- `title`
- `subtitle`
- `category`
- `status`
- `image`
- `repo`
- `stack`
- `question`
- `built`
- `evidence`
- `next`

## Run Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 5173
```

Then open `http://127.0.0.1:5173`.

## Source Notes

Content is based on `assets/docs/Zakaria_Ouahabi_CV.pdf` and the public GitHub repositories under `zakilbaki`.
