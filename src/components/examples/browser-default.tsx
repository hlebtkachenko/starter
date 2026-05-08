/**
 * @slug browser
 * @variant default
 * @upstream https://www.eldoraui.site/docs/components/browser
 * @deviations ["Token classes replace hardcoded palette where possible."]
 */
"use client";

import { Browser } from "@/components/ui/browser";

export default function BrowserDefault() {
  return (
    <div className="w-full">
      <Browser
        initialUrl="https://example.com"
        showWindowControls
        simulateLoading
        enableTabManagement
      />
    </div>
  );
}
