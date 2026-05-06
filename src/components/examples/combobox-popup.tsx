import { COMBOBOX_COUNTRIES } from "@/components/examples/_fixtures/combobox";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";

export default function ComboboxPopup() {
  return (
    <Combobox items={COMBOBOX_COUNTRIES} defaultValue={COMBOBOX_COUNTRIES[0]}>
      <ComboboxTrigger
        render={<Button variant="outline" className="w-64 justify-between font-normal" />}
      >
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.code} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
