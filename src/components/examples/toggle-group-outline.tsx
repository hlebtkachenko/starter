/**
 * @slug toggle-group
 * @variant outline
 * @upstream https://ui.shadcn.com/docs/components/toggle-group#outline
 * @deviations []
 */
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" type="single" defaultValue="all">
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
