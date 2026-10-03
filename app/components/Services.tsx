import {
  BarChart3,
  Bot,
  BrainCircuit,
  Code2,
  LayoutTemplate,
  Megaphone,
  Palette,
  Rocket,
  Search,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/content";
import type { SERVICE_ICONS } from "@/lib/content-schema";
import { Reveal, TiltCard } from "./motion";
import { Container, Eyebrow } from "./ui";

const icons: Record<(typeof SERVICE_ICONS)[number], LucideIcon> = {
  layout: LayoutTemplate,
  growth: TrendingUp,
  brain: BrainCircuit,
  sparkles: Sparkles,
  rocket: Rocket,
  code: Code2,
  megaphone: Megaphone,
  search: Search,
  bot: Bot,
  palette: Palette,
  cart: ShoppingCart,
  chart: BarChart3,
};

export default async function Services() {
  const home = await getContent("home");

  if (!home.services.length) return null;

  return (
    <section className="border-t border-zinc-200 bg-zinc-50 py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{home.servicesEyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {home.servicesTitle}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {home.services.map((service, index) => {
            const Icon =
              icons[service.icon as keyof typeof icons] ?? LayoutTemplate;

            return (
            <Reveal key={index} delay={index * 120}>
              <TiltCard className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand transition-transform duration-300 group-hover/tilt:-translate-y-1 group-hover/tilt:rotate-6">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 leading-7 text-zinc-600">
                  {service.description}
                </p>
              </TiltCard>
            </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
