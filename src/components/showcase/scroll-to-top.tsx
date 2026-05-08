"use client";

import { ArrowUpIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col gap-2 transition-opacity",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <Button
        type="button"
        size="icon"
        variant="default"
        aria-label="Jump to New Components"
        onClick={() =>
          document.getElementById("new-components")?.scrollIntoView({ behavior: "smooth" })
        }
        className="size-11 rounded-full shadow-lg"
      >
        <SparklesIcon />
      </Button>
      <Button
        type="button"
        size="icon"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="size-11 rounded-full shadow-lg"
      >
        <ArrowUpIcon />
      </Button>
    </div>
  );
}
