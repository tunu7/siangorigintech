import { Plus } from "lucide-react";
import { getContent } from "@/lib/content";
import { JsonLd } from "@/lib/seo";
import { Reveal } from "./motion";
import { Container, Eyebrow } from "./ui";

export default async function Faq() {
  const home = await getContent("home");

  if (!home.faqs.length) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: home.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Container>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
          <Reveal>
            <Eyebrow>{home.faqEyebrow}</Eyebrow>
            <h2 className="font-display mt-5 text-4xl text-balance sm:text-6xl">
              {home.faqTitle}
            </h2>
          </Reveal>

          <Reveal className="border-t border-line-strong">
            {home.faqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-line-strong [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors hover:text-brand">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper">
                    <Plus size={16} strokeWidth={1.75} aria-hidden />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pr-14 leading-7 text-ink-soft">
                  {faq.answer}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
