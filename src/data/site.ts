// Single source of truth for links and contact details used across the site.
export const site = {
  name: 'SPAIS',
  fullName: 'Sustainable Physical AI Society',
  university: 'University of Waterloo',
  tagline: 'Bringing AI into the real world, for a sustainable future.',
  description:
    'The Sustainable Physical AI Society is a student-led community at the University of Waterloo. Learn, build, and explore robotics for a sustainable future.',
  email: 'uwspais@gmail.com',
  links: {
    discord: 'https://discord.gg/Pk7Rc78k5D',
    instagram: 'https://www.instagram.com/uwspais/',
    linkedin: 'https://www.linkedin.com/company/sustainable-physical-ai-society/',
    github: 'https://github.com/uwaterloo-spais',
  },
};

const mail = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const mailto = {
  growers: mail(
    'Farm collaboration with SPAIS',
    "Hello SPAIS,\n\nI'd like to discuss a farm visit or collaboration.\n\nFarm name: \nLocation: \nCrops: \n\nThank you!",
  ),
  partners: mail(
    'Supporting the SPAIS team',
    "Hello SPAIS,\n\nI'd like to discuss mentorship, equipment, or project support.\n\nOrganization: \nHow we could help: \n\nThank you!",
  ),
};

/** Prefix an internal path with the configured base (e.g. /website). */
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
};

export const teams = [
  {
    id: 'mechanical',
    name: 'Mechanical Design',
    short: 'Give our ideas a physical form.',
    body: 'Help develop the mobile platform, mechanisms, and task tools. Explore how real farm conditions translate into practical design decisions.',
    tags: ['CAD', 'Mechanisms', 'Prototyping', 'Fabrication'],
    cta: 'Build with the mechanical team',
    icon: 'cube',
  },
  {
    id: 'hardware',
    name: 'Electrical & Hardware',
    short: 'Connect sensing, power, and motion.',
    body: 'Work on power distribution, motor interfaces, embedded systems, and sensor integration. Turn individual components into a dependable platform.',
    tags: ['Electronics', 'Embedded systems', 'Motor control'],
    cta: 'Build with the hardware team',
    icon: 'chip',
  },
  {
    id: 'perception',
    name: 'Perception & Vision',
    short: 'Help the robot understand its surroundings.',
    body: 'Explore camera systems, data collection, and visual understanding. Study how a robot can recognise relevant crop features in changing conditions.',
    tags: ['Computer vision', 'AI', 'Datasets', '3D sensing'],
    cta: 'Build with the perception team',
    icon: 'eye',
  },
  {
    id: 'controls',
    name: 'Localization & Control',
    short: 'Turn perception into purposeful movement.',
    body: 'Explore mapping, state estimation, planning, and motion control. Connect simulation and physical tests to help the platform move reliably.',
    tags: ['ROS 2', 'SLAM', 'Control', 'Simulation'],
    cta: 'Build with the controls team',
    icon: 'nav',
  },
] as const;
