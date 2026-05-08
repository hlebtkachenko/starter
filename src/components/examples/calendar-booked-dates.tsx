/**
 * @slug calendar
 * @variant booked-dates
 * @upstream https://ui.shadcn.com/docs/components/calendar
 * @deviations []
 */
"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarBookedDates() {
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().getFullYear(), 1, 3));
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i),
  );

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date ?? new Date()}
          selected={date}
          onSelect={setDate}
          disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </CardContent>
    </Card>
  );
}
