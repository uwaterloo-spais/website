"use client";

import { useEffect, useRef, useState } from "react";
import RobotDiagram, { type RobotPart } from "@/components/RobotDiagram";

type Layers = Partial<Record<RobotPart | "plant" | "detections", boolean>>;

// Each step adds to what the robot has become by that point in the plan.
const steps: { phase: string; title: string; body: string; status: "Current focus" | "Planned"; visible: Layers }[] = [
  {
    phase: "Discover",
    title: "Listen & define",
    body: "Visit farms, record the current workflow, and choose a bounded task with a clear baseline.",
    status: "Current focus",
    visible: { plant: true, base: false, board: false, arm: false, camera: false, detections: false },
  },
  {
    phase: "Design",
    title: "Build & bench-test",
    body: "Develop the platform and task module. Measure positioning, repeatability, and tool behaviour.",
    status: "Planned",
    visible: { plant: true, base: true, board: true, arm: false, camera: false, detections: false },
  },
  {
    phase: "Integrate",
    title: "Connect the system",
    body: "Bring sensing, controls, and hardware together in a limited, repeatable test environment.",
    status: "Planned",
    visible: { plant: true, base: true, board: true, arm: true, camera: true, detections: false },
  },
  {
    phase: "Evaluate",
    title: "Test & learn",
    body: "Compare supervised robot operation with the existing workflow and document what still needs work.",
    status: "Planned",
    visible: { plant: true, base: true, board: true, arm: true, camera: true, detections: true },
  },
];

export default function Roadmap() {
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

  return (
    <section id="roadmap" className="bg-black py-24 text-white md:py-32">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <h2 className="h-section max-w-[16ch]">A focused path to a first prototype.</h2>
          <p className="lede max-w-[46ch] text-fog">
            A four-month development goal, organised around learning milestones. Timing depends on access, resources,
            and test results.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          {/* Sticky on large screens; on small screens it sits above the steps and still follows them. */}
          <div className="sticky top-16 z-10 -mx-5 bg-black px-5 pb-4 pt-2 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl bg-white p-3 sm:p-5">
                <RobotDiagram visible={steps[active].visible} className="h-auto w-full" />
              </div>
              <p className="readout mt-3 text-silver" aria-live="polite">
                stage {active + 1}/4 {steps[active].phase.toLowerCase()}
              </p>
            </div>
          </div>

          <ol className="lg:py-[20vh]">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className={`border-t py-10 transition-colors duration-500 lg:min-h-[52vh] lg:py-12 ${
                  active === i ? "border-white" : "border-white/15"
                }`}
              >
                <p className={`text-[15px] transition-colors ${active === i ? "text-white" : "text-silver"}`}>
                  {String(i + 1).padStart(2, "0")} {s.phase}
                </p>
                <h3
                  className={`display mt-3 text-[clamp(28px,3.2vw,44px)] transition-colors duration-500 ${
                    active === i ? "text-white" : "text-white/40"
                  }`}
                >
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.65] text-fog">{s.body}</p>
                <p
                  className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] ${
                    s.status === "Current focus" ? "border-signal/60 text-white" : "border-white/20 text-silver"
                  }`}
                >
                  {s.status === "Current focus" && <span className="size-1.5 rounded-full bg-signal" aria-hidden />}
                  {s.status}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
