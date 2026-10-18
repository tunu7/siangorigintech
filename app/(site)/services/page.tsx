import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ContactCTA from "@/app/components/ContactCTA";
import ServiceIcon from "@/app/components/ServiceIcon";
import { Reveal } from "@/app/components/motion";
import { Container, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { serviceSlug, splitItems } from "@/lib/content-schema";
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

export default async function ServicesPage() {
  const services = await getContent("services");
  const categories = services.categories.map((service) => ({
    ...service,
    slug: serviceSlug(service.title),
    list: splitItems(service.items),
  }));

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
              itemListElement: categories.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  "@id": absoluteUrl(`/services#${service.slug}`),
                  name: service.title,
                  description: service.description || service.summary,
                  serviceType: service.list,
                  provider: { "@id": ORGANIZATION_ID },
                  areaServed: "Worldwide",
                },
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
          {categories.length > 0 && (
            <nav
              aria-label="Jump to a service"
              className="mt-12 flex animate-fade-up flex-wrap gap-2 [animation-delay:220ms]"
            >
              {categories.map((service) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <ServiceIcon
                    name={service.icon}
                    size={15}
                    className="text-brand transition-colors group-hover:text-lime"
                  />
                  {service.title}
                </a>
              ))}
            </nav>
          )}
        </PageHeader>

        <div className="space-y-3 py-16 sm:py-24">
          {categories.map((service, index) => (
            <Reveal
              key={service.slug}
              as="section"
              className="rounded-[2rem] border border-line bg-paper-deep/60 p-7 sm:p-10 lg:p-12"
            >
              <div
                id={service.slug}
                className="grid scroll-mt-28 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-lime">
                      <ServiceIcon name={service.icon} size={24} />
                    </span>
                    <span className="text-xs tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(categories.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-display mt-8 text-4xl text-balance sm:text-5xl">
                    {service.title}
                  </h2>
                  {service.summary && (
                    <p className="font-display mt-3 text-2xl italic text-brand">
                      {service.summary}
                    </p>
                  )}
                </div>

                <div>
                  {service.description && (
                    <p className="text-lg leading-8 text-ink-soft">
                      {service.description}
                    </p>
                  )}

                  {service.list.length > 0 && (
                    <>
                      <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                        What&apos;s included
                      </p>
                      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {service.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 border-b border-line pb-3 text-[15px]"
                          >
                            <Check
                              size={16}
                              strokeWidth={2}
                              aria-hidden
                              className="mt-1 shrink-0 text-brand"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <Link
                    href="/contact"
                    className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brand"
                  >
                    Discuss {service.title}
                    <ArrowRight
                      size={15}
                      strokeWidth={1.75}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <ContactCTA title={services.ctaTitle} text={services.ctaText} />
    </>
  );
}
