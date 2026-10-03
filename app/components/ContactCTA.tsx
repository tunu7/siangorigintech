import Link from "next/link";
import { Container } from "./ui";

export default function ContactCTA() {
  return (
    <section className="border-t border-zinc-200 py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 rounded-xl bg-brand p-10 text-white sm:p-14 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-white/75">
              Tell us what you&apos;re building. We&apos;d love to hear
              about it.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-brand transition-colors hover:bg-zinc-100"
          >
            Start a conversation
          </Link>
        </div>
      </Container>
    </section>
  );
}
