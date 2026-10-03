"use client";

import { useActionState } from "react";
import { FormError, inputClass } from "@/app/components/form";
import { buttonClass } from "@/app/components/ui";
import { signIn, type FormState } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    signIn,
    {}
  );

  return (
    <form action={action} className="mt-8 space-y-6">
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      <FormError message={state.error} />

      <button
        type="submit"
        disabled={pending}
        className={`${buttonClass()} w-full`}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
