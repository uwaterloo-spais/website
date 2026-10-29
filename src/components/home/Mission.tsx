export default function Mission() {
  return (
    <section className="bg-white py-24 md:py-36" aria-label="Our mission">
      <div className="wrap grid gap-10 lg:grid-cols-[0.35fr_1fr]">
        <h2 className="text-[17px] font-medium text-steel">Intelligence, with purpose.</h2>
        <div>
          <p className="display text-[clamp(26px,3.4vw,48px)] font-medium leading-[1.15]">
            We’re a student-led community exploring how intelligent systems can make a useful
            difference in the physical world. Through engineering projects, industry visits, and
            conversations in the field, we bring different disciplines together to learn, build,
            and ask better questions.
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
