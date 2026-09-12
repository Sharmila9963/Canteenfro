import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { LogIn, ShieldCheck, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const wantsAdmin = params.get("admin") === "true";
  const [username, setUsername] = useState(wantsAdmin ? "admin" : "user");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault(); setError(null);
    const result = login(username, password);
    if (!result.ok) { setError(result.error); return; }
    if (wantsAdmin && result.role !== "admin") { setError("This account is not an admin."); return; }
    const redirect = params.get("redirect") || (result.role === "admin" ? "/admin" : "/");
    navigate(redirect);
  };
  return (<main className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-8"><div className="w-full overflow-hidden rounded-3xl border border-border bg-card" style={{ boxShadow: "var(--shadow-elevated)" }}><div className="p-6 text-center text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>{wantsAdmin ? <ShieldCheck className="mx-auto h-10 w-10"/> : <LogIn className="mx-auto h-10 w-10"/>}<h1 className="mt-2 text-2xl font-bold">{wantsAdmin ? "Admin Login" : "Welcome back"}</h1><p className="text-sm opacity-90">{wantsAdmin ? "Sign in to manage the canteen." : "Sign in to continue ordering."}</p></div><form className="space-y-4 p-6" onSubmit={handleSubmit}><div><label className="text-xs font-semibold text-muted-foreground">Username</label><input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="user or admin"/></div><div><label className="text-xs font-semibold text-muted-foreground">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" placeholder="123"/></div>{error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">{error}</p>}<button type="submit" className="w-full rounded-xl py-3 text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>Sign in</button><div className="grid grid-cols-2 gap-2 pt-2 text-[11px]"><div className="rounded-lg border border-dashed border-border p-2"><p className="flex items-center gap-1 font-semibold"><User className="h-3 w-3"/> User</p><p className="text-muted-foreground">user / 123</p></div><div className="rounded-lg border border-dashed border-border p-2"><p className="flex items-center gap-1 font-semibold"><ShieldCheck className="h-3 w-3"/> Admin</p><p className="text-muted-foreground">admin / 123</p></div></div><p className="pt-2 text-center text-xs text-muted-foreground">{wantsAdmin ? <Link to="/login" className="text-primary hover:underline">User login</Link> : <Link to="/login?admin=true" className="text-primary hover:underline">Admin login</Link>}</p></form></div></main>);
}
export default Login;
