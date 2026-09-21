import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="border-t border-[#0B4D2C]/10 bg-[#F7FAF7] py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* LABEL */}

        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
          Have a project?
        </p>

        {/* HEADING */}

        <h2 className="mt-6 text-6xl font-medium tracking-[-0.06em] text-[#06351F] md:text-8xl">
          LET&apos;S BUILD
          <br />
          <span className="text-[#2F7D46]">
            SOMETHING.
          </span>
        </h2>

        {/* CTA */}

        <Link
          href="/contact"
          className="group mt-10 inline-flex items-center gap-4 rounded-full bg-[#0B4D2C] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176B3A]"
        >
          <span>
            Start a conversation
          </span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>
    </section>
  );
}