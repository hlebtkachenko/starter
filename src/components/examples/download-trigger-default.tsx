/**
 * @slug download-trigger
 * @variant default
 * @upstream https://shark.vini.one/docs/utilities/download-trigger
 * @deviations ["Token classes on wrapper. Uses shadcn Button as trigger."]
 */
"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadTrigger } from "@/components/ui/download-trigger";

export default function DownloadTriggerDefault() {
  const sampleJson = JSON.stringify(
    { name: "Sun Valley", version: "0.0.3", framework: "Next.js" },
    null,
    2,
  );

  return (
    <div className="flex flex-col items-start gap-3">
      <DownloadTrigger data={sampleJson} fileName="sample.json" mimeType="application/json" asChild>
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Download JSON
        </Button>
      </DownloadTrigger>

      <DownloadTrigger
        data={async () => {
          await new Promise((r) => setTimeout(r, 500));
          return "Generated at: " + new Date().toISOString();
        }}
        fileName="timestamp.txt"
        mimeType="text/plain"
        asChild
      >
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Async Download
        </Button>
      </DownloadTrigger>
    </div>
  );
}
