import { cn } from "@/lib/utils";
import type { WidgetStatus } from "@/types";

const STATUS_CONFIG: Record<
  WidgetStatus,
  { label: string; dotColor: string; textColor: string; bgColor: string }
> = {
  draft: {
    label: "Draft",
    dotColor: "bg-hanse-muted",
    textColor: "text-hanse-muted",
    bgColor: "bg-surface",
  },
  scope_generated: {
    label: "Scope Ready",
    dotColor: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  processing: {
    label: "Processing",
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
  },
  complete: {
    label: "Complete",
    dotColor: "bg-green-600",
    textColor: "text-green-800",
    bgColor: "bg-green-50",
  },
  failed: {
    label: "Failed",
    dotColor: "bg-hanse-error",
    textColor: "text-hanse-error",
    bgColor: "bg-red-50",
  },
};

interface WidgetStatusBadgeProps {
  status: WidgetStatus;
  className?: string;
}

export function WidgetStatusBadge({ status, className }: WidgetStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium border border-current/20",
        config.textColor,
        config.bgColor,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full shrink-0", config.dotColor)} />
      {config.label}
    </span>
  );
}
