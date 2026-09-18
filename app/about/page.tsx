export const metadata = {
  title: "About",
  description: "About Siang Origin Technologies.",
};

export default function AboutPage() {
  return (
    <section className="pt-40 pb-24 lg:pt-48 lg:pb-32">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="max-w-6xl">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            About
          </p>

          <h1 className="mt-6 text-6xl font-medium leading-[0.9] tracking-[-0.06em] md:text-8xl">
            BUILDING
            <br />
            WHATS
            <br />
            NEXT.
          </h1>

        </div>

        <div className="mt-24 grid gap-12 border-t border-neutral-300 pt-12 md:grid-cols-2">

          <p className="text-sm uppercase tracking-wider text-neutral-400">
            Siang Origin Technologies
          </p>

          <div className="space-y-8 text-xl leading-8 text-neutral-600">
            <p>
              Siang Origin Technologies is a technology studio focused on
              digital experiences, growth systems and intelligent products.
            </p>

            <p>
              We work with businesses, founders and ideas to turn problems
              into useful digital solutions.
            </p>

            <p>
              Alongside client work, we are building our own products and
              exploring new ideas in technology.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}