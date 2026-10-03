import { site } from "@/lib/site";
import { ButtonLink, Container, Eyebrow } from "./ui";

export default function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{site.tagline}</Eyebrow>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            We build digital products that move businesses forward.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Siang Origin Technologies is a technology studio building
            digital experiences, growth systems and intelligent products.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Start a project
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              View our work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
