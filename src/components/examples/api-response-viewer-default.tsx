/**
 * @slug api-response-viewer
 * @variant default
 * @upstream https://www.tryelements.dev/docs/devtools/api-response-viewer
 * @deviations ["Moved from elements/ to ui/ directory."]
 */
"use client";

import { ApiResponseViewer } from "@/components/ui/api-response-viewer";

const MOCK_RESPONSE = {
  status: 200,
  statusText: "OK",
  headers: {
    "content-type": "application/json",
    "x-request-id": "req_abc123",
    "cache-control": "no-cache",
  },
  body: {
    success: true,
    data: {
      id: 1,
      name: "Provo Starter",
      version: "1.0.0",
      features: ["auth", "billing", "orgs"],
    },
  },
  timing: {
    dns: 12,
    connect: 23,
    ttfb: 45,
    download: 8,
    total: 88,
  },
};

export default function ApiResponseViewerDefault() {
  return (
    <div className="w-full">
      <ApiResponseViewer response={MOCK_RESPONSE} />
    </div>
  );
}
