import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_MS,
  verifySessionToken,
} from "@/lib/session";

export const isAdmin = cache(async () => {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
});

export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) return false;

  const digest = (value: string) =>
    createHash("sha256").update(value).digest();

  return timingSafeEqual(digest(password), digest(expected));
}

export async function startSession() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function endSession() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: "/admin" });
}
