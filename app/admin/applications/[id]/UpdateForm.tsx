"use client";

import { useActionState } from "react";
import {
  updateApplication,
  type FormState,
} from "../../actions";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/lib/applications";

export default function UpdateForm({
  id,
  status,
  notes,
}: {
  id: string;
  status: ApplicationStatus;
  notes: string;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    updateApplication,
    {}
  );

  return (
    <form
      action={action}
      className="space-y-4 rounded-xl border border-[#0B4D2C]/10 bg-white p-4"
    >
      <input type="hidden" name="id" value={id} />

      <div>
        <label
          htmlFor="status"
          className="text-xs uppercase tracking-wider text-[#617568]"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="mt-2 w-full rounded-lg border border-[#0B4D2C]/15 px-3 py-2 text-sm capitalize outline-none focus:border-[#2F7D46]"
        >
          {APPLICATION_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="text-xs uppercase tracking-wider text-[#617568]"
        >
          Internal notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={6}
          defaultValue={notes}
          placeholder="Interview feedback, follow-ups..."
          className="mt-2 w-full resize-y rounded-lg border border-[#0B4D2C]/15 px-3 py-2 text-sm outline-none focus:border-[#2F7D46]"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-[#0B4D2C] px-4 py-2 text-sm font-medium text-white hover:bg-[#176B3A] disabled:opacity-50"
      >
        {pending ? "Saving..." : state.saved ? "Saved ✓" : "Save changes"}
      </button>
    </form>
  );
}
