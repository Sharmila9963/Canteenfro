import { Link, useLocation } from "@tanstack/react-router";
import { Home, UtensilsCrossed, ShoppingCart, Receipt } from "lucide-react";
import { useApp } from "@/context/AppContext";
const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/menu", label: "Menu", icon: UtensilsCrossed },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/orders", label: "Orders", icon: Receipt },
];
export function BottomNav() {
    const { cartCount } = useApp();
    const location = useLocation();
    if (location.pathname.startsWith("/admin"))
        return null;
    return (<nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
            return (<li key={to} className="flex-1">
              <Link to={to} className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition ${active ? "text-primary" : "text-muted-foreground"}`}>
                <span className="relative">
                  <Icon className="h-5 w-5"/>
                  {to === "/cart" && cartCount > 0 && (<span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                      {cartCount}
                    </span>)}
                </span>
                {label}
              </Link>
            </li>);
        })}
      </ul>
    </nav>);
}
