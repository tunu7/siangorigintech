"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/site";
import { buttonClass, Container } from "./ui";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[10px] font-bold text-white">
            SO
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Siang Origin
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks
            .filter((link) => link.href !== "/contact")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-zinc-900 ${
                  isActive(link.href)
                    ? "font-medium text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                {link.name}
              </Link>
            ))}

          <Link href="/contact" className={buttonClass()}>
            Contact us
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

      {menuOpen && (
        <nav className="border-t border-zinc-200 bg-white md:hidden">
          <Container className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-base ${
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
      )}
    </header>
  );
}
