import { Bar, BarChart, CartesianGrid } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

import { CHART_CONFIG, CHART_DATA } from "./_fixtures/chart";

export default function ChartWithGrid() {
  return (
    <ChartContainer config={CHART_CONFIG} className="h-56 w-full">
      <BarChart data={CHART_DATA}>
        <CartesianGrid vertical={false} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
