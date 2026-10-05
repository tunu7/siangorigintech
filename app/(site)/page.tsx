import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Work from "@/app/components/Work";
import Services from "@/app/components/Services";
import AboutPreview from "@/app/components/AboutPreview";
import ContactCTA from "@/app/components/ContactCTA";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getContent("settings");
  return pageMetadata({ description: site.metaDescription, path: "/" });
}

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
