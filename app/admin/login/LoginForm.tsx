"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "../actions";

const inputClass =
  "mt-2 w-full border-b border-[#0B4D2C]/15 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-[#AAB8AF] focus:border-[#2F7D46]";

export default function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    signIn,
    {}
  );

  return (
    <form action={action} className="mt-10 space-y-6">
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

      {state.error && (
        <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#0B4D2C] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#176B3A] disabled:opacity-50"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
