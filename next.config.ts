import type { NextConfig } from "next";

// Static export: the site builds to plain files in out/ and runs on
// GitHub Pages or Vercel without a server. GitHub Pages serves the repo at
// /website, so the deploy workflow sets NEXT_PUBLIC_BASE_PATH=/website;
// Vercel and local dev leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
