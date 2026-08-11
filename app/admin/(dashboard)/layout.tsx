import "../admin.css";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}
