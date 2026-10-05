import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments are never indexed (Vercel also sends noindex).
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/login", "/dashboard"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl(),
  };
}
