import ProjectGrid from "./ProjectGrid";
import { Reveal } from "./motion";
import { Container, Eyebrow, TextLink } from "./ui";

export default function Work() {
  return (
    <section className="py-24">
      <Container>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Things we&apos;ve built
            </h2>
          </div>

          <TextLink href="/work">All work</TextLink>
        </Reveal>

        <ProjectGrid />
      </Container>
    </section>
  );
}
