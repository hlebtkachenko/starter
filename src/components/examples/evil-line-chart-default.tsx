/**
 * @slug evil-line-chart
 * @variant default
 * @upstream https://evilcharts.com/docs/components/line-chart
 * @deviations ["Stub re-export from evilcharts/charts directory."]
 */
"use client";

import { EvilLineChart } from "@/components/ui/evil-line-chart";

const data = [
  { week: "W1", users: 2400, signups: 400 },
  { week: "W2", users: 1398, signups: 300 },
  { week: "W3", users: 4800, signups: 520 },
  { week: "W4", users: 3908, signups: 480 },
  { week: "W5", users: 4800, signups: 380 },
  { week: "W6", users: 3800, signups: 430 },
];

const chartConfig = {
  users: { label: "Active Users", colors: { light: ["#6366f1"], dark: ["#818cf8"] } },
  signups: { label: "New Signups", colors: { light: ["#10b981"], dark: ["#34d399"] } },
};

export default function EvilLineChartDefault() {
  return (
    <EvilLineChart
      data={data}
      chartConfig={chartConfig}
      xDataKey="week"
      curveType="monotone"
      className="h-64 w-full"
    />
  );
}
