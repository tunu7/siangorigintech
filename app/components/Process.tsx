import { getContent } from "@/lib/content";
import { Reveal } from "./motion";
import { SectionHeading } from "./ui";

export default async function Process() {
  const home = await getContent("home");

  if (!home.steps.length) return null;

  return (
    <section className="px-3 sm:px-4">
      <div className="bg-grain relative isolate overflow-hidden rounded-[1.75rem] bg-forest py-24 text-paper sm:rounded-[2.5rem] sm:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0" />
          <div className="absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-light/30 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
          <Reveal>
            <SectionHeading
              eyebrow={home.processEyebrow}
              title={home.processTitle}
              tone="dark"
            />
          </Reveal>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-forest-line bg-forest-line sm:grid-cols-2 lg:grid-cols-4">
            {home.steps.map((step, index) => (
              <Reveal
                as="li"
                key={index}
                delay={index * 100}
                className="group flex flex-col bg-forest-soft p-8 transition-colors duration-300 hover:bg-forest"
              >
                <span className="font-display text-6xl text-lime/90 transition-transform duration-500 group-hover:-translate-y-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-12 text-3xl">{step.title}</h3>
                <p className="mt-3 leading-7 text-paper/65">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
