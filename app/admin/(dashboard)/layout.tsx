import { requireAdmin } from "@/lib/auth";
import AdminHeader from "@/app/admin/components/AdminHeader";

// Shared chrome for every dashboard page. Layouts persist across client
// navigations, so the sidebar renders once and only the page area changes.
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdmin();

  return (
    <div className="lg:flex">
      <AdminHeader />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
