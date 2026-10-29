"use client";

import { motion, useReducedMotion } from "motion/react";

export type RobotPart = "camera" | "arm" | "board" | "base";
type Layer = RobotPart | "plant" | "detections";

type Props = {
  /** Part to emphasise in the signal colour; the others dim slightly. */
  highlight?: RobotPart | null;
  /** Which layers are drawn (default: all). Hidden layers fade out, used for the assembly roadmap. */
  visible?: Partial<Record<Layer, boolean>>;
  /** When provided, robot parts become focusable buttons. */
  onSelect?: (part: RobotPart) => void;
  className?: string;
};

const PART_LABEL: Record<RobotPart, string> = {
  camera: "Camera and sensing: Perception & Vision team",
  arm: "Arm and chassis: Mechanical Design team",
  board: "Power and electronics: Electrical & Hardware team",
  base: "Drive and navigation: Localization & Control team",
};

const SIGNAL = "var(--color-signal)";
const INK = "#2c3036";
const STEEL = "#5c6470";
const SILVER = "#a8aeb6";
const FOG = "#d9dde2";
const PAPER = "#f7f8f9";

/**
 * The SPAIS concept robot, redrawn as separate layers so pages can highlight
 * a team's part or assemble the machine step by step.
 */
export default function RobotDiagram({ highlight = null, visible = {}, onSelect, className = "" }: Props) {
  const reduced = useReducedMotion();
  const shown = (layer: Layer) => visible[layer] ?? true;
  const dur = reduced ? 0 : 0.45;

  // Shared wrapper for each layer: fade/slide when hidden, dim when another part is highlighted.
  const layer = (name: Layer, offsetY: number) => ({
    initial: false as const,
    animate: {
      opacity: !shown(name) ? 0 : highlight && name !== highlight && name !== "plant" && name !== "detections" ? 0.45 : 1,
      y: shown(name) ? 0 : offsetY,
    },
    transition: { duration: dur, ease: [0.16, 1, 0.3, 1] as const },
  });

  const interactive = (part: RobotPart) =>
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
          style: { pointerEvents: shown(part) ? ("auto" as const) : ("none" as const) },
        }
      : {};

  const on = (part: RobotPart) => highlight === part;
  const accent = (part: RobotPart, base: string) => (on(part) ? SIGNAL : base);

  return (
    <svg
      viewBox="50 70 560 330"
      fill="none"
      className={className}
      role={onSelect ? "group" : "img"}
      aria-label="Concept drawing of the SPAIS modular crop-care robot"
    >
      {/* ground */}
      <ellipse cx="305" cy="356" rx="200" ry="26" fill={INK} opacity=".08" />
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

      {/* base: body, top plate, wheels */}
      <motion.g {...layer("base", 24)} {...interactive("base")}>
        <path className="hit" d="M160 280h300v90H160z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <path d="M172 291 226 264h176l41 23v35l-49 28H212l-40-24v-35Z" fill={FOG} stroke={accent("base", INK)} strokeWidth="1.6" />
        <path d="m172 291 43 25h179l49-29M215 316v34M394 316v34" stroke={accent("base", SILVER)} strokeWidth="1.3" />
        <path d="m203 284 29-13h152l29 14-29 16H233l-30-17Z" fill={PAPER} stroke={SILVER} />
        <g fill={INK} stroke={accent("base", STEEL)} strokeWidth="2">
          <ellipse cx="206" cy="331" rx="24" ry="30" />
          <ellipse cx="374" cy="332" rx="24" ry="30" />
          <ellipse cx="426" cy="306" rx="19" ry="24" />
        </g>
        <g stroke={SILVER} strokeWidth="2">
          <ellipse cx="206" cy="331" rx="11" ry="16" />
          <ellipse cx="374" cy="332" rx="11" ry="16" />
          <ellipse cx="426" cy="306" rx="8" ry="12" />
        </g>
      </motion.g>

      {/* board: electronics on the top plate */}
      <motion.g {...layer("board", -16)} {...interactive("board")}>
        <path className="hit" d="M318 262h80v28h-80z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <path d="m322 281 18-9h50l14 7-18 9h-50l-14-7Z" fill={on("board") ? SIGNAL : "#3d4652"} stroke={accent("board", INK)} strokeWidth="1.2" fillOpacity={on("board") ? 0.35 : 1} />
        <g fill={on("board") ? INK : FOG}>
          <path d="m344 277 7-3h11l-7 3h-11Z" />
          <path d="m366 278 6-3h10l-6 3h-10Z" />
        </g>
        <path d="M335 283h12M352 285h16M372 283h12" stroke={accent("board", SILVER)} strokeWidth="1" />
      </motion.g>

      {/* camera: mast + head */}
      <motion.g {...layer("camera", -20)} {...interactive("camera")}>
        <path className="hit" d="M220 206h46v80h-46z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <path d="M241 282v-50" stroke={STEEL} strokeWidth="5" />
        <rect x="228" y="218" width="29" height="18" rx="5" fill={PAPER} stroke={accent("camera", INK)} strokeWidth="2" />
        <circle cx="248" cy="227" r="4" fill={accent("camera", INK)} />
        {on("camera") && <path d="m257 222 70-32M257 232l74 8" stroke={SIGNAL} strokeWidth="1" strokeDasharray="3 4" />}
      </motion.g>

      {/* arm: mast, links, joints, gripper */}
      <motion.g {...layer("arm", -24)} {...interactive("arm")}>
        <path className="hit" d="M262 120h220v160H262z" fill="transparent" stroke="transparent" strokeWidth="2" />
        <path d="M273 279v-46h35v46" fill={STEEL} stroke={SILVER} strokeWidth="1.5" />
        <ellipse cx="290" cy="277" rx="26" ry="10" fill={SILVER} stroke={FOG} />
        <path d="m289 237 41-89 60 34 43-28" stroke={accent("arm", FOG)} strokeWidth="21" strokeLinejoin="round" strokeLinecap="round" />
        <path d="m289 237 41-89 60 34 43-28" stroke={STEEL} strokeWidth="15" strokeLinejoin="round" strokeLinecap="round" />
        <g fill={PAPER} stroke={accent("arm", SILVER)} strokeWidth="3">
          <circle cx="289" cy="237" r="15" />
          <circle cx="330" cy="148" r="13" />
          <circle cx="390" cy="182" r="11" />
          <circle cx="433" cy="154" r="8" />
        </g>
        <path d="m438 150 21-14 12 8-8 19-19-2M459 136l13-9M463 163l14 3" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </motion.g>

      {/* detections: a sign of disease the robot spots on a leaf */}
      <motion.g {...layer("detections", 0)}>
        <g stroke={SIGNAL} strokeWidth="2.5">
          <path d="M470 130v-10h10M560 120h10v10M570 160v10h-10M480 170h-10v-10" />
        </g>
        <rect x="470" y="120" width="100" height="50" stroke={SIGNAL} strokeOpacity=".35" />
        <rect x="470" y="104" width="104" height="16" fill={SIGNAL} />
        <text x="475" y="115.5" fontFamily="var(--font-jetbrains), monospace" fontSize="10" fill="#000">
          leaf_spot 0.91
        </text>
      </motion.g>
    </svg>
  );
}
