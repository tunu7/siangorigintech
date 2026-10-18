import { getContent } from "@/lib/content";
import { contactHref } from "@/lib/content-schema";
import Scene3D from "./three/Scene3D";
import { Reveal } from "./motion";
import { ButtonLink } from "./ui";

export default async function ContactCTA({
  title,
  text,
  services,
  from,
}: {
  // Overrides the site-wide banner text, e.g. on the services page.
  title?: string;
  text?: string;
  // Service slugs to preselect on the contact form, and the page the
  // visitor is on, recorded with their enquiry.
  services?: string[];
  from?: string;
} = {}) {
  const site = await getContent("settings");

  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="dark-panel relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        <Scene3D variant="field" className="absolute inset-0 -z-10" />

        <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center sm:px-10 sm:py-40">
          <h2 className="font-display text-5xl text-balance sm:text-7xl">
            {title || site.ctaTitle}
          </h2>
          {(text || site.ctaText) && (
            <p className="mt-6 max-w-xl text-lg leading-8 text-paper/60">
              {text || site.ctaText}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center gap-6">
            <ButtonLink href={contactHref({ services, from })} variant="lime" arrow>
              {site.ctaButton}
            </ButtonLink>
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-sm text-paper/55 transition-colors hover:text-paper"
            >
              {site.contactEmail}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
