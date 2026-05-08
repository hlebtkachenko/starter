/**
 * @slug evil-composed-chart
 * @variant default
 * @upstream https://evilcharts.com/docs/components/composed-chart
 * @deviations ["Stub re-export from evilcharts/charts directory."]
 */
"use client";

import { EvilComposedChart } from "@/components/ui/evil-composed-chart";

const data = [
  { month: "Jan", orders: 420, avgValue: 85 },
  { month: "Feb", orders: 380, avgValue: 92 },
  { month: "Mar", orders: 510, avgValue: 78 },
  { month: "Apr", orders: 460, avgValue: 88 },
  { month: "May", orders: 580, avgValue: 95 },
  { month: "Jun", orders: 620, avgValue: 91 },
];

const barConfig = {
  orders: { label: "Orders", colors: { light: ["#6366f1"], dark: ["#818cf8"] } },
};

const lineConfig = {
  avgValue: { label: "Avg Value", colors: { light: ["#10b981"], dark: ["#34d399"] } },
};

export default function EvilComposedChartDefault() {
  return (
    <EvilComposedChart
      data={data}
      barConfig={barConfig}
      lineConfig={lineConfig}
      xDataKey="month"
      className="h-64 w-full"
    />
  );
}
