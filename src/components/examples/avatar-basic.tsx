/**
 * @slug avatar
 * @variant basic
 * @upstream https://ui.shadcn.com/docs/components/avatar
 * @deviations []
 */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarBasic() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="grayscale" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
