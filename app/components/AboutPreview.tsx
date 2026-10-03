import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { Container, Eyebrow, TextLink } from "./ui";

export default async function AboutPreview() {
  const home = await getContent("home");

  return (
    <section className="border-t border-zinc-200 py-24">
      <Container>
        <Reveal className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <Eyebrow>{home.aboutEyebrow}</Eyebrow>

          <div>
            <p className="text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
              {home.aboutText}
            </p>

            <div className="mt-8">
              <TextLink href="/about">{home.aboutLink}</TextLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
