/**
 * @slug native-select
 * @variant invalid
 * @upstream https://ui.shadcn.com/docs/components/native-select
 * @deviations []
 */
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

export default function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">Error state</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  );
}
