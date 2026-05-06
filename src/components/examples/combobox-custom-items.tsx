/**
 * @slug combobox
 * @variant custom-items
 * @upstream https://ui.shadcn.com/docs/components/combobox
 * @deviations []
 */
import { COMBOBOX_COUNTRIES } from "@/components/examples/_fixtures/combobox";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";

export default function ComboboxCustomItems() {
  return (
    <Combobox
      items={COMBOBOX_COUNTRIES.filter((country) => country.code !== "")}
      itemToStringValue={(country: (typeof COMBOBOX_COUNTRIES)[number]) => country.label}
    >
      <ComboboxInput placeholder="Search countries..." />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country) => (
            <ComboboxItem key={country.code} value={country}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">{country.label}</ItemTitle>
                  <ItemDescription>
                    {country.continent} ({country.code})
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
