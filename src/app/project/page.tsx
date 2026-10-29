import type { Metadata } from "next";
import Link from "next/link";
import VisionFrame from "@/components/VisionFrame";
import { GalleryButton } from "@/components/Gallery";
import Roadmap from "@/components/project/Roadmap";
import Disciplines from "@/components/project/Disciplines";
import { detectionsFor } from "@/lib/detections";
import { photo } from "@/lib/site";
import { getUpdates } from "@/lib/updates";

export const metadata: Metadata = {
  title: "Agricultural robotics project",
  description:
    "Explore SPAIS’s first agricultural robotics project: a modular mobile platform shaped by real farm needs. Discover our concept, research questions, and prototype goals.",
};

const facts = [
  { term: "Project", value: "Modular agricultural robotics" },
  { term: "Application under study", value: "Greenhouse crop care" },
  { term: "Near-term goal", value: "A testable, limited-scope prototype" },
];

const questions = [
  {
    title: "What actually takes time?",
    body: "Understand recurring tasks, current tools, and the labour involved in completing an entire growing row.",
  },
  {
    title: "What does a good result look like?",
    body: "Define acceptable crop handling, cutting quality, and when a task needs human judgement.",
  },
  {
    title: "What fits the farm?",
    body: "Measure working heights, aisle access, rails, and the routines the robot would need to work within.",
  },
];

const measures = [
  "Task completion",
  "Time per target",
  "Human intervention",
  "Crop handling quality",
  "Maintenance time",
  "Net labour input",
];

export default function ProjectPage() {
  const farm = getUpdates().find((u) => u.slug.includes("hoffmans"));

  return (
    <>
      {/* Hero */}
      <section className="bg-black pb-20 pt-10 text-white md:pb-28 md:pt-14">
        <div className="wrap">
          <Link href="/" className="text-[15px] text-silver transition-colors hover:text-white">
            ← Back to SPAIS
          </Link>

          <p className="mt-12 flex w-fit items-center gap-2.5 rounded-full border border-white/20 px-3.5 py-1.5 text-[14px] text-fog">
            <span className="size-2 rounded-full bg-signal" aria-hidden />
            Discovery & concept development
          </p>

          <h1 className="h-hero mt-6 max-w-[14ch]">Better crop care, built from real needs.</h1>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
            <div>
              <p className="lede max-w-[46ch] text-fog">
                We’re developing the foundations of a modular agricultural robot—starting with growers’ experience,
                a small mobile platform, and a carefully defined task.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#growers" className="btn btn-primary">
                  Help shape the project ↗
                </Link>
                <a href="#roadmap" className="btn btn-ghost">
                  See our approach ↓
                </a>
              </div>
            </div>

            <dl className="divide-y divide-white/15 border-y border-white/15">
              {facts.map((f) => (
                <div key={f.term} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-[14px] text-silver">{f.term}</dt>
                  <dd className="text-right text-[15px] text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <h2 className="h-section max-w-[16ch]">A useful robot starts with a good question.</h2>
            <p className="lede mt-8 max-w-[52ch] text-steel">
              Crop care combines repetitive work with delicate decisions. A useful robot has to fit the crop, the
              growing space, and the people working around it.
            </p>
            <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.7] text-steel">
              One candidate task is tomato leaf removal, with targeted wound protection when appropriate. We’re
              evaluating this direction alongside the practical requirements of the mobile platform. The final task
              will be shaped by grower input and early testing.
            </p>
          </div>

          <ul className="self-end border-t border-black">
            {questions.map((q) => (
              <li key={q.title} className="border-b border-fog py-7">
                <h3 className="h-card">{q.title}</h3>
                <p className="mt-2.5 max-w-[48ch] text-[16px] leading-[1.65] text-steel">{q.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roadmap: the robot assembles as the steps scroll by */}
      <Roadmap />

      {/* System */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <h2 className="h-section max-w-[18ch]">One system. Four connected disciplines.</h2>
            <p className="lede max-w-[44ch] text-steel">
              A modular architecture lets us test each part, learn from it, and bring the pieces together.
            </p>
          </div>

          <Disciplines />

          <div className="mt-14 grid gap-3 border-l-2 border-black py-1 pl-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
            <p className="text-[16px] font-semibold">Research direction, not a product claim.</p>
            <p className="max-w-[70ch] text-[16px] leading-[1.65] text-steel">
              Autonomy, task completion, labour savings, and crop benefits will need to be measured. Any wound-treatment
              function depends on an appropriate agronomic protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Field note */}
      <section className="bg-mist py-24 md:py-32">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          {farm ? (
            <GalleryButton
              album={{ title: farm.albumTitle, source: farm.source, photos: farm.photos }}
              index={1}
              label="Open photos from the Hoffman’s Strawberries visit"
              className="group rounded-2xl"
            >
              <VisionFrame
                src={photo("farm-2")}
                alt="SPAIS members learning from their farm host during a field visit."
                width={800}
                height={600}
                detections={detectionsFor("farm-2")}
                mode="hover"
                className="rounded-2xl"
              />
            </GalleryButton>
          ) : null}
          <div>
            <h2 className="h-section max-w-[14ch]">Our classroom extends to the field.</h2>
            <p className="lede mt-8 max-w-[48ch] text-steel">
              Our October 23 visit to Hoffman’s Strawberries was an opportunity to ask questions and learn about the
              work behind food production. These conversations help us approach engineering with a better
              understanding of real needs.
            </p>
            <a
              href={farm?.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border-b border-black pb-1 text-[15px] font-medium hover:border-steel hover:text-steel"
            >
              Read the visit recap ↗
            </a>
          </div>
        </div>
      </section>

      {/* What we want to measure */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
          <h2 className="h-section max-w-[14ch]">Progress you can put to the test.</h2>
          <div>
            <p className="lede max-w-[52ch] text-steel">
              A successful demonstration is a starting point. We want to understand how the system performs across
              repeated tasks, how often it needs help, and whether it improves the overall workflow.
            </p>
            <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="What we want to measure">
              {measures.map((m) => (
                <li key={m} className="rounded-full border border-fog px-4 py-2 text-[15px] text-steel">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black py-20 text-white md:py-28">
        <div className="wrap flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h-section max-w-[18ch]">Have a challenge we should understand?</h2>
            <p className="lede mt-6 max-w-[52ch] text-fog">
              We’d love to hear from growers, engineers, and mentors who can help turn a promising idea into a useful
              first build.
            </p>
          </div>
          <Link href="/#growers" className="btn btn-primary shrink-0 self-start md:self-auto">
            Let’s talk ↗
          </Link>
        </div>
      </section>
    </>
  );
}
