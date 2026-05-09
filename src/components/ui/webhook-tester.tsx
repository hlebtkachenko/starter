"use client";

import * as React from "react";

import { Loader2, Plus, Send, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface WebhookResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  timing: number;
}

interface WebhookTesterProps {
  defaultUrl?: string;
  defaultMethod?: HttpMethod;
  defaultHeaders?: Record<string, string>;
  defaultBody?: string;
  onSend?: (request: {
    url: string;
    method: HttpMethod;
    headers: Record<string, string>;
    body?: string;
  }) => Promise<WebhookResponse>;
  className?: string;
}

export function WebhookTester({
  defaultUrl = "",
  defaultMethod = "POST",
  defaultHeaders = { "Content-Type": "application/json" },
  defaultBody = "{}",
  onSend,
  className,
}: WebhookTesterProps) {
  const [url, setUrl] = React.useState(defaultUrl);
  const [method, setMethod] = React.useState<HttpMethod>(defaultMethod);
  const [headers, setHeaders] = React.useState<{ key: string; value: string }[]>(
    Object.entries(defaultHeaders).map(([key, value]) => ({ key, value })),
  );
  const [body, setBody] = React.useState(defaultBody);
  const [response, setResponse] = React.useState<WebhookResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleAddHeader = React.useCallback(() => {
    setHeaders((prev) => [...prev, { key: "", value: "" }]);
  }, []);

  const handleRemoveHeader = React.useCallback((index: number) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleHeaderChange = React.useCallback(
    (index: number, field: "key" | "value", value: string) => {
      setHeaders((prev) => prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)));
    },
    [],
  );

  const handleSend = React.useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    const headersObj = headers.reduce(
      (acc, { key, value }) => {
        if (key) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    try {
      if (onSend) {
        const res = await onSend({
          url,
          method,
          headers: headersObj,
          ...(method !== "GET" ? { body } : {}),
        });
        setResponse(res);
      } else {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
          throw new Error(`Unsupported URL scheme: ${parsed.protocol}`);
        }
        const start = performance.now();
        const res = await fetch(url, {
          method,
          headers: headersObj,
          ...(method !== "GET" ? { body } : {}),
        });
        const timing = performance.now() - start;

        const responseHeaders: Record<string, string> = {};
        res.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });

        let responseBody: unknown;
        const contentType = res.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          responseBody = await res.json();
        } else {
          responseBody = await res.text();
        }

        setResponse({
          status: res.status,
          statusText: res.statusText,
          headers: responseHeaders,
          body: responseBody,
          timing: Math.round(timing),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body, onSend]);

  const getStatusColor = React.useCallback((status: number) => {
    if (status >= 200 && status < 300) return "text-green-600";
    if (status >= 300 && status < 400) return "text-yellow-600";
    if (status >= 400 && status < 500) return "text-orange-600";
    return "text-red-600";
  }, []);

  return (
    <div
      data-slot="webhook-tester"
      aria-busy={loading}
      aria-label="Webhook tester"
      className={cn("border border-border rounded-lg overflow-hidden", className)}
    >
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <NativeSelect
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            aria-label="HTTP method"
            className="font-mono font-medium"
          >
            {(["GET", "POST", "PUT", "PATCH", "DELETE"] as HttpMethod[]).map((m) => (
              <NativeSelectOption key={m} value={m}>
                {m}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/webhook"
            aria-label="Webhook URL"
            className="flex-1 font-mono"
          />
          <Button
            type="button"
            onClick={handleSend}
            disabled={loading || !url}
            aria-label={loading ? "Sending request" : "Send request"}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Send
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Headers</label>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={handleAddHeader}
              aria-label="Add header"
            >
              <Plus className="w-3 h-3" />
              Add
            </Button>
          </div>
          <div className="space-y-1">
            {headers.map((header, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                  placeholder="Header name"
                  aria-label="Header name"
                  className="flex-1 font-mono"
                />
                <Input
                  type="text"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                  placeholder="Header value"
                  aria-label={`Value for ${header.key || "header"}`}
                  className="flex-[2] font-mono"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleRemoveHeader(index)}
                  aria-label={`Remove ${header.key || "header"}`}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {method !== "GET" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Body</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              aria-label="Request body"
              className="h-32 font-mono resize-none"
            />
          </div>
        )}
      </div>

      {(response || error) && (
        <div className="border-t border-border">
          <div className="px-4 py-2 bg-muted/50 text-sm font-medium flex items-center justify-between">
            <span>Response</span>
            {response && (
              <div className="flex items-center gap-3 text-xs">
                <span className={cn("font-mono font-bold", getStatusColor(response.status))}>
                  {response.status} {response.statusText}
                </span>
                <span className="text-muted-foreground">{response.timing}ms</span>
              </div>
            )}
          </div>
          <div className="p-4 overflow-auto max-h-64">
            {error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : response ? (
              <pre className="font-mono text-xs whitespace-pre-wrap">
                {typeof response.body === "string"
                  ? response.body
                  : JSON.stringify(response.body, null, 2)}
              </pre>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export type { WebhookTesterProps, WebhookResponse, HttpMethod };
