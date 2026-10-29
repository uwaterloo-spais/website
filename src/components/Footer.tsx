import Link from "next/link";
import { asset, site } from "@/lib/site";

const socials = [
  { label: "Discord", href: site.links.discord },
  { label: "Instagram", href: site.links.instagram },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
];

export default function Footer() {
  return (
    <footer className="bg-black pb-10 pt-20 text-white">
      <div className="wrap">
        <Link href="/" aria-label="SPAIS home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img
            src={asset("brand/spais-wordmark-white.png")}
            alt="SPAIS"
            width={1022}
            height={163}
            className="h-auto w-full max-w-[880px]"
          />
        </Link>
        <div className="mt-12 grid gap-10 border-t border-white/15 pt-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[15px] text-white">{site.fullName}</p>
            <p className="text-[15px] text-silver">A student-led community at the {site.university}.</p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-block text-[15px] text-white underline-offset-4 hover:underline">
              {site.email}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-silver transition-colors hover:text-white">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-12 text-[13px] text-silver/70">© {new Date().getFullYear()} SPAIS</p>
      </div>
    </footer>
  );
}
