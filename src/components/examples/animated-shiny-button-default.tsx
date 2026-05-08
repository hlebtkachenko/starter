/**
 * @slug animated-shiny-button
 * @variant default
 * @upstream https://www.eldoraui.site/docs/components/animated-shiny-button
 * @deviations ["Removed Google Fonts import.", "Self-contained CSS custom properties."]
 */

import { AnimatedShinyButton } from "@/components/ui/animated-shiny-button";

export default function AnimatedShinyButtonDefault() {
  return (
    <div className="flex items-center justify-center">
      <AnimatedShinyButton>Get started</AnimatedShinyButton>
    </div>
  );
}
