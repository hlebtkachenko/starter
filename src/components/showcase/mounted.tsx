"use client";

import { useEffect, useState, type ReactNode } from "react";

export function Mounted({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- gate hydration
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
