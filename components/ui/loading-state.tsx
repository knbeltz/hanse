import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = "Loading...", className }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 gap-4", className)}>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-hanse-red rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-hanse-muted font-grotesk">{message}</p>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-ink bg-parchment p-5 animate-pulse">
      <div className="h-4 bg-ledger w-1/3 mb-3" />
      <div className="h-3 bg-ledger w-2/3 mb-2" />
      <div className="h-3 bg-ledger w-1/2 mb-4" />
      <div className="flex gap-2">
        <div className="h-5 bg-ledger w-16 rounded-full" />
        <div className="h-5 bg-ledger w-12 rounded-full" />
      </div>
    </div>
  );
}
