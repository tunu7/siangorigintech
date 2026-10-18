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
      className="group flex h-full flex-col border-t border-line-strong pt-6 transition-colors hover:border-brand"
    >
      <div className="flex items-center justify-between">
        <ServiceIcon
          name={service.icon}
          size={22}
          className="text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          aria-hidden
          className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        />
      </div>

      <h3 className="font-display mt-6 text-3xl leading-tight transition-colors group-hover:text-brand">
        {service.title}
      </h3>
      {service.summary && <p className="mt-2 text-ink-soft">{service.summary}</p>}
      {detailed && service.description && (
        <p className="mt-4 text-sm leading-6 text-ink-soft">{service.description}</p>
      )}

      {items.length > 0 && (
        <p className="mt-5 text-sm leading-6 text-muted">
          {items.slice(0, PREVIEW).join(" · ")}
          {items.length > PREVIEW && (
            <span className="text-ink-soft"> · +{items.length - PREVIEW} more</span>
          )}
        </p>
      )}
    </Link>
  );
}
