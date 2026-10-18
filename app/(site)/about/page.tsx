import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactCTA from "@/app/components/ContactCTA";
import ServiceIcon from "@/app/components/ServiceIcon";
import { Reveal } from "@/app/components/motion";
import { Container, PageHeader, Section } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { serviceSlug } from "@/lib/content-schema";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getContent("about");
  return pageMetadata({
    title: "Studio",
    description: about.metaDescription,
    path: "/about",
  });
}

export default async function AboutPage() {
  const [about, services] = await Promise.all([
    getContent("about"),
    getContent("services"),
  ]);
  let index = 0;

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          type: "AboutPage",
          name: about.title,
          description: about.metaDescription,
          path: "/about",
          breadcrumb: [{ name: "Studio", path: "/about" }],
        })}
      />
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

          {services.categories.length > 0 && (
            <Reveal>
              <Section label={about.whatLabel} index={++index}>
                <ul className="grid gap-x-10 sm:grid-cols-2">
                  {services.categories.map((service) => (
                    <li key={service.title} className="border-t border-line">
                      <Link
                        href={`/services#${serviceSlug(service.title)}`}
                        className="group flex items-start gap-4 py-6"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-deep text-brand transition-colors group-hover:bg-forest group-hover:text-lime">
                          <ServiceIcon name={service.icon} size={18} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="font-display block text-2xl transition-colors group-hover:text-brand">
                            {service.title}
                          </span>
                          {service.summary && (
                            <span className="mt-1 block text-sm leading-6 text-ink-soft">
                              {service.summary}
                            </span>
                          )}
                        </span>
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.75}
                          aria-hidden
                          className="mt-2 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
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
