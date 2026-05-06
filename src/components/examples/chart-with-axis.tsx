/**
 * @slug chart
 * @variant with-axis
 * @upstream https://ui.shadcn.com/docs/components/chart
 * @deviations ["Step-by-step build-up variant; not in upstream Examples block (isFlagged)."]
 */
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

import { CHART_CONFIG, CHART_DATA } from "./_fixtures/chart";

export default function ChartWithAxis() {
  return (
    <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
      <BarChart data={CHART_DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
