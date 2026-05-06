import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ACCORDION_BASIC } from "./_fixtures/accordion";

export default function AccordionBasic() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-lg">
      {ACCORDION_BASIC.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
