import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

export default function ItemSizes() {
  return (
    <>
      <Item variant="outline" size="default" className="w-full">
        <ItemContent>
          <ItemTitle>Default size</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm" className="w-full">
        <ItemContent>
          <ItemTitle>Small size</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs" className="w-full">
        <ItemContent>
          <ItemTitle>Extra small</ItemTitle>
        </ItemContent>
      </Item>
    </>
  );
}
