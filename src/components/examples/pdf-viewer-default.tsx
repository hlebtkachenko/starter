/**
 * @slug pdf-viewer
 * @variant default
 * @upstream https://www.tryelements.dev/docs/pdf/pdf-viewer
 * @deviations ["Moved from elements/ to ui/ directory.", "Dynamic import with ssr:false to avoid pdfjs DOMMatrix crash during prerender.", "Added file upload input as primary source since remote URLs are unreliable."]
 */
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const PdfViewer = dynamic(() => import("@/components/ui/pdf-viewer").then((m) => m.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center text-sm text-muted-foreground">
      Loading PDF viewer...
    </div>
  ),
});

const FALLBACK_URL = "/sample.pdf";

export default function PdfViewerDefault() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <label className="text-sm font-medium">
        Upload a PDF to preview
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
        />
      </label>
      <PdfViewer file={file ?? FALLBACK_URL} mode="single" initialZoom={1} />
    </div>
  );
}
