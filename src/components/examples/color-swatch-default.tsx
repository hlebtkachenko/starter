/**
 * @slug color-swatch
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/color-swatch
 * @deviations ["Token classes replace hardcoded palette."]
 */

import { ColorSwatch } from "@/components/ui/color-swatch";

export default function ColorSwatchDefault() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch color="#FF3B30" size="lg" />
      <ColorSwatch color="#4CD964" size="lg" />
      <ColorSwatch color="#007AFF" size="lg" />
      <ColorSwatch color="#FF9500" size="lg" />
      <ColorSwatch color="rgba(88,86,214,0.5)" size="lg" />
    </div>
  );
}
