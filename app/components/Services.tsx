import { getContent } from "@/lib/content";
import { servicesByPillar } from "@/lib/content-schema";
import ServiceCard from "./ServiceCard";
import { Reveal } from "./motion";
import { Container, SectionHeading, TextLink } from "./ui";

export default async function Services() {
  const [home, services] = await Promise.all([
    getContent("home"),
    getContent("services"),
  ]);

  const pillars = servicesByPillar(services);

  if (!pillars.length) return null;

  return (
    <section className="bg-paper-deep py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={home.servicesEyebrow}
            title={home.servicesTitle}
            text={home.servicesText}
          >
            <TextLink href="/services">{home.servicesLink}</TextLink>
          </SectionHeading>
        </Reveal>

        <div className="mt-16 space-y-14">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.key}
              className="grid gap-6 border-t border-line-strong pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-10"
            >
              <Reveal>
                <p className="text-xs tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-4xl">{pillar.title}</h3>
                {pillar.question && (
                  <p className="mt-2 text-ink-soft">{pillar.question}</p>
                )}
              </Reveal>

              <ul className="grid gap-3 sm:grid-cols-2">
                {pillar.services.map((service, i) => (
                  <Reveal as="li" key={service.title} delay={(i % 2) * 80}>
                    <ServiceCard service={service} />
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
