import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Community updates: one Markdown file per event in content/updates/.
// Read at build time only (server components), so no runtime cost.

export type Update = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO yyyy-mm-dd
  summary: string;
  albumTitle: string;
  source?: string;
  sourceLabel: string;
  /** Photo names in public/photos, e.g. "farm-2". */
  photos: { name: string; alt: string }[];
  /** Index into photos used as the cover. */
  cover: number;
};

const dir = path.join(process.cwd(), "content/updates");

export function getUpdates(): Update[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        category: data.category,
        date: new Date(data.date).toISOString().slice(0, 10),
        summary: data.summary,
        albumTitle: data.albumTitle,
        source: data.source,
        sourceLabel: data.sourceLabel ?? "Read more",
        photos: data.photos,
        cover: data.cover ?? 0,
      } satisfies Update;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
