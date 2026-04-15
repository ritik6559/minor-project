import { Status, STATUS_LABELS } from "@/types/booking";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "text-xs font-semibold",
        status === "draft" && "bg-muted text-muted-foreground border-border",
        status === "pending_sign" && "bg-primary/10 text-primary border-primary/30",
        (status === "pending_hod" || status === "pending_admin" || status === "pending_registrar") &&
          "bg-warning/15 text-warning-foreground border-warning/40",
        status === "approved" && "bg-success/15 text-success border-success/40",
        status === "rejected" && "bg-destructive/15 text-destructive border-destructive/40"
      )}
      variant="outline"
    >
      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
}
