import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 pb-6 border-b border-ledger mb-6",
        className
      )}
    >
      <div>
        <h1 className="font-caslon text-2xl md:text-3xl font-bold text-ink tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-hanse-muted font-grotesk">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}
