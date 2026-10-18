import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { serviceSlug, servicesByPillar } from "@/lib/content-schema";
import { JsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import ContactForm, { type ServiceGroup } from "./ContactForm";
import ContactFormFromUrl from "./ContactFormFromUrl";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContent("contact");
  return pageMetadata({
    title: "Contact",
    description: contact.metaDescription,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [contact, site, services] = await Promise.all([
    getContent("contact"),
    getContent("settings"),
    getContent("services"),
  ]);

  const groups: ServiceGroup[] = servicesByPillar(services).map((pillar) => ({
    title: pillar.title,
    services: pillar.services.map((service) => ({
      slug: serviceSlug(service.title),
      title: service.title,
    })),
  }));

  const formText = {
    messageLabel: contact.messageLabel,
    messagePlaceholder: contact.messagePlaceholder,
    successTitle: contact.successTitle,
    successText: contact.successText,
  };

  return (
    <Container className="pb-24 sm:pb-32">
      <JsonLd
        data={webPageJsonLd({
          type: "ContactPage",
          name: contact.title,
          description: contact.metaDescription,
          path: "/contact",
          breadcrumb: [{ name: "Contact", path: "/contact" }],
        })}
      />
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.intro}
      />

      <div className="grid gap-16 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-24">
        <dl className="animate-fade-up space-y-8 text-sm [animation-delay:200ms]">
          <div>
            <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              Email
            </dt>
            <dd className="mt-3">
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-display border-b border-line-strong pb-0.5 text-2xl hover:border-ink"
              >
                {site.contactEmail}
              </a>
            </dd>
          </div>
          {site.location && (
            <div>
              <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                Studio
              </dt>
              <dd className="font-display mt-3 text-2xl">{site.location}</dd>
            </div>
          )}
        </dl>

        <div className="animate-fade-up [animation-delay:150ms]">
          {/* The page stays static; the URL-aware form takes over in the
              browser, with the plain form in the prerendered HTML. */}
          <Suspense fallback={<ContactForm text={formText} groups={groups} />}>
            <ContactFormFromUrl text={formText} groups={groups} />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
