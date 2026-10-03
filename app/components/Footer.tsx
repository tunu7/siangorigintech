import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <Container className="py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="text-sm font-semibold">{site.name}</p>
            <p className="mt-2 text-sm text-zinc-500">{site.tagline}</p>
            <p className="text-sm text-zinc-500">{site.location}</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-500">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-zinc-900"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights
            reserved.
          </span>
          <a
            href={`mailto:${site.contactEmail}`}
            className="hover:text-zinc-900"
          >
            {site.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
