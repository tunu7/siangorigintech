import { Suspense } from "react";
import { sql } from "@/lib/db";
import AdminNav from "./AdminNav";

async function NavWithCounts() {
  let counts = { applications: 0, enquiries: 0 };

  try {
    const [row] = (await sql()`
      select
        (select count(*)::int from applications where status = 'new') as applications,
        (select count(*)::int from enquiries
          where read_at is null and not archived) as enquiries
    `) as (typeof counts)[];
    counts = row;
  } catch (error) {
    console.error("ADMIN COUNTS ERROR:", error);
  }

  return <AdminNav counts={counts} />;
}

// Sidebar navigation. Counts stream in without blocking the page.
export default function AdminHeader() {
  return (
    <Suspense
      fallback={
        <AdminNav counts={{ applications: 0, enquiries: 0 }} />
      }
    >
      <NavWithCounts />
    </Suspense>
  );
}
