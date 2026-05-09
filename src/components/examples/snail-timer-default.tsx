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
  const [runId, setRunId] = useState(0);
  const [running, setRunning] = useState(false);

  function handleStart() {
    setRunId((id) => id + 1);
    setRunning(true);
  }

  return (
    <div className="relative h-40 w-full overflow-hidden">
      <div className="absolute inset-x-0 top-2 z-10 flex justify-center">
        <Button variant="outline" size="sm" onClick={handleStart} disabled={running}>
          {running ? "Running..." : "Start Countdown"}
        </Button>
      </div>
      {running && (
        <SnailTimer key={runId} initialSeconds={10} onTimeout={() => setRunning(false)} />
      )}
    </div>
  );
}
