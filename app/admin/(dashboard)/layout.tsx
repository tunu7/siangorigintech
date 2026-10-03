import { requireAdmin } from "@/lib/auth";
import AdminHeader from "@/app/admin/components/AdminHeader";

// Shared chrome for every dashboard page. Layouts persist across client
// navigations, so the header renders once and only the page area changes.
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
