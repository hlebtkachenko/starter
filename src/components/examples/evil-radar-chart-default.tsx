/**
 * @slug evil-radar-chart
 * @variant default
 * @upstream https://evilcharts.com/docs/components/radar-chart
 * @deviations ["Stub re-export from evilcharts/charts directory."]
 */
"use client";

import { EvilRadarChart } from "@/components/ui/evil-radar-chart";

const data = [
  { metric: "Speed", frontend: 86, backend: 92 },
  { metric: "Reliability", frontend: 78, backend: 95 },
  { metric: "Scalability", frontend: 72, backend: 88 },
  { metric: "Security", frontend: 65, backend: 91 },
  { metric: "Usability", frontend: 94, backend: 70 },
  { metric: "Cost", frontend: 80, backend: 75 },
];

const chartConfig = {
  frontend: { label: "Frontend", colors: { light: ["#6366f1"], dark: ["#818cf8"] } },
  backend: { label: "Backend", colors: { light: ["#f43f5e"], dark: ["#fb7185"] } },
};

export default function EvilRadarChartDefault() {
  return (
    <EvilRadarChart
      data={data}
      chartConfig={chartConfig}
      dataKey="metric"
      className="h-72 w-full"
    />
  );
}
