/**
 * @slug toggle-group
 * @variant disabled
 * @upstream https://ui.shadcn.com/docs/components/toggle-group#disabled
 * @deviations ["Used BoldIcon, ItalicIcon, UnderlineIcon (-Icon suffix) instead of Bold, Italic, Underline; both are lucide-react aliases for the same icons."]
 */
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDisabled() {
  return (
    <ToggleGroup disabled type="multiple">
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
