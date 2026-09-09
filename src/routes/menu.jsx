import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CategoryBar } from "@/components/CategoryBar";
import { MenuCard } from "@/components/MenuCard";
import { useApp } from "@/context/AppContext";
export const Route = createFileRoute("/menu")({
    head: () => ({
        meta: [
            { title: "Menu — Canteen" },
            { name: "description", content: "Browse our full menu by category and add items to your cart." },
            { property: "og:title", content: "Menu — Canteen" },
            { property: "og:description", content: "Biryani, Tiffin, Dosa, Drinks and Snacks — all freshly made." },
        ],
    }),
    component: MenuPage,
});
function MenuPage() {
    const { menu, categories } = useApp();
    const firstCategory = categories[0]?.name ?? "";
    const [selected, setSelected] = useState(firstCategory);
    const [query, setQuery] = useState("");
    const [availableOnly, setAvailableOnly] = useState(false);
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return menu.filter((m) => {
            if (q) {
                // When searching, ignore category filter
                if (!m.name.toLowerCase().includes(q) && !m.description.toLowerCase().includes(q)) {
                    return false;
                }
            }
            else if (m.category !== selected) {
                return false;
            }
            if (availableOnly && !m.available)
                return false;
            return true;
        });
    }, [menu, selected, query, availableOnly]);
    return (<main className="mx-auto max-w-3xl px-4 pt-2">
      <div className="pt-2">
        <h1 className="text-2xl font-bold">Our Menu</h1>
        <p className="text-sm text-muted-foreground">Tap a category, then add what you love.</p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes…" className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"/>
        </div>
        <label className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-semibold">
          <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="h-4 w-4 accent-[color:var(--primary)]"/>
          Available only
        </label>
      </div>
      <CategoryBar selected={selected} onSelect={setSelected}/>
      <section className="mt-4 flex flex-col gap-3 pb-8">
        {visible.length === 0 && (<p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No items match your filters.
          </p>)}
        {visible.map((item) => (<MenuCard key={item.id} item={item}/>))}
      </section>
    </main>);
}
