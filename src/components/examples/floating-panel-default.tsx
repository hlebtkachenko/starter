/**
 * @slug floating-panel
 * @variant default
 * @upstream https://shark.vini.one/docs/components/floating-panel
 * @deviations ["Token classes used throughout. Self-hosts on project design system."]
 */
"use client";

import { useState } from "react";
import { Minus, Maximize2, X } from "lucide-react";
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
  FloatingPanelStageTrigger,
} from "@/components/ui/floating-panel";

export default function FloatingPanelDefault() {
  const [notes, setNotes] = useState(
    "Meeting notes from standup:\n- Deploy v2 by Friday\n- Review auth flow PR\n- Update onboarding docs",
  );

  return (
    <FloatingPanel>
      <FloatingPanelTrigger asChild>
        <Button variant="outline">Open Notes</Button>
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelHeader>
          <FloatingPanelTitle>Quick Notes</FloatingPanelTitle>
          <FloatingPanelControl>
            <FloatingPanelStageTrigger stage="minimized" asChild>
              <Button size="icon-xs" variant="ghost" aria-label="Minimize">
                <Minus className="size-3" />
              </Button>
            </FloatingPanelStageTrigger>
            <FloatingPanelStageTrigger stage="maximized" asChild>
              <Button size="icon-xs" variant="ghost" aria-label="Maximize">
                <Maximize2 className="size-3" />
              </Button>
            </FloatingPanelStageTrigger>
            <FloatingPanelCloseTrigger asChild>
              <Button size="icon-xs" variant="ghost" aria-label="Close">
                <X className="size-3" />
              </Button>
            </FloatingPanelCloseTrigger>
          </FloatingPanelControl>
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
