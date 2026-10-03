import { BrainCircuit, LayoutTemplate, TrendingUp } from "lucide-react";
import { Reveal, TiltCard } from "./motion";
import { Container, Eyebrow } from "./ui";

const services = [
  {
    icon: LayoutTemplate,
    title: "Digital",
    description:
      "Websites, digital products and experiences built around real business objectives.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description:
      "Strategy, content and performance systems designed to help businesses grow.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligence",
    description:
      "AI and automation systems that make businesses faster and more scalable.",
  },
];

export default function Services() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50 py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Technology with a reason behind it
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120}>
              <TiltCard className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand transition-transform duration-300 group-hover/tilt:-translate-y-1 group-hover/tilt:rotate-6">
                  <service.icon size={22} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 leading-7 text-zinc-600">
                  {service.description}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
