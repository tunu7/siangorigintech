import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { splitItems } from "@/lib/content-schema";
import { Reveal } from "./motion";
import { Container, SectionHeading, Tag } from "./ui";

export default async function Goals() {
  const home = await getContent("home");

  if (!home.goals.length) return null;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={home.goalsEyebrow} title={home.goalsTitle} />
        </Reveal>

        <ol className="mt-14 border-t border-line-strong">
          {home.goals.map((goal, index) => (
            <Reveal as="li" key={index} delay={index * 60}>
              <Link
                href="/contact"
                className="group grid items-start gap-6 border-b border-line-strong py-9 transition-colors md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-10"
              >
                <span className="text-xs tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl transition-colors group-hover:text-brand sm:text-4xl">
                  {goal.title}
                </h3>
                <div>
                  <p className="leading-7 text-ink-soft">{goal.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {splitItems(goal.items).map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:flex">
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:-rotate-45"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
