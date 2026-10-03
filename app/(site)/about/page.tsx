import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import { Reveal } from "@/app/components/motion";
import {
  Container,
  Eyebrow,
  PageBackdrop,
  PageHeader,
} from "@/app/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Siang Origin Technologies is an independent technology studio building digital products, growth systems and ventures.",
};

const services = [
  {
    title: "Digital Products",
    description:
      "Websites, platforms and digital experiences built around real users and business needs.",
  },
  {
    title: "Growth Systems",
    description:
      "Marketing, automation and technology systems that help businesses operate and grow more effectively.",
  },
  {
    title: "AI & Automation",
    description:
      "Intelligent workflows and AI-powered systems that reduce repetitive work and create new possibilities.",
  },
  {
    title: "New Ventures",
    description:
      "Our own products and ideas — built from the ground up and developed into independent ventures.",
  },
];

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      as="section"
      className="grid gap-6 border-t border-zinc-200 py-16 md:grid-cols-[1fr_2fr] md:gap-12"
    >
      <Eyebrow>{label}</Eyebrow>
      <div>{children}</div>
    </Reveal>
  );
}

export default function AboutPage() {
  return (
    <div className="relative isolate">
      <PageBackdrop />
      <Container className="pt-24">
        <PageHeader
          eyebrow="About"
          title="We build what matters"
          description="A technology studio building digital products, growth systems and ventures designed to solve real problems."
        />

        <div className="mt-20">
          <Section label="Who we are">
            <div className="max-w-2xl space-y-5 text-lg leading-8 text-zinc-600">
              <p>
                Siang Origin Technologies is an independent technology studio
                working at the intersection of technology, business and
                creativity.
              </p>
              <p>
                We partner with businesses and founders to turn ideas,
                challenges and opportunities into useful digital products,
                systems and experiences.
              </p>
              <p>
                We also build our own products and ventures — experimenting,
                learning and turning promising ideas into real businesses.
              </p>
            </div>
          </Section>

          <Section label="What we do">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="border-l-2 border-brand/20 pl-5 transition-colors hover:border-brand"
                >
                  <h2 className="font-semibold">{service.title}</h2>
                  <p className="mt-2 leading-7 text-zinc-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section label="How we think">
            <h2 className="text-2xl font-semibold tracking-tight">
              Start with the problem. Build what solves it.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              We believe good technology should have a purpose. Instead of
              building for the sake of building, we start with the problem,
              understand the people and business behind it, and create solutions
              that are simple, useful and capable of evolving.
            </p>
          </Section>

          <Section label="The journey">
            <h2 className="text-2xl font-semibold tracking-tight">
              From ideas, to systems, to ventures.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              We are still early in the journey. That is intentional. Siang
              Origin is being built to continuously experiment, create and
              launch — one meaningful problem at a time.
            </p>
          </Section>
        </div>
      </Container>

      <ContactCTA />
    </div>
  );
}
