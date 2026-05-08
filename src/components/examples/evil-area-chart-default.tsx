/**
 * @slug evil-area-chart
 * @variant default
 * @upstream https://evilcharts.com/docs/components/area-chart
 * @deviations ["Stub re-export from evilcharts/charts directory."]
 */
"use client";

import { EvilAreaChart } from "@/components/ui/evil-area-chart";

const data = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 4800, expenses: 3100 },
  { month: "Mar", revenue: 5100, expenses: 2900 },
  { month: "Apr", revenue: 4600, expenses: 3200 },
  { month: "May", revenue: 5800, expenses: 3400 },
  { month: "Jun", revenue: 6200, expenses: 3100 },
];

const chartConfig = {
  revenue: { label: "Revenue", colors: { light: ["#6366f1"], dark: ["#818cf8"] } },
  expenses: { label: "Expenses", colors: { light: ["#f43f5e"], dark: ["#fb7185"] } },
};

export default function EvilAreaChartDefault() {
  return (
    <EvilAreaChart
      data={data}
      chartConfig={chartConfig}
      xDataKey="month"
      areaVariant="gradient"
      className="h-64 w-full"
    />
  );
}
