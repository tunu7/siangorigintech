"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({
  counts,
}: {
  counts: { applications: number; enquiries: number };
}) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Applications",
      count: counts.applications,
      active:
        pathname === "/admin" || pathname.startsWith("/admin/applications"),
    },
    {
      href: "/admin/jobs",
      label: "Jobs",
      active: pathname.startsWith("/admin/jobs"),
    },
    {
      href: "/admin/enquiries",
      label: "Enquiries",
      count: counts.enquiries,
      active: pathname.startsWith("/admin/enquiries"),
    },
  ];

  return (
    <nav className="flex items-center gap-1 text-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={link.active ? "page" : undefined}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors ${
            link.active
              ? "bg-zinc-100 font-medium text-zinc-900"
              : "text-zinc-500 hover:text-zinc-900"
          }`}
        >
          {link.label}
          {link.count ? (
            <span
              className="rounded-full bg-brand px-1.5 text-xs font-medium tabular-nums text-white"
              aria-label={`${link.count} new`}
            >
              {link.count}
            </span>
          ) : null}
        </Link>
      ))}
    </nav>
  );
}
