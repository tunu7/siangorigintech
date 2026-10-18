import { getContent } from "@/lib/content";
import Logo from "./Logo";
import { Reveal } from "./motion";
import { ButtonLink } from "./ui";

export default async function ContactCTA({
  title,
  text,
}: {
  // Overrides the site-wide banner text, e.g. on the services page.
  title?: string;
  text?: string;
} = {}) {
  const site = await getContent("settings");

  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="bg-grain relative isolate overflow-hidden rounded-[1.75rem] bg-forest py-24 text-paper sm:rounded-[2.5rem] sm:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute -bottom-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-brand-light/45 blur-[130px]" />
          <Logo className="absolute -right-16 -top-10 h-80 w-auto text-paper/[0.03] sm:h-[28rem]" />
        </div>

        <Reveal className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-10">
          <h2 className="font-display text-5xl text-balance sm:text-7xl">
            {title || site.ctaTitle}
          </h2>
          {(text || site.ctaText) && (
            <p className="mt-6 max-w-xl text-lg leading-8 text-paper/65">
              {text || site.ctaText}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center gap-6">
            <ButtonLink href="/contact" variant="lime" arrow>
              {site.ctaButton}
            </ButtonLink>
            <a
              href={`mailto:${site.contactEmail}`}
              className="border-b border-paper/30 pb-0.5 text-sm text-paper/75 transition-colors hover:border-paper hover:text-paper"
            >
              {site.contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
