import { asset } from "@/lib/site";

// Organisations we work with. They are collaborators, not sponsors; only add a
// logo here once the organisation is happy for us to show it.
const partners = [
  {
    name: "Upside Robotics",
    href: "https://upsiderobotics.com/",
    role: "Providing robot batteries for our first prototype.",
    logo: { src: "partners/upside-robotics.svg", width: 202, height: 24, className: "h-6 md:h-7" },
  },
  {
    name: "Hoffman’s Strawberries",
    href: "https://www.facebook.com/kwstrawberries",
    role: "Offering their farm as a site for field testing.",
  },
  {
    name: "Waterloo RoboHub",
    href: "https://uwaterloo.ca/robohub/",
    role: "Working with us on robotics research at the University of Waterloo.",
    logo: { src: "partners/waterloo-robohub.png", width: 500, height: 376, className: "h-9 md:h-10" },
    withName: true,
  },
];

type Partner = (typeof partners)[number];

function Mark({ partner }: { partner: Partner }) {
  const { logo } = partner;
  return (
    <span className="flex shrink-0 items-center gap-3 px-10 grayscale transition duration-300 hover:grayscale-0 md:px-14 [&:not(:hover)]:opacity-60">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element -- static export
        <img
          src={asset(logo.src)}
          alt=""
          width={logo.width}
          height={logo.height}
          className={`w-auto ${logo.className}`}
        />
      )}
      {(!logo || ("withName" in partner && partner.withName)) && (
        <span className="h-card whitespace-nowrap text-[24px] md:text-[28px]">{partner.name}</span>
      )}
    </span>
  );
}

export default function Partners() {
  // Enough copies that one group is wider than the screen, then the group is
  // doubled so the -50% scroll loops without a seam.
  const group = [...partners, ...partners, ...partners];

  return (
    <section id="community" className="bg-mist py-24 md:py-32" aria-labelledby="partners-title">
      <div className="wrap">
        <h2 id="partners-title" className="h-section max-w-[900px]">
          Learning alongside
        </h2>
        <p className="lede mt-8 max-w-[600px] text-steel">
          Companies, growers, and researchers helping us take our first prototype from the
          workbench to the field.
        </p>
      </div>

      <div
        aria-hidden
        className="group/marquee mt-16 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:hidden"
      >
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex">
              {group.map((p, i) => (
                <Mark key={`${copy}-${i}`} partner={p} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden className="wrap mt-16 hidden flex-wrap justify-center gap-y-6 motion-reduce:flex">
        {partners.map((p) => (
          <Mark key={p.name} partner={p} />
        ))}
      </div>

      <ul className="wrap mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        {partners.map((p) => (
          <li key={p.name} className="border-t border-black/10 pt-6">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px] font-medium underline-offset-4 hover:underline"
            >
              {p.name} ↗
            </a>
            <p className="mt-2 text-[16px] leading-relaxed text-steel">{p.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
