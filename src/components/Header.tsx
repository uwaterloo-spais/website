"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { asset, site } from "@/lib/site";

const links = [
  { label: "Mission", href: "/#mission" },
  { label: "Events", href: "/#events" },
  { label: "Our project", href: "/project/" },
  { label: "Community", href: "/#community" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || open ? "bg-black/85 backdrop-blur-xl" : "bg-black"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 flex-col gap-1.5"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src={asset("brand/spais-wordmark-white.png")} alt="" width={140} height={22} className="h-auto w-[140px]" />
          {/* 10px text spans the 140px wordmark, so the two read as one lockup. */}
          <span className="whitespace-nowrap text-[10px] leading-none text-white/60">
            {site.fullName}
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-[15px] lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === "/project/" && pathname.startsWith("/project") ? "page" : undefined}
              className="text-white/70 transition-colors hover:text-white aria-[current=page]:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#join" className="btn btn-primary min-h-10 px-5 text-[14px]">
            Get involved
          </Link>
        </nav>

        <button
          className="grid size-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-[1.5px] w-6 bg-white transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-[1.5px] w-6 bg-white transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="wrap flex flex-col gap-1 pb-6 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="display py-3 text-[28px]">
              {l.label}
            </Link>
          ))}
          <Link href="/#join" onClick={() => setOpen(false)} className="btn btn-primary mt-4">
            Get involved
          </Link>
        </nav>
      )}
    </header>
  );
}
