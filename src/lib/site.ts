// Single source of truth for links, contact details, and team copy.
export const site = {
  name: "SPAIS",
  fullName: "Sustainable Physical AI Society",
  university: "University of Waterloo",
  url: "https://uwaterloo-spais.github.io/website",
  description:
    "The Sustainable Physical AI Society is a student-led community at the University of Waterloo. Learn, build, and explore robotics for a sustainable future.",
  email: "uwspais@gmail.com",
  links: {
    discord: "https://discord.gg/Pk7Rc78k5D",
    instagram: "https://www.instagram.com/uwspais/",
    linkedin: "https://www.linkedin.com/company/sustainable-physical-ai-society/",
    github: "https://github.com/uwaterloo-spais",
  },
};

const mail = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const mailto = {
  growers: mail(
    "Farm collaboration with SPAIS",
    "Hello SPAIS,\n\nI'd like to discuss a farm visit or collaboration.\n\nFarm name: \nLocation: \nCrops: \n\nThank you!",
  ),
  partners: mail(
    "Supporting the SPAIS team",
    "Hello SPAIS,\n\nI'd like to discuss mentorship, equipment, or project support.\n\nOrganization: \nHow we could help: \n\nThank you!",
  ),
};

/**
 * Prefix a file in public/ with the base path. next/link adds the base path
 * to links automatically, but plain <img src> and CSS urls do not.
 */
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${path.replace(/^\//, "")}`;

/** Photo in public/photos, by name (e.g. "farm-2"). 1600 is the largest version, up to 1600px wide. */
export const photo = (name: string, size: 800 | 1600 = 800) =>
  asset(`photos/${name}-${size}.webp`);

export type TeamPart = "camera" | "arm" | "board" | "base";

export const teams = [
  {
    id: "mechanical",
    name: "Mechanical Design",
    part: "arm" as TeamPart,
    partLabel: "Arm & chassis",
    short: "Give our ideas a physical form.",
    body: "Help develop the mobile platform, mechanisms, and task tools. Explore how real-world conditions translate into practical design decisions.",
    tags: ["CAD", "Mechanisms", "Prototyping", "Fabrication"],
  },
  {
    id: "hardware",
    name: "Electrical & Hardware",
    part: "board" as TeamPart,
    partLabel: "Power & electronics",
    short: "Connect sensing, power, and motion.",
    body: "Work on power distribution, motor interfaces, embedded systems, and sensor integration. Turn individual components into a dependable platform.",
    tags: ["Electronics", "Embedded systems", "Motor control"],
  },
  {
    id: "perception",
    name: "Perception & Vision",
    part: "camera" as TeamPart,
    partLabel: "Camera & sensing",
    short: "Help the robot understand its surroundings.",
    body: "Explore camera systems, data collection, and visual understanding. Study how a robot can recognise what matters to its task in changing conditions.",
    tags: ["Computer vision", "AI", "Datasets", "3D sensing"],
  },
  {
    id: "controls",
    name: "Localization & Control",
    part: "base" as TeamPart,
    partLabel: "Drive & navigation",
    short: "Turn perception into purposeful movement.",
    body: "Explore mapping, state estimation, planning, and motion control. Connect simulation and physical tests to help the platform move reliably.",
    tags: ["ROS 2", "SLAM", "Control", "Simulation"],
  },
];
