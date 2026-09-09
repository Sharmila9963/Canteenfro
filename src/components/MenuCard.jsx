import { useApp } from "@/context/AppContext";
import { QuantityControl } from "./QuantityControl";
export function MenuCard({ item }) {
    const { cart, addItem, removeItem } = useApp();
    const qty = cart[item.id] ?? 0;
    return (<article className="group flex gap-4 rounded-2xl border border-border bg-card p-3 transition hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
        <img src={item.image} alt={item.name} loading="lazy" width={300} height={300} className={`h-full w-full object-cover transition group-hover:scale-105 ${!item.available ? "grayscale" : ""}`}/>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.available
            ? "bg-success/15 text-success"
            : "bg-destructive/15 text-destructive"}`}>
              {item.available ? "Available" : "Out of Stock"}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">₹{item.price}</span>
          <QuantityControl value={qty} onInc={() => addItem(item.id)} onDec={() => removeItem(item.id)} disabled={!item.available}/>
        </div>
      </div>
    </article>);
}
