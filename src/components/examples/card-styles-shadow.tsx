/**
 * @slug card-styles
 * @variant shadow
 * @upstream https://cardcn.dev/cards/basic-cards/
 * @deviations ["Adapted from cardcn card-1. Uses token shadow via --border var."]
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardStylesShadow() {
  return (
    <Card className="shadow-[5px_5px_0px_0px_var(--border)]">
      <CardHeader>
        <CardTitle>
          <div className="h-8 w-full max-w-40 rounded-md bg-accent" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-20 w-full rounded-md bg-accent" />
      </CardContent>
    </Card>
  );
}
