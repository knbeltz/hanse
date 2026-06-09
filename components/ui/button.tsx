import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium font-grotesk whitespace-nowrap transition-colors duration-150 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-hanse-red text-parchment border border-ink hover:bg-ink hover:border-ink active:bg-ink",
        secondary:
          "bg-parchment text-ink border border-ink hover:bg-ink hover:text-parchment active:bg-ink",
        ghost: "bg-transparent text-ink border border-transparent hover:bg-surface hover:border-ink",
        destructive:
          "bg-parchment text-hanse-error border border-hanse-error hover:bg-hanse-error hover:text-parchment",
        link: "text-hanse-red underline-offset-4 hover:underline border-0 bg-transparent px-0",
        outline:
          "bg-transparent text-ink border border-ink hover:bg-surface",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
