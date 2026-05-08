/**
 * @slug card-styles
 * @variant tilted
 * @upstream https://cardcn.dev/cards/basic-cards/
 * @deviations ["Adapted from cardcn card-15. Tilted background layer behind card."]
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardStylesTilted() {
  return (
    <div className="relative">
      <div className="absolute inset-0 isolate z-0 scale-x-95 -rotate-[5deg] rounded-xl border border-border/50 bg-muted/30 py-10" />
      <Card className="isolate z-10">
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
