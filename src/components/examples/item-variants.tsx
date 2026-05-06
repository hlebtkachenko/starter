import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

export default function ItemVariants() {
  return (
    <>
      <Item variant="default" className="w-full">
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" className="w-full">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" className="w-full">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
        </ItemContent>
      </Item>
    </>
  );
}
