/**
 * @slug combobox
 * @variant invalid
 * @upstream https://ui.shadcn.com/docs/components/combobox
 * @deviations []
 */
import { COMBOBOX_FRAMEWORKS } from "@/components/examples/_fixtures/combobox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function ComboboxInvalid() {
  return (
    <Combobox items={COMBOBOX_FRAMEWORKS}>
      <ComboboxInput placeholder="Select a framework" aria-invalid="true" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
