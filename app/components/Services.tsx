import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { serviceSlug, servicesByPillar } from "@/lib/content-schema";
import Scene3D from "./three/Scene3D";
import { Reveal } from "./motion";
import { SectionHeading, TextLink } from "./ui";

// The four pillars as rising glass columns, each labelled with its
// services underneath.
export default async function Services() {
  const [home, services] = await Promise.all([
    getContent("home"),
    getContent("services"),
  ]);

  const pillars = servicesByPillar(services);

  if (!pillars.length) return null;

  return (
    <section className="px-3 sm:px-4">
      <div className="dark-panel relative isolate overflow-hidden rounded-[1.75rem] py-24 sm:rounded-[2.5rem] sm:py-32">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <Reveal>
            <SectionHeading
              eyebrow={home.servicesEyebrow}
              title={home.servicesTitle}
              text={home.servicesText}
              tone="dark"
            >
              <TextLink href="/services" tone="dark">
                {home.servicesLink}
              </TextLink>
            </SectionHeading>
          </Reveal>

          <Scene3D
            variant="pillars"
            className="mask-fade-x mt-8 h-[300px] sm:h-[420px]"
          />

          <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-paper/10 pt-10 lg:grid-cols-4 lg:gap-x-10">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.key} delay={index * 80}>
                <p className="text-xs tabular-nums text-lime">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-3xl sm:text-4xl">
                  <Link href={`/services#${pillar.key}`} className="hover:text-lime">
                    {pillar.title}
                  </Link>
                </h3>
                {pillar.question && (
                  <p className="mt-2 text-sm leading-6 text-paper/55">
                    {pillar.question}
                  </p>
                )}

                <ul className="mt-6 space-y-4">
                  {pillar.services.map((service) => (
                    <li key={service.title}>
                      <Link
                        href={`/services/${serviceSlug(service.title)}`}
                        className="group block"
                      >
                        <span className="flex items-start gap-1.5 text-paper/90 transition-colors group-hover:text-lime">
                          {service.title}
                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.75}
                            aria-hidden
                            className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </span>
                        {service.summary && (
                          <span className="mt-0.5 block text-sm text-paper/45">
                            {service.summary}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
