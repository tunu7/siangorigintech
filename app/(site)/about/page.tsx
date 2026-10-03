import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import { Reveal } from "@/app/components/motion";
import { Container, PageHeader, Section } from "@/app/components/ui";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getContent("about");
  return { title: "Studio", description: about.metaDescription };
}

export default async function AboutPage() {
  const about = await getContent("about");
  let index = 0;

  return (
    <>
      <Container>
        <PageHeader
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.intro}
        />

        <div className="pb-12">
          {about.whoParagraphs.length > 0 && (
            <Reveal>
              <Section label={about.whoLabel} index={++index} className="border-t-0">
                <div className="max-w-2xl space-y-6 text-lg leading-8 text-ink-soft">
                  {about.whoParagraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "font-display text-3xl leading-[1.2] text-ink"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Section>
            </Reveal>
          )}

          {about.services.length > 0 && (
            <Reveal>
              <Section label={about.whatLabel} index={++index}>
                <dl className="grid gap-x-12 sm:grid-cols-2">
                  {about.services.map((service, i) => (
                    <div key={i} className="border-t border-line py-7">
                      <dt className="font-display text-2xl">{service.title}</dt>
                      <dd className="mt-3 leading-7 text-ink-soft">
                        {service.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Section>
            </Reveal>
          )}

          {(about.thinkTitle || about.thinkText) && (
            <Reveal>
              <Section label={about.thinkLabel} index={++index}>
                <h2 className="font-display max-w-3xl text-4xl text-balance sm:text-5xl">
                  {about.thinkTitle}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
                  {about.thinkText}
                </p>
              </Section>
            </Reveal>
          )}

          {(about.journeyTitle || about.journeyText) && (
            <Reveal>
              <Section label={about.journeyLabel} index={++index}>
                <h2 className="font-display max-w-3xl text-4xl text-balance sm:text-5xl">
                  {about.journeyTitle}
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
                  {about.journeyText}
                </p>
              </Section>
            </Reveal>
          )}
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
