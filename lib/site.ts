// Company details, navigation and page text are edited in /admin/content
// (lib/content-schema.ts).

// Absolute base URL for links in emails.
export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  );
}
