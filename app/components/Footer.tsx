import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-300">

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="flex flex-col justify-between gap-10 md:flex-row">

          <div>
            <p className="text-sm font-semibold">
              SIANG ORIGIN
            </p>

            <p className="mt-3 text-sm text-neutral-500">
              Technology · Growth · AI
            </p>
          </div>

          <div className="flex gap-8 text-sm text-neutral-500">
            <Link href="/work" className="hover:text-black">
              Work
            </Link>

            <Link href="/about" className="hover:text-black">
              About
            </Link>

            <Link href="/contact" className="hover:text-black">
              Contact
            </Link>
          </div>

        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-neutral-300 pt-6 text-xs text-neutral-400 md:flex-row">
          <span>
            © {new Date().getFullYear()} Siang Origin Technologies
          </span>

          <span>
            Built with intent.
          </span>
        </div>

      </div>

    </footer>
  );
}