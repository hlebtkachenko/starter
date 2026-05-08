/**
 * @slug evil-pie-chart
 * @variant default
 * @upstream https://evilcharts.com/docs/components/pie-chart
 * @deviations ["Stub re-export from evilcharts/charts directory."]
 */
"use client";

import { EvilPieChart } from "@/components/ui/evil-pie-chart";

const data = [
  { channel: "Organic", visitors: 4800 },
  { channel: "Paid Search", visitors: 2600 },
  { channel: "Social", visitors: 1900 },
  { channel: "Referral", visitors: 1200 },
  { channel: "Direct", visitors: 900 },
];

const chartConfig = {
  Organic: { label: "Organic", colors: { light: ["#6366f1"], dark: ["#818cf8"] } },
  "Paid Search": { label: "Paid Search", colors: { light: ["#8b5cf6"], dark: ["#a78bfa"] } },
  Social: { label: "Social", colors: { light: ["#10b981"], dark: ["#34d399"] } },
  Referral: { label: "Referral", colors: { light: ["#f59e0b"], dark: ["#fbbf24"] } },
  Direct: { label: "Direct", colors: { light: ["#f43f5e"], dark: ["#fb7185"] } },
};

export default function EvilPieChartDefault() {
  return (
    <EvilPieChart
      data={data}
      dataKey="visitors"
      nameKey="channel"
      chartConfig={chartConfig}
      innerRadius="40%"
      outerRadius="75%"
      paddingAngle={3}
      cornerRadius={4}
      className="h-72 w-full"
    />
  );
}
