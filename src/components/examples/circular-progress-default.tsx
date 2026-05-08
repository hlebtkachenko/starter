/**
 * @slug circular-progress
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/circular-progress
 * @deviations ["Token classes replace hardcoded palette."]
 */

import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressRange,
  CircularProgressTrack,
  CircularProgressValueText,
} from "@/components/ui/circular-progress";

export default function CircularProgressDefault() {
  return (
    <div className="flex items-center justify-center">
      <CircularProgress value={75} size={80} thickness={6}>
        <CircularProgressIndicator>
          <CircularProgressTrack />
          <CircularProgressRange />
        </CircularProgressIndicator>
        <CircularProgressValueText className="text-sm font-semibold" />
      </CircularProgress>
    </div>
  );
}
