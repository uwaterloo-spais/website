"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Detection } from "@/lib/detections";

/**
 * The site's signature: a photo seen through the robot's eye.
 *
 * Boxes are positioned in percentages of the image, so the frame always keeps
 * the photo's own aspect ratio (no cropping) to stay aligned.
 *
 * mode:
 *  - "scan":  a scan line sweeps once when the frame enters view, and each
 *             box locks on as the line passes it. Use for one hero moment.
 *  - "hover": boxes appear while the frame is hovered or focused.
 *  - "static": boxes always shown, no motion.
 */
type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  detections: Detection[];
  mode?: "scan" | "hover" | "static";
  /** Force boxes visible (e.g. a parent card is hovered). */
  active?: boolean;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

const SCAN_SECONDS = 1.6;

export default function VisionFrame({
  src,
  alt,
  width,
  height,
  detections,
  mode = "hover",
  active,
  priority,
  className = "",
  imgClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const scanning = mode === "scan" && inView && !reduced;
  const visible =
    mode === "static" ||
    (mode === "scan" && (inView || reduced)) ||
    (mode === "hover" && (hovered || active));

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-graphite ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized WebP */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />

      {scanning && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-24 -translate-y-1/2 bg-gradient-to-b from-transparent via-signal/25 to-transparent"
          initial={{ top: "0%", opacity: 1 }}
          animate={{ top: "100%", opacity: [1, 1, 0] }}
          transition={{ duration: SCAN_SECONDS, ease: "linear", times: [0, 0.9, 1] }}
        >
          <div className="absolute inset-x-0 top-1/2 h-px bg-signal/80" />
        </motion.div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {detections.map((d, i) => {
          const [x, y, w, h] = d.box;
          // In scan mode a box locks on when the line reaches its top edge.
          const delay = mode === "scan" && !reduced ? (y / 100) * SCAN_SECONDS + 0.1 : i * 0.04;
          return (
            <motion.div
              key={`${d.label}-${i}`}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
              initial={false}
              animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.35, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <Box label={d.label} score={d.score} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Box({ label, score }: { label: string; score: number }) {
  const corner = "absolute size-3 border-signal";
  return (
    <>
      <div className="absolute inset-0 border border-signal/35" />
      <span className={`${corner} -left-px -top-px border-l-2 border-t-2`} />
      <span className={`${corner} -right-px -top-px border-r-2 border-t-2`} />
      <span className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} />
      <span className={`${corner} -bottom-px -right-px border-b-2 border-r-2`} />
      <span className="readout absolute -top-px left-0 -translate-y-full whitespace-nowrap bg-signal px-1.5 py-1 text-black">
        {label} {score.toFixed(2)}
      </span>
    </>
  );
}
