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
    <section className="border-t border-[#0B4D2C]/10 bg-[#F7FAF7] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}

        <div className="mb-16">

          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
            What we do
          </p>

          <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-tight text-[#06351F] md:text-6xl">
            Technology with a reason behind it.
          </h2>

        </div>

        {/* SERVICES */}

        <div className="divide-y divide-[#0B4D2C]/10 border-y border-[#0B4D2C]/10">

          {services.map((service) => (
            <div
              key={service.number}
              className="group relative grid gap-6 py-10 transition-all duration-500 md:grid-cols-[80px_1fr_1fr] md:items-start"
            >

              {/* SUBTLE HOVER ACCENT */}

              <span className="absolute left-0 top-0 h-px w-0 bg-[#2F7D46] transition-all duration-500 group-hover:w-20" />

              {/* NUMBER */}

              <span className="text-sm font-medium text-[#617568] transition-colors duration-300 group-hover:text-[#2F7D46]">
                {service.number}
              </span>

              {/* TITLE */}

              <h3 className="text-3xl font-medium tracking-tight text-[#06351F] transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#176B3A] md:text-4xl">
                {service.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="max-w-md text-sm leading-6 text-[#617568] transition-colors duration-300 group-hover:text-[#52675A]">
                {service.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}