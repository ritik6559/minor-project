import type { BookingStatus } from "@/types/booking";

export const statusMeta: Record<BookingStatus, { label: string; className: string }> = {
  PENDING_HOD:    { label: "Pending HOD",    className: "bg-warning/15 text-warning border-warning/30" },
  PENDING_ADMIN:  { label: "Pending Admin",  className: "bg-info/15 text-info border-info/30" },
  PENDING_DEAN:   { label: "Pending Dean",   className: "bg-purple/15 text-purple border-purple/30" },
  DEAN_APPROVED:  { label: "Approved",       className: "bg-success/15 text-success border-success/30" },
  HOD_REJECTED:   { label: "Rejected by HOD",   className: "bg-destructive/15 text-destructive border-destructive/30" },
  ADMIN_REJECTED: { label: "Rejected by Admin", className: "bg-destructive/15 text-destructive border-destructive/30" },
  DEAN_REJECTED:  { label: "Rejected by Dean",  className: "bg-destructive/15 text-destructive border-destructive/30" },
  CANCELLED:      { label: "Cancelled",      className: "bg-muted text-muted-foreground border-border" },
};

export function formatDateRange(date: string, start: string, end: string): string {
  try {
    const d = new Date(`${date}T${start}`);
    const dStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    return `${dStr} · ${start.slice(0,5)} – ${end.slice(0,5)}`;
  } catch {
    return `${date} · ${start} – ${end}`;
  }
}
