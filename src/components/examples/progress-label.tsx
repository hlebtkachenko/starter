/**
 * @slug progress
 * @variant label
 * @upstream https://ui.shadcn.com/docs/components/progress
 * @deviations []
 */
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

export default function ProgressLabel() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>Upload progress</span>
        <span className="ml-auto">66%</span>
      </FieldLabel>
      <Progress value={66} id="progress-upload" />
    </Field>
  );
}
