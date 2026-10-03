import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { ButtonLink, Container } from "./ui";

export default async function ContactCTA() {
  const site = await getContent("settings");

  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <Container>
        <Reveal className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
          <div>
            <h2 className="font-display text-5xl text-balance sm:text-7xl">
              {site.ctaTitle}
            </h2>
            {site.ctaText && (
              <p className="mt-6 max-w-lg text-lg leading-8 text-paper/65">
                {site.ctaText}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <ButtonLink href="/contact" variant="inverse" arrow>
              {site.ctaButton}
            </ButtonLink>
            <a
              href={`mailto:${site.contactEmail}`}
              className="border-b border-paper/30 pb-0.5 text-sm text-paper/80 transition-colors hover:border-paper hover:text-paper"
            >
              {site.contactEmail}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
