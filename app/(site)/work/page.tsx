import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import ProjectList from "@/app/components/ProjectList";
import { Container, PageHeader } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected work by Siang Origin Technologies.",
};

export default function WorkPage() {
  return (
    <>
      <Container className="py-24">
        <PageHeader
          eyebrow="Our work"
          title="Built for the real world"
          description="Digital products, platforms and experiences designed to solve real problems and create meaningful business outcomes."
        />

        <div className="mt-16">
          <ProjectList />
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
