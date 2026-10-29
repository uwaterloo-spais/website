import Link from "next/link";
import VisionFrame from "@/components/VisionFrame";
import { detectionsFor } from "@/lib/detections";
import { photo } from "@/lib/site";

const facts = [
  { label: "Stage", value: "Discovery & concept development" },
  { label: "First application", value: "Agriculture" },
  { label: "Under study", value: "Greenhouse crop care" },
];

export default function ProjectTeaser() {
  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="project-title">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 id="project-title" className="h-section">
            From the lab.
            <br />
            To the field.
          </h2>
          <p className="lede mt-8 max-w-[520px] text-steel">
            Our first engineering project is a compact, modular mobile robot. We’re starting with
            agriculture, growers’ experience, and a carefully defined task.
          </p>
          <dl className="mt-10 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[14px] text-black/55">{f.label}</dt>
                <dd className="mt-1 text-[16px] font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/project/" className="btn btn-primary-dark mt-10">
            Explore the project
          </Link>
          <p className="mt-6 max-w-[520px] text-[14px] text-black/55">
            Our goal is a useful, testable prototype. Field performance and real-world benefits are
            still to be validated.
          </p>
        </div>
        <figure>
          <VisionFrame
            src={photo("farm-1", 1600)}
            alt="SPAIS members together during the visit to Hoffman’s Strawberries."
            width={800}
            height={600}
            detections={detectionsFor("farm-1")}
            mode="hover"
            className="rounded-3xl"
          />
          <figcaption className="readout mt-3 text-black/55">field_research / hoffmans_strawberries</figcaption>
        </figure>
      </div>
    </section>
  );
}
