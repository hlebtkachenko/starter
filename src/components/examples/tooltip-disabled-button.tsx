/**
 * @slug tooltip
 * @variant disabled-button
 * @upstream https://ui.shadcn.com/docs/components/tooltip
 * @deviations []
 */
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function TooltipDisabledButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block w-fit">
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  );
}
