/**
 * @slug button-group
 * @variant split
 * @upstream https://ui.shadcn.com/docs/components/button-group#split
 * @deviations ["Replaced @tabler/icons-react IconPlus with lucide-react PlusIcon per project iconLibrary rule."]
 */
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
