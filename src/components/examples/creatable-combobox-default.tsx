/**
 * @slug creatable-combobox
 * @variant default
 * @upstream https://flowkit-ui.vzkiss.com/docs/components/creatable-combobox
 * @deviations ["Uses project Combobox primitives. Token classes throughout."]
 */
"use client";

import { useState } from "react";
import {
  CreatableCombobox,
  ComboboxItemCreatable,
  type CreatableItem,
  isCreatableItem,
} from "@/components/ui/creatable-combobox";
import {
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type Fruit = { label: string; value: string };

const INITIAL_FRUITS: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Orange", value: "orange" },
];

export default function CreatableComboboxDefault() {
  const [fruits, setFruits] = useState<Fruit[]>(INITIAL_FRUITS);
  const [selected, setSelected] = useState<Fruit | null>(null);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label className="text-sm font-medium">Pick or create a fruit</label>
      <CreatableCombobox
        items={fruits}
        value={selected}
        onValueChange={(val) => setSelected(val as Fruit | null)}
        onCreateValue={(value) => {
          const newFruit = {
            label: value,
            value: value.toLowerCase().replace(/\s+/g, "-"),
          };
          setFruits((prev) => [...prev, newFruit]);
          setSelected(newFruit);
        }}
      >
        <ComboboxInput placeholder="Search fruits..." showClear />
        <ComboboxContent>
          <ComboboxList>
            {(item: Fruit | CreatableItem) =>
              isCreatableItem(item) ? (
                <ComboboxItemCreatable key="__create__" value={item} />
              ) : (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )
            }
          </ComboboxList>
        </ComboboxContent>
      </CreatableCombobox>
      {selected && (
        <p className="text-xs text-muted-foreground">Selected: {(selected as Fruit).label}</p>
      )}
    </div>
  );
}
