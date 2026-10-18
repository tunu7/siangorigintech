import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { Container, SectionHeading } from "./ui";

export default async function Process() {
  const home = await getContent("home");

  if (!home.steps.length) return null;

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={home.processEyebrow} title={home.processTitle} />
        </Reveal>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {home.steps.map((step, index) => (
            <Reveal as="li" key={index} delay={index * 100}>
              {/* A rising line per step: each one a little taller. */}
              <div className="flex h-24 items-end">
                <span
                  className="w-px bg-linear-to-t from-brand to-lime"
                  style={{ height: `${25 + index * 25}%` }}
                />
                <span className="font-display ml-4 text-5xl leading-none text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display mt-8 text-3xl">{step.title}</h3>
              <p className="mt-3 leading-7 text-ink-soft">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
