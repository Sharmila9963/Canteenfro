import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initialMenu, initialCategories } from "../data/menu";
import { initialTables } from "../data/tables";
import { sampleOrders, generateToken } from "../data/orders";
const AppContext = createContext(null);
export function AppProvider({ children }) {
    const [menu, setMenu] = useState(initialMenu);
    const [categories, setCategories] = useState(initialCategories);
    const [cart, setCart] = useState({});
    const [tables, setTables] = useState(initialTables);
    const [selectedTable, setSelectedTable] = useState(null);
    const [orders, setOrders] = useState(sampleOrders);
    // Auto-free tables when their occupiedUntil passes
    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            setTables((prev) => {
                let changed = false;
                const next = prev.map((t) => {
                    if (t.status === "occupied" && t.occupiedUntil && t.occupiedUntil <= now) {
                        changed = true;
                        return { ...t, status: "available", occupiedUntil: null };
                    }
                    return t;
                });
                return changed ? next : prev;
            });
        };
        tick();
        const id = setInterval(tick, 30_000);
        return () => clearInterval(id);
    }, []);
    const toggleAvailability = useCallback((id) => {
        setMenu((m) => m.map((it) => (it.id === id ? { ...it, available: !it.available } : it)));
    }, []);
    const addMenuItem = useCallback((input) => {
        setMenu((m) => [
            ...m,
            {
                id: `m_${Date.now()}`,
                name: input.name,
                category: input.category,
                price: input.price,
                image: input.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
                available: input.available,
                description: input.description ?? "",
            },
        ]);
    }, []);
    const removeMenuItem = useCallback((id) => {
        setMenu((m) => m.filter((it) => it.id !== id));
    }, []);
    const addCategory = useCallback((input) => {
        setCategories((cs) => {
            const order = input.order ?? cs.length + 1;
            return [
                ...cs,
                {
                    id: `c_${Date.now()}`,
                    name: input.name,
                    image: input.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
                    order,
                },
            ].sort((a, b) => a.order - b.order);
        });
    }, []);
    const removeCategory = useCallback((id) => {
        setCategories((cs) => cs.filter((c) => c.id !== id));
    }, []);
    const addItem = useCallback((id) => {
        setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    }, []);
    const removeItem = useCallback((id) => {
        setCart((c) => {
            const next = { ...c };
            const current = next[id] ?? 0;
            if (current <= 1)
                delete next[id];
            else
                next[id] = current - 1;
            return next;
        });
    }, []);
    const setQuantity = useCallback((id, qty) => {
        setCart((c) => {
            const next = { ...c };
            if (qty <= 0)
                delete next[id];
            else
                next[id] = qty;
            return next;
        });
    }, []);
    const clearCart = useCallback(() => setCart({}), []);
    const selectTable = useCallback((id) => setSelectedTable(id), []);
    const setTableStatus = useCallback((id, status, occupiedUntil = null) => {
        setTables((t) => t.map((tb) => tb.id === id
            ? {
                ...tb,
                status,
                occupiedUntil: status === "occupied"
                    ? occupiedUntil ?? Date.now() + 30 * 60_000
                    : null,
            }
            : tb));
    }, []);
    const cartLines = useMemo(() => Object.entries(cart)
        .map(([id, quantity]) => {
        const item = menu.find((m) => m.id === id);
        return item ? { item, quantity } : null;
    })
        .filter((x) => x !== null), [cart, menu]);
    const cartCount = useMemo(() => cartLines.reduce((s, l) => s + l.quantity, 0), [cartLines]);
    const cartTotal = useMemo(() => cartLines.reduce((s, l) => s + l.quantity * l.item.price, 0), [cartLines]);
    const createOrder = useCallback((username) => {
        if (cartLines.length === 0 || selectedTable === null)
            return null;
        const order = {
            id: `o_${Date.now()}`,
            token: generateToken(),
            table: selectedTable,
            items: cartLines.map((l) => ({ item: l.item, quantity: l.quantity })),
            total: cartTotal,
            status: "Preparing",
            payment: "Paid",
            createdAt: Date.now(),
            username,
        };
        setOrders((prev) => [order, ...prev]);
        // Occupy table for 45 minutes by default
        setTables((t) => t.map((tb) => tb.id === selectedTable
            ? { ...tb, status: "occupied", occupiedUntil: Date.now() + 45 * 60_000 }
            : tb));
        setCart({});
        setSelectedTable(null);
        return order;
    }, [cartLines, cartTotal, selectedTable]);
    const updateOrderStatus = useCallback((id, status) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    }, []);
    const updatePaymentStatus = useCallback((id, payment) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, payment } : o)));
    }, []);
    const value = {
        menu,
        toggleAvailability,
        addMenuItem,
        removeMenuItem,
        categories,
        addCategory,
        removeCategory,
        cart,
        addItem,
        removeItem,
        setQuantity,
        cartCount,
        cartLines,
        cartTotal,
        clearCart,
        tables,
        selectedTable,
        selectTable,
        setTableStatus,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("useApp must be used within AppProvider");
    return ctx;
}
