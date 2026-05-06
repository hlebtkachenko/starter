import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LabelLabelInField() {
  return (
    <Field>
      <FieldLabel htmlFor="label-email">Your email address</FieldLabel>
      <Input id="label-email" />
    </Field>
  );
}
