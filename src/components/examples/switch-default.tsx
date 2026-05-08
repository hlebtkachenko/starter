/**
 * @slug switch
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/switch
 * @deviations ["isFlagged: not present in upstream Examples block — project-local default demo."]
 */
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchDefault() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
