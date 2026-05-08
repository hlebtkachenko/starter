/**
 * @slug badge
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/badge
 * @deviations ["Hero renders all four badge variants in one row rather than a single badge."]
 */
import { Badge } from "@/components/ui/badge";

export default function BadgeDefault() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
