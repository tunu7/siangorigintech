"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { buttonClass, Container } from "./ui";

export default function Navbar({
  brand,
}: {
  brand: { shortName: string; logoMark: string; navCta: string };
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
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-lg transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-zinc-200 bg-white/85 shadow-sm shadow-zinc-900/5"
          : "border-transparent bg-white/0"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[10px] font-bold text-white transition-transform duration-500 group-hover:rotate-[360deg]">
            {brand.logoMark}
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {brand.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks
            .filter((link) => link.href !== "/contact")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-1 text-sm transition-colors hover:text-zinc-900 ${
                  isActive(link.href)
                    ? "font-medium text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                {link.name}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}

          <Link href="/contact" className={buttonClass()}>
            {brand.navCta}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
          <Container className="flex flex-col border-t border-zinc-200 py-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${index * 50}ms` : "0ms",
                }}
                className={`py-3 text-base transition-all duration-300 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                } ${
                  isActive(link.href)
                    ? "font-medium text-zinc-900"
                    : "text-zinc-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </Container>
        </nav>
      </div>
    </header>
  );
}
