/**
 * @slug calendar
 * @variant with-timezone
 * @upstream https://ui.shadcn.com/docs/components/calendar
 * @deviations ["Pins timeZone to Europe/Prague; not in upstream examples (isFlagged)."]
 */
"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarWithTimezone() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-muted-foreground">Timezone: Europe/Prague</p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        timeZone="Europe/Prague"
        className="rounded-[var(--radius)] border border-border"
      />
    </div>
  );
}
