/**
 * @slug gauge
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/gauge
 * @deviations ["Token classes replace hardcoded palette."]
 */

import {
  Gauge,
  GaugeIndicator,
  GaugeLabel,
  GaugeRange,
  GaugeTrack,
  GaugeValueText,
} from "@/components/ui/gauge";

export default function GaugeDefault() {
  return (
    <div className="flex items-center justify-center">
      <Gauge value={60} size={160} thickness={10} startAngle={-120} endAngle={120}>
        <GaugeIndicator>
          <GaugeTrack />
          <GaugeRange />
        </GaugeIndicator>
        <GaugeValueText />
        <GaugeLabel>Performance</GaugeLabel>
      </Gauge>
    </div>
  );
}
