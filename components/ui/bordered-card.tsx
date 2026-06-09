import { cn } from "@/lib/utils";

interface BorderedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  redTop?: boolean;
  children: React.ReactNode;
}

export function BorderedCard({ className, redTop = false, children, ...props }: BorderedCardProps) {
  return (
    <div
      className={cn(
        "bg-parchment border border-ink",
        redTop && "border-t-4 border-t-hanse-red",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
