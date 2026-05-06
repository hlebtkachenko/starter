/**
 * @slug textarea
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/textarea
 * @deviations ["isFlagged: not present in upstream Examples block — project-local default demo."]
 */
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDefault() {
  return <Textarea placeholder="Type your message here." />;
}
