import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import ServiceCard from "@/app/components/ServiceCard";
import { Reveal } from "@/app/components/motion";
import { Container, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { serviceSlug, servicesByPillar } from "@/lib/content-schema";
import { JsonLd, ORGANIZATION_ID, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const services = await getContent("services");
  return pageMetadata({
    title: "Services",
    description: services.metaDescription,
    path: "/services",
  });
}

// Avoids a lone card on the last row: four services sit in one row.
const columns = (count: number) =>
  count === 4 ? "lg:grid-cols-4" : count <= 2 ? "" : "lg:grid-cols-3";

export default async function ServicesPage() {
  const services = await getContent("services");
  const pillars = servicesByPillar(services);

  const page = webPageJsonLd({
    type: "CollectionPage",
    name: services.title,
    description: services.metaDescription,
    path: "/services",
    breadcrumb: [{ name: "Services", path: "/services" }],
  });

  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            ...page["@graph"],
            {
              "@type": "OfferCatalog",
              name: services.title,
              url: absoluteUrl("/services"),
              itemListElement: pillars.map((pillar) => ({
                "@type": "OfferCatalog",
                name: pillar.title,
                itemListElement: pillar.services.map((service) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    "@id": absoluteUrl(`/services/${serviceSlug(service.title)}#service`),
                    name: service.title,
                    url: absoluteUrl(`/services/${serviceSlug(service.title)}`),
                    provider: { "@id": ORGANIZATION_ID },
                  },
                })),
              })),
            },
          ],
        }}
      />

      <Container>
        <PageHeader
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.intro}
        >
          {pillars.length > 0 && (
            <nav
              aria-label="Jump to a pillar"
              className="mt-12 grid animate-fade-up gap-3 [animation-delay:220ms] sm:grid-cols-2 lg:grid-cols-4"
            >
              {pillars.map((pillar, index) => (
                <a
                  key={pillar.key}
                  href={`#${pillar.key}`}
                  className="group rounded-2xl border border-line-strong bg-paper p-5 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <span className="text-xs tabular-nums text-muted group-hover:text-lime">
                    {String(index + 1).padStart(2, "0")} · {pillar.services.length}{" "}
                    {pillar.services.length === 1 ? "service" : "services"}
                  </span>
                  <span className="font-display mt-3 block text-3xl">
                    {pillar.title}
                  </span>
                  {pillar.question && (
                    <span className="mt-1 block text-sm text-ink-soft group-hover:text-paper/70">
                      {pillar.question}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          )}
        </PageHeader>

        <div className="py-8 sm:py-12">
          {pillars.map((pillar, index) => (
            <section
              key={pillar.key}
              id={pillar.key}
              className="scroll-mt-24 border-t border-line py-14 first:border-t-0 sm:py-20"
            >
              <Reveal className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-end md:gap-12">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                    <span className="tabular-nums text-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-2 text-line-strong">—</span>
                    {pillar.question}
                  </p>
                  <h2 className="font-display mt-4 text-5xl sm:text-6xl">
                    {pillar.title}
                  </h2>
                </div>
                {pillar.description && (
                  <p className="max-w-2xl text-lg leading-8 text-ink-soft">
                    {pillar.description}
                  </p>
                )}
              </Reveal>

              <ul
                className={`mt-10 grid gap-3 sm:grid-cols-2 ${columns(pillar.services.length)}`}
              >
                {pillar.services.map((service, i) => (
                  <Reveal as="li" key={service.title} delay={(i % 3) * 80}>
                    <ServiceCard service={service} detailed />
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>

      <ContactCTA
        title={services.ctaTitle}
        text={services.ctaText}
        from="/services"
      />
    </>
  );
}
