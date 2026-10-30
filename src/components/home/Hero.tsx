import Link from "next/link";
import Photo from "@/components/Photo";
import { photo, site } from "@/lib/site";

export default function Hero() {
  // Fills the screen below the 64px header, so the cover stands on its own.
  return (
    <section
      className="flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-black py-12 text-white md:py-16"
      aria-labelledby="hero-title"
    >
      <div className="wrap grid w-full items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h1 id="hero-title" className="h-hero max-w-[15ch] text-[clamp(40px,5vw,80px)]">
            Bringing AI into the real world for a sustainable future.
          </h1>
          <p className="lede mt-8 max-w-[520px] text-silver">
            Founded at the {site.university}, we’re a growing student society dedicated to Physical AI.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/project/" className="btn btn-primary">
              Explore our project
            </Link>
            <a href="#join" className="btn btn-ghost">
              Get involved
            </a>
          </div>
        </div>

        {/* The cover from our orientation deck: one intelligence across air, land, and water. */}
        <Photo
          src={photo("cover", 1600)}
          alt="Illustration of a drone in the sky, a wheeled robot on a grassy field, and an underwater vehicle scanning the sea floor."
          width={1190}
          height={1322}
          priority
          className="mx-auto w-full max-w-[560px] rounded-2xl lg:max-w-[min(560px,calc((100svh-12rem)*0.9))]"
        />
      </div>
    </section>
  );
}
