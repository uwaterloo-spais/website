import VisionFrame from "@/components/VisionFrame";
import CopyEmail from "@/components/home/CopyEmail";
import { detectionsFor } from "@/lib/detections";
import { mailto, photo, site } from "@/lib/site";

const audiences = [
  {
    id: "students",
    name: "Students",
    title: "Bring your curiosity.",
    body: "Whether you want to build a robot, explore an idea, or learn alongside people from other disciplines, you’re welcome to join us.",
    points: [
      "Meet the four technical teams",
      "Find a starting point that fits your interests",
      "Join conversations, visits, and hands-on learning",
    ],
    cta: { label: "Join us on Discord", href: site.links.discord, external: true },
  },
  {
    id: "growers",
    name: "Growers",
    title: "Your experience shapes the build.",
    body: "We’re looking to learn from growers about repetitive tasks, practical constraints, and what useful automation would look like on their farm.",
    points: [
      "Share your crop-care workflow and challenges",
      "Help us review an early concept",
      "Explore a future supervised prototype trial",
    ],
    cta: { label: "Talk with our team", href: mailto.growers, external: false },
  },
  {
    id: "partners",
    name: "Industry & mentors",
    title: "Help the next idea take shape.",
    body: "Connect students with practical engineering experience. We welcome conversations about mentorship, equipment, and support for our first prototype.",
    points: [
      "Offer a technical workshop or design review",
      "Contribute components, fabrication, or equipment access",
      "Discuss sponsorship for student-led development",
    ],
    cta: { label: "Explore a collaboration", href: mailto.partners, external: false },
  },
];

export default function Join() {
  return (
    <section id="join" className="bg-white py-24 md:py-32" aria-labelledby="join-title">
      <div className="wrap">
        <h2 id="join-title" className="h-section max-w-[900px]">
          There’s a place for you here.
        </h2>
        <p className="lede mt-8 max-w-[600px] text-steel">
          Great projects start with people willing to share a question, an experience, or a little of
          their time. Let’s start a conversation.
        </p>

        <div className="mt-16 grid gap-12 border-t border-black/10 pt-10 md:grid-cols-3 md:gap-10">
          {audiences.map((a) => (
            <div key={a.id} id={a.id} className="flex scroll-mt-24 flex-col">
              <p className="text-[15px] font-medium text-steel">{a.name}</p>
              <h3 className="h-card mt-3">{a.title}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-steel">{a.body}</p>
              <ul className="mt-5 grid gap-2 text-[15px]">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-black" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={a.cta.href}
                {...(a.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn btn-primary-dark mt-8 self-start"
              >
                {a.cta.label}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <CopyEmail />
        </div>

        <figure className="mt-20">
          <VisionFrame
            src={photo("team-cover", 1600)}
            alt="The SPAIS community together in front of the society’s presentation screen."
            width={2048}
            height={1152}
            detections={detectionsFor("team-cover")}
            mode="hover"
            className="rounded-2xl"
          />
          <figcaption className="mt-4 text-[15px] text-steel">Curiosity connects us. Purpose moves us.</figcaption>
        </figure>
      </div>
    </section>
  );
}
