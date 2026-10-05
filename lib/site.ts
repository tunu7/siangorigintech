// Company details, navigation and page text are edited in /admin/content
// (lib/content-schema.ts).

// The primary domain. Vercel redirects the apex domain here, so canonical
// URLs, the sitemap and social previews must all use it.
const PRODUCTION_URL = "https://www.siangorigintechnologies.com";

// Absolute base URL for canonical links, the sitemap and emails.
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;

  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl()).toString();
}
