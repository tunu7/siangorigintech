import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdmin()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="flex items-center gap-3 text-xs uppercase tracking-wider text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-md bg-brand" />
          Siang Origin Admin
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Sign in
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}
