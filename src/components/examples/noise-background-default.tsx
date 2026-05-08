/**
 * @slug noise-background
 * @variant default
 * @upstream https://ui.aceternity.com/components/noise-background
 * @deviations ["Noise texture served from /noise.webp instead of external CDN.", "Token classes replace hardcoded neutral palette."]
 */
"use client";

import { NoiseBackground } from "@/components/ui/noise-background";

export default function NoiseBackgroundDefault() {
  return (
    <div className="flex justify-center">
      <NoiseBackground
        containerClassName="w-fit rounded-full p-2"
        gradientColors={["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"]}
      >
        <button className="cursor-pointer rounded-full bg-background px-4 py-2 font-medium text-foreground shadow-sm transition-all duration-100 active:scale-[0.98]">
          Start publishing &rarr;
        </button>
      </NoiseBackground>
    </div>
  );
}
