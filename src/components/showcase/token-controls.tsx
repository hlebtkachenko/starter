"use client";

import { MoonIcon, RotateCcwIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const DEFAULT_RADIUS = 0.625;
const DEFAULT_FONT_SIZE = 16;

export function TokenControls() {
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--radius", `${radius}rem`);
  }, [radius]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  function reset() {
    setRadius(DEFAULT_RADIUS);
    setFontSize(DEFAULT_FONT_SIZE);
    setDark(false);
  }

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-3 text-sm">
        <div className="flex flex-1 items-center gap-3">
          <Label htmlFor="radius-slider" className="whitespace-nowrap">
            Radius {radius.toFixed(3)}rem
          </Label>
          <Slider
            id="radius-slider"
            value={[radius]}
            onValueChange={(v) => setRadius(v[0] ?? DEFAULT_RADIUS)}
            min={0}
            max={1.5}
            step={0.025}
            className="max-w-xs"
          />
        </div>
        <div className="flex flex-1 items-center gap-3">
          <Label htmlFor="font-slider" className="whitespace-nowrap">
            Root font {fontSize}px
          </Label>
          <Slider
            id="font-slider"
            value={[fontSize]}
            onValueChange={(v) => setFontSize(v[0] ?? DEFAULT_FONT_SIZE)}
            min={12}
            max={20}
            step={1}
            className="max-w-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <SunIcon className="size-4" />
          <Switch
            id="dark-toggle"
            checked={dark}
            onCheckedChange={setDark}
            aria-label="Toggle dark mode"
          />
          <MoonIcon className="size-4" />
        </div>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcwIcon /> Reset
        </Button>
      </div>
    </div>
  );
}
