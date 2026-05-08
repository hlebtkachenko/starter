/**
 * @slug cropper
 * @variant with-controls
 * @upstream https://www.diceui.com/docs/components/radix/cropper
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import { RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import * as React from "react";

import { Cropper, CropperArea, CropperImage } from "@/components/ui/cropper";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function CropperWithControls() {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);

  const minZoom = 1;
  const maxZoom = 3;

  return (
    <div className="w-full space-y-4">
      <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-muted">
        <Cropper
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspectRatio={16 / 9}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          withGrid
        >
          <CropperImage
            src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80"
            alt="Nature landscape"
          />
          <CropperArea />
        </Cropper>
      </div>
      <div className="flex items-center gap-3">
        <ZoomOutIcon className="size-4 shrink-0 text-muted-foreground" />
        <Slider
          value={[zoom]}
          min={minZoom}
          max={maxZoom}
          step={0.1}
          onValueChange={(values) => setZoom(values[0] ?? minZoom)}
        />
        <ZoomInIcon className="size-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-3">
        <RotateCcwIcon className="size-4 shrink-0 text-muted-foreground" />
        <Slider
          value={[rotation]}
          min={0}
          max={360}
          step={1}
          onValueChange={(values) => setRotation(values[0] ?? 0)}
        />
        <span className="w-10 text-right text-xs text-muted-foreground">{rotation}°</span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
