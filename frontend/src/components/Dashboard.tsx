import { motion } from "framer-motion";
import { BookingRequest, Role } from "@/types/booking";
import { visibleRequests, canActOn } from "@/lib/booking-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Plus, ClipboardList, Clock, CheckCircle2, ArrowRight, XCircle } from "lucide-react";

interface DashboardProps {
  requests: BookingRequest[];
  role: Role;
  onOpen: (id: string) => void;
  onNew: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export function Dashboard({ requests, role, onOpen, onNew }: DashboardProps) {
  const visible = visibleRequests(requests, role);
  const pending = visible.filter((r) =>
    ["pending_sign", "pending_hod", "pending_admin", "pending_registrar"].includes(r.status)
  ).length;
  const approved = visible.filter((r) => r.status === "approved").length;
  const rejected = visible.filter((r) => r.status === "rejected").length;

  const statCards = [
    { label: "Total Requests", value: visible.length, icon: ClipboardList, gradient: true },
    { label: "Pending", value: pending, icon: Clock, className: "bg-warning/10 text-warning" },
    { label: "Approved", value: approved, icon: CheckCircle2, className: "bg-success/10 text-success" },
    { label: "Rejected", value: rejected, icon: XCircle, className: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome + action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Overview</h2>
          <p className="text-sm text-muted-foreground">Manage your room booking requests</p>
        </div>
        {role === "Faculty (Requester)" && (
          <Button onClick={onNew} className="hero-gradient text-primary-foreground hover:opacity-90">
            <Plus className="w-4 h-4 mr-1.5" />
            New Request
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" animate="visible">
            <Card className="glass-card hover:shadow-xl transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${s.gradient ? "hero-gradient" : s.className}`}>
                  <s.icon className={`w-4 h-4 ${s.gradient ? "text-primary-foreground" : ""}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Request list */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          All Requests
        </h3>
        {visible.length === 0 ? (
          <Card className="glass-card border-dashed">
            <CardContent className="py-16 text-center">
              <ClipboardList className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm font-semibold text-muted-foreground">No requests yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                {role === "Faculty (Requester)"
                  ? 'Click "New Request" to get started.'
                  : "Requests will appear here once submitted."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {visible.map((r, i) => {
              const d = r.dates?.[0] ?? { date: "", from: "", to: "" };
              const needsAction = canActOn(r, role);

              return (
                <motion.div key={r.id} variants={fadeUp} custom={i} initial="hidden" animate="visible">
                  <Card
                    onClick={() => onOpen(r.id)}
                    className={`glass-card cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-px ${
                      needsAction ? "border-l-[3px] border-l-primary" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-foreground">{r.room}</span>
                            <span className="text-muted-foreground/50">·</span>
                            <span className="text-sm text-muted-foreground truncate">{r.purpose || "(No purpose)"}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {r.facultyName || "—"} · {r.department || "—"} · {d.date || "No date"}
                            {d.from ? ` · ${d.from} → ${d.to}` : ""}
                          </p>
                          {needsAction && (
                            <p className="text-xs font-semibold text-primary mt-1.5 flex items-center gap-1">
                              Action needed <ArrowRight className="w-3 h-3" />
                            </p>
                          )}
                        </div>
                        <StatusBadge status={r.status} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
