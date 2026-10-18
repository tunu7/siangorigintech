import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceSlug, splitItems, type Service } from "@/lib/content-schema";
import ServiceIcon from "./ServiceIcon";

// How many sub-services a card previews before "+N more".
const PREVIEW = 4;

export default function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  // Adds the description, for the services overview.
  detailed?: boolean;
}) {
  const items = splitItems(service.items);

  return (
    <Link
      href={`/services/${serviceSlug(service.title)}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-30px_rgb(11_77_44/0.45)]"
    >
      {/* Hover wash. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-mint/0 blur-3xl transition-colors duration-500 group-hover:bg-mint/50"
      />

      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-deep text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-lime">
        <ServiceIcon name={service.icon} size={22} />
      </span>

      <h3 className="font-display relative mt-8 text-3xl leading-tight">
        {service.title}
      </h3>
      {service.summary && (
        <p className="relative mt-2 text-ink-soft">{service.summary}</p>
      )}
      {detailed && service.description && (
        <p className="relative mt-4 text-sm leading-6 text-ink-soft">
          {service.description}
        </p>
      )}

      {items.length > 0 && (
        <p className="relative mt-6 flex-1 text-sm leading-6 text-muted">
          {items.slice(0, PREVIEW).join(" · ")}
          {items.length > PREVIEW && (
            <span className="text-ink-soft"> · +{items.length - PREVIEW} more</span>
          )}
        </p>
      )}

      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        Explore {service.title}
        <ArrowUpRight
          size={15}
          strokeWidth={1.75}
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
