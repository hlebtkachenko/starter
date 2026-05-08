/**
 * @slug og-image-explorer
 * @variant default
 * @upstream https://www.tryelements.dev/docs/devtools/og-image-explorer
 * @deviations ["Moved from elements/ to ui/ directory.", "Uses placeholder OG image URLs for showcase."]
 */
"use client";

import { OgImageExplorer } from "@/components/ui/og-image-explorer";

const SAMPLE_ROUTES = [
  {
    path: "/",
    title: "Home",
    ogImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    category: "Pages",
  },
  {
    path: "/about",
    title: "About Us",
    ogImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    category: "Pages",
  },
  {
    path: "/blog",
    title: "Blog",
    ogImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    category: "Pages",
  },
  {
    path: "/docs/getting-started",
    title: "Getting Started",
    ogImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    category: "Docs",
  },
  {
    path: "/docs/api",
    title: "API Reference",
    ogImageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    category: "Docs",
  },
  {
    path: "/pricing",
    title: "Pricing",
    ogImageUrl: "https://invalid-url.example.com/broken.png",
    category: "Pages",
  },
];

export default function OgImageExplorerDefault() {
  return (
    <div className="w-full">
      <OgImageExplorer routes={SAMPLE_ROUTES} />
    </div>
  );
}
