/**
 * @slug json-viewer
 * @variant default
 * @upstream https://www.tryelements.dev/docs/devtools/json-viewer
 * @deviations ["Moved from elements/ to ui/ directory."]
 */
"use client";

import { JsonViewer } from "@/components/ui/json-viewer";

const SAMPLE_DATA = {
  name: "Jane Cooper",
  age: 32,
  email: "jane@example.com",
  active: true,
  address: {
    street: "123 Main St",
    city: "Prague",
    country: "CZ",
  },
  hobbies: ["photography", "hiking", "cooking"],
  metadata: null,
};

export default function JsonViewerDefault() {
  return (
    <div className="w-full">
      <JsonViewer data={SAMPLE_DATA} searchable copyPath />
    </div>
  );
}
