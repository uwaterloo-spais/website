import type { Metadata } from "next";
import Link from "next/link";
import Approach from "@/components/project/Approach";
import Disciplines from "@/components/project/Disciplines";
import StatusTracker from "@/components/project/StatusTracker";
import { getUpdates } from "@/lib/updates";

export const metadata: Metadata = {
  title: "Our project",
  description:
    "SPAIS explores Physical AI from air to land to water. Our first project is a modular field robot for agriculture: see our approach, what we’ve learned so far, and where the project stands.",
};

// The environments Physical AI has to work in, from our orientation deck.
const domains = [
  {
    name: "Air",
    body: "Drones and aerial sensing for mapping, inspection, and environmental monitoring.",
  },
  {
    name: "Land",
    body: "Field robots, mobile manipulation, and machines that work alongside people.",
    current: true,
  },
  {
    name: "Water",
    body: "Surface monitoring, marine inspection, and underwater exploration.",
  },
];

const facts = [
  { term: "Project", value: "Modular field robot" },
  { term: "First application", value: "Outdoor weeding and disease control" },
  { term: "Near-term goal", value: "A testable, limited-scope prototype" },
];

export default function ProjectPage() {
  const farm = getUpdates().find((u) => u.slug.includes("hoffmans"));
  const farmAlbum = farm && { title: farm.albumTitle, source: farm.source, photos: farm.photos };

  return (
    <>
      {/* Hero, with the first project's status at the top right */}
      <section className="bg-black pb-20 pt-10 text-white md:pb-28 md:pt-14">
        <div className="wrap">
          <Link href="/" className="text-[15px] text-silver transition-colors hover:text-white">
            ← Back to SPAIS
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
            <div>
              <p className="text-[17px] font-medium text-silver">Our project</p>
              <h1 className="h-hero mt-4 max-w-[12ch] text-[clamp(44px,7vw,112px)]">From air, to land, to water.</h1>
              <p className="lede mt-8 max-w-[46ch] text-fog">
                The physical world isn’t one environment, and Physical AI has to work in all of them. We’re
                starting on land, with a modular field robot for agriculture.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#join" className="btn btn-primary">
                  Help shape the project ↗
                </Link>
                <a href="#approach" className="btn btn-ghost">
                  See our approach ↓
                </a>
              </div>
            </div>

            <div className="lg:pt-2">
              <StatusTracker />
            </div>
          </div>
        </div>
      </section>

      {/* Air, land, water */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <h2 className="h-section">
              One intelligence.
              <br />
              Many environments.
            </h2>
            <p className="lede max-w-[46ch] text-steel">
              Understanding the environment is the first step toward designing the right intelligence. Air and water
              are directions we want to explore as the society grows.
            </p>
          </div>

          <ul className="mt-14 grid border-t border-black md:grid-cols-3">
            {domains.map((d) => (
              <li key={d.name} className="border-b border-fog py-8 md:border-b-0 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-fog md:[&:not(:first-child)]:pl-10">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="h-card text-[28px]">{d.name}</h3>
                  {d.current && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-[13px] text-white">
                      <span className="size-1.5 rounded-full bg-signal" aria-hidden />
                      Our first project
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-[36ch] text-[16px] leading-[1.65] text-steel">{d.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The four stages, with what the first project has produced so far */}
      <Approach farmAlbum={farmAlbum} />

      {/* The first project */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h2 className="h-section max-w-[18ch]">Our first project: a robot for the field.</h2>
              <p className="lede mt-8 max-w-[52ch] text-steel">
                Farm work combines repetitive tasks with delicate decisions. A useful robot has to fit the task, the
                space, and the people working around it. Four connected disciplines build it together.
              </p>
            </div>
            <dl className="divide-y divide-fog border-y border-black">
              {facts.map((f) => (
                <div key={f.term} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-[14px] text-steel">{f.term}</dt>
                  <dd className="text-right text-[15px] font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Disciplines />

          <div className="mt-14 grid gap-3 border-l-2 border-black py-1 pl-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
            <p className="text-[16px] font-semibold">Research direction, not a product claim.</p>
            <p className="max-w-[70ch] text-[16px] leading-[1.65] text-steel">
              Autonomy, task completion, labour savings, and real-world benefits will need to be measured. Any disease-control
              function depends on an appropriate agronomic protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black py-20 text-white md:py-28">
        <div className="wrap flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h-section max-w-[18ch]">Have a challenge we should understand?</h2>
            <p className="lede mt-6 max-w-[52ch] text-fog">
              We’d love to hear from growers, companies, researchers, and mentors who can help turn a promising idea
              into a useful first build.
            </p>
          </div>
          <Link href="/#join" className="btn btn-primary shrink-0 self-start md:self-auto">
            Let’s talk ↗
          </Link>
        </div>
      </section>
    </>
  );
}
