import Hero from "@/app/components/Hero";
import Work from "@/app/components/Work";
import Services from "@/app/components/Services";
import AboutPreview from "@/app/components/AboutPreview";
import ContactCTA from "@/app/components/ContactCTA";

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