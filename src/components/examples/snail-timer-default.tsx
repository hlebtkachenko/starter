/**
 * @slug snail-timer
 * @variant default
 * @upstream https://www.uicapsule.com
 * @deviations ["Dust sprite self-hosted from /snail-dust.svg. Token classes on text."]
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SnailTimer } from "@/components/ui/snail-timer";

export default function SnailTimerDefault() {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative h-40 w-full overflow-hidden">
      <div className="absolute inset-x-0 top-2 flex justify-center">
        <Button variant="outline" size="sm" onClick={() => setStarted((p) => !p)}>
          {started ? "Pause" : "Start Countdown"}
        </Button>
      </div>
      <SnailTimer started={started} initialSeconds={15} />
    </div>
  );
}
