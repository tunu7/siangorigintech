const services = [
  {
    number: "01",
    title: "Digital",
    description:
      "Websites, digital products and experiences built around real business objectives.",
  },
  {
    number: "02",
    title: "Growth",
    description:
      "Strategy, content and performance systems designed to help businesses grow.",
  },
  {
    number: "03",
    title: "Intelligence",
    description:
      "AI and automation systems that make businesses faster and more scalable.",
  },
];

export default function Services() {
  return (
    <section className="border-t border-neutral-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            What we do
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
            Technology with a reason behind it.
          </h2>
        </div>

        <div className="divide-y divide-neutral-300 border-y border-neutral-300">
          {services.map((service) => (
            <div
              key={service.number}
              className="grid gap-6 py-10 md:grid-cols-[80px_1fr_1fr] md:items-start"
            >
              <span className="text-sm text-neutral-400">
                {service.number}
              </span>

              <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                {service.title}
              </h3>

              <p className="max-w-md text-sm leading-6 text-neutral-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}