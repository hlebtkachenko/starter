/**
 * @slug card-styles
 * @variant aurora
 * @upstream https://cardcn.dev/cards/basic-cards/
 * @deviations ["Adapted from cardcn card-14. Radial gradient glow background."]
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CardStylesAurora() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-background">
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 70%),
            radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(59, 189, 248, 0.1) 0%, transparent 65%)
          `,
        }}
      />
      <Card className="isolate z-10 border-border bg-transparent">
        <CardHeader>
          <CardTitle>
            <div className="h-8 w-full max-w-40 rounded-md bg-background" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 w-full rounded-md bg-background" />
        </CardContent>
      </Card>
    </div>
  );
}
