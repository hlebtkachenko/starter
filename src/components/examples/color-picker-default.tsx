/**
 * @slug color-picker
 * @variant default
 * @upstream custom
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import * as React from "react";

import { ColorPicker } from "@/components/ui/color-picker";

export default function ColorPickerDefault() {
  const [color, setColor] = React.useState("#007AFF");

  return (
    <div className="flex items-center gap-4">
      <ColorPicker color={color} onChange={setColor} />
    </div>
  );
}
