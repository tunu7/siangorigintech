import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { Container } from "./ui";

export default async function ContactCTA() {
  const settings = await getContent("settings");

  return (
    <section className="py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-2xl bg-brand p-10 text-white sm:p-14">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 animate-float rounded-full bg-brand-light/50 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_60%)]"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                {settings.ctaTitle}
              </h2>
              <p className="mt-3 text-white/75">
                {settings.ctaText}
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-brand transition-all hover:bg-zinc-100 active:scale-[0.98]"
            >
              {settings.ctaButton}
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
