/**
 * @slug sonner
 * @variant description
 * @upstream https://ui.shadcn.com/docs/components/sonner
 * @deviations []
 */
"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function SonnerDescription() {
  return (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
        })
      }
      variant="outline"
      className="w-fit"
    >
      Show Toast
    </Button>
  );
}
