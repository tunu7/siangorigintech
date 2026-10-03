import { Reveal } from "./motion";
import { Container, Eyebrow, TextLink } from "./ui";

export default function AboutPreview() {
  return (
    <section className="border-t border-zinc-200 py-24">
      <Container>
        <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Eyebrow>About us</Eyebrow>

          <div>
            <p className="text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
              We are building a technology company around useful digital
              products, ambitious businesses and ideas worth exploring.
            </p>

            <div className="mt-8">
              <TextLink href="/about">More about us</TextLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
