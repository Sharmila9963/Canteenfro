import { useApp } from "../context/AppContext";
export function CategoryBar({ selected, onSelect, }) {
    const { categories } = useApp();
    const sorted = [...categories].sort((a, b) => a.order - b.order);
    return (<div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sorted.map((c) => {
            const active = c.name === selected;
            return (<button key={c.id} onClick={() => onSelect(c.name)} className={`group relative flex w-24 shrink-0 flex-col items-center gap-1.5 rounded-2xl border-2 p-2 transition hover:-translate-y-0.5 ${active
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/40"}`} style={active ? { boxShadow: "var(--shadow-card)" } : undefined}>
              <div className={`h-14 w-14 overflow-hidden rounded-full ring-2 transition ${active ? "ring-primary" : "ring-transparent group-hover:ring-primary/30"}`}>
                <img src={c.image} alt={c.name} loading="lazy" width={56} height={56} className="h-full w-full object-cover transition group-hover:scale-110"/>
              </div>
              <span className={`text-xs font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                {c.name}
              </span>
            </button>);
        })}
      </div>
    </div>);
}
