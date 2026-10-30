"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import RobotDiagram, { type RobotPart } from "@/components/RobotDiagram";
import { teams } from "@/lib/site";

export default function Teams() {
  const [selected, setSelected] = useState<RobotPart>("camera");
  const reduced = useReducedMotion();
  const team = teams.find((t) => t.part === selected)!;

  return (
    <section id="teams" className="bg-mist py-24 md:py-32" aria-labelledby="teams-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 id="teams-title" className="h-section">
            Four teams.
            <br />
            One robot.
          </h2>
          <div>
            <p className="lede text-steel">
              Our first project is a modular field robot, starting with agriculture. Each team builds one part of
              it. Pick a part to meet the people behind it.
            </p>
            <Link href="/project/" className="mt-6 inline-block border-b border-black pb-1 text-[15px] font-medium hover:border-steel hover:text-steel">
              Explore our project
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="rounded-3xl bg-white p-4 sm:p-8">
            <RobotDiagram highlight={selected} onSelect={setSelected} className="h-auto w-full" />
          </div>

          <div>
            <ul className="grid gap-2" aria-label="Teams">
              {teams.map((t) => {
                const active = t.part === selected;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelected(t.part)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left transition-colors ${
                        active ? "bg-black text-white" : "bg-white text-black hover:bg-fog"
                      }`}
                    >
                      <span className="h-card text-[19px]">{t.name}</span>
                      <span className={`text-right text-[14px] ${active ? "text-white/70" : "text-black/50"}`}>{t.partLabel}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 min-h-[260px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={team.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="h-card">{team.short}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-steel">{team.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Skills">
                    {team.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-black/15 px-3 py-1 text-[13px]">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-[640px] text-[17px] text-steel">
          <strong className="font-semibold text-black">You don’t need to know everything.</strong> Bring
          your curiosity and a willingness to learn with others.
        </p>
      </div>
    </section>
  );
}
