/**
 * @slug carousel
 * @variant plugins
 * @upstream https://ui.shadcn.com/docs/components/carousel
 * @deviations ["Replaced upstream useRef(Autoplay(...)) with useMemo(() => Autoplay(...), []) — React 19 react-hooks/refs rule blocks reading ref.current during render."]
 */
"use client";

import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPlugins() {
  // Upstream MD uses useRef + plugin.current; React 19 lint forbids reading
  // refs during render, so we memoize the plugin instance instead. Same
  // visual + behavioral contract.
  const plugin = useMemo(() => Autoplay({ delay: 2000, stopOnInteraction: true }), []);

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full max-w-[10rem] sm:max-w-xs"
      onMouseEnter={plugin.stop}
      onMouseLeave={plugin.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
