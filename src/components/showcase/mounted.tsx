"use client";

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";

export function Mounted({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- gate hydration
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [mounted]);

  if (!mounted) return null;
  return <>{children}</>;
}
