import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import ContactCTA from "@/app/components/ContactCTA";
import ServiceCard from "@/app/components/ServiceCard";
import ServiceIcon from "@/app/components/ServiceIcon";
import Scene3D from "@/app/components/three/Scene3D";
import { Reveal } from "@/app/components/motion";
import { ButtonLink, Container, Eyebrow } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import {
  contactHref,
  findService,
  serviceSlug,
  servicesByPillar,
  splitItems,
} from "@/lib/content-schema";
import { breadcrumbJsonLd, JsonLd, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

// Every service is prerendered; services added in the admin render on
// first visit. Admin saves revalidate the whole site.
export async function generateStaticParams() {
  const services = await getContent("services");
  return services.categories.map((service) => ({
    slug: serviceSlug(service.title),
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(await getContent("services"), slug);

  if (!service) return { title: "Service not found" };

  return pageMetadata({
    title: service.title,
    description: [service.summary, service.description].filter(Boolean).join(" "),
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [services, home] = await Promise.all([
    getContent("services"),
    getContent("home"),
  ]);

  const service = findService(services, slug);
  if (!service) notFound();

  const pillars = servicesByPillar(services);
  const pillar = pillars.find((group) =>
    group.services.some((item) => item.title === service.title)
  );
  const related = (pillar?.services ?? []).filter(
    (item) => item.title !== service.title
  );
  const path = `/services/${slug}`;
  const included = splitItems(service.items);
  const outcomes = splitItems(service.outcomes);
  const startHref = contactHref({ services: [slug], from: path });

  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "Service",
              "@id": absoluteUrl(`${path}#service`),
              name: service.title,
              description: service.description || service.summary,
              url: absoluteUrl(path),
              serviceType: included,
              ...(pillar && { category: pillar.title }),
              provider: { "@id": ORGANIZATION_ID },
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `${service.title} services`,
                itemListElement: included.map((item) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: item },
                })),
              },
            },
            breadcrumbJsonLd([
              { name: "Services", path: "/services" },
              { name: service.title, path },
            ]),
          ],
        }}
      />

      {/* Header panel. */}
      <section className="px-3 pt-3 sm:px-4">
        <div className="dark-panel relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
          <Scene3D variant="field" className="absolute inset-0 -z-10" />

          <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16 lg:py-24">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/50 animate-fade-in"
              >
                <Link href="/services" className="hover:text-paper">
                  Services
                </Link>
                {pillar && (
                  <>
                    <span aria-hidden>/</span>
                    <Link href={`/services#${pillar.key}`} className="hover:text-paper">
                      {pillar.title}
                    </Link>
                  </>
                )}
              </nav>

              <ServiceIcon
                name={service.icon}
                size={30}
                className="mt-12 animate-fade-up text-lime"
              />

              <h1 className="font-display mt-8 animate-fade-up text-5xl text-balance [animation-delay:80ms] sm:text-7xl">
                {service.title}
              </h1>
              {service.summary && (
                <p className="font-display mt-4 animate-fade-up text-3xl italic text-lime/90 [animation-delay:120ms]">
                  {service.summary}
                </p>
              )}
              {service.description && (
                <p className="mt-8 max-w-xl animate-fade-up text-lg leading-8 text-paper/70 [animation-delay:160ms]">
                  {service.description}
                </p>
              )}

              <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:220ms]">
                <ButtonLink href={startHref} variant="lime" arrow>
                  Start your {service.title} project
                </ButtonLink>
                <ButtonLink href="/services" variant="outline">
                  All services
                </ButtonLink>
              </div>
            </div>

            {outcomes.length > 0 && (
              <div className="animate-fade-up self-end border-l border-paper/15 pl-8 [animation-delay:260ms]">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper/50">
                  What you get
                </p>
                <ul className="mt-6 space-y-4">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 leading-7">
                      <Check
                        size={16}
                        strokeWidth={2}
                        aria-hidden
                        className="mt-1.5 shrink-0 text-lime"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <Container>
        {included.length > 0 && (
          <section className="py-24 sm:py-28">
            <Reveal className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-end md:gap-12">
              <div>
                <Eyebrow>What&apos;s included</Eyebrow>
                <h2 className="font-display mt-5 text-4xl sm:text-5xl">
                  Everything under {service.title}.
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-8 text-ink-soft">
                Take the full service or just the parts you need — every
                engagement is scoped to your goals and budget.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={(index % 3) * 60}
                  className="flex items-baseline gap-5 border-t border-line-strong py-5"
                >
                  <span className="text-xs tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl">{item}</span>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {service.idealFor && (
          <Reveal className="grid gap-8 border-t border-line py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 sm:py-24">
            <Eyebrow>Ideal for</Eyebrow>
            <p className="font-display text-3xl leading-[1.2] text-balance sm:text-4xl">
              {service.idealFor}
            </p>
          </Reveal>
        )}

        {home.steps.length > 0 && (
          <section className="border-t border-line py-20 sm:py-24">
            <Reveal>
              <Eyebrow>{home.processEyebrow}</Eyebrow>
              <h2 className="font-display mt-5 max-w-3xl text-4xl text-balance sm:text-5xl">
                {home.processTitle}
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {home.steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={index}
                  delay={index * 80}
                  className="border-t border-line-strong pt-6"
                >
                  <span className="font-display text-5xl text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-8 text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">
                    {step.description}
                  </p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {related.length > 0 && pillar && (
          <section className="border-t border-line py-20 sm:py-24">
            <Reveal>
              <Eyebrow>More in {pillar.title}</Eyebrow>
              {pillar.question && (
                <h2 className="font-display mt-5 text-4xl sm:text-5xl">
                  {pillar.question}
                </h2>
              )}
            </Reveal>
            <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal as="li" key={item.title} delay={(index % 3) * 80}>
                  <ServiceCard service={item} />
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </Container>

      <ContactCTA
        title={`Let's talk about ${service.title}.`}
        text={services.ctaText}
        services={[slug]}
        from={path}
      />
    </>
  );
}
