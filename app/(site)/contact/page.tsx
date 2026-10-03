import type { Metadata } from "next";
import { Container, PageBackdrop, PageHeader } from "@/app/components/ui";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Siang Origin Technologies.",
};

export default function ContactPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="grid gap-16 py-24 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <PageHeader
            eyebrow="Contact"
            title="Let's talk"
            description="Tell us what you're building, what you're trying to solve, or simply where you want to go next."
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
            <div>
              <dt className="text-zinc-500">Location</dt>
              <dd className="mt-1 font-medium">{site.location}</dd>
            </div>
          </dl>
        </div>

        <div className="animate-fade-up rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm [animation-delay:150ms] sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
