// Primitive scaffold. Copy + rename to add a new shadcn primitive.
//
// Rules (enforced by docs/conventions/component-templates.md and ESLint):
// - cva for variants. VariantProps for type-safe consumer API.
// - Slot pattern (asChild) for polymorphic composition.
// - Token-only colors via Tailwind classes that resolve through CSS vars
//   in src/app/globals.css. No inline hex, no oklch, no arbitrary radius.
// - forwardRef wherever shadcn's source uses it.
// - Export EVERY subcomponent named in the upstream MD.
// - File-level: one primitive per file, kebab-case file name, PascalCase exports.

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const exampleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-background hover:bg-accent",
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
    <Comp ref={ref} className={cn(exampleVariants({ variant, size }), className)} {...props} />
  );
});
