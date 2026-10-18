"use client";

import { useSearchParams } from "next/navigation";
import ContactForm from "./ContactForm";

// Reads ?service=<slug> (repeatable) and ?from=<path> so the form opens
// with the service the visitor was looking at already ticked.
export default function ContactFormFromUrl(
  props: Omit<React.ComponentProps<typeof ContactForm>, "selected" | "source">
) {
  const params = useSearchParams();
  const from = params.get("from") ?? "";
  const fromService = from.match(/^\/services\/([\w-]+)$/)?.[1];

  const selected = [
    ...params.getAll("service"),
    ...(fromService ? [fromService] : []),
  ];

  return (
    <ContactForm
      // Re-mount when the query changes so the ticked boxes follow it.
      key={params.toString()}
      {...props}
      selected={selected}
      source={from}
    />
  );
}
