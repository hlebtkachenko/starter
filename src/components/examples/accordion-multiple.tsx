import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ACCORDION_MULTIPLE } from "./_fixtures/accordion";

export default function AccordionMultiple() {
  return (
    <Accordion type="multiple" defaultValue={["notifications"]} className="w-full max-w-lg">
      {ACCORDION_MULTIPLE.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
