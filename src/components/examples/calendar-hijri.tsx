/**
 * @slug calendar
 * @variant hijri
 * @upstream https://ui.shadcn.com/docs/components/calendar
 * @deviations ["RTL direction for Hijri-style locales; not in upstream examples (isFlagged)."]
 */
"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarHijri() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-muted-foreground">Hijri calendar (right-to-left)</p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        dir="rtl"
        className="rounded-[var(--radius)] border border-border"
      />
    </div>
  );
}
