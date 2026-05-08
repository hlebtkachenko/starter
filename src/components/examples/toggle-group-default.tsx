/**
 * @slug toggle-group
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/toggle-group
 * @deviations ["Used BoldIcon, ItalicIcon, UnderlineIcon (-Icon suffix) instead of Bold, Italic, Underline; both are lucide-react aliases for the same icons."]
 */
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDefault() {
  return (
    <ToggleGroup variant="outline" type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
