import { Container, Eyebrow } from "./ui";

const services = [
  {
    title: "Digital",
    description:
      "Websites, digital products and experiences built around real business objectives.",
  },
  {
    title: "Growth",
    description:
      "Strategy, content and performance systems designed to help businesses grow.",
  },
  {
    title: "Intelligence",
    description:
      "AI and automation systems that make businesses faster and more scalable.",
  },
];

export default function Services() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50 py-24">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Technology with a reason behind it
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="border-t border-zinc-300 pt-6"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 leading-7 text-zinc-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
