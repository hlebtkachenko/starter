/**
 * @slug card-styles
 * @variant stacked
 * @upstream https://cardcn.dev/cards/basic-cards/
 * @deviations ["Adapted from cardcn card-18. Stacked cards behind main card."]
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardStylesStacked() {
  return (
    <div className="relative h-full pt-6">
      <div className="absolute top-0 h-full w-full scale-95 rounded-xl border border-border bg-card" />
      <div className="absolute top-3 h-full w-full scale-[0.97] rounded-xl border border-border bg-card shadow-[0_-2px_6px_-2px_var(--border)]" />
      <Card className="isolate z-10 shadow-[0_-3px_6px_-2px_var(--border)]">
        <CardHeader>
          <CardTitle>
            <div className="h-8 w-full max-w-40 rounded-md bg-secondary" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 w-full rounded-md bg-secondary" />
        </CardContent>
      </Card>
    </div>
  );
}
