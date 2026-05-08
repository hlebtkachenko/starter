/**
 * @slug card-styles
 * @variant lines
 * @upstream https://cardcn.dev/cards/basic-cards/
 * @deviations ["Adapted from cardcn card-2. Gradient lines use token-safe palette."]
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Line({ className = "" }) {
  return (
    <div
      className={cn(
        "absolute z-0 h-px w-full from-1% via-border from-transparent to-border",
        className,
      )}
    />
  );
}

export default function CardStylesLines() {
  return (
    <div className="relative">
      <Line className="left-0 top-2 bg-linear-to-l sm:top-4 md:top-6" />
      <Line className="bottom-2 left-0 bg-linear-to-r sm:bottom-4 md:bottom-6" />
      <div className="absolute inset-y-0 left-2 z-0 w-px bg-linear-to-t from-transparent via-border to-border sm:left-4 md:left-6" />
      <div className="absolute inset-y-0 right-2 z-0 w-px bg-linear-to-t from-transparent via-border to-border sm:right-4 md:right-6" />
      <Card className="w-full border-none p-10 shadow-none">
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
