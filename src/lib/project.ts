// The four stages of our approach, and where the first project is in them.
// To update the status tracker on /project/, change `status` here (and
// `updated`); the tracker and the approach timeline both read from this list.

export type StageStatus = "Done" | "In progress" | "Up next" | "Planned";

export const stages: { name: string; body: string; status: StageStatus }[] = [
  {
    name: "User research",
    body: "Listen to users, observe their workflows, and understand the challenges that matter to them.",
    status: "Done",
  },
  {
    name: "Product definition",
    body: "Select a specific problem to address and define the use case, requirements, and measures of success.",
    status: "In progress",
  },
  {
    name: "Core function validation",
    body: "Build and test the key functions needed to meet those requirements.",
    status: "Up next",
  },
  {
    name: "Prototype development",
    body: "Integrate the validated functions into a prototype and evaluate it in realistic conditions.",
    status: "Planned",
  },
];

export const updated = { label: "October 2026", date: "2026-10" };
