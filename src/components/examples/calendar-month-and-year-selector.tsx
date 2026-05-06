/**
 * @slug calendar
 * @variant month-and-year-selector
 * @upstream https://ui.shadcn.com/docs/components/calendar
 * @deviations []
 */
import { Calendar } from "@/components/ui/calendar";

export default function CalendarMonthAndYearSelector() {
  return <Calendar mode="single" captionLayout="dropdown" className="rounded-lg border" />;
}
