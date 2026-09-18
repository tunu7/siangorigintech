"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  {
    name: "Work",
    href: "/work",
    number: "01",
  },
  {
    name: "About",
    href: "/about",
    number: "02",
  },
  {
    name: "Contact",
    href: "/contact",
    number: "03",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================== */}

      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-black/10 bg-[#f7f7f5]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-350 items-center justify-between px-5 sm:px-6 lg:px-10">

          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group relative z-60 flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[10px] font-bold tracking-tight text-white transition-transform duration-300 group-hover:rotate-12">
              SO
            </span>

            <span className="text-sm font-semibold tracking-[-0.02em] text-black">
              SIANG ORIGIN
            </span>
          </Link>

          {/* =========================
              DESKTOP NAV
          ========================== */}

          <nav className="hidden items-center lg:flex">

            <div className="mr-10 flex items-center gap-9">

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm text-neutral-500 transition-colors duration-300 hover:text-black"
                >
                  <span>
                    {link.name}
                  </span>

                  {/* Underline */}

                  <span className="absolute -bottom-2 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />

                  {/* Number */}

                  <span className="absolute -right-2 -top-3 text-[8px] text-neutral-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {link.number}
                  </span>
                </Link>
              ))}

            </div>

            {/* DESKTOP CTA */}

            <Link
              href="/contact"
              className="group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              <span className="text-white">
                Start a project
              </span>

              <ArrowUpRight
                size={15}
                className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

          </nav>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-60 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[#f7f7f5]/80 text-black transition-all duration-300 hover:bg-white lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>

        </div>
      </header>

      {/* =========================
          MOBILE MENU
      ========================== */}

      <div
        className={`fixed inset-0 z-40 bg-[#f7f7f5] transition-all duration-500 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >

        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-32">

          {/* NAVIGATION */}

          <nav className="flex flex-col">

            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`group flex items-center justify-between border-t border-black/10 py-6 transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >

                <div className="flex items-center gap-4">

                  <span className="text-xs text-neutral-400">
                    {link.number}
                  </span>

                  <span className="text-4xl font-medium tracking-tight text-black">
                    {link.name}
                  </span>

                </div>

                <ArrowUpRight
                  size={24}
                  className="text-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              </Link>
            ))}

            {/* MOBILE CTA */}

            <Link
              href="/contact"
              onClick={closeMenu}
              className={`group mt-8 flex items-center justify-between rounded-full bg-black px-6 py-5 text-white transition-all duration-500 hover:bg-neutral-800 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionDelay: "240ms",
              }}
            >

              <span className="text-base font-medium text-white">
                Start a project
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>

            </Link>

          </nav>

          {/* MOBILE FOOTER */}

          <div
            className={`transition-all duration-700 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: "300ms",
            }}
          >

            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              Technology · Growth · AI
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5 text-xs text-neutral-400">
              <span>
                Siang Origin Technologies
              </span>

              <span>
                © {new Date().getFullYear()}
              </span>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}