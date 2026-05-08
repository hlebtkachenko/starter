/**
 * @slug tour
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/tour
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Tour,
  TourClose,
  TourDescription,
  TourFooter,
  TourHeader,
  TourNext,
  TourPortal,
  TourPrev,
  TourSpotlight,
  TourStep,
  TourStepCounter,
  TourTitle,
} from "@/components/ui/tour";

export default function TourDefault() {
  const [open, setOpen] = React.useState(false);

  return (
    <Tour open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-start gap-4">
        <Button id="tour-trigger" variant="outline" onClick={() => setOpen(true)}>
          Start tour
        </Button>
        <div className="flex gap-4">
          <div id="tour-step-1" className="rounded-lg border bg-card p-4 text-sm">
            Step 1: Welcome card
          </div>
          <div id="tour-step-2" className="rounded-lg border bg-card p-4 text-sm">
            Step 2: Feature card
          </div>
        </div>
      </div>
      <TourPortal>
        <TourSpotlight />
        <TourStep target="#tour-step-1" side="bottom">
          <TourClose />
          <TourHeader>
            <TourTitle>Welcome</TourTitle>
            <TourDescription>
              This is the first step of the tour. It highlights a UI element.
            </TourDescription>
          </TourHeader>
          <TourFooter>
            <TourStepCounter />
            <div className="flex gap-2">
              <TourPrev />
              <TourNext />
            </div>
          </TourFooter>
        </TourStep>
        <TourStep target="#tour-step-2" side="bottom">
          <TourClose />
          <TourHeader>
            <TourTitle>Features</TourTitle>
            <TourDescription>
              This is the second step. Click finish to complete the tour.
            </TourDescription>
          </TourHeader>
          <TourFooter>
            <TourStepCounter />
            <div className="flex gap-2">
              <TourPrev />
              <TourNext />
            </div>
          </TourFooter>
        </TourStep>
      </TourPortal>
    </Tour>
  );
}
