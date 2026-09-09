import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, UtensilsCrossed, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
export function Navbar() {
    const { cartCount } = useApp();
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const isAdmin = location.pathname.startsWith("/admin");
    if (isAdmin)
        return null;
    const handleLogout = () => {
        logout();
        navigate({ to: "/" });
    };
    return (<header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <UtensilsCrossed className="h-5 w-5"/>
          </div>
          <span className="text-lg font-bold tracking-tight">Canteen</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary font-semibold" }} className="text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/menu" activeProps={{ className: "text-primary font-semibold" }} className="text-muted-foreground hover:text-foreground">Menu</Link>
          <Link to="/orders" activeProps={{ className: "text-primary font-semibold" }} className="text-muted-foreground hover:text-foreground">Orders</Link>
          <Link to="/admin" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ShieldCheck className="h-4 w-4"/> Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition hover:bg-accent">
            <ShoppingCart className="h-5 w-5"/>
            {cartCount > 0 && (<span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {cartCount}
              </span>)}
          </Link>
          {isAuthenticated ? (<button onClick={handleLogout} className="inline-flex items-center gap-1 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold hover:bg-accent" title={`Logged in as ${user?.username}`}>
              <LogOut className="h-3.5 w-3.5"/>
              <span className="hidden sm:inline">{user?.username}</span>
            </button>) : (<Link to="/login" className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <LogIn className="h-3.5 w-3.5"/> Login
            </Link>)}
        </div>
      </div>
    </header>);
}
