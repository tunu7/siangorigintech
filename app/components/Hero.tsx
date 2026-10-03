import { getContent } from "@/lib/content";
import { ButtonLink, Container, TextLink } from "./ui";

export default async function Hero() {
  const [home, site] = await Promise.all([
    getContent("home"),
    getContent("settings"),
  ]);

  return (
    <section>
      <Container className="pb-20 pt-20 sm:pb-28 sm:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-in">
          {home.heroBadge && (
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {home.heroBadge}
            </p>
          )}
          {site.location && (
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              {site.location}
            </p>
          )}
        </div>

        <h1 className="font-display mt-10 max-w-5xl animate-fade-up text-[3.25rem] text-balance [animation-delay:80ms] sm:text-7xl lg:text-[6.5rem] lg:leading-[0.98]">
          {home.heroTitle}{" "}
          {home.heroHighlight && (
            <em className="text-brand">{home.heroHighlight}</em>
          )}
        </h1>

        <div className="mt-12 grid animate-fade-up gap-10 [animation-delay:160ms] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <p className="max-w-lg text-lg leading-8 text-ink-soft">
            {home.heroText}
          </p>

          <div className="flex flex-wrap items-center gap-6 md:justify-end">
            <ButtonLink href="/contact" arrow>
              {home.heroPrimaryCta}
            </ButtonLink>
            <TextLink href="/work">{home.heroSecondaryCta}</TextLink>
          </div>
        </div>
      </Container>

      {home.marquee.length > 0 && (
        <Container>
          <ul className="flex animate-fade-in flex-wrap gap-x-8 gap-y-3 border-t border-line py-6 text-sm text-muted [animation-delay:240ms]">
            {home.marquee.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
}
