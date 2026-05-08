/**
 * @slug card-styles
 * @variant hatched
 * @upstream https://cardcn.dev/cards/basic-cards/
 * @deviations ["Adapted from cardcn card-10. Hatching pattern uses --border token."]
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardStylesHatched() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="absolute inset-1 z-0 rounded-lg opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 2px, var(--border) 2px, var(--border) 4px)",
        }}
      />
      <Card className="isolate z-10 border-2 border-border bg-transparent">
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
