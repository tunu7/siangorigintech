import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#0B4D2C]/10 bg-[#F7FAF7]">

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="flex flex-col justify-between gap-10 md:flex-row">

          {/* BRAND */}

          <div>
            <p className="text-sm font-semibold tracking-[-0.02em] text-[#06351F]">
              SIANG ORIGIN
            </p>

            <p className="mt-3 flex items-center gap-2 text-sm text-[#617568]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />
              Technology · Growth · AI
            </p>
          </div>

          {/* NAVIGATION */}

          <div className="flex gap-8 text-sm text-[#617568]">

            <Link
              href="/work"
              className="transition-colors duration-300 hover:text-[#0B4D2C]"
            >
              Work
            </Link>

            <Link
              href="/about"
              className="transition-colors duration-300 hover:text-[#0B4D2C]"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition-colors duration-300 hover:text-[#0B4D2C]"
            >
              Contact
            </Link>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[#0B4D2C]/10 pt-6 text-xs text-[#617568] md:flex-row">

          <span>
            © {new Date().getFullYear()} Siang Origin Technologies
          </span>

          <span className="text-[#2F7D46]">
            Built with intent.
          </span>

        </div>

      </div>

    </footer>
  );
}