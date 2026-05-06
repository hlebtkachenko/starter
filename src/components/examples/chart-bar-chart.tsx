/**
 * @slug chart
 * @variant bar-chart
 * @upstream https://ui.shadcn.com/docs/components/chart
 * @deviations ["Bare bar chart without grid or axis; used as a build-up step (isFlagged)."]
 */
import { Bar, BarChart } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

import { CHART_CONFIG, CHART_DATA } from "./_fixtures/chart";

export default function ChartBarChart() {
  return (
    <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
      <BarChart data={CHART_DATA}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
