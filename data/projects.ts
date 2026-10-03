export type Project = {
  title: string;
  /** Two-letter monogram shown on the project cover. */
  mark: string;
  category: string;
  description: string;
};

export const projects: Project[] = [
  {
    title: "TP Cakes & Bakes",
    mark: "TP",
    category: "Digital Experience",
    description: "A digital platform for a growing baking academy.",
  },
  {
    title: "Arunachal Rents",
    mark: "AR",
    category: "Digital Product",
    description:
      "A rental discovery platform built for Arunachal Pradesh.",
  },
  {
    title: "Himverse.ai",
    mark: "HV",
    category: "AI Product",
    description:
      "An intelligent travel platform for exploring the Himalayas.",
  },
];
