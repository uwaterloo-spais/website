"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/Photo";
import RobotDiagram, { type RobotPart } from "@/components/RobotDiagram";
import { GalleryButton, type Album } from "@/components/Gallery";
import { stages } from "@/lib/project";
import { photo } from "@/lib/site";

type Layers = Partial<Record<RobotPart | "plant", boolean>>;

// The robot takes shape as the stages go by: a need, then a platform, then
// the functions we validate, then the integrated prototype.
const visible: Layers[] = [
  { plant: true, base: false, board: false, camera: false, arm: false },
  { plant: true, base: true, board: false, camera: false, arm: false },
  { plant: true, base: true, board: true, camera: true, arm: false },
  { plant: true, base: true, board: true, camera: true, arm: true },
];

const measures = [
  "Task completion",
  "Time per target",
  "Human intervention",
  "Handling quality",
  "Maintenance time",
  "Net labour input",
];

function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label={label}>
      {items.map((m) => (
        <li key={m} className="rounded-full border border-white/20 px-3 py-1 text-[14px] text-fog">
          {m}
        </li>
      ))}
    </ul>
  );
}

export default function Approach({ farmAlbum }: { farmAlbum?: Album }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  // The last step whose top has passed the middle of the viewport drives the
  // diagram. Measuring positions (rather than watching a narrow band) means a
  // fast scroll can never skip a step.
  useEffect(() => {
    // Four position reads per scroll event is cheap; React skips re-renders
    // when the active step hasn't changed.
    const update = () => {
      const middle = window.innerHeight / 2;
      let next = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= middle) next = i;
      });
      setActive(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // What each stage has produced so far. Later stages fill in as we reach them.
  const progress = [
    <>
      <p>
        On October 23 we visited Hoffman’s Strawberries. The owner walked us through the work behind the harvest
        and named two everyday pain points.
      </p>
      <Chips items={["Weeding", "Crop disease control"]} label="Needs we found" />
      {farmAlbum && (
        <GalleryButton album={farmAlbum} index={1} label="Open photos from the Hoffman’s Strawberries visit" className="mt-6 max-w-[360px]">
          <Photo
            src={photo("farm-2")}
            alt="SPAIS members listening to their farm host beside a growing bed at Hoffman’s Strawberries."
            width={800}
            height={600}
            className="rounded-xl"
          />
        </GalleryButton>
      )}
      {farmAlbum?.source && (
        <a
          href={farmAlbum.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-[15px] text-white underline underline-offset-4 hover:text-signal"
        >
          Read the visit recap ↗
        </a>
      )}
    </>,
    <>
      <p>
        Our first use case is weeding and crop disease control, outdoors. We’ve set the greenhouse aside for now,
        so our early tests match the conditions of on-site trials at the farm.
      </p>
      <p className="mt-4">Measures of success we’re considering:</p>
      <Chips items={measures} label="Measures of success" />
    </>,
    <p key="validate">
      Planned: test localization and control on RoboHub’s Husky robot, try open-source vision models on our own
      field images, and drive a starter rover with a working emergency stop.
    </p>,
    <p key="prototype">
      Planned: bring the validated functions together on our own mobile base, then run supervised tests outdoors
      and compare them with how the work is done today.
    </p>,
  ];

  return (
    <section id="approach" className="bg-black py-24 text-white md:py-32">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="h-section max-w-[16ch]">Our approach.</h2>
          <p className="lede max-w-[46ch] text-fog">
            Every project moves through the same four stages. Here’s what each one means, and what our first
            project has produced so far.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          {/* Sticky on large screens; on small screens it sits above the steps and still follows them. */}
          <div className="sticky top-16 z-10 -mx-5 bg-black px-5 pb-4 pt-2 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-white p-3 sm:p-5">
                <RobotDiagram visible={visible[active]} className="h-auto w-full" />
              </div>
              <p className="mt-3 text-[14px] text-silver" aria-live="polite">
                Stage {active + 1} of {stages.length}: {stages[active].name}
              </p>
            </div>
          </div>

          <ol className="lg:py-[12vh]">
            {stages.map((s, i) => (
              <li
                key={s.name}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`border-t py-10 transition-colors duration-500 lg:min-h-[52vh] lg:py-12 ${
                  active === i ? "border-white" : "border-white/15"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className={`text-[15px] transition-colors ${active === i ? "text-white" : "text-silver"}`}>
                    Stage {i + 1}
                  </p>
                  <p
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${
                      s.status === "In progress" ? "border-signal/60 text-white" : "border-white/20 text-silver"
                    }`}
                  >
                    {s.status === "In progress" && <span className="size-1.5 rounded-full bg-signal" aria-hidden />}
                    {s.status}
                  </p>
                </div>
                <h3
                  className={`display mt-3 text-[clamp(28px,3.2vw,44px)] transition-colors duration-500 ${
                    active === i ? "text-white" : "text-white/40"
                  }`}
                >
                  {s.name}
                </h3>
                <p className="mt-4 max-w-[44ch] text-[17px] leading-[1.6] text-white">{s.body}</p>
                <div className="mt-6 max-w-[48ch] border-l border-white/20 pl-5 text-[16px] leading-[1.65] text-fog">
                  {progress[i]}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
