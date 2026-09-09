const now = Date.now();
export const initialTables = Array.from({ length: 12 }, (_, i) => {
    const isOccupied = i === 2 || i === 6;
    return {
        id: i + 1,
        status: isOccupied ? "occupied" : "available",
        occupiedUntil: isOccupied ? now + (i === 2 ? 15 : 30) * 60_000 : null,
    };
});
export function formatUntil(ts) {
    if (!ts)
        return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
export function minutesLeft(ts) {
    if (!ts)
        return 0;
    return Math.max(0, Math.ceil((ts - Date.now()) / 60_000));
}
