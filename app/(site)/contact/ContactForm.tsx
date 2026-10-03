"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Field, FormError, inputClass } from "@/app/components/form";
import { buttonClass } from "@/app/components/ui";
import { sendEnquiry, type ContactState } from "./actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    sendEnquiry,
    {}
  );

  if (state.sent) {
    return (
      <div className="rounded-xl border border-zinc-200 p-8">
        <CheckCircle2 className="text-brand" size={28} aria-hidden />
        <h2 className="mt-4 text-xl font-semibold">Message sent</h2>
        <p className="mt-2 text-zinc-600">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-6 sm:grid-cols-2">
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

      <Field id="message" label="What would you like to build?" required>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="A few lines about your project, goals and timeline."
          className={`${inputClass} resize-y`}
        />
      </Field>

      <FormError message={state.error} />

      <button type="submit" disabled={pending} className={buttonClass()}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
