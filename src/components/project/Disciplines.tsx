"use client";

import Link from "next/link";
import { useState } from "react";
import RobotDiagram, { type RobotPart } from "@/components/RobotDiagram";

// Each discipline maps to the part of the robot it owns. Hovering or
// focusing a discipline lights that part up, and tapping a part selects it.
const disciplines: { part: RobotPart; area: string; title: string; body: string }[] = [
  {
    part: "base",
    area: "Mechanical",
    title: "Mobile platform",
    body: "A compact base designed around the terrain, crop access, and stability required by the chosen task.",
  },
  {
    part: "board",
    area: "Hardware",
    title: "Power & interfaces",
    body: "Motor control, power distribution, sensor connections, and dependable low-level operation.",
  },
  {
    part: "camera",
    area: "Perception",
    title: "Visual understanding",
    body: "Camera-based observation and target localisation, tested against real lighting and occlusion.",
  },
  {
    part: "arm",
    area: "Control",
    title: "Movement & task control",
    body: "Positioning, controlled motion, and coordination between the platform and a task-specific tool.",
  },
];

export default function Disciplines() {
  const [highlight, setHighlight] = useState<RobotPart | null>(null);

  return (
    <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
      <div className="rounded-2xl bg-mist p-3 sm:p-5 lg:sticky lg:top-24">
        <RobotDiagram highlight={highlight} onSelect={(p) => setHighlight((h) => (h === p ? null : p))} className="h-auto w-full" />
      </div>

      <ul className="border-t border-black" onMouseLeave={() => setHighlight(null)}>
        {disciplines.map((d) => (
          <li key={d.part}>
            <Link
              href="/#teams"
              onMouseEnter={() => setHighlight(d.part)}
              onFocus={() => setHighlight(d.part)}
              onBlur={() => setHighlight(null)}
              className={`group grid gap-2 border-b py-7 transition-colors sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 ${
                highlight === d.part ? "border-black" : "border-fog"
              }`}
            >
              <span className={`text-[15px] transition-colors ${highlight === d.part ? "text-black" : "text-black/55"}`}>
                {d.area}
              </span>
              <span>
                <span className="h-card block">
                  {d.title}
                  <span className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                    ↗
                  </span>
                </span>
                <span className="mt-2 block max-w-[46ch] text-[16px] leading-[1.65] text-steel">{d.body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
