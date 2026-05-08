/**
 * @slug avatar
 * @variant badge-with-icon
 * @upstream https://ui.shadcn.com/docs/components/avatar
 * @deviations []
 */
import { PlusIcon } from "lucide-react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarBadgeWithIcon() {
  return (
    <Avatar className="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  );
}
