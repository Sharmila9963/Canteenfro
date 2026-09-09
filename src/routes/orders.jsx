import { createFileRoute, Link } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export const Route = createFileRoute("/orders")({
    head: () => ({
        meta: [
            { title: "My Orders — Canteen" },
            { name: "description", content: "Track your past and current orders." },
        ],
    }),
    component: () => (<ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>),
});
const statusStyles = {
    Preparing: "bg-warning/15 text-warning",
    Ready: "bg-success/15 text-success",
    Completed: "bg-muted text-muted-foreground",
};
function OrdersPage() {
    const { orders } = useApp();
    const { user } = useAuth();
    const mine = orders.filter((o) => !o.username || o.username === user?.username);
    return (<main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <p className="text-sm text-muted-foreground">Track your current and past orders.</p>

      {mine.length === 0 ? (<div className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
          <Receipt className="mx-auto h-10 w-10 text-muted-foreground"/>
          <p className="mt-3 text-sm text-muted-foreground">No orders yet.</p>
          <Link to="/menu" className="mt-4 inline-flex rounded-full px-5 py-2 text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            Order Now
          </Link>
        </div>) : (<ul className="mt-5 flex flex-col gap-3">
          {mine.map((o) => (<li key={o.id} className="rounded-2xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Token</p>
                  <p className="text-2xl font-black text-primary">{o.token}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[o.status]}`}>
                    {o.status}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${o.payment === "Paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {o.payment}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-sm">
                {o.items.map(({ item, quantity }) => (<div key={item.id} className="flex justify-between py-0.5">
                    <span>
                      {item.name} <span className="text-muted-foreground">× {quantity}</span>
                    </span>
                    <span>₹{item.price * quantity}</span>
                  </div>))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">Table T{o.table}</span>
                <span className="font-bold text-primary">₹{o.total}</span>
              </div>
            </li>))}
        </ul>)}
    </main>);
}
