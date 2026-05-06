/**
 * @slug textarea
 * @variant button
 * @upstream https://ui.shadcn.com/docs/components/textarea
 * @deviations []
 */
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
