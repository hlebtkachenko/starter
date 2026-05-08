/**
 * @slug combobox
 * @variant default
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

export default function ComboboxDefault() {
  return (
    <Combobox items={COMBOBOX_FRAMEWORKS}>
      <ComboboxInput placeholder="Select a framework" />
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
