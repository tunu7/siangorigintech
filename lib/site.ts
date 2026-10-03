export const site = {
  name: "Siang Origin Technologies",
  shortName: "Siang Origin",
  tagline: "Technology · Growth · AI",
  location: "Itanagar, Arunachal Pradesh",
  contactEmail: "hello@siangorigin.com",
  careersEmail: "careers@siangorigin.com",
};

export const navLinks = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

// Absolute base URL for links in emails.
export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  );
}
