import Link from "next/link";
import { signOut } from "../actions";

export default function AdminHeader() {
  return (
    <header className="border-b border-[#0B4D2C]/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/admin"
          className="text-sm font-semibold tracking-[-0.02em]"
        >
          SIANG ORIGIN{" "}
          <span className="font-normal text-[#617568]">/ Admin</span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-[#0B4D2C]/15 px-4 py-1.5 transition-colors hover:border-[#2F7D46] hover:text-[#2F7D46]"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
