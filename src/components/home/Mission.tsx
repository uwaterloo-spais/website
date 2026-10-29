export default function Mission() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Our mission">
      <div className="wrap grid gap-10 lg:grid-cols-[0.35fr_1fr]">
        <h2 className="text-[17px] font-medium text-steel">Intelligence, with purpose.</h2>
        <div>
          <p className="display max-w-[900px] text-[clamp(30px,4.2vw,60px)] font-medium leading-[1.08]">
            A student-led community bringing AI off the screen and into the physical world.
          </p>
          <p className="mt-10 max-w-[560px] text-[16px] leading-relaxed text-steel">
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
