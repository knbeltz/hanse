import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 gap-3 text-center px-4",
        className
      )}
    >
      <AlertCircle className="size-8 text-hanse-error" />
      <div>
        <p className="font-caslon text-lg font-bold text-ink">{title}</p>
        {message && <p className="text-sm text-hanse-muted mt-1">{message}</p>}
      </div>
    </div>
  );
}
