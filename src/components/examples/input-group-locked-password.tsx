/**
 * @slug input-group
 * @variant locked-password
 * @upstream https://ui.shadcn.com/docs/components/input-group
 * @deviations []
 */
"use client";

import { LockIcon } from "lucide-react";
import { useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupLockedPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field>
      <FieldLabel htmlFor="pw-locked">Master password</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <LockIcon />
        </InputGroupAddon>
        <InputGroupInput
          id="pw-locked"
          type={showPassword ? "text" : "password"}
          defaultValue="hunter2-secret"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="xs"
            variant="ghost"
            type="button"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
