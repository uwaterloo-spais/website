# SPAIS website

The website of the **Sustainable Physical AI Society** at the University of Waterloo.
Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), and deployed to GitHub Pages.

**Live site:** https://uwaterloo-spais.github.io/website/

## Run it locally

You need Node.js 22.23 or newer.

```sh
npm install
npm run dev        # http://localhost:4321/website/
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Common edits

| What | Where |
| --- | --- |
| Add a community update (event, visit, recap) | Add a Markdown file to `src/content/updates/` (copy an existing one) |
| Event photos | `src/assets/photos/`. Images are resized and converted to WebP automatically |
| Links, email, team descriptions | `src/data/site.ts` |
| Home page sections | `src/pages/index.astro` and `src/components/home/` |
| Robotics project page | `src/pages/project.astro` and `src/components/project/` |
| Header, footer, page shell | `src/components/Header.astro`, `Footer.astro`, `src/layouts/Layout.astro` |
| Colours, fonts, shared styles | `src/styles/global.css` |
| Logo files | `src/assets/brand/` |

### Adding an update

Create `src/content/updates/2026-11-15-my-event.md`:

```md
---
title: A short, punchy headline.
category: Workshop
date: 2026-11-15
summary: One or two sentences about what happened.
albumTitle: Title shown in the photo viewer
source: https://www.linkedin.com/posts/...   # optional
sourceLabel: Read the recap
photos:
  - src: ../../assets/photos/my-event-1.jpg
    alt: Describe what is in the photo.
---
```

The newest updates appear first on the home page.

## Deployment

Every push to `main` builds and deploys the site through `.github/workflows/deploy.yml`.
In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is served from `/website/`. To use a custom domain, set the `SITE_URL` and `SITE_BASE=/` environment variables for the build (see `astro.config.mjs`) and add a `public/CNAME` file.

## Photo credits

See [PHOTO_SOURCES.md](PHOTO_SOURCES.md).
