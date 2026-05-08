/**
 * @slug pdf-viewer
 * @variant default
 * @upstream https://www.tryelements.dev/docs/pdf/pdf-viewer
 * @deviations ["Moved from elements/ to ui/ directory.", "Dynamic import with ssr:false to avoid pdfjs DOMMatrix crash during prerender."]
 */
"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/components/ui/pdf-viewer").then((m) => m.PdfViewer), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center text-sm text-muted-foreground">
      Loading PDF viewer...
    </div>
  ),
});

export default function PdfViewerDefault() {
  return (
    <div className="w-full">
      <PdfViewer
        file="https://raw.githubusercontent.com/nicktomlin/sample-pdfs/refs/heads/master/simple.pdf"
        mode="single"
        initialZoom={1}
      />
    </div>
  );
}
