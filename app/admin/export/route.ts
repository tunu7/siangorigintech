import { NextResponse, type NextRequest } from "next/server";
import {
  exportApplications,
  parseFilters,
} from "@/lib/admin-queries";
import type { Application } from "@/lib/applications";
import { isAdmin } from "@/lib/auth";

const COLUMNS = [
  "created_at",
  "job_title",
  "name",
  "email",
  "phone",
  "linkedin",
  "portfolio",
  "status",
  "notes",
  "message",
] as const satisfies readonly (keyof Application)[];

function csvCell(value: unknown) {
  let text =
    value instanceof Date ? value.toISOString() : String(value ?? "");

  // Neutralise spreadsheet formula injection.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;

  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const filters = parseFilters(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  let rows: Application[];

  try {
    rows = await exportApplications(filters);
  } catch (error) {
    console.error("EXPORT ERROR:", error);
    return new NextResponse("Export failed", { status: 500 });
  }

  const csv = [
    COLUMNS.join(","),
    ...rows.map((row) =>
      COLUMNS.map((column) => csvCell(row[column])).join(",")
    ),
  ].join("\n");

  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="applications-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
