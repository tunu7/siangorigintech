import Link from "next/link";
import { signOut } from "../actions";

export default function AdminHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/admin"
          className="text-sm font-semibold tracking-[-0.02em]"
        >
          SIANG ORIGIN{" "}
          <span className="font-normal text-zinc-500">/ Admin</span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md border border-zinc-300 px-4 py-1.5 transition-colors hover:border-brand hover:text-brand"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
