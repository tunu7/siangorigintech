import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import ProjectGrid from "@/app/components/ProjectGrid";
import { Container, PageBackdrop, PageHeader } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work by Siang Origin Technologies.",
};

export default function WorkPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="py-24">
        <PageHeader
          eyebrow="Our work"
          title="Built for the real world"
          description="Digital products, platforms and experiences designed to solve real problems and create meaningful business outcomes."
        />

        <div className="mt-16">
          <ProjectGrid />
        </div>
      </Container>

      <ContactCTA />
    </div>
  );
}
