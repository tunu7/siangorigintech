import "server-only";

import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon> | undefined;

// HTTP-based Neon driver: no connection pool to manage, ideal for
// short-lived Vercel Functions.
export function sql() {
  if (!client) {
    const url = process.env.DATABASE_URL;

    if (!url) {
      throw new Error("DATABASE_URL is not configured");
    }

    client = neon(url);
  }

  return client;
}
