import { createFileRoute } from "@tanstack/react-router";
import { Clock, Receipt } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatUntil, minutesLeft } from "@/data/tables";
export const Route = createFileRoute("/admin/tables")({
    component: AdminTables,
});
function AdminTables() {
    const { tables, setTableStatus, orders } = useApp();
    const tokenFor = (tableId) => {
        const active = orders
            .filter((o) => o.table === tableId && o.status !== "Completed")
            .sort((a, b) => b.createdAt - a.createdAt)[0];
        return active ?? null;
    };
    const occupy = (id) => {
        // Default to 30 min from now
        setTableStatus(id, "occupied", Date.now() + 30 * 60_000);
    };
    const free = (id) => setTableStatus(id, "available", null);
    return (<main className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold">Table Management</h1>
      <p className="text-sm text-muted-foreground">
        Tables auto-free when their time passes. Use the buttons to override.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {tables.map((t) => {
            const occupied = t.status === "occupied";
            const mins = minutesLeft(t.occupiedUntil);
            const order = tokenFor(t.id);
            return (<div key={t.id} className={`rounded-2xl border-2 p-3 transition ${occupied ? "border-destructive/40 bg-destructive/5" : "border-success/40 bg-success/5"}`} style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-black">T{t.id}</p>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${occupied ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success"}`}>
                  {occupied ? "Occupied" : "Available"}
                </span>
              </div>
              {occupied && order && (<div className="mt-2 rounded-lg bg-card p-2">
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Receipt className="h-3 w-3"/> Token
                  </div>
                  <p className="text-sm font-bold text-primary">{order.token}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {order.payment} · {order.status}
                  </p>
                </div>)}
              <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3"/>
                {occupied ? `Until ${formatUntil(t.occupiedUntil)} (${mins}m)` : "Ready"}
              </div>
              <div className="mt-3 flex gap-1">
                {occupied ? (<>
                    <button onClick={() => setTableStatus(t.id, "occupied", Date.now() + 15 * 60_000)} className="flex-1 rounded-lg bg-secondary px-2 py-1 text-[10px] font-semibold hover:bg-accent">
                      +15m
                    </button>
                    <button onClick={() => free(t.id)} className="flex-1 rounded-lg bg-success/20 px-2 py-1 text-[10px] font-semibold text-success hover:bg-success/30">
                      Free now
                    </button>
                  </>) : (<button onClick={() => occupy(t.id)} className="flex-1 rounded-lg bg-destructive/15 px-2 py-1 text-[10px] font-semibold text-destructive hover:bg-destructive/25">
                    Occupy 30m
                  </button>)}
              </div>
            </div>);
        })}
      </div>
    </main>);
}
