import { getContent } from "@/lib/content";
import { splitItems } from "@/lib/content-schema";
import { Reveal } from "./motion";
import { Container, SectionHeading } from "./ui";

export default async function Audiences() {
  const home = await getContent("home");

  if (!home.audiences.length) return null;

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={home.audienceEyebrow} title={home.audienceTitle} />
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-16">
          {home.audiences.map((audience, index) => (
            <Reveal
              key={index}
              delay={index * 100}
              className="border-t border-ink pt-8"
            >
              <p className="text-xs tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display mt-4 text-4xl">{audience.title}</h3>
              <p className="mt-4 max-w-lg leading-7 text-ink-soft">
                {audience.description}
              </p>
              <ul className="mt-8 space-y-2.5">
                {splitItems(audience.items).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="h-px w-4 bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
