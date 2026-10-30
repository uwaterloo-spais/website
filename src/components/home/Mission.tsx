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
          <p className="mt-12 flex flex-wrap gap-x-10 gap-y-2 text-[17px] text-steel">
            <span>Learn together.</span>
            <span>Build with purpose.</span>
            <span>Think sustainably.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
