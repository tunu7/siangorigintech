import Link from "next/link";
import { getContent } from "@/lib/content";
import {
  contactHref,
  serviceSlug,
  servicesByPillar,
} from "@/lib/content-schema";
import Scene3D from "./three/Scene3D";
import { ButtonLink } from "./ui";

export default async function Hero() {
  const [home, site, services] = await Promise.all([
    getContent("home"),
    getContent("settings"),
    getContent("services"),
  ]);
  const pillars = servicesByPillar(services);

  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="dark-panel relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
        <Scene3D variant="hero" className="absolute inset-0 -z-10" />

        <div className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1280px] flex-col px-6 sm:px-10">
          {/* Leaves room for the mark above the headline on small screens. */}
          <div className="flex flex-1 flex-col justify-center pb-16 pt-[min(78vw,22rem)] lg:pt-24">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 animate-fade-in">
              {home.heroBadge && (
                <p className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-paper/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_12px_var(--color-lime)]" />
                  {home.heroBadge}
                </p>
              )}
              {site.location && (
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-paper/40">
                  {site.location}
                </p>
              )}
            </div>

            <h1 className="font-display mt-8 max-w-3xl animate-fade-up text-[3rem] lg:max-w-[42rem] text-balance [animation-delay:80ms] sm:text-7xl xl:text-[5.5rem] xl:leading-[0.98]">
              {home.heroTitle}{" "}
              {home.heroHighlight && (
                <em className="bg-linear-to-r from-mint to-lime bg-clip-text text-transparent">
                  {home.heroHighlight}
                </em>
              )}
            </h1>

            <p className="mt-8 max-w-lg animate-fade-up text-lg leading-8 text-paper/65 [animation-delay:160ms]">
              {home.heroText}
            </p>

            <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:220ms]">
              <ButtonLink href={contactHref({ from: "/" })} variant="lime" arrow>
                {home.heroPrimaryCta}
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                {home.heroSecondaryCta}
              </ButtonLink>
            </div>
          </div>

          {pillars.length > 0 && (
            <nav
              aria-label={home.heroPanelTitle || "Services"}
              className="animate-fade-in border-t border-paper/10 py-8 [animation-delay:320ms]"
            >
              {home.heroPanelTitle && (
                <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-paper/40">
                  {home.heroPanelTitle}
                </p>
              )}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
                {pillars.map((pillar) => (
                  <div key={pillar.key}>
                    <Link
                      href={`/services#${pillar.key}`}
                      className="text-[11px] font-medium uppercase tracking-[0.2em] text-lime hover:text-paper"
                    >
                      {pillar.title}
                    </Link>
                    <ul className="mt-3 space-y-1.5">
                      {pillar.services.map((service) => (
                        <li key={service.title}>
                          <Link
                            href={`/services/${serviceSlug(service.title)}`}
                            className="text-sm text-paper/60 transition-colors hover:text-paper"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>

        {home.marquee.length > 0 && <Ticker items={home.marquee} />}
      </div>
    </section>
  );
}

// An endless row of capabilities. The list is rendered twice so the
// animation can loop seamlessly; the copy is hidden from assistive tech.
function Ticker({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-paper/45"
        >
          {item}
          <span className="h-1 w-1 rounded-full bg-lime/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mask-fade-x overflow-hidden border-t border-paper/10 py-5">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
