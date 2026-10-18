import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import ServiceCard from "@/app/components/ServiceCard";
import { Reveal } from "@/app/components/motion";
import Scene3D from "@/app/components/three/Scene3D";
import { Container } from "@/app/components/ui";
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

      <section className="px-3 pt-3 sm:px-4">
        <div className="dark-panel relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
          <div className="mx-auto max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-24">
            <p className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.2em] text-paper/50">
              {services.eyebrow}
            </p>
            <h1 className="font-display mt-6 max-w-4xl animate-fade-up text-5xl text-balance [animation-delay:80ms] sm:text-7xl">
              {services.title}
            </h1>
            {services.intro && (
              <p className="mt-8 max-w-2xl animate-fade-up text-lg leading-8 text-paper/60 [animation-delay:160ms]">
                {services.intro}
              </p>
            )}

            <Scene3D variant="pillars" className="mask-fade-x mt-6 h-[280px] sm:h-[400px]" />

            {pillars.length > 0 && (
              <nav
                aria-label="Jump to a pillar"
                className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper/10 py-10 lg:grid-cols-4 lg:gap-x-10"
              >
                {pillars.map((pillar, index) => (
                  <a key={pillar.key} href={`#${pillar.key}`} className="group">
                    <span className="text-xs tabular-nums text-lime">
                      {String(index + 1).padStart(2, "0")} · {pillar.services.length}{" "}
                      {pillar.services.length === 1 ? "service" : "services"}
                    </span>
                    <span className="font-display mt-3 block text-3xl transition-colors group-hover:text-lime sm:text-4xl">
                      {pillar.title}
                    </span>
                    {pillar.question && (
                      <span className="mt-1 block text-sm text-paper/55">
                        {pillar.question}
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>

      <Container>
        <div className="py-8 sm:py-12">
          {pillars.map((pillar, index) => (
            <section
              key={pillar.key}
              id={pillar.key}
              className="scroll-mt-24 border-t border-line py-20 first:border-t-0 sm:py-28"
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
                className={`mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 ${columns(pillar.services.length)}`}
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
