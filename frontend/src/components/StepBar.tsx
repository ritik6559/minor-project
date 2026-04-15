import { Status, STEP_LABELS } from "@/types/booking";
import { getStepIndex } from "@/lib/booking-utils";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepBarProps {
  status: Status;
}

export function StepBar({ status }: StepBarProps) {
  const cur = status === "rejected" ? -1 : getStepIndex(status);

  return (
    <div className="flex items-center justify-between py-4">
      {STEP_LABELS.map((label, i) => {
        const done = cur > i;
        const active = cur === i;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  done && "bg-success text-success-foreground",
                  active && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !done && !active && "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider",
                  done && "text-success",
                  active && "text-primary",
                  !done && !active && "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 rounded-full transition-colors duration-300",
                  cur > i ? "bg-success" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
