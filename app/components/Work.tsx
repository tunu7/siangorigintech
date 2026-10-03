import ProjectList from "./ProjectList";
import { Container, Eyebrow, TextLink } from "./ui";

export default function Work() {
  return (
    <section className="border-t border-zinc-200 py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Things we&apos;ve built
            </h2>
          </div>

          <TextLink href="/work">All work</TextLink>
        </div>

        <ProjectList />
      </Container>
    </section>
  );
}
