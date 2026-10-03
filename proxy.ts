import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

// Optimistic check: bounce visitors without a valid session cookie.
// Pages and route handlers still verify the session themselves.
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const valid = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  if (!valid) {
    const login = new URL("/admin/login", request.url);
    const { pathname, search } = request.nextUrl;

    // Send the admin back where they were going after signing in.
    if (request.method === "GET" && pathname !== "/admin") {
      login.searchParams.set("next", `${pathname}${search}`);
    }

    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
