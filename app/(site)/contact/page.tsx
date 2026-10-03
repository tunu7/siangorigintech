import type { Metadata } from "next";
import { Container, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import ContactForm from "./ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContent("contact");
  return { title: "Contact", description: contact.metaDescription };
}

export default async function ContactPage() {
  const [contact, site] = await Promise.all([
    getContent("contact"),
    getContent("settings"),
  ]);

  return (
    <Container className="pb-24 sm:pb-32">
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
          <ContactForm
            text={{
              messageLabel: contact.messageLabel,
              messagePlaceholder: contact.messagePlaceholder,
              successTitle: contact.successTitle,
              successText: contact.successText,
            }}
          />
        </div>
      </div>
    </Container>
  );
}
