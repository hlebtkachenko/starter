/**
 * @slug input-otp
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/input-otp
 * @deviations ["Upstream page-hero uses defaultValue='123456' which triggers React controlled/uncontrolled warning inside input-otp; replaced with useState controlled wrapper."]
 */
"use client";

import * as React from "react";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function InputOtpDefault() {
  const [value, setValue] = React.useState("123456");
  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
