/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import * as React from "react";

import { Download, Eye, EyeOff, Plus, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EnvVariable {
  key: string;
  value: string;
}

interface EnvEditorProps {
  value?: EnvVariable[];
  onChange?: (variables: EnvVariable[]) => void;
  readOnly?: boolean;
  masked?: boolean;
  className?: string;
}

function parseEnvString(content: string): EnvVariable[] {
  const lines = content.split("\n");
  const variables: EnvVariable[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    variables.push({ key, value });
  }

  return variables;
}

function toEnvString(variables: EnvVariable[]): string {
  return variables
    .map(({ key, value }) => {
      const needsQuotes =
        value.includes(" ") ||
        value.includes("=") ||
        value.includes("#") ||
        value.includes('"') ||
        value.includes("\\") ||
        value.includes("\n");
      if (needsQuotes) {
        const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
        return `${key}="${escaped}"`;
      }
      return `${key}=${value}`;
    })
    .join("\n");
}

export function EnvEditor({
  value = [],
  onChange,
  readOnly = false,
  masked: defaultMasked = true,
  className,
}: EnvEditorProps) {
  const [variables, setVariables] = React.useState<EnvVariable[]>(value);
  const [maskedIndices, setMaskedIndices] = React.useState<Set<number>>(
    () => new Set(value.map((_, i) => i)),
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setVariables(value);
    if (defaultMasked) {
      setMaskedIndices(new Set(value.map((_, i) => i)));
    }
  }, [value, defaultMasked]);

  const handleAdd = React.useCallback(() => {
    const newVar = { key: "", value: "" };
    setVariables((prev) => {
      const updated = [...prev, newVar];
      onChange?.(updated);
      return updated;
    });
  }, [onChange]);

  const handleRemove = React.useCallback(
    (index: number) => {
      setVariables((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        onChange?.(updated);
        return updated;
      });
    },
    [onChange],
  );

  const handleChange = React.useCallback(
    (index: number, field: "key" | "value", newValue: string) => {
      setVariables((prev) => {
        const updated = prev.map((v, i) => {
          if (i === index) {
            return { ...v, [field]: newValue };
          }
          return v;
        });
        onChange?.(updated);
        return updated;
      });
    },
    [onChange],
  );

  const toggleMask = React.useCallback((index: number) => {
    setMaskedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const handleExport = React.useCallback(() => {
    const content = toEnvString(variables);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env";
    a.click();
    URL.revokeObjectURL(url);
  }, [variables]);

  const handleImport = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result as string;
        const parsed = parseEnvString(content);
        setVariables(parsed);
        onChange?.(parsed);
        if (defaultMasked) {
          setMaskedIndices(new Set(parsed.map((_, i) => i)));
        }
      };
      reader.readAsText(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onChange, defaultMasked],
  );

  return (
    <div
      data-slot="env-editor"
      className={cn("border border-border rounded-lg overflow-hidden", className)}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50">
        <span className="text-sm font-medium">.env Editor</span>
        {!readOnly && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Import .env file"
            >
              <Upload className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleExport}
              aria-label="Export .env file"
            >
              <Download className="w-4 h-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".env,.env.local,.env.development,.env.production"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        )}
      </div>

      <div className="divide-y divide-border">
        {variables.map((variable, index) => (
          <div key={index} className="flex items-center gap-2 px-3 py-2" role="row">
            <input
              type="text"
              value={variable.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
              placeholder="KEY"
              readOnly={readOnly}
              aria-label="Variable name"
              className="flex-1 min-w-0 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <span className="text-muted-foreground" aria-hidden="true">
              =
            </span>
            <div className="flex-[2] flex items-center gap-1">
              <input
                type={maskedIndices.has(index) ? "password" : "text"}
                value={variable.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                placeholder="value"
                readOnly={readOnly}
                aria-label={`Value for ${variable.key || "variable"}`}
                className="flex-1 min-w-0 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => toggleMask(index)}
                aria-label={maskedIndices.has(index) ? "Show value" : "Hide value"}
                aria-pressed={maskedIndices.has(index)}
                className="shrink-0"
              >
                {maskedIndices.has(index) ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
              </Button>
              {!readOnly && (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove ${variable.key || "variable"}`}
                  className="shrink-0 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          </div>
        ))}

        {variables.length === 0 && (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">
            No environment variables
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="px-3 py-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAdd}
            aria-label="Add new environment variable"
            className="text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-4 h-4" />
            Add variable
          </Button>
        </div>
      )}
    </div>
  );
}

export type { EnvEditorProps, EnvVariable };
