/**
 * @slug floating-panel
 * @variant default
 * @upstream https://shark.vini.one/docs/components/floating-panel
 * @deviations ["State-aware controls via useFloatingPanel API to bypass Ark's StageTrigger hidden logic that only allows transitions through default state."]
 */
"use client";

import { useState } from "react";
import { Maximize2, Minus, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FloatingPanel,
  FloatingPanelBody,
  FloatingPanelCloseTrigger,
  FloatingPanelContent,
  FloatingPanelControl,
  FloatingPanelFooter,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelTrigger,
  useFloatingPanel,
} from "@/components/ui/floating-panel";

function PanelControls({ stage }: { stage: "default" | "minimized" | "maximized" }) {
  const api = useFloatingPanel();

  return (
    <FloatingPanelControl>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Minimize"
        onClick={() => {
          // From maximized, restore default size before minimizing so
          // minimized state shows compact panel, not full-screen header.
          // Defer minimize so zag-js machine applies restore size first.
          if (stage === "maximized") {
            api.restore();
            requestAnimationFrame(() => api.minimize());
          } else {
            api.minimize();
          }
        }}
        className="group-data-minimized/floating-panel:hidden"
      >
        <Minus className="size-3" />
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Restore default size"
        onClick={() => api.restore()}
        className="hidden group-data-maximized/floating-panel:inline-flex group-data-minimized/floating-panel:inline-flex"
      >
        <Square className="size-3" />
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Maximize"
        onClick={() => api.maximize()}
        className="group-data-maximized/floating-panel:hidden"
      >
        <Maximize2 className="size-3" />
      </Button>
      <FloatingPanelCloseTrigger asChild>
        <Button size="icon-xs" variant="ghost" aria-label="Close">
          <X className="size-3" />
        </Button>
      </FloatingPanelCloseTrigger>
    </FloatingPanelControl>
  );
}

export default function FloatingPanelDefault() {
  const [notes, setNotes] = useState(
    "Meeting notes from standup:\n- Deploy v2 by Friday\n- Review auth flow PR\n- Update onboarding docs",
  );
  const [stage, setStage] = useState<"default" | "minimized" | "maximized">("default");

  return (
    <FloatingPanel onStageChange={(d) => setStage(d.stage)}>
      <FloatingPanelTrigger asChild>
        <Button variant="outline">Open Notes</Button>
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelHeader>
          <FloatingPanelTitle>Quick Notes</FloatingPanelTitle>
          <PanelControls stage={stage} />
        </FloatingPanelHeader>
        <FloatingPanelBody>
          <textarea
            className="min-h-32 w-full resize-none bg-transparent text-sm outline-none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <Button size="sm" variant="outline">
            Discard
          </Button>
          <Button size="sm">Save</Button>
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanel>
  );
}
