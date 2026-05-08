/**
 * @slug swap
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/swap
 * @deviations ["Token classes replace hardcoded palette."]
 */

import { MoonIcon, SunIcon } from "lucide-react";

import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";

export default function SwapDefault() {
  return (
    <div className="flex items-center justify-center">
      <Swap animation="rotate" className="size-10 rounded-md border p-2">
        <SwapOff>
          <SunIcon className="size-5 text-foreground" />
        </SwapOff>
        <SwapOn>
          <MoonIcon className="size-5 text-foreground" />
        </SwapOn>
      </Swap>
    </div>
  );
}
