import Link from "next/link";
import { getContent } from "@/lib/content";
import { isExternalLink } from "@/lib/content-schema";
import { Container } from "./ui";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-muted";

export default async function Footer() {
  const site = await getContent("settings");

  return (
    <footer className="border-t border-line">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-3xl">{site.name}</p>
            {site.tagline && (
              <p className="mt-3 text-sm text-muted">{site.tagline}</p>
            )}
          </div>

          <div>
            <p className={labelClass}>Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  {isExternalLink(link.href) ? (
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="text-ink-soft hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-ink-soft hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={labelClass}>Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-ink-soft hover:text-ink"
                >
                  {site.contactEmail}
                </a>
              </li>
              {site.location && <li className="text-muted">{site.location}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <Link href="/admin" prefetch={false} className="hover:text-ink">
            Team login
          </Link>
        </div>
      </Container>
    </footer>
  );
}
