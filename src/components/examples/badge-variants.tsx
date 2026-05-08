/**
 * @slug badge
 * @variant variants
 * @upstream https://ui.shadcn.com/docs/components/badge
 * @deviations []
 */
import { Badge } from "@/components/ui/badge";

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  );
}
