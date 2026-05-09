/**
 * @slug liquid-metal-button
 * @variant default
 * @upstream https://www.jolyui.dev/docs/components/buttons/liquid-metal-button
 * @deviations ["Inline styles retained for WebGL shader positioning."]
 */
"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function LiquidMetalButtonDefault() {
  return (
    <div className="flex items-center gap-6">
      <LiquidMetalButton label="Get Started" />
      <LiquidMetalButton viewMode="icon" />
    </div>
  );
}
