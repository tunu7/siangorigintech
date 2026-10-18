import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { Container, Eyebrow, TextLink } from "./ui";

// Reasons to choose the studio, opened by the short studio introduction.
export default async function WhyUs() {
  const home = await getContent("home");

  return (
    <section className="border-t border-line py-28 sm:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>{home.whyEyebrow}</Eyebrow>
            <h2 className="font-display mt-5 text-4xl text-balance sm:text-6xl">
              {home.whyTitle}
            </h2>
            {home.aboutText && (
              <p className="mt-6 max-w-md text-lg leading-8 text-ink-soft">
                {home.aboutText}
              </p>
            )}
            {home.aboutLink && (
              <div className="mt-8">
                <TextLink href="/about">{home.aboutLink}</TextLink>
              </div>
            )}
          </Reveal>

          {home.reasons.length > 0 && (
            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {home.reasons.map((reason, index) => (
                <Reveal
                  as="li"
                  key={index}
                  delay={(index % 2) * 100}
                  className="border-t border-line-strong pt-6"
                >
                  <p className="text-xs tabular-nums text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display mt-4 text-2xl sm:text-3xl">
                    {reason.title}
                  </h3>
                  <p className="mt-3 leading-7 text-ink-soft">
                    {reason.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
