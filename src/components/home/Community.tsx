"use client";

import { useState } from "react";
import VisionFrame from "@/components/VisionFrame";
import { useGallery } from "@/components/Gallery";
import { detectionsFor } from "@/lib/detections";
import { photo, site } from "@/lib/site";
import type { Update } from "@/lib/updates";

type Item = Update & { dateLabel: string };

export default function Community({ updates }: { updates: Item[] }) {
  const { open } = useGallery();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="community" className="overflow-hidden bg-black py-24 text-white md:py-32" aria-labelledby="community-title">
      <div className="wrap flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <h2 id="community-title" className="h-section">
          A community
          <br />
          in motion.
        </h2>
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] text-silver underline-offset-4 hover:text-white hover:underline"
        >
          Follow on LinkedIn ↗
        </a>
      </div>

      <ul
        className="wrap mt-14 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto pb-4 sm:scroll-px-8 lg:scroll-px-12 [scrollbar-width:thin] md:gap-8"
        aria-label="Community updates"
        tabIndex={0}
      >
        {updates.map((u) => {
          const cover = u.photos[u.cover];
          const album = { title: u.albumTitle, source: u.source, photos: u.photos };
          return (
            <li
              key={u.slug}
              className="w-[82%] shrink-0 snap-start sm:w-[420px] lg:w-[460px]"
              onPointerEnter={() => setActive(u.slug)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(u.slug)}
              onBlur={() => setActive(null)}
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open ${u.photos.length} photos: ${u.title}`}
                onClick={() => open(album, u.cover)}
                className="block w-full cursor-pointer"
              >
                <VisionFrame
                  src={photo(cover.name, 800)}
                  alt={cover.alt}
                  width={800}
                  height={600}
                  detections={detectionsFor(cover.name)}
                  mode="hover"
                  active={active === u.slug}
                  className="rounded-xl"
                />
              </button>
              <p className="mt-5 text-[14px] text-silver">
                {u.category}, <time dateTime={u.date}>{u.dateLabel}</time>
              </p>
              <h3 className="h-card mt-2">{u.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-silver">{u.summary}</p>
              {u.source && (
                <a
                  href={u.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[15px] underline underline-offset-4 hover:text-signal"
                >
                  {u.sourceLabel}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
