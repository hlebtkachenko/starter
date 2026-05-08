/**
 * @slug tooltip
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/tooltip
 * @deviations ["isFlagged: page-hero variant matches upstream TooltipDemo exactly."]
 */
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipDefault() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
