/**
 * @slug native-select
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/native-select
 * @deviations ["isFlagged: not present in upstream Examples block — project-local default demo."]
 */
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export default function NativeSelectDefault() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption value="todo">Todo</NativeSelectOption>
      <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
      <NativeSelectOption value="done">Done</NativeSelectOption>
      <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
    </NativeSelect>
  );
}
