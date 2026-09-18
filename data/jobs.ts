export type Job = {
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
};

export const jobs: Job[] = [
  {
    slug: "marketing-manager",

    title: "Marketing Manager",

    department: "Marketing",

    type: "Full-time",

    location: "Itanagar / Hybrid",

    experience: "2–5 years",

    salary: "₹22,000–₹30,000/month",

    description:
      "Own the digital marketing workflow for our clients and turn business goals into clear, measurable growth strategies.",

    responsibilities: [
      "Develop marketing strategies and campaigns for clients.",
      "Create and manage content calendars.",
      "Coordinate with the production team to execute campaigns.",
      "Manage social media, SEO and paid advertising activities.",
      "Track campaign performance and identify opportunities for improvement.",
      "Communicate with clients and maintain strong working relationships.",
    ],

    requirements: [
      "2–5 years of experience in digital marketing.",
      "Strong understanding of social media marketing.",
      "Working knowledge of Meta Ads and Google Ads.",
      "Ability to create and execute marketing strategies.",
      "Strong communication and project management skills.",
      "Ability to work independently and take ownership.",
    ],

    benefits: [
      "Work directly with the founding team.",
      "Exposure to technology, AI and automation.",
      "Work across multiple industries and businesses.",
      "Opportunity to grow with an early-stage technology company.",
    ],
  },

  // Add future jobs here
  // {
  //   slug: "production-lead",
  //   title: "Production Lead",
  //   department: "Production",
  //   type: "Full-time",
  //   location: "Itanagar / Hybrid",
  //   experience: "1–3 years",
  //   description: "...",
  //   responsibilities: [],
  //   requirements: [],
  // },
];

export function getJobBySlug(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
