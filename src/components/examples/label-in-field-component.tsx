/**
 * @slug label
 * @variant in-field-component
 * @upstream https://ui.shadcn.com/docs/components/label
 * @deviations ["Not present in upstream examples block; local showcase-only demo showing bare Label+Input pairing without the Field wrapper."]
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LabelInFieldComponent() {
  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="lb-pw">Your password</Label>
      <Input id="lb-pw" type="password" />
    </div>
  );
}
