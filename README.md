# GHOST TUMOR

Static website for the research project **"GHOST TUMOR: A new platform to study the Colorectal Tumor Microenvironment"** (University of Genoa, IRCCS Ospedale Policlinico San Martino and partners), presented at Maker Faire Rome 2026.

Plain HTML, CSS and vanilla JS. No build step, no dependencies. Mobile-first, EN/IT.

## Structure

```
index.html
src/css/style.css
src/js/main.js
assets/img/   optimized images (WebP)
assets/pdf/   scientific poster
```

## Run locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Deploy

GitHub Pages: Settings > Pages > Deploy from branch `main`, folder `/ (root)`.
