import { BookingRequest, Role } from "@/types/booking";
import { visibleRequests, canActOn } from "@/lib/booking-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Plus, ClipboardList, Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface DashboardProps {
  requests: BookingRequest[];
  role: Role;
  onOpen: (id: string) => void;
  onNew: () => void;
}

export function Dashboard({ requests, role, onOpen, onNew }: DashboardProps) {
  const visible = visibleRequests(requests, role);
  const pending = visible.filter((r) =>
    ["pending_sign", "pending_hod", "pending_admin", "pending_registrar"].includes(r.status)
  ).length;
  const approved = visible.filter((r) => r.status === "approved").length;

  const statCards = [
    { label: "Total Requests", value: visible.length, icon: ClipboardList, className: "text-primary" },
    { label: "Pending Action", value: pending, icon: Clock, className: "text-warning" },
    { label: "Approved", value: approved, icon: CheckCircle2, className: "text-success" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted ${s.className}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold font-sans">{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary font-sans">Requests</h2>
        {role === "Faculty (Requester)" && (
          <Button onClick={onNew} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            New Request
          </Button>
        )}
      </div>

      {/* Request list */}
      {visible.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-base font-semibold text-muted-foreground font-sans">No requests yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              {role === "Faculty (Requester)"
                ? 'Click "+ New Request" to get started.'
                : "Requests will appear here once submitted."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => {
            const d = r.dates?.[0] ?? { date: "", from: "", to: "" };
            const needsAction = canActOn(r, role);

            return (
              <Card
                key={r.id}
                onClick={() => onOpen(r.id)}
                className={`cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 ${
                  needsAction ? "border-l-4 border-l-primary" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-primary font-sans">{r.room}</span>
                      <span className="text-muted-foreground text-sm">—</span>
                      <span className="text-sm text-foreground">{r.purpose || "(No purpose stated)"}</span>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {r.facultyName || "—"} · {r.department || "—"} · {d.date || "No date set"}
                    {d.from ? ` · ${d.from} → ${d.to}` : ""}
                  </p>
                  {needsAction && (
                    <p className="text-xs font-semibold text-primary mt-2 flex items-center gap-1">
                      Action needed <ArrowRight className="w-3 h-3" />
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
