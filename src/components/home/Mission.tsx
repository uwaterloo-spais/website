// The physical world AI has to work in. Land is where we're starting.
const domains = [
  { name: "Air", note: "Low to high altitude" },
  { name: "Land", note: "Starting here, on farms", current: true },
  { name: "Water", note: "Nearshore to deep sea" },
];

export default function Mission() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Our mission">
      <div className="wrap grid gap-10 lg:grid-cols-[0.35fr_1fr]">
        <h2 className="text-[17px] font-medium text-steel">Intelligence, with purpose.</h2>
        <div>
          <p className="display max-w-[900px] text-[clamp(30px,4.2vw,60px)] font-medium leading-[1.08]">
            A student-led community bringing AI off the screen and into the physical world.
          </p>

          <ul className="mt-14 grid grid-cols-3 border-t border-black/10">
            {domains.map((d) => (
              <li
                key={d.name}
                className={`relative pt-5 pr-4 ${d.current ? "text-black" : "text-black/55"}`}
              >
                {d.current && (
                  <span aria-hidden className="absolute -top-px left-0 h-0.5 w-full bg-signal" />
                )}
                <p className="h-card text-[clamp(22px,2.6vw,34px)]">{d.name}</p>
                <p className="mt-2 text-[14px] md:text-[15px]">
                  {d.current && <span className="sr-only">Current focus: </span>}
                  {d.note}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-[560px] text-[16px] leading-relaxed text-steel">
            Supported by PhD researchers at the University of Waterloo, in collaboration with{" "}
            <a
              href="https://uwaterloo.ca/robohub/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black underline underline-offset-4 hover:text-steel"
            >
              Waterloo RoboHub
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
