import Link from "next/link";
import { getContent } from "@/lib/content";
import { isExternalLink, serviceSlug } from "@/lib/content-schema";
import Logo from "./Logo";
import { Container } from "./ui";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-muted";

export default async function Footer() {
  const [site, services] = await Promise.all([
    getContent("settings"),
    getContent("services"),
  ]);

  return (
    <footer className="border-t border-line">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <div>
            <Logo className="h-9 w-auto" />
            <p className="font-display mt-5 text-3xl">{site.name}</p>
            {site.tagline && (
              <p className="mt-3 text-sm text-muted">{site.tagline}</p>
            )}
          </div>

          {services.categories.length > 0 && (
            <div>
              <p className={labelClass}>Services</p>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {services.categories.map((service) => (
                  <li key={service.title}>
                    <Link
                      href={`/services#${serviceSlug(service.title)}`}
                      className="text-ink-soft hover:text-ink"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
