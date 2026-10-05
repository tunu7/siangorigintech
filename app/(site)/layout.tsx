import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getContent } from "@/lib/content";
import { JsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";

// Public pages are static. Admin saves refresh them instantly; this hourly
// refresh is a safety net for database changes made outside the admin.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getContent("settings");
  const verification = {
    ...(site.googleVerification && { google: site.googleVerification }),
    ...(site.bingVerification && {
      other: { "msvalidate.01": site.bingVerification },
    }),
  };

  const base = await pageMetadata({ description: site.metaDescription });

  return {
    ...base,
    title: {
      // Absolute so the root layout's template isn't applied to it.
      absolute: base.openGraph?.title as string,
      template: `%s — ${site.shortName}`,
    },
    applicationName: site.name,
    keywords: site.keywords,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification,
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ shortName, navCta, navCtaHref, nav }, organization] =
    await Promise.all([getContent("settings"), organizationJsonLd()]);

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={organization} />
      <Navbar brand={{ shortName, navCta, navCtaHref, nav }} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
