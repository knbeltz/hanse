import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number;
  unit?: string;
  description?: string;
  trend?: "up" | "down" | "flat";
  className?: string;
}

export function MetricCard({ label, value, unit = "", description, trend, className }: MetricCardProps) {
  return (
    <div className={cn("bg-parchment border border-ink p-4", className)}>
      <p className="text-xs font-medium text-hanse-muted uppercase tracking-widest mb-2">
        {label}
      </p>
      <div className="flex items-end gap-2">
        <span className="font-caslon text-3xl font-bold text-ink leading-none">
          {value}
          {unit && <span className="text-base font-grotesk font-normal text-hanse-muted ml-0.5">{unit}</span>}
        </span>
        {trend && (
          <span className={cn("mb-0.5", trend === "up" ? "text-green-600" : trend === "down" ? "text-hanse-error" : "text-hanse-muted")}>
            {trend === "up" ? <TrendingUp className="size-4" /> : trend === "down" ? <TrendingDown className="size-4" /> : <Minus className="size-4" />}
          </span>
        )}
      </div>
      {description && <p className="mt-1.5 text-xs text-hanse-muted leading-relaxed">{description}</p>}
    </div>
  );
}
