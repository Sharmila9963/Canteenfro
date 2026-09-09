import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, X, Search, FolderPlus, Tags } from "lucide-react";
import { useApp } from "@/context/AppContext";
export const Route = createFileRoute("/admin/menu")({
    component: AdminMenu,
});
function AdminMenu() {
    const { menu, toggleAvailability, addMenuItem, removeMenuItem, categories, addCategory, removeCategory } = useApp();
    const [open, setOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const [showCats, setShowCats] = useState(false);
    const [query, setQuery] = useState("");
    const [filterCat, setFilterCat] = useState("all");
    const [filterAvail, setFilterAvail] = useState("all");
    const filteredMenu = menu.filter((m) => {
        if (query && !m.name.toLowerCase().includes(query.toLowerCase()))
            return false;
        if (filterCat !== "all" && m.category !== filterCat)
            return false;
        if (filterAvail === "in" && !m.available)
            return false;
        if (filterAvail === "out" && m.available)
            return false;
        return true;
    });
    const sortedCats = [...categories].sort((a, b) => a.order - b.order);
    const grouped = sortedCats.map((cat) => ({
        category: cat.name,
        items: filteredMenu.filter((m) => m.category === cat.name),
    }));
    return (<main className="p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-sm text-muted-foreground">Group by category. Toggle availability or add new items.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowCats((s) => !s)} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-secondary">
            <Tags className="h-4 w-4"/> Manage Categories
          </button>
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Plus className="h-4 w-4"/> Add New Item
          </button>
        </div>
      </div>

      {showCats && (<section className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Categories</h2>
            <button onClick={() => setCatOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-accent">
              <FolderPlus className="h-3.5 w-3.5"/> Add Category
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {sortedCats.map((c) => (<div key={c.id} className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3">
                <img src={c.image} alt={c.name} className="h-7 w-7 rounded-full object-cover"/>
                <span className="text-xs font-semibold">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">#{c.order}</span>
                <button onClick={() => removeCategory(c.id)} className="ml-1 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Remove ${c.name}`}>
                  <X className="h-3 w-3"/>
                </button>
              </div>))}
          </div>
        </section>)}

      <section className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by item name…" className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"/>
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none">
          <option value="all">All categories</option>
          {sortedCats.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
        </select>
        <select value={filterAvail} onChange={(e) => setFilterAvail(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none">
          <option value="all">All</option>
          <option value="in">Available</option>
          <option value="out">Out of stock</option>
        </select>
      </section>

      <div className="mt-6 space-y-6">
        {grouped.map(({ category, items }) => (<section key={category}>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              — {category} —
            </h2>
            {items.length === 0 ? (<p className="rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                No items in this category yet.
              </p>) : (<div className="overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-secondary text-left text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3 text-center">Available</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((item) => (<tr key={item.id} className="transition hover:bg-secondary/40">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} loading="lazy" width={40} height={40} className="h-10 w-10 rounded-lg object-cover"/>
                            <span className="font-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold">₹{item.price}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => toggleAvailability(item.id)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${item.available ? "bg-success" : "bg-muted"}`} aria-label="Toggle availability">
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${item.available ? "translate-x-5" : "translate-x-0.5"}`}/>
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => removeMenuItem(item.id)} className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive hover:bg-destructive/20">
                            <Trash2 className="h-3 w-3"/> Remove
                          </button>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>)}
          </section>))}
      </div>

      {open && <AddItemModal onClose={() => setOpen(false)} onAdd={addMenuItem}/>}
      {catOpen && <AddCategoryModal onClose={() => setCatOpen(false)} onAdd={addCategory} nextOrder={sortedCats.length + 1}/>}
    </main>);
}
function AddItemModal({ onClose, onAdd, }) {
    const { categories } = useApp();
    const cats = [...categories].sort((a, b) => a.order - b.order);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(cats[0]?.name ?? "");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [available, setAvailable] = useState(true);
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !price.trim()) {
            setError("Name and price are required.");
            return;
        }
        const p = Number(price);
        if (Number.isNaN(p) || p <= 0) {
            setError("Price must be a positive number.");
            return;
        }
        onAdd({ name: name.trim(), category, price: p, image: image.trim(), available });
        onClose();
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold">Add Menu Item</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-secondary" aria-label="Close">
            <X className="h-4 w-4"/>
          </button>
        </div>
        <form className="space-y-3 p-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Item Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="e.g. Paneer Dosa"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                {cats.map((c) => (<option key={c.id} value={c.name}>
                    {c.name}
                  </option>))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground">Price (₹)</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="120"/>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Image URL (optional)</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="https://…"/>
          </div>
          <label className="flex items-center justify-between rounded-lg border border-border p-3">
            <span className="text-sm font-semibold">Available now</span>
            <button type="button" onClick={() => setAvailable((a) => !a)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${available ? "bg-success" : "bg-muted"}`}>
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${available ? "translate-x-5" : "translate-x-0.5"}`}/>
            </button>
          </label>

          {error && (<p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">{error}</p>)}

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border bg-card py-2.5 text-sm font-semibold hover:bg-secondary">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl py-2.5 text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>);
}
function AddCategoryModal({ onClose, onAdd, nextOrder, }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [order, setOrder] = useState(String(nextOrder));
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Category name is required.");
            return;
        }
        const o = Number(order);
        onAdd({ name: name.trim(), image: image.trim(), order: Number.isFinite(o) ? o : nextOrder });
        onClose();
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold">Add Category</h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-secondary" aria-label="Close">
            <X className="h-4 w-4"/>
          </button>
        </div>
        <form className="space-y-3 p-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Category Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="e.g. Desserts"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Icon / Image URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="https://…"/>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Display Order</label>
            <input value={order} onChange={(e) => setOrder(e.target.value)} inputMode="numeric" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"/>
          </div>
          {error && (<p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">{error}</p>)}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border bg-card py-2.5 text-sm font-semibold hover:bg-secondary">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-xl py-2.5 text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>);
}
