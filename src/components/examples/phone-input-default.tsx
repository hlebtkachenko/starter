/**
 * @slug phone-input
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/phone-input
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import * as React from "react";

import { PhoneInput, PhoneInputCountrySelect, PhoneInputField } from "@/components/ui/phone-input";

export default function PhoneInputDefault() {
  const [value, setValue] = React.useState("+420");

  return (
    <div className="w-full max-w-sm">
      <PhoneInput value={value} onValueChange={setValue} defaultCountry="CZ">
        <PhoneInputCountrySelect />
        <PhoneInputField />
      </PhoneInput>
    </div>
  );
}
