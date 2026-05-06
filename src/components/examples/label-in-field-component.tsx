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
