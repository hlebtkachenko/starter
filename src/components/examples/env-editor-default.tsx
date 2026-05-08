/**
 * @slug env-editor
 * @variant default
 * @upstream https://www.tryelements.dev/docs/devtools/env-editor
 * @deviations ["Moved from elements/ to ui/ directory."]
 */
"use client";

import { useState } from "react";
import { EnvEditor, type EnvVariable } from "@/components/ui/env-editor";

const INITIAL_VARS: EnvVariable[] = [
  { key: "DATABASE_URL", value: "postgresql://localhost:5432/provo" },
  { key: "API_KEY", value: "sk_live_abc123def456" },
  { key: "DEBUG", value: "false" },
  { key: "NODE_ENV", value: "development" },
];

export default function EnvEditorDefault() {
  const [variables, setVariables] = useState<EnvVariable[]>(INITIAL_VARS);

  return (
    <div className="w-full">
      <EnvEditor value={variables} onChange={setVariables} masked />
    </div>
  );
}
