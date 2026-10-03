import Link from "next/link";
import { getContent } from "@/lib/content";
import { isExternalLink } from "@/lib/content-schema";
import { Container } from "./ui";

export default async function Footer() {
  const site = await getContent("settings");

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
            {site.nav.map((link) =>
              isExternalLink(link.href) ? (
                <a
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="hover:text-zinc-900"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights
            reserved.
          </span>
          <div className="flex gap-6">
            <a
              href={`mailto:${site.contactEmail}`}
              className="hover:text-zinc-900"
            >
              {site.contactEmail}
            </a>
            <Link href="/admin" prefetch={false} className="hover:text-zinc-900">
              Team login
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
