// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves the `website` repo at /website/. If the site moves to a
// custom domain (or a `uwaterloo-spais.github.io` repo), set SITE_BASE=/ .
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://uwaterloo-spais.github.io',
  base: process.env.SITE_BASE ?? '/website',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()]
  }
});
