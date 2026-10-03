import "server-only";

import {
  neon,
  type NeonQueryFunction,
  type NeonQueryPromise,
} from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | undefined;

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

type Query = NeonQueryPromise<false, false>;

// Runs several read queries in a single HTTP round trip (one read-only
// transaction). Each round trip costs far more than the queries
// themselves, so pages should load everything they need through one batch.
export async function batch<T extends unknown[]>(queries: {
  [K in keyof T]: Query;
}): Promise<T> {
  return (await sql().transaction(queries as Query[], {
    readOnly: true,
  })) as unknown as T;
}
