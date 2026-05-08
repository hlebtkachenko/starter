/**
 * @slug qr-code
 * @variant default
 * @upstream https://www.diceui.com/docs/components/radix/qr-code
 * @deviations ["Token classes replace hardcoded palette."]
 */
"use client";

import { QRCode, QRCodeCanvas, QRCodeSkeleton } from "@/components/ui/qr-code";

export default function QRCodeDefault() {
  return (
    <div className="flex items-center justify-center">
      <QRCode value="https://example.com" size={200} level="M">
        <QRCodeSkeleton className="rounded-md" />
        <QRCodeCanvas />
      </QRCode>
    </div>
  );
}
