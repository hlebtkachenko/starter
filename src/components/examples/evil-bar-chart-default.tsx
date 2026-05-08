/**
 * @slug evil-bar-chart
 * @variant default
 * @upstream https://evilcharts.com/docs/components/bar-chart
 * @deviations ["Stub re-export from evilcharts/charts directory."]
 */
"use client";

import { EvilBarChart } from "@/components/ui/evil-bar-chart";

const data = [
  { quarter: "Q1", sales: 82000, returns: 6200 },
  { quarter: "Q2", sales: 96000, returns: 7400 },
  { quarter: "Q3", sales: 110000, returns: 8100 },
  { quarter: "Q4", sales: 134000, returns: 9500 },
];

const chartConfig = {
  sales: { label: "Sales", colors: { light: ["#6366f1"], dark: ["#818cf8"] } },
  returns: { label: "Returns", colors: { light: ["#f43f5e"], dark: ["#fb7185"] } },
};

export default function EvilBarChartDefault() {
  return (
    <EvilBarChart
      data={data}
      chartConfig={chartConfig}
      xDataKey="quarter"
      className="h-64 w-full"
    />
  );
}
