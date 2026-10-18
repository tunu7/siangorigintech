"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Field, FormError, inputClass } from "@/app/components/form";
import { buttonClass } from "@/app/components/ui";
import { sendEnquiry, type ContactState } from "./actions";

export type ServiceOption = { slug: string; title: string };
export type ServiceGroup = { title: string; services: ServiceOption[] };

export default function ContactForm({
  text,
  groups,
  selected = [],
  source = "",
}: {
  groups: ServiceGroup[];
  // Slugs ticked when the form opens, e.g. from /contact?service=seo.
  selected?: string[];
  // The page the visitor came from.
  source?: string;
  text: {
    messageLabel: string;
    messagePlaceholder: string;
    successTitle: string;
    successText: string;
  };
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendEnquiry,
    {}
  );

  if (state.sent) {
    return (
      <div className="animate-fade-up border-t border-ink pt-10">
        <h2 className="font-display text-4xl">{text.successTitle}</h2>
        <p className="mt-4 text-lg leading-8 text-ink-soft">
          {text.successText}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-10">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="source" value={source} />

      {groups.length > 0 && (
        <fieldset>
          <legend className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            What can we help with?
            <span className="normal-case tracking-normal text-muted/70">
              {" "}
              — pick any that apply
            </span>
          </legend>

          <div className="mt-5 space-y-5">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-xs text-muted">{group.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.services.map((service) => (
                    <label key={service.slug} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={service.slug}
                        defaultChecked={selected.includes(service.slug)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex items-center rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2">
                        {service.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="name" label="Name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field id="email" label="Email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="message" label={text.messageLabel} required>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={text.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <FormError message={state.error} />

      <button type="submit" disabled={pending} className={buttonClass()}>
        {pending && (
          <Loader2 size={16} className="animate-spin" aria-hidden />
        )}
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
