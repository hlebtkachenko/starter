/**
 * @slug badge
 * @variant link
 * @upstream https://ui.shadcn.com/docs/components/badge
 * @deviations []
 */
import { ArrowUpRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function BadgeLink() {
  return (
    <Badge asChild>
      <a href="#link">
        Open Link <ArrowUpRightIcon data-icon="inline-end" />
      </a>
    </Badge>
  );
}
