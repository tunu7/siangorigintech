import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import ProjectGrid from "@/app/components/ProjectGrid";
import { Container, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { listPublishedProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const work = await getContent("work");
  return { title: "Work", description: work.metaDescription };
}

export default async function WorkPage() {
  const [work, projects] = await Promise.all([
    getContent("work"),
    listPublishedProjects(),
  ]);

  return (
    <>
      <Container>
        <PageHeader
          eyebrow={work.eyebrow}
          title={work.title}
          description={work.intro}
        />

        <div className="py-16 sm:py-24">
          <ProjectGrid projects={projects} />
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
