import { Minus, Plus } from "lucide-react";
export function QuantityControl({ value, onInc, onDec, disabled, }) {
    if (value === 0) {
        return (<button disabled={disabled} onClick={onInc} className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
        Add +
      </button>);
    }
    return (<div className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 p-1">
      <button onClick={onDec} className="flex h-7 w-7 items-center justify-center rounded-md bg-background text-primary transition hover:bg-primary hover:text-primary-foreground" aria-label="Decrease">
        <Minus className="h-4 w-4"/>
      </button>
      <span className="min-w-6 text-center text-sm font-bold text-primary">{value}</span>
      <button onClick={onInc} className="flex h-7 w-7 items-center justify-center rounded-md bg-background text-primary transition hover:bg-primary hover:text-primary-foreground" aria-label="Increase">
        <Plus className="h-4 w-4"/>
      </button>
    </div>);
}
