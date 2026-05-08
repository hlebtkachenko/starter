/**
 * @slug webhook-tester
 * @variant default
 * @upstream https://www.tryelements.dev/docs/devtools/webhook-tester
 * @deviations ["Moved from elements/ to ui/ directory."]
 */
"use client";

import { WebhookTester } from "@/components/ui/webhook-tester";

export default function WebhookTesterDefault() {
  return (
    <div className="w-full">
      <WebhookTester
        defaultUrl="https://jsonplaceholder.typicode.com/posts"
        defaultMethod="POST"
        defaultBody={JSON.stringify({ title: "Hello", body: "World", userId: 1 }, null, 2)}
      />
    </div>
  );
}
