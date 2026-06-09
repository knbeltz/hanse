import { cn } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  description?: string;
  highlight?: boolean;
  className?: string;
}

function ScoreBar({ score, maxScore = 100 }: { score: number; maxScore?: number }) {
  const pct = Math.min(100, Math.round((score / maxScore) * 100));
  return (
    <div className="h-1.5 bg-ledger w-full mt-2">
      <div
        className="h-full bg-hanse-red transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ScoreCard({
  label,
  score,
  maxScore = 100,
  description,
  highlight = false,
  className,
}: ScoreCardProps) {
  return (
    <div
      className={cn(
        "bg-parchment border border-ink p-4",
        highlight && "border-t-4 border-t-hanse-red",
        className
      )}
    >
      <p className="text-xs font-medium text-hanse-muted uppercase tracking-widest mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <span className="font-caslon text-4xl font-bold text-ink leading-none">{score}</span>
        {maxScore !== 100 ? (
          <span className="text-sm text-hanse-muted font-grotesk">/ {maxScore}</span>
        ) : (
          <span className="text-sm text-hanse-muted font-grotesk">/100</span>
        )}
      </div>
      <ScoreBar score={score} maxScore={maxScore} />
      {description && (
        <p className="mt-2 text-xs text-hanse-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
