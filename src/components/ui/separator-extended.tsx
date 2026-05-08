import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const separatorExtendedVariants = cva(
  "shrink-0 border-border data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t data-[orientation=vertical]:h-full data-[orientation=vertical]:border-e",
  {
    variants: {
      variant: {
        default: "border-solid",
        dashed: "border-dashed",
        dotted: "border-dotted",
        double:
          "border-double p-px data-[orientation=horizontal]:border-y data-[orientation=vertical]:border-x",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function SeparatorExtended({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive> &
  VariantProps<typeof separatorExtendedVariants>) {
  return (
    <SeparatorPrimitive
      data-slot="separator-extended"
      className={cn(separatorExtendedVariants({ variant }), className)}
      {...props}
    />
  );
}

export { SeparatorExtended, separatorExtendedVariants };
