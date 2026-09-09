import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, Grid3x3, UtensilsCrossed, TrendingUp } from "lucide-react";
import { useApp } from "@/context/AppContext";
export const Route = createFileRoute("/admin/")({
    component: AdminDashboard,
});
function AdminDashboard() {
    const { menu, tables, orders } = useApp();
    const available = menu.filter((m) => m.available).length;
    const occupied = tables.filter((t) => t.status === "occupied").length;
    const active = orders.filter((o) => o.status !== "Completed").length;
    const revenue = orders.filter((o) => o.payment === "Paid").reduce((s, o) => s + o.total, 0);
    const stats = [
        { label: "Menu items live", value: `${available}/${menu.length}`, icon: UtensilsCrossed, to: "/admin/menu" },
        { label: "Tables occupied", value: `${occupied}/${tables.length}`, icon: Grid3x3, to: "/admin/tables" },
        { label: "Active orders", value: active, icon: ClipboardList, to: "/admin/orders" },
        { label: "Revenue today", value: `₹${revenue}`, icon: TrendingUp, to: "/admin/orders" },
    ];
    return (<main className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-muted-foreground">An overview of your canteen.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, to }) => (<Link key={label} to={to} className="rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between">
              <Icon className="h-5 w-5 text-primary"/>
            </div>
            <p className="mt-3 text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </Link>))}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Recent orders</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card">
          {orders.length === 0 ? (<p className="p-6 text-center text-sm text-muted-foreground">No orders yet.</p>) : (<ul className="divide-y divide-border">
              {orders.slice(0, 5).map((o) => (<li key={o.id} className="flex items-center justify-between gap-2 p-4 text-sm">
                  <span className="font-bold text-primary">{o.token}</span>
                  <span className="text-muted-foreground">T{o.table}</span>
                  <span>₹{o.total}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${o.payment === "Paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {o.payment}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{o.status}</span>
                </li>))}
            </ul>)}
        </div>
      </section>
    </main>);
}
