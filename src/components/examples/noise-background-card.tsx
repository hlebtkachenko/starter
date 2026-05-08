/**
 * @slug noise-background
 * @variant card
 * @upstream https://ui.aceternity.com/components/noise-background
 * @deviations ["Token classes replace hardcoded neutral palette.", "Self-hosted noise texture.", "External image replaced with placeholder."]
 */
import { NoiseBackground } from "@/components/ui/noise-background";
import { Card, CardContent } from "@/components/ui/card";

export default function NoiseBackgroundCard() {
  return (
    <div className="mx-auto max-w-sm">
      <NoiseBackground
        gradientColors={["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"]}
      >
        <Card className="min-h-80 overflow-hidden">
          <div className="h-60 w-full rounded-lg bg-muted" />
          <CardContent className="px-4 py-2">
            <h3 className="text-left text-lg font-semibold text-balance text-foreground">
              How to create a bento grid with Tailwind
            </h3>
            <p className="mt-2 text-left text-sm text-muted-foreground">
              Learn how to create a bento grid with Tailwind CSS, Next.js and Framer Motion.
            </p>
          </CardContent>
        </Card>
      </NoiseBackground>
    </div>
  );
}
