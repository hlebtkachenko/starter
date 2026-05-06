/**
 * @slug sonner
 * @variant position
 * @upstream https://ui.shadcn.com/docs/components/sonner
 * @deviations ["POSITIONS array extracted to _fixtures/sonner.ts and iterated via .map() instead of six inline Button elements, reducing repetition while preserving the same six anchors."]
 */
"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { POSITIONS } from "./_fixtures/sonner";

export default function SonnerPosition() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {POSITIONS.map(({ label, value }) => (
        <Button
          key={value}
          variant="outline"
          onClick={() => toast("Event has been created", { position: value })}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
