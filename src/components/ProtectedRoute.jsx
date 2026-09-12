import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
/**
 * Client-side route guard. Auth state lives in localStorage and is hydrated
 * by AuthProvider on mount, so we wait one tick before deciding to redirect
 * to avoid a flash on hard refresh.
 */
export function ProtectedRoute({ children, requireAdmin = false }) {
    const { isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return (<div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>);
    }
    if (!isAuthenticated) {
        const search = new URLSearchParams({ redirect: location.pathname });
        if (requireAdmin)
            search.set("admin", "true");
        return <Navigate to={`/login?${search.toString()}`} replace/>;
    }
    if (requireAdmin && !isAdmin) {
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}&admin=true`} replace/>;
    }
    return <>{children}</>;
}
