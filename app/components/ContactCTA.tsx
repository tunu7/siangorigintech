import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="border-t border-neutral-300 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Have a project?
        </p>

        <h2 className="mt-6 text-6xl font-medium tracking-tight md:text-8xl">
          LET&apos;S BUILD
          <br />
          SOMETHING.
        </h2>

        <Link
          href="/contact"
          className="mt-10 inline-block rounded-full bg-black px-7 py-4 text-sm text-white"
        >
          Start a conversation →
        </Link>
      </div>
    </section>
  );
}