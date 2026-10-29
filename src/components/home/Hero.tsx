import Link from "next/link";
import VisionFrame from "@/components/VisionFrame";
import { GalleryButton, type Album } from "@/components/Gallery";
import { detectionsFor } from "@/lib/detections";
import { photo, site } from "@/lib/site";

export default function Hero({ farmAlbum }: { farmAlbum?: Album }) {
  const frame = (
    <VisionFrame
      src={photo("farm-2", 1600)}
      alt="SPAIS members listening to their farm host beside a growing bed at Hoffman’s Strawberries."
      width={800}
      height={600}
      detections={detectionsFor("farm-2")}
      mode="scan"
      priority
      className="rounded-2xl"
    />
  );

  return (
    <section className="overflow-hidden bg-black pb-20 pt-12 text-white md:pb-28 md:pt-20" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h1 id="hero-title" className="h-hero">
            Bringing AI into the real world.
          </h1>
          <p className="lede mt-8 max-w-[520px] text-silver">
            One of Canada’s first student societies dedicated to Physical AI, run by students for
            students. Started at the {site.university} and growing beyond it, we’re building robots
            for sustainable agriculture, starting with the people who grow our food.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/project/" className="btn btn-primary">
              See the project
            </Link>
            <a href="#teams" className="btn btn-ghost">
              Meet the teams
            </a>
          </div>
        </div>

        <figure>
          {farmAlbum ? (
            <GalleryButton album={farmAlbum} index={1} label="Open photos from the Hoffman’s Strawberries visit">
              {frame}
            </GalleryButton>
          ) : (
            frame
          )}
          <figcaption className="readout mt-4 flex justify-between text-silver">
            <span>hoffmans_strawberries / 2026-10-23</span>
            <span className="hidden sm:inline">field_visit</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
