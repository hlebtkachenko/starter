// shadcn-style primitive scaffold. Copy + rename to add a new primitive.
//
// - cva for variants
// - Slot pattern (asChild) for polymorphic composition
// - Token-only colors via Tailwind classes referencing :root CSS vars

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const exampleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90",
        ghost: "hover:bg-[var(--muted)]",
        outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)]",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type ExampleProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof exampleVariants> & { asChild?: boolean };

export const Example = React.forwardRef<HTMLButtonElement, ExampleProps>(function Example(
  { asChild, className, variant, size, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={[exampleVariants({ variant, size }), className].join(" ")}
      {...props}
    />
  );
});
