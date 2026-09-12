import { Outlet } from "react-router-dom";
import { AdminMobileNav, AdminSidebar } from "../../components/AdminSidebar";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export default function AdminLayout() {
  return <ProtectedRoute requireAdmin><div className="flex min-h-screen bg-background"><AdminSidebar/><div className="flex min-w-0 flex-1 flex-col"><AdminMobileNav/><Outlet/></div></div></ProtectedRoute>;
}
