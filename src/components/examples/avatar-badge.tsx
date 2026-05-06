/**
 * @slug avatar
 * @variant badge
 * @upstream https://ui.shadcn.com/docs/components/avatar
 * @deviations []
 */
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarBadgeExample() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  );
}
