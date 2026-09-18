import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-end pb-16 pt-32 lg:pb-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-6xl">

          <p className="mb-8 text-xs uppercase tracking-[0.25em] text-neutral-500">
            Technology · Growth · AI
          </p>

          <h1 className="text-[15vw] font-medium leading-[0.82] tracking-[-0.07em] sm:text-8xl lg:text-[9rem]">
            WE BUILD
            <br />
            <span className="text-neutral-400">DIGITAL</span>
            <br />
            EXPERIENCES.
          </h1>

          <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <p className="max-w-md text-base leading-7 text-neutral-500">
              Siang Origin Technologies is a technology studio building
              digital experiences, growth systems and intelligent products.
            </p>

            <Link
              href="/work"
              className="group flex w-fit items-center gap-3 text-sm font-medium"
            >
              Explore our work
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>

          <div className="mt-20 flex items-center gap-3 text-xs uppercase tracking-widest text-neutral-400">
            <ArrowDown size={14} />
            Scroll to explore
          </div>

        </div>
      </div>
    </section>
  );
}