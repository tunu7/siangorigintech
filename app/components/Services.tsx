import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { serviceSlug, splitItems } from "@/lib/content-schema";
import ServiceIcon from "./ServiceIcon";
import { Reveal } from "./motion";
import { Container, SectionHeading, TextLink } from "./ui";

// How many sub-services each card previews before "+N more".
const PREVIEW = 4;

export default async function Services() {
  const [home, services] = await Promise.all([
    getContent("home"),
    getContent("services"),
  ]);

  if (!services.categories.length) return null;

  return (
    <section className="bg-paper-deep py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={home.servicesEyebrow}
            title={home.servicesTitle}
            text={home.servicesText}
          >
            <TextLink href="/services">{home.servicesLink}</TextLink>
          </SectionHeading>
        </Reveal>

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.categories.map((service, index) => {
            const items = splitItems(service.items);

            return (
              <Reveal as="li" key={index} delay={(index % 3) * 80}>
                <Link
                  href={`/services#${serviceSlug(service.title)}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgb(11_77_44/0.45)]"
                >
                  {/* Hover wash. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-mint/0 blur-3xl transition-colors duration-500 group-hover:bg-mint/50"
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-deep text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-lime">
                      <ServiceIcon name={service.icon} size={22} />
                    </span>
                    <span className="text-xs tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display relative mt-8 text-3xl leading-tight">
                    {service.title}
                  </h3>
                  {service.summary && (
                    <p className="relative mt-2 text-ink-soft">{service.summary}</p>
                  )}

                  {items.length > 0 && (
                    <p className="relative mt-6 flex-1 text-sm leading-6 text-muted">
                      {items.slice(0, PREVIEW).join(" · ")}
                      {items.length > PREVIEW && (
                        <span className="text-ink-soft">
                          {" "}
                          · +{items.length - PREVIEW} more
                        </span>
                      )}
                    </p>
                  )}

                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    Learn more
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.75}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
