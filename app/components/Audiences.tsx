import { Check, Globe, MapPin } from "lucide-react";
import { getContent } from "@/lib/content";
import { splitItems } from "@/lib/content-schema";
import { Reveal } from "./motion";
import { Container, SectionHeading } from "./ui";

const icons = [MapPin, Globe];

export default async function Audiences() {
  const home = await getContent("home");

  if (!home.audiences.length) return null;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={home.audienceEyebrow} title={home.audienceTitle} />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {home.audiences.map((audience, index) => {
            const Icon = icons[index % icons.length];
            const featured = index % 2 === 1;

            return (
              <Reveal
                key={index}
                delay={index * 100}
                className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 ${
                  featured
                    ? "border-brand bg-brand text-paper"
                    : "border-line bg-paper-deep"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    featured ? "bg-paper/10 text-lime" : "bg-paper text-brand"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.5} aria-hidden />
                </span>

                <h3 className="font-display mt-10 text-4xl">{audience.title}</h3>
                <p
                  className={`mt-4 max-w-lg leading-7 ${
                    featured ? "text-paper/75" : "text-ink-soft"
                  }`}
                >
                  {audience.description}
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {splitItems(audience.items).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={16}
                        strokeWidth={2}
                        aria-hidden
                        className={`mt-0.5 shrink-0 ${featured ? "text-lime" : "text-brand"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
