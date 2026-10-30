"use client";

import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/site";

export type RobotPart = "camera" | "arm" | "board" | "base";
type Layer = RobotPart | "plant";

type Props = {
  /** Part to emphasise in the signal colour; the others dim slightly. */
  highlight?: RobotPart | null;
  /** Which layers are drawn (default: all). Hidden layers fade out, used for the approach timeline. */
  visible?: Partial<Record<Layer, boolean>>;
  /** When provided, robot parts become focusable buttons. */
  onSelect?: (part: RobotPart) => void;
  className?: string;
};

const PART_LABEL: Record<RobotPart, string> = {
  camera: "Camera and sensing: Perception and Vision team",
  arm: "Arm and chassis: Mechanical Design team",
  board: "Power and electronics: Electrical and Hardware team",
  base: "Drive and navigation: Localization and Control team",
};

const SIGNAL = "var(--color-signal)";
const INK = "#2c3036";
const STEEL = "#5c6470";
const SILVER = "#a8aeb6";
const FOG = "#d9dde2";
const PAPER = "#f7f8f9";

// Wheel centres in side view; the far-side pair sits up and to the right.
const WHEELS = [205, 405];
const FAR = { dx: 14, dy: -8 };
const ALL_PARTS: RobotPart[] = ["arm", "base", "board", "camera"];

/**
 * The SPAIS concept robot: a rugged four-wheel field platform with an arm,
 * drawn in side view (front to the right) as separate layers so pages can
 * highlight a team's part or assemble the machine step by step.
 */
export default function RobotDiagram({ highlight = null, visible = {}, onSelect, className = "" }: Props) {
  const reduced = useReducedMotion();
  const shown = (layer: Layer) => visible[layer] ?? true;
  const dur = reduced ? 0 : 0.45;

  // Shared wrapper for each layer: fade/slide when hidden, dim unless one of
  // the parts it belongs to is highlighted. The chassis belongs to the
  // Mechanical team, so it lights up with the arm.
  const layer = (name: Layer, offsetY: number, litBy: RobotPart[] = name === "plant" ? [] : [name]) => ({
    initial: false as const,
    animate: {
      opacity: !shown(name) ? 0 : highlight && name !== "plant" && !litBy.includes(highlight) ? 0.45 : 1,
      y: shown(name) ? 0 : offsetY,
    },
    transition: { duration: dur, ease: [0.16, 1, 0.3, 1] as const },
  });

  const interactive = (part: RobotPart, layerName: Layer = part) =>
    onSelect
      ? {
          role: "button",
          tabIndex: 0,
          "aria-label": PART_LABEL[part],
          "aria-pressed": highlight === part,
          onClick: () => onSelect(part),
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(part);
            }
          },
          className: "cursor-pointer outline-none [&:focus-visible_.hit]:stroke-[var(--color-signal)]",
          style: { pointerEvents: shown(layerName) ? ("auto" as const) : ("none" as const) },
        }
      : {};

  const on = (part: RobotPart) => highlight === part;
  const accent = (part: RobotPart, base: string) => (on(part) ? SIGNAL : base);

  const wheel = (cx: number, cy: number, far: boolean) => (
    <g key={`${cx}-${far}`}>
      <circle cx={cx} cy={cy} r="40" fill={far ? STEEL : INK} stroke={accent("base", far ? STEEL : INK)} strokeWidth="2" />
      {/* tread lugs */}
      <circle cx={cx} cy={cy} r="36" stroke={far ? "#737b86" : "#4a5059"} strokeWidth="6" strokeDasharray="6 5.3" />
      <circle cx={cx} cy={cy} r="17" fill={far ? SILVER : FOG} stroke={accent("base", SILVER)} strokeWidth="2" />
      <circle cx={cx} cy={cy} r="5" fill={far ? STEEL : INK} />
    </g>
  );

  return (
    <svg
      viewBox="50 90 560 300"
      fill="none"
      className={className}
      role={onSelect ? "group" : "img"}
      aria-label="Concept drawing of the SPAIS field robot: a four-wheel platform with an arm, a front camera, and electronics on its deck"
    >
      {/* ground */}
      <ellipse cx="305" cy="354" rx="200" ry="10" fill={INK} opacity=".08" />
      <path d="M60 352h530" stroke={SILVER} strokeDasharray="4 6" />

      {/* plant */}
      <motion.g {...layer("plant", 0)}>
        <path
          d="M524 349V104M520 158c-27-36-59-22-42 1 12 14 32 11 42-1Zm4 52c24-37 55-24 41-1-12 15-32 11-41 1Zm-2 50c-28-33-57-18-40 4 13 12 30 8 40-4Z"
          stroke={STEEL}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="m525 227 15 15 9 18" stroke={STEEL} strokeWidth="2" />
        <g fill={SILVER}>
          <circle cx="541" cy="250" r="9" />
          <circle cx="551" cy="270" r="8" />
          <circle cx="536" cy="285" r="9" />
        </g>
      </motion.g>

      {/* drive, far side: drawn behind the chassis */}
      <motion.g {...layer("base", 24)} {...interactive("base")}>
        {WHEELS.map((x) => wheel(x + FAR.dx, 312 + FAR.dy, true))}
      </motion.g>

      {/* Opaque backings, never dimmed, so a dimmed part doesn't show what's behind it. */}
      <motion.g {...layer("base", 24, ALL_PARTS)} aria-hidden>
        <rect x="168" y="262" width="274" height="54" rx="5" fill="#fff" />
        <rect x="174" y="253" width="262" height="9" rx="2" fill="#fff" />
      </motion.g>

      {/* chassis: body, deck, bumpers, logo (Mechanical Design, with the arm) */}
      <motion.g {...layer("base", 24, ["arm"])} {...interactive("arm", "base")}>
        <path className="hit" d="M146 248h318v76H146z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <rect x="168" y="262" width="274" height="54" rx="5" fill={FOG} stroke={accent("arm", INK)} strokeWidth="1.8" />
        <path d="M176 304h258" stroke={accent("arm", SILVER)} strokeWidth="1.3" />
        <rect x="174" y="253" width="262" height="9" rx="2" fill={INK} />
        <path d="M184 253v-7M426 253v-7M184 246h242" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        {/* bumpers */}
        <path d="M442 293h14a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6h-14" stroke={accent("arm", INK)} strokeWidth="5" strokeLinejoin="round" />
        <path d="M168 293h-14a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h14" stroke={accent("arm", INK)} strokeWidth="5" strokeLinejoin="round" />
        <image href={asset("brand/spais-wordmark-black.png")} x="262" y="276" width="86" height="13.7" />
      </motion.g>

      <motion.g {...layer("base", 24, ALL_PARTS)} aria-hidden>
        {WHEELS.map((x) => (
          <circle key={x} cx={x} cy="312" r="41" fill="#fff" />
        ))}
      </motion.g>

      {/* drive, near side: in front of the chassis */}
      <motion.g {...layer("base", 24)} {...interactive("base")}>
        <path className="hit" d="M160 268h290v88H160z" fill="transparent" stroke="transparent" strokeWidth="2" />
        {WHEELS.map((x) => wheel(x, 312, false))}
        {on("base") && (
          <path d="M200 372h222m-10-6 10 6-10 6" stroke={SIGNAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </motion.g>

      {/* board: electronics enclosure on the deck */}
      <motion.g {...layer("board", -16)} {...interactive("board")}>
        <path className="hit" d="M296 226h100v28H296z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <rect
          x="302"
          y="232"
          width="86"
          height="21"
          rx="3"
          fill={on("board") ? SIGNAL : "#3d4652"}
          fillOpacity={on("board") ? 0.35 : 1}
          stroke={accent("board", INK)}
          strokeWidth="1.4"
        />
        <g fill={on("board") ? INK : FOG}>
          <rect x="312" y="238" width="14" height="5" rx="1" />
          <rect x="332" y="238" width="10" height="5" rx="1" />
        </g>
        <circle cx="374" cy="241" r="2.5" fill={on("board") ? INK : SIGNAL} />
        <path d="M312 248h48" stroke={accent("board", SILVER)} strokeWidth="1" />
      </motion.g>

      {/* camera: mast + head at the front, looking ahead */}
      <motion.g {...layer("camera", -20)} {...interactive("camera")}>
        <path className="hit" d="M400 190h48v64h-48z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <path d="M418 253v-36" stroke={STEEL} strokeWidth="5" />
        <rect x="404" y="198" width="34" height="19" rx="5" fill={PAPER} stroke={accent("camera", INK)} strokeWidth="2" />
        <circle cx="430" cy="207.5" r="4.5" fill={accent("camera", INK)} />
        {on("camera") && <path d="m438 203 76-30M438 212l78 64" stroke={SIGNAL} strokeWidth="1" strokeDasharray="3 4" />}
      </motion.g>

      {/* arm: turret, links, joints, gripper */}
      <motion.g {...layer("arm", -24)} {...interactive("arm")}>
        <path className="hit" d="M226 120h256v134H226z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <path d="M234 253v-22h32v22" fill={STEEL} stroke={SILVER} strokeWidth="1.5" />
        <path d="m250 228 50-82 80 34 53-26" stroke={accent("arm", FOG)} strokeWidth="21" strokeLinejoin="round" strokeLinecap="round" />
        <path d="m250 228 50-82 80 34 53-26" stroke={STEEL} strokeWidth="15" strokeLinejoin="round" strokeLinecap="round" />
        <g fill={PAPER} stroke={accent("arm", SILVER)} strokeWidth="3">
          <circle cx="250" cy="228" r="15" />
          <circle cx="300" cy="146" r="13" />
          <circle cx="380" cy="180" r="11" />
          <circle cx="433" cy="154" r="8" />
        </g>
        <path d="m438 150 21-14 12 8-8 19-19-2M459 136l13-9M463 163l14 3" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
