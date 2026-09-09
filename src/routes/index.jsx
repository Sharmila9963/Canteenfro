import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles, UtensilsCrossed, ShieldCheck, Zap, BadgeIndianRupee, Phone, MapPin, Mail, } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { useApp } from "@/context/AppContext";
export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "Canteen — Order, pick a table, get your token" },
            {
                name: "description",
                content: "Browse the canteen menu, add favorites to your cart, choose a table and get an instant token.",
            },
            { property: "og:title", content: "Canteen — Order food the easy way" },
            { property: "og:description", content: "Modern canteen ordering with table selection and instant tokens." },
        ],
    }),
    component: Index,
});
const categoryColors = [
    "from-orange-400 to-red-500",
    "from-amber-300 to-orange-400",
    "from-yellow-400 to-amber-500",
    "from-rose-400 to-pink-500",
    "from-lime-400 to-green-500",
    "from-sky-400 to-indigo-500",
];
function Index() {
    const { menu, categories, tables, orders } = useApp();
    const sortedCats = [...categories].sort((a, b) => a.order - b.order);
    const popular = menu.filter((m) => m.available).slice(0, 6);
    const availableTables = tables.filter((t) => t.status === "available").length;
    return (<main className="mx-auto max-w-6xl px-4 py-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <img src={heroBanner} alt="Delicious canteen food spread" width={1536} height={768} className="h-64 w-full object-cover sm:h-80"/>
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }}/>
        <div className="absolute inset-0 flex flex-col items-start justify-end gap-3 p-6 text-primary-foreground sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5"/> Fresh • Hot • Fast
          </span>
          <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
            Hungry? Your campus canteen, reimagined.
          </h1>
          <p className="max-w-md text-sm text-white/90 sm:text-base">
            Order in seconds. Skip the queue. Pick your table.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary shadow-lg transition hover:scale-105">
              Order Now <ArrowRight className="h-4 w-4"/>
            </Link>
            <Link to="/orders" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25">
              My Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Categories</h2>
            <p className="text-sm text-muted-foreground">Pick your craving</p>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-primary hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {sortedCats.map((c, i) => (<Link key={c.id} to="/menu" className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${categoryColors[i % categoryColors.length]} p-4 text-white transition hover:scale-[1.03]`} style={{ boxShadow: "var(--shadow-card)" }}>
              <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover opacity-30 transition group-hover:opacity-40"/>
              <div className="flex h-full flex-col justify-between">
                <UtensilsCrossed className="h-6 w-6 opacity-80"/>
                <p className="relative text-lg font-bold drop-shadow">{c.name}</p>
              </div>
            </Link>))}
        </div>
      </section>

      {/* Popular items */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Popular Items</h2>
            <p className="text-sm text-muted-foreground">What everyone's ordering today</p>
          </div>
          <Link to="/menu" className="text-sm font-semibold text-primary hover:underline">
            View menu →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {popular.map((item) => (<Link key={item.id} to="/menu" className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-110"/>
              </div>
              <div className="p-2.5">
                <p className="truncate text-sm font-semibold">{item.name}</p>
                <p className="text-xs font-bold text-primary">₹{item.price}</p>
              </div>
            </Link>))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Why Choose Us</h2>
        <p className="text-sm text-muted-foreground">Made for hungry students & staff</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Fast Service", desc: "Average prep under 10 minutes." },
            { icon: ShieldCheck, title: "Hygienic Food", desc: "Made fresh in clean kitchens daily." },
            { icon: BadgeIndianRupee, title: "Affordable Prices", desc: "Student-friendly menu, no hidden fees." },
        ].map(({ icon: Icon, title, desc }) => (<div key={title} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="h-5 w-5"/>
              </div>
              <p className="text-base font-bold">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>))}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-12 overflow-hidden rounded-3xl p-6 text-primary-foreground sm:p-8" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elevated)" }}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Orders served", value: `${1240 + orders.length}+` },
            { label: "Tables available", value: `${availableTables}/${tables.length}` },
            { label: "Menu items", value: menu.length },
            { label: "Avg. prep", value: "10m" },
        ].map((s) => (<div key={s.label} className="text-center">
              <p className="text-2xl font-black sm:text-3xl">{s.value}</p>
              <p className="text-xs opacity-90">{s.label}</p>
            </div>))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 grid gap-6 rounded-3xl border border-border bg-card p-6 sm:grid-cols-3 sm:p-8">
        <div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary"/>
            <p className="text-lg font-bold">Campus Canteen</p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Skip the queue. Order ahead. Pick your table. Enjoy fresh food.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold">Contact</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5"/> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5"/> hello@canteen.app</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5"/> Block C, Ground Floor</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold">Opening Hours</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5"/> Mon – Fri · 8:00 AM – 9:00 PM</li>
            <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5"/> Sat · 9:00 AM – 6:00 PM</li>
            <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5"/> Sun · Closed</li>
          </ul>
        </div>
        <p className="text-[11px] text-muted-foreground sm:col-span-3">
          © {new Date().getFullYear()} Campus Canteen. All rights reserved.
        </p>
      </footer>
    </main>);
}
