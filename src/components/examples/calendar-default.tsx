"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDefault() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
      captionLayout="dropdown"
    />
  );
}
