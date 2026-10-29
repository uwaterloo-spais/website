import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Community updates: one Markdown file per event in src/content/updates/.
// Photos live in src/assets/photos/ and are referenced relative to the file.
const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      albumTitle: z.string(),
      source: z.url().optional(),
      sourceLabel: z.string().default('Read more'),
      photos: z
        .array(z.object({ src: image(), alt: z.string() }))
        .min(1),
      /** Index into `photos` used as the card cover. */
      cover: z.number().int().default(0),
    }),
});

export const collections = { updates };
