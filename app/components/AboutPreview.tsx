import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { Container, Eyebrow, TextLink } from "./ui";

export default async function AboutPreview() {
  const home = await getContent("home");

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-12">
          <Eyebrow index={3}>{home.aboutEyebrow}</Eyebrow>

          <div>
            <p className="font-display text-4xl leading-[1.12] text-balance sm:text-5xl">
              {home.aboutText}
            </p>

            <div className="mt-10">
              <TextLink href="/about">{home.aboutLink}</TextLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
