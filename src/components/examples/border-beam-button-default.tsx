/**
 * @slug border-beam-button
 * @variant default
 * @upstream https://border-beam.dev
 * @deviations ["Token classes replace hardcoded palette."]
 */

import { BorderBeamButton } from "@/components/ui/border-beam-button";

export default function BorderBeamButtonDefault() {
  return (
    <div className="flex items-center justify-center">
      <BorderBeamButton beamSize="sm" theme="light">
        Get started
      </BorderBeamButton>
    </div>
  );
}
