import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 gap-4 text-center px-4",
        className
      )}
    >
      <div className="w-12 h-12 border-2 border-dashed border-surface-dim flex items-center justify-center">
        <div className="w-4 h-4 border border-hanse-muted" />
      </div>
      {title && <p className="font-caslon text-xl font-bold text-ink">{title}</p>}
      {description && <p className="text-sm text-hanse-muted max-w-sm">{description}</p>}
      {action && (
        <Button variant="primary" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
