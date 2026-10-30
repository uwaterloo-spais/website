import { stages, updated } from "@/lib/project";

/** How full each stage's segment of the bar is. */
const fill = { Done: "100%", "In progress": "45%", "Up next": "0%", Planned: "0%" };

export default function StatusTracker() {
  const current = Math.max(
    0,
    stages.findIndex((s) => s.status === "In progress"),
  );

  return (
    <section aria-labelledby="status-title" className="rounded-2xl border border-white/15 bg-graphite p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="status-title" className="text-[15px] font-medium text-white">
          First project status
        </h2>
        <p className="text-[13px] text-silver">
          Updated <time dateTime={updated.date}>{updated.label}</time>
        </p>
      </div>

      <p className="h-card mt-5">
        Stage {current + 1} of {stages.length}: {stages[current].name}
      </p>

      {/* The bar: one segment per stage. */}
      <div className="mt-5 grid grid-cols-4 gap-1.5" aria-hidden>
        {stages.map((s) => (
          <div key={s.name} className="relative h-2 overflow-hidden rounded-full bg-white/12">
            <div className="absolute inset-y-0 left-0 rounded-full bg-signal" style={{ width: fill[s.status] }} />
            {s.status === "In progress" && (
              <div className="absolute inset-y-0 left-0 w-[45%] animate-progress bg-gradient-to-r from-transparent via-white/70 to-transparent bg-[length:50%_100%] bg-no-repeat motion-reduce:hidden" />
            )}
          </div>
        ))}
      </div>

      <ol className="mt-6 grid gap-2.5 text-[14px]">
        {stages.map((s, i) => (
          <li key={s.name} className="flex items-center justify-between gap-4">
            <span className={s.status === "Done" || s.status === "In progress" ? "text-white" : "text-silver"}>
              {i + 1}. {s.name}
            </span>
            <span
              className={`shrink-0 ${
                s.status === "In progress" ? "text-signal" : s.status === "Done" ? "text-fog" : "text-silver/80"
              }`}
            >
              {s.status}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
