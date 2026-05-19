# kar1m0vf Command System v2

A cinematic one-page portfolio for **Kamil Kerimov**: frontend interfaces, Telegram automation, Python systems and interactive product experiments.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- GitHub Pages workflow

## Features

- One-page cinematic structure
- Cursor-reactive glow and hover-sensitive cards
- Scene progress rail
- Command palette: `Ctrl + K` / `Cmd + K`
- Project case study overlays
- Blaster real screenshots gallery
- Trendyol flagship mockup panel
- Experiments section for future AI-assisted builds
- SEO metadata + JSON-LD

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Edit content

Main portfolio content lives here:

```text
src/data/portfolio.ts
```

Blaster screenshots are here:

```text
public/projects/blaster/
```

## Deploy to GitHub Pages

The workflow is already included:

```text
.github/workflows/deploy.yml
```

Push to `main`, enable GitHub Pages from GitHub Actions, and the site will deploy automatically.
