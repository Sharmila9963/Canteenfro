import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Wallet, Smartphone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
export const Route = createFileRoute("/payment")({
    head: () => ({
        meta: [
            { title: "Payment — Canteen" },
            { name: "description", content: "Review and pay for your canteen order." },
        ],
    }),
    component: () => (<ProtectedRoute>
      <PaymentPage />
    </ProtectedRoute>),
});
const methods = [
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "card", label: "Card", icon: CreditCard },
    { id: "wallet", label: "Wallet", icon: Wallet },
];
function PaymentPage() {
    const { cartLines, cartTotal, selectedTable, createOrder } = useApp();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [method, setMethod] = useState("upi");
    const [paying, setPaying] = useState(false);
    if (cartLines.length === 0 || selectedTable === null) {
        return <Navigate to="/cart"/>;
    }
    const handlePay = () => {
        setPaying(true);
        setTimeout(() => {
            const order = createOrder(user?.username);
            if (order) {
                sessionStorage.setItem("lastOrderId", order.id);
                navigate({ to: "/token" });
            }
        }, 800);
    };
    return (<main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-bold">Payment</h1>
      <p className="text-sm text-muted-foreground">Review your order and complete payment.</p>

      <section className="mt-4 rounded-2xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="text-sm font-semibold text-muted-foreground">Order Summary</h2>
        <ul className="mt-3 divide-y divide-border">
          {cartLines.map(({ item, quantity }) => (<li key={item.id} className="flex items-center justify-between py-2 text-sm">
              <span>
                {item.name} <span className="text-muted-foreground">× {quantity}</span>
              </span>
              <span className="font-semibold">₹{item.price * quantity}</span>
            </li>))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm text-muted-foreground">Table</span>
          <span className="font-semibold">T{selectedTable}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-base font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">₹{cartTotal}</span>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-muted-foreground">Payment Method</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {methods.map(({ id, label, icon: Icon }) => (<button key={id} onClick={() => setMethod(id)} className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${method === id ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary"}`}>
              <Icon className={`h-5 w-5 ${method === id ? "text-primary" : "text-muted-foreground"}`}/>
              <span className="text-xs font-semibold">{label}</span>
            </button>))}
        </div>
      </section>

      <button disabled={paying} onClick={handlePay} className="mt-8 w-full rounded-xl py-3.5 font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60" style={{ background: "var(--gradient-primary)" }}>
        {paying ? "Processing…" : `Pay ₹${cartTotal} Now`}
      </button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        This is a mock payment. No real charge will be made.
      </p>
    </main>);
}
