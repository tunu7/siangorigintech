export const metadata = {
  title: "About | Siang Origin Technologies",
  description:
    "Siang Origin Technologies is a technology studio building digital products, growth systems, and new ventures.",
};

export default function AboutPage() {
  return (
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Hero */}
        <div className="max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            About Siang Origin
          </p>

          <h1 className="mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.065em] md:text-8xl lg:text-[9rem]">
            WE BUILD
            <br />
            WHAT
            <br />
            MATTERS.
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-500 md:text-xl">
            A technology studio building digital products, growth systems,
            and ventures designed to solve real problems.
          </p>
        </div>

        {/* Introduction */}
        <div className="mt-28 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-2 lg:mt-40">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              01 — Who We Are
            </p>
          </div>

          <div className="max-w-2xl space-y-8 text-xl leading-8 text-neutral-600 md:text-2xl md:leading-9">
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

        </div>

        {/* What We Do */}
        <div className="mt-28 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-2 lg:mt-40">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              02 — What We Do
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">

            <div>
              <h2 className="text-lg font-medium">
                Digital Products
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Websites, platforms and digital experiences built around
                real users and business needs.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">
                Growth Systems
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Marketing, automation and technology systems that help
                businesses operate and grow more effectively.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">
                AI & Automation
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Intelligent workflows and AI-powered systems that reduce
                repetitive work and create new possibilities.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium">
                New Ventures
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Our own products and ideas — built from the ground up and
                developed into independent ventures.
              </p>
            </div>

          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-28 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-2 lg:mt-40">

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              03 — How We Think
            </p>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
              Start with the problem.
              <br />
              Build what solves it.
            </h2>

            <p className="mt-8 text-lg leading-8 text-neutral-500">
              We believe good technology should have a purpose. Instead of
              building for the sake of building, we start with the problem,
              understand the people and business behind it, and create
              solutions that are simple, useful and capable of evolving.
            </p>
          </div>

        </div>

        {/* Closing */}
        <div className="mt-32 border-t border-neutral-300 pt-12 lg:mt-48">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            04 — The Journey
          </p>

          <div className="mt-8 max-w-5xl">
            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] md:text-7xl">
              FROM IDEAS
              <br />
              TO SYSTEMS.
              <br />
              TO VENTURES.
            </h2>

            <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-500">
              We are still early in the journey. That is intentional.
              Siang Origin is being built to continuously experiment,
              create and launch — one meaningful problem at a time.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
