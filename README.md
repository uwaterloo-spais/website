# SPAIS website

The website of the **Sustainable Physical AI Society** at the University of Waterloo.
Built with [Next.js](https://nextjs.org) (static export), [Tailwind CSS](https://tailwindcss.com), and [Motion](https://motion.dev).

**Live site:** https://uwaterloo-spais.github.io/website/

## Run it locally

You need Node.js 22 or newer.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Common edits

| What | Where |
| --- | --- |
| Add a community update (event, visit, recap) | Add a Markdown file to `content/updates/` (copy an existing one) |
| Event photos | `public/photos/` as `name-800.webp` and `name-1600.webp` |
| Detection boxes drawn on photos | `src/lib/detections.ts` |
| Links, email, team descriptions | `src/lib/site.ts` |
| Home page | `src/app/page.tsx` and `src/components/home/` |
| Robotics project page | `src/app/project/page.tsx` and `src/components/project/` |
| Interactive robot drawing | `src/components/RobotDiagram.tsx` |
| Header, footer, photo viewer | `src/components/` |
| Colours, fonts, shared styles | `src/app/globals.css` |

### Adding an update

1. Export each photo as WebP at 800px and 1600px wide (or its full width if smaller), named `my-event-1-800.webp` and `my-event-1-1600.webp`, into `public/photos/`.
2. Create `content/updates/2026-11-15-my-event.md`:

```md
---
title: A short, punchy headline.
category: Workshop
date: 2026-11-15
summary: One or two sentences about what happened.
albumTitle: Title shown in the photo viewer
source: https://www.linkedin.com/posts/...   # optional
sourceLabel: Read the recap
cover: 0          # which photo is the card cover
photos:
  - name: my-event-1
    alt: Describe what is in the photo.
---
```

The newest updates appear first.

### Adding detection boxes

The cyan "machine vision" boxes are hand-placed. Add an entry to `src/lib/detections.ts` keyed by the photo name. Each box is `[x, y, width, height]` in percent of the image:

```ts
"my-event-1": [{ label: "robot_platform", score: 0.93, box: [40, 35, 25, 30] }],
```

Photos without an entry simply show no overlay.

## Deployment

- **GitHub Pages:** every push to `main` builds and deploys through `.github/workflows/deploy.yml`, with `NEXT_PUBLIC_BASE_PATH=/website`.
- **Vercel:** import the repository; the defaults work (no base path needed).

## Photo credits

See [PHOTO_SOURCES.md](PHOTO_SOURCES.md).
