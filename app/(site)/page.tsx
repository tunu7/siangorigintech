import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Audiences from "@/app/components/Audiences";
import Services from "@/app/components/Services";
import Goals from "@/app/components/Goals";
import Work from "@/app/components/Work";
import Process from "@/app/components/Process";
import WhyUs from "@/app/components/WhyUs";
import Faq from "@/app/components/Faq";
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
      <Audiences />
      <Services />
      <Goals />
      <Work />
      <Process />
      <WhyUs />
      <Faq />
      <ContactCTA />
    </>
  );
}
