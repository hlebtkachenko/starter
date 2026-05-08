/**
 * @slug error-boundary-ui
 * @variant default
 * @upstream https://www.tryelements.dev/docs/devtools/error-boundary-ui
 * @deviations ["Moved from elements/ to ui/ directory.", "Uses mock error for showcase."]
 */
"use client";

import { ErrorBoundaryUi } from "@/components/ui/error-boundary-ui";

const mockError = new Error("Cannot read properties of undefined (reading 'map')");
mockError.stack = `TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (src/features/users/ui/user-list.tsx:24:18)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:14985:18)
    at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:17811:13)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:19049:16)`;

export default function ErrorBoundaryUiDefault() {
  return (
    <div className="w-full">
      <ErrorBoundaryUi
        error={mockError}
        resetError={() => {}}
        isDev
        componentStack={`    at UserList
    at ErrorBoundary
    at AppLayout
    at App`}
      />
    </div>
  );
}
