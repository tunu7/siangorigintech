import { getContent } from "@/lib/content";
import HeroVisual from "./three/HeroVisual";
import { ButtonLink, Container } from "./ui";

export default async function Hero() {
  const home = await getContent("home");

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-mint/25 blur-3xl"
      />

      <Container className="grid items-center gap-8 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
        <div>
          {home.heroBadge && (
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand/15 bg-white/70 px-3 py-1 text-xs font-medium text-brand backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
            </span>
            {home.heroBadge}
          </p>
          )}

          <h1 className="mt-6 animate-fade-up text-5xl font-semibold tracking-tight text-balance [animation-delay:100ms] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
            {home.heroTitle}{" "}
            <span className="bg-linear-to-r from-brand to-brand-light bg-clip-text text-transparent">
              {home.heroHighlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-8 text-zinc-600 [animation-delay:200ms]">
            {home.heroText}
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            <ButtonLink href="/contact" arrow>
              {home.heroPrimaryCta}
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              {home.heroSecondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-xl animate-fade-in justify-self-center [animation-delay:200ms]">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
