"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function CopyEmail() {
  const [status, setStatus] = useState("");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("Email copied");
    } catch {
      setStatus(`Email: ${site.email}`);
    }
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[17px]">
      <a href={`mailto:${site.email}`} className="font-medium underline-offset-4 hover:underline">
        {site.email}
      </a>
      <button type="button" onClick={copy} className="text-[15px] text-steel underline underline-offset-4 hover:text-black">
        Copy email
      </button>
      <span role="status" aria-live="polite" className="text-[15px] text-steel">
        {status}
      </span>
    </p>
  );
}
