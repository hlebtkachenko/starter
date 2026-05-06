/**
 * @slug chart
 * @variant your-first-chart
 * @upstream https://ui.shadcn.com/docs/components/chart
 * @deviations []
 */
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { CHART_CONFIG, CHART_DATA } from "./_fixtures/chart";

export default function ChartYourFirstChart() {
  return (
    <ChartContainer config={CHART_CONFIG} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={CHART_DATA}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
