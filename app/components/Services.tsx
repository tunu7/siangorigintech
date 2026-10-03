import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { Container, Eyebrow } from "./ui";

export default async function Services() {
  const home = await getContent("home");

  if (!home.services.length) return null;

  return (
    <section className="bg-paper-deep py-24 sm:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow index={2}>{home.servicesEyebrow}</Eyebrow>
          <h2 className="font-display mt-5 text-4xl text-balance sm:text-5xl">
            {home.servicesTitle}
          </h2>
        </Reveal>

        <ol className="mt-16 grid border-t border-line-strong md:grid-cols-3">
          {home.services.map((service, index) => (
            <Reveal
              as="li"
              key={index}
              delay={index * 100}
              className="border-b border-line-strong py-10 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <span className="text-xs tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-8 text-3xl">{service.title}</h3>
              <p className="mt-4 leading-7 text-ink-soft">
                {service.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
