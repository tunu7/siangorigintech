"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { FormError, inputClass } from "@/app/components/form";
import { buttonClass } from "@/app/components/ui";
import { signIn, type FormState } from "../actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    signIn,
    {}
  );
  const [visible, setVisible] = useState(false);

  return (
    <form action={action} className="mt-6 space-y-5">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            required
            autoFocus
            autoComplete="current-password"
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 mt-2 flex w-11 items-center justify-center text-zinc-400 hover:text-zinc-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <FormError message={state.error} />

      <button
        type="submit"
        disabled={pending}
        className={`${buttonClass()} w-full`}
      >
        {pending && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
