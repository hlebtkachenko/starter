"use client";

/**
 * `border-beam` around `Button` -- compact `beamSize="sm"` glow for controls.
 * `className` styles the button; `borderBeamClassName` styles the beam wrapper.
 */
import type { CSSProperties } from "react";
import * as React from "react";
import { BorderBeam, type BorderBeamProps, type BorderBeamSize } from "border-beam";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type BeamShellProps = Pick<
  BorderBeamProps,
  | "colorVariant"
  | "theme"
  | "staticColors"
  | "duration"
  | "active"
  | "borderRadius"
  | "brightness"
  | "saturation"
  | "hueRange"
  | "strength"
  | "onActivate"
  | "onDeactivate"
> & {
  beamSize?: BorderBeamSize;
  borderBeamClassName?: string;
  borderBeamStyle?: CSSProperties;
};

export type BorderBeamButtonProps = React.ComponentProps<typeof Button> & BeamShellProps;

export type BorderBeamIconButtonProps = BorderBeamButtonProps;

export function BorderBeamButton({
  beamSize = "sm",
  borderBeamClassName,
  borderBeamStyle,
  theme = "auto",
  colorVariant,
  staticColors,
  duration,
  active,
  borderRadius,
  brightness,
  saturation,
  hueRange,
  strength,
  onActivate,
  onDeactivate,
  className,
  ref,
  ...buttonProps
}: BorderBeamButtonProps) {
  return (
    <BorderBeam
      {...(active !== undefined ? { active } : {})}
      {...(borderRadius !== undefined ? { borderRadius } : {})}
      {...(brightness !== undefined ? { brightness } : {})}
      className={cn(
        "overflow-visible! inline-flex w-fit min-w-0 flex-col items-stretch leading-none",
        borderBeamClassName,
      )}
      {...(colorVariant !== undefined ? { colorVariant } : {})}
      {...(duration !== undefined ? { duration } : {})}
      {...(hueRange !== undefined ? { hueRange } : {})}
      {...(onActivate ? { onActivate } : {})}
      {...(onDeactivate ? { onDeactivate } : {})}
      ref={ref as React.Ref<HTMLDivElement>}
      {...(saturation !== undefined ? { saturation } : {})}
      size={beamSize}
      {...(staticColors !== undefined ? { staticColors } : {})}
      {...(strength !== undefined ? { strength } : {})}
      {...(borderBeamStyle !== undefined ? { style: borderBeamStyle } : {})}
      theme={theme}
    >
      <Button className={className} {...buttonProps} />
    </BorderBeam>
  );
}

export function BorderBeamIconButton({
  size = "icon-sm",
  className,
  ...props
}: BorderBeamIconButtonProps) {
  return (
    <BorderBeamButton
      className={cn("!leading-none [&_svg]:block [&_svg]:shrink-0", className)}
      size={size}
      {...props}
    />
  );
}
