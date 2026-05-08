/**
 * @slug toggle-group
 * @variant spacing
 * @upstream https://ui.shadcn.com/docs/components/toggle-group#spacing
 * @deviations []
 */
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupSpacing() {
  return (
    <ToggleGroup type="single" size="sm" defaultValue="top" variant="outline" spacing={2}>
      <ToggleGroupItem value="top" aria-label="Toggle top">
        Top
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
        Bottom
      </ToggleGroupItem>
      <ToggleGroupItem value="left" aria-label="Toggle left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
