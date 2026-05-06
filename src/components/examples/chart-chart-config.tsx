import { Bar, BarChart } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

import { CHART_CONFIG_DEMO, CHART_DATA } from "./_fixtures/chart";

export default function ChartChartConfig() {
  return (
    <ChartContainer config={CHART_CONFIG_DEMO} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={CHART_DATA}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
