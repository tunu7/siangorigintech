// Applies db/migrations/*.sql in order. Every migration is idempotent.
// Usage: npm run db:migrate   (reads DATABASE_URL from .env.local)
import { readdir, readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!url) {
  console.error("DATABASE_URL is not set. Run `vercel env pull` first.");
  process.exit(1);
}

const pool = new Pool({ connectionString: url });
const dir = new URL("../db/migrations/", import.meta.url);
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

try {
  for (const file of files) {
    await pool.query(await readFile(new URL(file, dir), "utf8"));
    console.log(`✓ ${file}`);
  }
} finally {
  await pool.end();
}
