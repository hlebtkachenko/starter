"use client";

import * as React from "react";

import { AlertTriangle, ChevronDown, ChevronUp, Copy, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorBoundaryUiProps {
  error: Error;
  resetError?: () => void;
  componentStack?: string | null;
  isDev?: boolean;
  className?: string;
}

function parseStackTrace(
  stack: string,
): { file: string; line: string; column: string; fn: string }[] {
  const lines = stack.split("\n").slice(1);
  return lines
    .map((line) => {
      const match =
        line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/) || line.match(/at\s+(.+?):(\d+):(\d+)/);
      if (match) {
        if (match.length === 5) {
          return {
            fn: match[1]!,
            file: match[2]!,
            line: match[3]!,
            column: match[4]!,
          };
        }
        return {
          fn: "anonymous",
          file: match[1]!,
          line: match[2]!,
          column: match[3]!,
        };
      }
      return null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

export function ErrorBoundaryUi({
  error,
  resetError,
  componentStack,
  isDev = process.env.NODE_ENV === "development",
  className,
}: ErrorBoundaryUiProps) {
  const [showStack, setShowStack] = React.useState(isDev);
  const [showComponentStack, setShowComponentStack] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const stackFrames = React.useMemo(
    () => (error.stack ? parseStackTrace(error.stack) : []),
    [error.stack],
  );

  const handleCopy = React.useCallback(async () => {
    const errorText = [
      `Error: ${error.message}`,
      "",
      "Stack Trace:",
      error.stack,
      componentStack ? `\nComponent Stack:\n${componentStack}` : "",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(errorText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }, [error.message, error.stack, componentStack]);

  const handleToggleStack = React.useCallback(() => {
    setShowStack((prev) => !prev);
  }, []);

  const handleToggleComponentStack = React.useCallback(() => {
    setShowComponentStack((prev) => !prev);
  }, []);

  return (
    <div
      data-slot="error-boundary-ui"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        "rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 overflow-hidden",
        className,
      )}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-red-700 dark:text-red-300">
            {isDev ? error.name || "Error" : "Something went wrong"}
          </h3>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 break-words">
            {isDev ? error.message : "An unexpected error occurred. Please try again."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pb-4">
        {resetError && (
          <Button variant="destructive" size="sm" onClick={resetError} aria-label="Try again">
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy error details"}
        >
          <Copy className="w-3.5 h-3.5" />
          {copied ? "Copied!" : "Copy error"}
        </Button>
      </div>

      {isDev && error.stack && (
        <div className="border-t border-red-200 dark:border-red-900">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleStack}
            aria-expanded={showStack}
            aria-controls="stack-trace-content"
            aria-label="Toggle stack trace"
            className="w-full justify-between rounded-none px-4 py-2 text-red-600 dark:text-red-400"
          >
            <span className="font-medium">Stack Trace</span>
            {showStack ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
          {showStack && (
            <div
              id="stack-trace-content"
              className="px-4 pb-4 overflow-auto"
              aria-label="Error stack trace"
            >
              <div className="font-mono text-xs space-y-1">
                {stackFrames.map((frame, idx) => (
                  <div key={idx} className="flex gap-2 text-red-600 dark:text-red-400">
                    <span className="text-red-400 dark:text-red-600 shrink-0">at</span>
                    <span className="text-red-700 dark:text-red-300">{frame.fn}</span>
                    <span className="text-red-500 truncate">
                      ({frame.file}:{frame.line}:{frame.column})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {isDev && componentStack && (
        <div className="border-t border-red-200 dark:border-red-900">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleComponentStack}
            aria-expanded={showComponentStack}
            aria-controls="component-stack-content"
            aria-label="Toggle component stack"
            className="w-full justify-between rounded-none px-4 py-2 text-red-600 dark:text-red-400"
          >
            <span className="font-medium">Component Stack</span>
            {showComponentStack ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
          {showComponentStack && (
            <div
              id="component-stack-content"
              className="px-4 pb-4 overflow-auto"
              aria-label="Component stack trace"
            >
              <pre className="font-mono text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
                {componentStack}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export type { ErrorBoundaryUiProps };
