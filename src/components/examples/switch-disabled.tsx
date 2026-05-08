/**
 * @slug switch
 * @variant disabled
 * @upstream https://ui.shadcn.com/docs/components/switch
 * @deviations []
 */
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export default function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled-unchecked" disabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  );
}
