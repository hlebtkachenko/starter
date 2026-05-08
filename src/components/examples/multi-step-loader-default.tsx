/**
 * @slug multi-step-loader
 * @variant default
 * @upstream https://ui.aceternity.com/components/multi-step-loader
 * @deviations ["Token classes replace hardcoded black/white/lime palette.", "Renders inline (not full-screen) for showcase preview."]
 */
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const LOADING_STATES = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He is mass of pure energy" },
  { text: "Uploading dynamic taxes" },
  { text: "Compiling source code" },
];

export default function MultiStepLoaderDefault() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => setLoading(true)}>Start Loading</Button>
      <MultiStepLoader
        loadingStates={LOADING_STATES}
        loading={loading}
        duration={1500}
        loop={false}
      />
      {loading && (
        <Button
          variant="ghost"
          className="fixed right-4 top-4 z-[120]"
          onClick={() => setLoading(false)}
        >
          Close
        </Button>
      )}
    </div>
  );
}
