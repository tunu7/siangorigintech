import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import {
  contactHref,
  serviceSlug,
  servicesByPillar,
} from "@/lib/content-schema";
import ServiceIcon from "./ServiceIcon";
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
      <div className="bg-grain relative isolate overflow-hidden rounded-[1.75rem] bg-forest text-paper sm:rounded-[2.5rem]">
        {/* Ambient light and grid. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] animate-float rounded-full bg-brand-light/40 blur-[120px]" />
          <div className="absolute -bottom-48 right-[-10%] h-[30rem] w-[30rem] animate-float rounded-full bg-lime/15 blur-[120px] [animation-delay:-4s]" />
        </div>

        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 pb-12 pt-16 sm:px-10 sm:pt-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16 lg:pb-16 lg:pt-28">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 animate-fade-in">
              {home.heroBadge && (
                <p className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/80 backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
                  </span>
                  {home.heroBadge}
                </p>
              )}
              {site.location && (
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-paper/45">
                  {site.location}
                </p>
              )}
            </div>

            <h1 className="font-display mt-10 animate-fade-up text-[3rem] text-balance [animation-delay:80ms] sm:text-7xl xl:text-[5.75rem] xl:leading-[0.98]">
              {home.heroTitle}{" "}
              {home.heroHighlight && (
                <em className="bg-linear-to-r from-mint to-lime bg-clip-text text-transparent">
                  {home.heroHighlight}
                </em>
              )}
            </h1>

            <p className="mt-8 max-w-xl animate-fade-up text-lg leading-8 text-paper/70 [animation-delay:160ms]">
              {home.heroText}
            </p>

            <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:220ms]">
              <ButtonLink
                href={contactHref({ from: "/" })}
                variant="lime"
                arrow
              >
                {home.heroPrimaryCta}
              </ButtonLink>
              <ButtonLink href="/services" variant="outline">
                {home.heroSecondaryCta}
              </ButtonLink>
            </div>
          </div>

          {services.categories.length > 0 && (
            <nav
              aria-label={home.heroPanelTitle || "Services"}
              className="animate-fade-up self-end rounded-3xl border border-paper/10 bg-paper/[0.04] p-2 backdrop-blur-md [animation-delay:260ms]"
            >
              {home.heroPanelTitle && (
                <p className="flex items-center justify-between px-4 pb-2 pt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/50">
                  {home.heroPanelTitle}
                  <span className="tabular-nums">
                    {String(services.categories.length).padStart(2, "0")}
                  </span>
                </p>
              )}
              <div className="gap-2 sm:columns-2">
                {pillars.map((pillar) => (
                  <div key={pillar.key} className="break-inside-avoid pb-2">
                    <Link
                      href={`/services#${pillar.key}`}
                      className="block px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-lime/70 hover:text-lime"
                    >
                      {pillar.title}
                    </Link>
                    <ul>
                      {pillar.services.map((service) => (
                        <li key={service.title}>
                          <Link
                            href={`/services/${serviceSlug(service.title)}`}
                            className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-paper/80 transition-colors hover:bg-paper/[0.07] hover:text-paper"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-paper/[0.06] text-lime transition-colors group-hover:bg-lime group-hover:text-forest">
                              <ServiceIcon name={service.icon} size={16} />
                            </span>
                            <span className="min-w-0 flex-1 leading-snug">
                              {service.title}
                            </span>
                            <ArrowUpRight
                              size={14}
                              strokeWidth={1.75}
                              aria-hidden
                              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-60"
                            />
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
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-display text-2xl text-paper/80 sm:text-3xl"
        >
          {item}
          <span className="text-base text-lime">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mask-fade-x overflow-hidden border-t border-forest-line py-6">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
