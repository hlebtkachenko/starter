/**
 * @slug border-beam
 * @variant default
 * @upstream https://magicui.design/docs/components/border-beam
 * @deviations ["Uses project motion dep."]
 */
"use client";

import { BorderBeam } from "@/components/ui/border-beam";

export default function BorderBeamDefault() {
  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <span className="pointer-events-none text-2xl font-semibold whitespace-pre-wrap bg-gradient-to-b from-foreground to-muted-foreground/60 bg-clip-text text-center text-transparent">
        Border Beam
      </span>
      <BorderBeam size={150} duration={8} />
    </div>
  );
}
