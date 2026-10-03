import { getContent } from "@/lib/content";
import { listPublishedProjects } from "@/lib/projects";
import ProjectGrid from "./ProjectGrid";
import { Reveal } from "./motion";
import { Container, Eyebrow, TextLink } from "./ui";

export default async function Work() {
  const [home, projects] = await Promise.all([
    getContent("home"),
    listPublishedProjects({ featuredOnly: true }),
  ]);

  if (!projects.length) return null;

  return (
    <section className="py-24">
      <Container>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{home.workEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {home.workTitle}
            </h2>
          </div>

          <TextLink href="/work">{home.workLink}</TextLink>
        </Reveal>

        <ProjectGrid projects={projects} />
      </Container>
    </section>
  );
}
