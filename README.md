# SPAIS website

The website of the **Sustainable Physical AI Society** at the University of Waterloo.
Built with [Next.js](https://nextjs.org) (static export), [Tailwind CSS](https://tailwindcss.com), and [Motion](https://motion.dev).

**Live site:** https://uwspais.ca

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
| First project status tracker | `src/lib/project.ts` (change each stage’s `status`) |
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

## Deployment

- **GitHub Pages (mirror):** every push to `main` builds and deploys through `.github/workflows/deploy.yml`, with `NEXT_PUBLIC_BASE_PATH=/website`.
- **Vercel (main site, https://uwspais.ca):** the `spais-website` project is connected to this repo, so every push to `main` deploys and every pull request gets a preview link. `www.uwspais.ca` redirects to `uwspais.ca` (set in Vercel → Settings → Domains).
- **DNS:** `uwspais.ca` is registered through Namecheap. Its records point at Vercel: `A @ 216.198.79.1`, `A @ 64.29.17.1`, and `CNAME www cd8f13fc59607241.vercel-dns-017.com`.

## Photo credits

See [PHOTO_SOURCES.md](PHOTO_SOURCES.md).
