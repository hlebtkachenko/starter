/**
 * @slug cropper
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/cropper
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import * as React from "react";

import { Cropper, CropperArea, CropperImage } from "@/components/ui/cropper";

export default function CropperDefault() {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-muted">
      <Cropper
        crop={crop}
        zoom={zoom}
        aspectRatio={16 / 9}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        withGrid
      >
        <CropperImage
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80"
          alt="Nature landscape"
        />
        <CropperArea />
      </Cropper>
    </div>
  );
}
