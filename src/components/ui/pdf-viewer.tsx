"use client";

import * as React from "react";

import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

type ViewMode = "single" | "scroll" | "book";

interface PdfViewerProps {
  /** URL to the PDF file or File object */
  file: string | File;
  /** Initial viewing mode */
  mode?: ViewMode;
  /** Initial zoom level (0.5 to 2.0) */
  initialZoom?: number;
  /** Custom className */
  className?: string;
}

export function PdfViewer({ file, mode = "single", initialZoom = 1.0, className }: PdfViewerProps) {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [viewMode, setViewMode] = React.useState<ViewMode>(mode);
  const [zoom, setZoom] = React.useState<number>(initialZoom);
  const [pageWidth, setPageWidth] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setCurrentPage(1);
  }

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const containerWidth = el.clientWidth;
      const baseWidth = viewMode === "book" ? containerWidth / 2 - 40 : containerWidth - 40;
      setPageWidth(baseWidth * zoom);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewMode, zoom]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - (viewMode === "book" ? 2 : 1), 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + (viewMode === "book" ? 2 : 1), viewMode === "book" ? numPages - 1 : numPages),
    );
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleFitWidth = () => setZoom(1.0);

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(page) && page >= 1 && page <= numPages) {
      setCurrentPage(page);
    }
  };

  // For book mode: determine if we should show single page (cover) or two pages
  const showCoverAlone = viewMode === "book" && currentPage === 1;
  const bookSecondPage = showCoverAlone ? null : currentPage + 1;

  return (
    <div
      data-slot="pdf-viewer"
      className={cn(
        "flex flex-col border border-border rounded-lg bg-background overflow-hidden",
        className,
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 p-3 border-b border-border bg-muted/50">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1 border border-border rounded-md p-1 bg-background">
          <Button
            type="button"
            variant={viewMode === "single" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("single")}
          >
            Single
          </Button>
          <Button
            type="button"
            variant={viewMode === "scroll" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("scroll")}
          >
            Scroll
          </Button>
          <Button
            type="button"
            variant={viewMode === "book" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("book")}
          >
            Book
          </Button>
        </div>

        {/* Page Navigation */}
        {viewMode !== "scroll" && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
            >
              ←
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <Input
                type="number"
                min={1}
                max={numPages}
                value={currentPage}
                onChange={handlePageInput}
                className="w-12 text-center"
              />
              <span className="text-muted-foreground">/ {numPages}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
            >
              →
            </Button>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            −
          </Button>
          <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 2.0}
          >
            +
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleFitWidth}>
            Fit
          </Button>
        </div>
      </div>

      {/* PDF Document */}
      <div
        ref={containerRef}
        className={cn(
          "flex-1 overflow-auto bg-muted/30",
          viewMode === "scroll" && "p-4",
          viewMode !== "scroll" && "flex items-start justify-center p-4",
        )}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-8">
              <div className="text-sm text-muted-foreground">Loading PDF...</div>
            </div>
          }
          error={
            <div className="flex items-center justify-center p-8">
              <div className="text-sm text-destructive">
                Failed to load PDF. Please check the file or URL.
              </div>
            </div>
          }
          className={cn(viewMode === "scroll" && "space-y-4", viewMode === "book" && "flex gap-4")}
        >
          {viewMode === "scroll" && (
            <>
              {Array.from(new Array(numPages), (_, index) => (
                <div key={`page_${index + 1}`} className="flex justify-center">
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                    className="shadow-lg"
                    loading={
                      <div className="h-[800px] w-full bg-background animate-pulse rounded-md" />
                    }
                  />
                </div>
              ))}
            </>
          )}

          {viewMode === "single" && (
            <div className="flex justify-center">
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                className="shadow-lg"
                loading={
                  <div className="h-[800px] w-full bg-background animate-pulse rounded-md" />
                }
              />
            </div>
          )}

          {viewMode === "book" && (
            <>
              <div className="flex justify-end">
                <Page
                  pageNumber={currentPage}
                  width={pageWidth}
                  className="shadow-lg"
                  loading={
                    <div className="h-[800px] w-full bg-background animate-pulse rounded-md" />
                  }
                />
              </div>
              {!showCoverAlone && bookSecondPage && bookSecondPage <= numPages && (
                <div className="flex justify-start">
                  <Page
                    pageNumber={bookSecondPage}
                    width={pageWidth}
                    className="shadow-lg"
                    loading={
                      <div className="h-[800px] w-full bg-background animate-pulse rounded-md" />
                    }
                  />
                </div>
              )}
            </>
          )}
        </Document>
      </div>
    </div>
  );
}

export type { PdfViewerProps, ViewMode };
