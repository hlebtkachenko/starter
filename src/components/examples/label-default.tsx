/**
 * @slug label
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/label
 * @deviations []
 */
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LabelDefault() {
  return (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
