import "server-only";

import { cache } from "react";
import { sql } from "@/lib/db";
import {
  normalizeSection,
  type SectionKey,
  type Sections,
} from "@/lib/content-schema";

// One query per request for every section; missing rows use defaults.
const loadContent = cache(async () => {
  try {
    const rows = (await sql()`
      select key, value from site_content
    `) as { key: string; value: unknown }[];

    return new Map(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    console.error("CONTENT LOAD ERROR:", error);
    return new Map<string, unknown>();
  }
});

export async function getContent<K extends SectionKey>(
  key: K
): Promise<Sections[K]> {
  const content = await loadContent();
  return normalizeSection(key, content.get(key));
}
