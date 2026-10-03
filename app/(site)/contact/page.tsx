import type { Metadata } from "next";
import { Container, PageBackdrop, PageHeader } from "@/app/components/ui";
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
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="grid gap-16 py-24 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <PageHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.intro}
          />

          <dl className="mt-12 animate-fade-up space-y-6 text-sm [animation-delay:240ms]">
            <div>
              <dt className="text-zinc-500">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="font-medium hover:text-brand"
                >
                  {site.contactEmail}
                </a>
              </dd>
            </div>
            {site.location && (
              <div>
                <dt className="text-zinc-500">Location</dt>
                <dd className="mt-1 font-medium">{site.location}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="animate-fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm [animation-delay:150ms] sm:p-10">
          <ContactForm
            text={{
              messageLabel: contact.messageLabel,
              messagePlaceholder: contact.messagePlaceholder,
              successTitle: contact.successTitle,
              successText: contact.successText,
            }}
          />
        </div>
      </Container>
    </div>
  );
}
