/**
 * @slug alert
 * @variant custom-colors
 * @upstream https://ui.shadcn.com/docs/components/alert
 * @deviations ["Uses Tailwind palette classes (bg-amber-50, dark:bg-amber-950) per the shadcn Custom Colors escape hatch — not a violation of the no-inline-hex rule."]
 */
import { AlertTriangleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertCustomColors() {
  return (
    <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to continue using the
        service.
      </AlertDescription>
    </Alert>
  );
}
