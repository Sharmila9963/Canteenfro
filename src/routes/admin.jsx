import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminMobileNav, AdminSidebar } from "@/components/AdminSidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export const Route = createFileRoute("/admin")({
    head: () => ({
        meta: [
            { title: "Admin — Canteen" },
            { name: "description", content: "Manage menu, tables, and orders for the canteen." },
        ],
    }),
    component: () => (<ProtectedRoute requireAdmin>
      <AdminLayout />
    </ProtectedRoute>),
});
function AdminLayout() {
    return (<div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav />
        <Outlet />
      </div>
    </div>);
}
