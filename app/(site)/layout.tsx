import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getContent("settings");

  return {
    title: {
      default: site.name,
      template: `%s — ${site.shortName}`,
    },
    description: site.metaDescription,
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { shortName, logoMark, navCta, navCtaHref, nav } =
    await getContent("settings");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar brand={{ shortName, logoMark, navCta, navCtaHref, nav }} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
