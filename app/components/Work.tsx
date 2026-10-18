import { getContent } from "@/lib/content";
import { listPublishedProjects } from "@/lib/projects";
import ProjectGrid from "./ProjectGrid";
import { Reveal } from "./motion";
import { Container, SectionHeading, TextLink } from "./ui";

export default async function Work() {
  const [home, projects] = await Promise.all([
    getContent("home"),
    listPublishedProjects({ featuredOnly: true }),
  ]);

  if (!projects.length) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal className="mb-14">
          <SectionHeading eyebrow={home.workEyebrow} title={home.workTitle}>
            <TextLink href="/work">{home.workLink}</TextLink>
          </SectionHeading>
        </Reveal>

        <ProjectGrid projects={projects} />
      </Container>
    </section>
  );
}
