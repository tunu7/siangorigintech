import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="border-t border-[#0B4D2C]/10 bg-[#F7FAF7] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2">

          {/* LABEL */}

          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              About Siang Origin
            </p>
          </div>

          {/* CONTENT */}

          <div>

            <p className="text-3xl font-medium leading-tight tracking-tight text-[#06351F] md:text-5xl">
              We are building a technology company around useful digital
              products, ambitious businesses and ideas worth exploring.
            </p>

            {/* CTA */}

            <Link
              href="/about"
              className="group mt-10 flex w-fit items-center gap-3 text-sm font-medium text-[#0B4D2C]"
            >
              <span className="relative">
                More about us

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2F7D46] transition-all duration-300 group-hover:w-full" />
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B4D2C]/15 transition-all duration-300 group-hover:border-[#2F7D46]/30 group-hover:bg-[#EAF3EC]">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}