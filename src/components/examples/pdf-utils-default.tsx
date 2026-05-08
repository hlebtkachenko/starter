/**
 * @slug pdf-utils
 * @variant default
 * @upstream https://www.tryelements.dev/docs/pdf/pdf-utils
 * @deviations ["Moved from elements/ to ui/ directory.", "Shows utility API via interactive file upload demo.", "Dynamic import with ssr:false to avoid pdfjs DOMMatrix crash during prerender.", "Added text search to demonstrate searchText utility."]
 */
"use client";

import { useRef, useState } from "react";

type PdfInfo = {
  numPages: number;
  title: string | null;
  author: string | null;
};

export default function PdfUtilsDefault() {
  const [info, setInfo] = useState<PdfInfo | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[] | null>(null);
  const [searching, setSearching] = useState(false);
  const fileRef = useRef<File | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    fileRef.current = file;
    setLoading(true);
    setSearchResults(null);
    setSearchQuery("");
    try {
      const { getPdfInfo, getAllPageThumbnails } = await import("@/components/ui/pdf-utils");
      const pdfInfo = await getPdfInfo(file);
      setInfo({
        numPages: pdfInfo.numPages,
        title: pdfInfo.title ?? null,
        author: pdfInfo.author ?? null,
      });
      const thumbs = await getAllPageThumbnails(file, 0.3);
      setThumbnails(thumbs);
    } catch {
      setInfo(null);
      setThumbnails([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    const file = fileRef.current;
    if (!file || !searchQuery.trim()) return;
    setSearching(true);
    try {
      const { searchText } = await import("@/components/ui/pdf-utils");
      const pages = await searchText(file, searchQuery.trim());
      setSearchResults(pages);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <label className="text-sm font-medium">
        Upload PDF
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="mt-1 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
        />
      </label>
      {loading && <p className="text-sm text-muted-foreground">Processing...</p>}
      {info && (
        <div className="rounded-md border border-border p-3 text-sm">
          <p>
            <span className="font-medium">Pages:</span> {info.numPages}
          </p>
          {info.title && (
            <p>
              <span className="font-medium">Title:</span> {info.title}
            </p>
          )}
          {info.author && (
            <p>
              <span className="font-medium">Author:</span> {info.author}
            </p>
          )}
        </div>
      )}
      {info && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="pdf-search">
            Search text in PDF
          </label>
          <div className="flex gap-2">
            <input
              id="pdf-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Enter text to search..."
              className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !searchQuery.trim()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {searching ? "Searching..." : "Search"}
            </button>
          </div>
          {searchResults !== null && (
            <p className="text-sm text-muted-foreground">
              {searchResults.length === 0
                ? "No matches found."
                : `Found on page${searchResults.length > 1 ? "s" : ""}: ${searchResults.join(", ")}`}
            </p>
          )}
        </div>
      )}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbnails.map((thumb, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={thumb}
              alt={`Page ${i + 1}`}
              className={`rounded border ${
                searchResults?.includes(i + 1)
                  ? "border-2 border-primary ring-2 ring-primary/30"
                  : "border-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
