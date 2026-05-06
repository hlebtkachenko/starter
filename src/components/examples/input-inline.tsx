/**
 * @slug input
 * @variant inline
 * @upstream https://ui.shadcn.com/docs/components/input
 * @deviations []
 */
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  );
}
