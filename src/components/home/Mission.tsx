const values = [
  { n: "01", label: "Learn together." },
  { n: "02", label: "Build with purpose." },
  { n: "03", label: "Think sustainably." },
];

export default function Mission() {
  return (
    <section id="mission" className="bg-white py-24 md:py-36" aria-label="Our mission">
      <div className="wrap grid gap-10 lg:grid-cols-[0.35fr_1fr]">
        <h2 className="text-[17px] font-medium text-steel">
          Physical AI.
          <br />
          With purpose.
        </h2>
        <div>
          <p className="display max-w-[900px] text-[clamp(30px,4.2vw,60px)] font-medium leading-[1.08]">
            A student-led community bringing AI from the digital world into the real world.
          </p>
          <p className="mt-10 max-w-[620px] text-[17px] leading-relaxed text-steel">
            Through field visits, exchanges with industry and academia, and hands-on engineering projects, we
            bring students from different disciplines together to learn, build, and grow.
          </p>
          {/* Three values: one row on desktop, stacked on mobile, each on its own ruled line. */}
          <ul className="mt-14 grid max-w-[900px] gap-x-8 sm:grid-cols-3">
            {values.map((v) => (
              <li key={v.n} className="border-t border-black/10 py-5 sm:pt-6 sm:pb-0">
                <span className="readout block text-steel/70">{v.n}</span>
                <span className="h-card mt-3 block text-[20px] md:text-[22px]">{v.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
