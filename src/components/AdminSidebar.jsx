import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, UtensilsCrossed, Grid3x3, ClipboardList, ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/menu", label: "Menu Management", icon: UtensilsCrossed },
    { to: "/admin/tables", label: "Table Management", icon: Grid3x3 },
    { to: "/admin/orders", label: "Orders", icon: ClipboardList },
];
export function AdminSidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate({ to: "/" });
    };
    return (<aside className="hidden w-64 shrink-0 border-r border-border bg-card md:block">
      <div className="sticky top-0 flex h-screen flex-col p-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <UtensilsCrossed className="h-5 w-5"/>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Canteen</p>
            <p className="text-[11px] text-muted-foreground">Admin Panel</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {links.map(({ to, label, icon: Icon, exact }) => (<Link key={to} to={to} activeOptions={{ exact }} activeProps={{ className: "bg-primary/10 text-primary font-semibold" }} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              <Icon className="h-4 w-4"/>
              {label}
            </Link>))}
        </nav>

        {user && (<div className="mt-2 rounded-lg border border-border p-2 text-xs">
            <p className="font-semibold">@{user.username}</p>
            <p className="text-[10px] uppercase text-muted-foreground">{user.role}</p>
          </div>)}

        <button onClick={handleLogout} className="mt-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-3 w-3"/> Logout
        </button>

        <Link to="/" className="mt-2 flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-secondary">
          <ArrowLeft className="h-3 w-3"/>
          Back to user app
        </Link>
      </div>
    </aside>);
}
export function AdminMobileNav() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return (<nav className="flex gap-1 overflow-x-auto border-b border-border bg-card p-2 md:hidden">
      {links.map(({ to, label, icon: Icon, exact }) => (<Link key={to} to={to} activeOptions={{ exact }} activeProps={{ className: "bg-primary text-primary-foreground" }} className="flex shrink-0 items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-medium">
          <Icon className="h-3.5 w-3.5"/>
          {label}
        </Link>))}
      <button onClick={() => {
            logout();
            navigate({ to: "/" });
        }} className="ml-auto flex shrink-0 items-center gap-1 rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
        <LogOut className="h-3.5 w-3.5"/> Logout
      </button>
    </nav>);
}
