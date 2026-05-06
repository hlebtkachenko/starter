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
