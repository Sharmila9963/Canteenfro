import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { CheckCircle2, Receipt } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export const Route = createFileRoute("/token")({
    head: () => ({
        meta: [
            { title: "Order Confirmed — Canteen" },
            { name: "description", content: "Your order is in. Here is your token number and table." },
        ],
    }),
    component: () => (<ProtectedRoute>
      <TokenPage />
    </ProtectedRoute>),
});
function TokenPage() {
    const { orders } = useApp();
    const lastId = typeof window !== "undefined" ? sessionStorage.getItem("lastOrderId") : null;
    const order = orders.find((o) => o.id === lastId) ?? orders[0];
    if (!order)
        return <Navigate to="/menu"/>;
    return (<main className="mx-auto max-w-md px-4 py-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="p-6 text-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <CheckCircle2 className="mx-auto h-12 w-12"/>
          <h1 className="mt-2 text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-sm opacity-90">Your food is being prepared</p>
        </div>

        <div className="p-6">
          <div className="rounded-2xl bg-secondary p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Token Number</p>
            <p className="mt-1 text-5xl font-black tracking-tight text-primary">{order.token}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Show this token to collect your food.</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[11px] uppercase text-muted-foreground">Table</p>
              <p className="text-xl font-bold">T{order.table}</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[11px] uppercase text-muted-foreground">Payment</p>
              <p className="text-sm font-bold text-success">{order.payment}</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[11px] uppercase text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-primary">₹{order.total}</p>
            </div>
          </div>

          <div className="my-4 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Receipt className="h-3.5 w-3.5"/> Order details
          </div>
          <ul className="space-y-1.5 text-sm">
            {order.items.map(({ item, quantity }) => (<li key={item.id} className="flex justify-between">
                <span>
                  {item.name} <span className="text-muted-foreground">× {quantity}</span>
                </span>
                <span className="font-semibold">₹{item.price * quantity}</span>
              </li>))}
          </ul>

          <div className="mt-6 flex gap-2">
            <Link to="/orders" className="flex-1 rounded-xl border border-border bg-card py-2.5 text-center text-sm font-semibold hover:bg-secondary">
              View Orders
            </Link>
            <Link to="/menu" className="flex-1 rounded-xl py-2.5 text-center text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Order More
            </Link>
          </div>
        </div>

        <div className="relative h-4 bg-card">
          <div className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-background"/>
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-background"/>
        </div>
      </div>
    </main>);
}
