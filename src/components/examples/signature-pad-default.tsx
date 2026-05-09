/**
 * @slug signature-pad
 * @variant default
 * @upstream https://shark.vini.one/docs/components/signature-pad
 * @deviations ["Token classes used throughout."]
 */
"use client";

import { SignaturePad } from "@/components/ui/signature-pad";

export default function SignaturePadDefault() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="text-sm font-medium">Signature</label>
      <SignaturePad />
      <p className="text-xs text-muted-foreground">
        Draw your signature above. Click the reset icon to clear.
      </p>
    </div>
  );
}
