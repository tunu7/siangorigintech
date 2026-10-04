"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isExternalLink } from "@/lib/content-schema";
import Logo from "./Logo";
import { buttonClass, Container } from "./ui";

export default function Navbar({
  brand,
}: {
  brand: {
    shortName: string;
    navCta: string;
    navCtaHref: string;
    nav: { label: string; href: string }[];
  };
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/") &&
    (href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-6 w-auto" />
          <span className="text-sm font-medium tracking-tight">
            {brand.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {brand.nav
            .filter((link) => link.href !== brand.navCtaHref)
            .map((link) => (
              <NavLink
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={`text-sm transition-colors hover:text-ink ${
                  isActive(link.href) ? "text-ink" : "text-muted"
                }`}
              >
                {link.label}
              </NavLink>
            ))}

          <NavLink
            href={brand.navCtaHref}
            className={`${buttonClass()} px-4! py-2!`}
          >
            {brand.navCta}
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="-mr-2 px-2 py-2 text-sm md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </Container>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className="overflow-hidden"
        >
          <Container className="flex flex-col pb-8 pt-4">
            {brand.nav.map((link, index) => (
              <NavLink
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                }}
                className={`font-display border-b border-line py-4 text-4xl transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                } ${isActive(link.href) ? "text-ink" : "text-ink-soft"}`}
              >
                {link.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      </div>
    </header>
  );
}

// Internal paths use client-side navigation; external links open in a new
// tab.
function NavLink({
  href,
  ...props
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        {...props}
      />
    );
  }

  return <Link href={href} {...props} />;
}
