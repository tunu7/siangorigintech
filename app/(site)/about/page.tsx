import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import { Reveal } from "@/app/components/motion";
import {
  Container,
  Eyebrow,
  PageBackdrop,
  PageHeader,
} from "@/app/components/ui";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getContent("about");
  return { title: "About", description: about.metaDescription };
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      as="section"
      className="grid gap-6 border-t border-zinc-200 py-16 md:grid-cols-[1fr_2fr] md:gap-12"
    >
      <Eyebrow>{label}</Eyebrow>
      <div>{children}</div>
    </Reveal>
  );
}

export default async function AboutPage() {
  const about = await getContent("about");

  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="pt-24">
        <PageHeader
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.intro}
        />

        <div className="mt-20">
          {about.whoParagraphs.length > 0 && (
            <Section label={about.whoLabel}>
              <div className="max-w-2xl space-y-5 text-lg leading-8 text-zinc-600">
                {about.whoParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Section>
          )}

          {about.services.length > 0 && (
            <Section label={about.whatLabel}>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {about.services.map((service, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-brand/20 pl-5 transition-colors hover:border-brand"
                  >
                    <h2 className="font-semibold">{service.title}</h2>
                    <p className="mt-2 leading-7 text-zinc-600">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {(about.thinkTitle || about.thinkText) && (
            <Section label={about.thinkLabel}>
              <h2 className="text-2xl font-semibold tracking-tight">
                {about.thinkTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
                {about.thinkText}
              </p>
            </Section>
          )}

          {(about.journeyTitle || about.journeyText) && (
            <Section label={about.journeyLabel}>
              <h2 className="text-2xl font-semibold tracking-tight">
                {about.journeyTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
                {about.journeyText}
              </p>
            </Section>
          )}
        </div>
      </Container>

      <ContactCTA />
    </div>
  );
}
