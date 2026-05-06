import { CreditCardIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupCreditCard() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <CreditCardIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="4242 4242 4242 4242" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="xs" variant="ghost">
          Verify
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
