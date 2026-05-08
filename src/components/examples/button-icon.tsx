/**
 * @slug button
 * @variant icon
 * @upstream https://ui.shadcn.com/docs/components/button#icon
 * @deviations []
 */
import { CircleFadingArrowUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  );
}
