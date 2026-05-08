/**
 * @slug accordion
 * @variant borders
 * @upstream https://ui.shadcn.com/docs/components/accordion
 * @deviations []
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ACCORDION_BORDERS } from "./_fixtures/accordion";

export default function AccordionBorders() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="billing"
      className="w-full max-w-lg rounded-[var(--radius)] border border-border"
    >
      {ACCORDION_BORDERS.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="border-b border-border px-4 last:border-b-0"
        >
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
