/**
 * @slug chart
 * @variant with-tooltip
 * @upstream https://ui.shadcn.com/docs/components/chart
 * @deviations ["Step-by-step build-up variant; not in upstream Examples block (isFlagged)."]
 */
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { CHART_CONFIG, CHART_DATA } from "./_fixtures/chart";

export default function ChartWithTooltip() {
  return (
    <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
      <BarChart data={CHART_DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
