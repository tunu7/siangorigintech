import "server-only";

import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const ORGANIZATION_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

// Metadata for a public page. Child `openGraph` replaces the parent's
// object wholesale, so every page restates the shared Open Graph fields.
// Without a `path` (the layout) no canonical URL is set, so pages that
// don't declare one never inherit the wrong canonical.
export async function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title?: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Promise<Metadata> {
  const site = await getContent("settings");
  const fullTitle = title
    ? `${title} — ${site.shortName}`
    : site.tagline
      ? `${site.name} — ${site.tagline}`
      : site.name;

  return {
    ...(title && { title }),
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      type,
      ...(path && { url: path }),
      siteName: site.name,
      locale: "en_IN",
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

// Structured data for search engines. `<` is escaped so editable text can
// never close the script tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data })
          .replace(/</g, "\\u003c"),
      }}
    />
  );
}

export async function organizationJsonLd() {
  const site = await getContent("settings");
  const [locality, region] = site.location.split(",").map((s) => s.trim());

  return {
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/apple-icon.png"),
          width: 180,
          height: 180,
        },
        description: site.metaDescription,
        email: site.contactEmail,
        ...(locality && {
          address: {
            "@type": "PostalAddress",
            addressLocality: locality,
            ...(region && { addressRegion: region }),
            addressCountry: "IN",
          },
        }),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: site.contactEmail,
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            contactType: "recruitment",
            email: site.careersEmail,
          },
        ],
        ...(site.socialProfiles.length > 0 && {
          sameAs: site.socialProfiles,
        }),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        inLanguage: "en-IN",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })
    ),
  };
}

// A page's own entity (AboutPage, ContactPage, …) tied to the site graph.
export function webPageJsonLd({
  type = "WebPage",
  name,
  description,
  path,
  breadcrumb,
}: {
  type?: string;
  name: string;
  description: string;
  path: string;
  breadcrumb: { name: string; path: string }[];
}) {
  return {
    "@graph": [
      {
        "@type": type,
        "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path),
        name,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
      },
      breadcrumbJsonLd(breadcrumb),
    ],
  };
}

export { ORGANIZATION_ID };
