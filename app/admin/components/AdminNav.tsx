"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/Logo";
import {
  Briefcase,
  ExternalLink,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { signOut } from "../actions";

type Counts = { applications: number; enquiries: number };

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
  count?: keyof Counts;
  match: (pathname: string) => boolean;
};

const groups: { label?: string; items: Item[] }[] = [
  {
    items: [
      {
        href: "/admin",
        label: "Overview",
        icon: LayoutDashboard,
        match: (p) => p === "/admin",
      },
    ],
  },
  {
    label: "Recruitment",
    items: [
      {
        href: "/admin/applications",
        label: "Applications",
        icon: Users,
        count: "applications",
        match: (p) => p.startsWith("/admin/applications"),
      },
      {
        href: "/admin/jobs",
        label: "Jobs",
        icon: Briefcase,
        match: (p) => p.startsWith("/admin/jobs"),
      },
    ],
  },
  {
    label: "Inbox",
    items: [
      {
        href: "/admin/enquiries",
        label: "Enquiries",
        icon: Mail,
        count: "enquiries",
        match: (p) => p.startsWith("/admin/enquiries"),
      },
    ],
  },
  {
    label: "Website",
    items: [
      {
        href: "/admin/content",
        label: "Pages",
        icon: FileText,
        match: (p) =>
          p.startsWith("/admin/content") && p !== "/admin/content/settings",
      },
      {
        href: "/admin/projects",
        label: "Projects",
        icon: FolderKanban,
        match: (p) => p.startsWith("/admin/projects"),
      },
      {
        href: "/admin/content/settings",
        label: "Navigation & settings",
        icon: Settings2,
        match: (p) => p === "/admin/content/settings",
      },
    ],
  },
];

export default function AdminNav({
  counts,
}: {
  counts: Counts;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-6">
      {groups.map((group, index) => (
        <div key={index}>
          {group.label && (
            <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              {group.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = item.match(pathname);
              const count = item.count ? counts[item.count] : 0;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-white font-medium text-ink shadow-[0_0_0_1px_var(--color-line)]"
                        : "text-ink-soft hover:bg-white/60 hover:text-ink"
                    }`}
                  >
                    <item.icon
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden
                      className={active ? "text-ink" : "text-muted"}
                    />
                    <span className="flex-1">{item.label}</span>
                    {count > 0 && (
                      <span
                        className="rounded-full bg-ink px-1.5 text-[11px] font-medium tabular-nums text-paper"
                        aria-label={`${count} new`}
                      >
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const footer = (
    <div className="space-y-0.5 border-t border-line px-3 py-4 text-sm">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-md px-3 py-2 text-ink-soft hover:text-ink"
      >
        <ExternalLink size={16} strokeWidth={1.75} aria-hidden className="text-muted" />
        View site
      </a>
      <form action={signOut}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-ink-soft hover:text-ink"
        >
          <LogOut size={16} strokeWidth={1.75} aria-hidden className="text-muted" />
          Sign out
        </button>
      </form>
    </div>
  );

  const logo = (
    <Link href="/admin" className="flex items-center gap-3">
      <Logo className="h-6 w-auto" />
      <span className="text-sm font-medium">Admin</span>
    </Link>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-paper-deep/60 lg:flex">
        <div className="flex h-16 items-center px-6">{logo}</div>
        {nav}
        {footer}
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-paper/95 px-4 backdrop-blur lg:hidden">
        {logo}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-mr-2 p-2"
        >
          <Menu size={20} strokeWidth={1.75} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/30"
          />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col bg-paper shadow-xl">
            <div className="flex h-14 items-center justify-between px-6">
              {logo}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="-mr-2 p-2"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>
            {nav}
            {footer}
          </aside>
        </div>
      )}
    </>
  );
}
