import { createContext, useCallback, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
const STORAGE_KEY = "canteen_auth_user";
const CREDENTIALS = {
    user: { password: "123", role: "user" },
    admin: { password: "123", role: "admin" },
};
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            }
            catch {
                // ignore
            }
        }
    }, []);
    const login = useCallback((username, password) => {
        const u = username.trim().toLowerCase();
        const found = CREDENTIALS[u];
        if (!found || found.password !== password) {
            return { ok: false, error: "Invalid username or password" };
        }
        const next = { username: u, role: found.role };
        setUser(next);
        if (typeof window !== "undefined")
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return { ok: true, role: found.role };
    }, []);
    const logout = useCallback(() => {
        setUser(null);
        if (typeof window !== "undefined")
            localStorage.removeItem(STORAGE_KEY);
    }, []);
    return (<AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isAdmin: user?.role === "admin",
            login,
            logout,
        }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
