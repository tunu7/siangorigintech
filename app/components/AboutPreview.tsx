import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="border-t border-neutral-300 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2">

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            About Siang Origin
          </p>

          <div>
            <p className="text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              We are building a technology company around useful digital
              products, ambitious businesses and ideas worth exploring.
            </p>

            <Link
              href="/about"
              className="group mt-10 flex w-fit items-center gap-2 text-sm font-medium"
            >
              More about us
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}