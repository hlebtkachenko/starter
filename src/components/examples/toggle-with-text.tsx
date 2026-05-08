/**
 * @slug toggle
 * @variant with-text
 * @upstream https://ui.shadcn.com/docs/components/toggle#with-text
 * @deviations []
 */
import { ItalicIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  );
}
