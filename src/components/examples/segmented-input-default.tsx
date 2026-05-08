/**
 * @slug segmented-input
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/segmented-input
 * @deviations ["Token classes replace hardcoded palette."]
 */

import { Label } from "@/components/ui/label";
import { SegmentedInput, SegmentedInputItem } from "@/components/ui/segmented-input";

export default function SegmentedInputDefault() {
  return (
    <div className="flex flex-col gap-2">
      <Label>Date of birth</Label>
      <SegmentedInput>
        <SegmentedInputItem placeholder="MM" maxLength={2} className="w-16 text-center" />
        <SegmentedInputItem placeholder="DD" maxLength={2} className="w-16 text-center" />
        <SegmentedInputItem placeholder="YYYY" maxLength={4} className="w-20 text-center" />
      </SegmentedInput>
    </div>
  );
}
