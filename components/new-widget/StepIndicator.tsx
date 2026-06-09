import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-8 h-8 border flex items-center justify-center text-sm font-bold transition-colors",
                  isCompleted && "bg-hanse-red border-hanse-red text-parchment",
                  isActive && "bg-ink border-ink text-parchment",
                  !isCompleted && !isActive && "bg-parchment border-ink text-hanse-muted"
                )}
              >
                {isCompleted ? <Check className="size-4" /> : step.number}
              </div>
              <span
                className={cn(
                  "text-xs whitespace-nowrap hidden sm:block",
                  isActive ? "text-ink font-medium" : "text-hanse-muted"
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "h-px w-8 sm:w-16 mx-1 mb-5",
                  isCompleted ? "bg-hanse-red" : "bg-ledger"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
