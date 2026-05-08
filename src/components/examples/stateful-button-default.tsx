/**
 * @slug stateful-button
 * @variant default
 * @upstream https://ui.aceternity.com/components/stateful-button
 * @deviations ["Renamed export from Button to StatefulButton to avoid conflict.", "Token classes replace hardcoded green palette."]
 */
"use client";

import * as React from "react";

import { StatefulButton } from "@/components/ui/stateful-button";

export default function StatefulButtonDefault() {
  const handleClick = () => new Promise<void>((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="flex justify-center">
      <StatefulButton onClick={handleClick}>Submit</StatefulButton>
    </div>
  );
}
