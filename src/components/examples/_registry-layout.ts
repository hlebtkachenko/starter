import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the layout-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // aspect-ratio
  {
    name: "aspect-ratio-default",
    type: "registry:example",
    title: "Default",
    description:
      "AspectRatio at 16/9 wrapping a remote avatar image, the canonical landscape thumbnail used in card hero positions.",
    slug: "aspect-ratio",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/aspect-ratio",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "components/examples/aspect-ratio-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
  },
  {
    name: "aspect-ratio-square",
    type: "registry:example",
    title: "Square",
    description:
      "AspectRatio at 1/1 forcing a perfect square, suited to avatar grids and product tiles where parity matters.",
    slug: "aspect-ratio",
    variant: "square",
    upstreamUrl: "https://ui.shadcn.com/docs/components/aspect-ratio",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "components/examples/aspect-ratio-square.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
  },
  {
    name: "aspect-ratio-portrait",
    type: "registry:example",
    title: "Portrait",
    description:
      "AspectRatio at 9/16 producing a vertical portrait frame, matching mobile-first hero photos and story cards.",
    slug: "aspect-ratio",
    variant: "portrait",
    upstreamUrl: "https://ui.shadcn.com/docs/components/aspect-ratio",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "components/examples/aspect-ratio-portrait.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
  },

  // card
  {
    name: "card-default",
    type: "registry:example",
    title: "Default",
    description:
      "Login Card composing CardHeader, CardAction, CardContent form, and CardFooter buttons, the canonical authentication panel.",
    slug: "card",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/card",
    registryDependencies: ["card", "button", "input", "label"],
    files: [
      {
        path: "components/examples/card-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "display"],
  },
  {
    name: "card-size",
    type: "registry:example",
    title: "Size",
    description:
      'Card with size="sm" and a small Button in the footer, illustrating the compact spacing variant for dense surfaces.',
    slug: "card",
    variant: "size",
    upstreamUrl: "https://ui.shadcn.com/docs/components/card",
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "components/examples/card-size.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "display"],
  },
  {
    name: "card-image",
    type: "registry:example",
    title: "Image",
    description:
      "Event Card with a 16/9 cover image overlaid by a Featured Badge action and a primary CTA in the footer.",
    slug: "card",
    variant: "image",
    upstreamUrl: "https://ui.shadcn.com/docs/components/card",
    registryDependencies: ["card", "button", "badge"],
    files: [
      {
        path: "components/examples/card-image.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "display"],
  },
  {
    name: "card-with-form",
    type: "registry:example",
    title: "With Form",
    description:
      "Compact subscribe Card that pairs an email Input and a primary Button inline inside CardContent.",
    slug: "card",
    variant: "with-form",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/card",
    registryDependencies: ["card", "button", "input"],
    files: [
      {
        path: "components/examples/card-with-form.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "display"],
  },

  // collapsible
  {
    name: "collapsible-default",
    type: "registry:example",
    title: "Default",
    description:
      "Order summary Collapsible with a chevron toggle that reveals shipping address and items below the always-visible status row.",
    slug: "collapsible",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/collapsible",
    registryDependencies: ["collapsible", "button"],
    files: [
      {
        path: "components/examples/collapsible-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["disclosure"],
  },
  {
    name: "collapsible-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Card-wrapped Collapsible with a full-width ghost trigger and a Learn More button inside the expanded panel.",
    slug: "collapsible",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/collapsible",
    registryDependencies: ["collapsible", "button", "card"],
    files: [
      {
        path: "components/examples/collapsible-basic.tsx",
        type: "registry:example",
      },
    ],
    categories: ["disclosure"],
  },
  {
    name: "collapsible-settings-panel",
    type: "registry:example",
    title: "Settings Panel",
    description:
      "Radius settings Card combining a Collapsible icon trigger with FieldGroup inputs that grow into a four-field grid when expanded.",
    slug: "collapsible",
    variant: "settings-panel",
    upstreamUrl: "https://ui.shadcn.com/docs/components/collapsible",
    registryDependencies: ["collapsible", "button", "card", "field", "input"],
    files: [
      {
        path: "components/examples/collapsible-settings-panel.tsx",
        type: "registry:example",
      },
    ],
    categories: ["disclosure", "forms"],
  },
  {
    name: "collapsible-file-tree",
    type: "registry:example",
    title: "File Tree",
    description:
      "Recursive folder explorer composed of nested Collapsibles, FolderIcon/FileIcon glyphs, and a Tabs header switching Explorer/Outline.",
    slug: "collapsible",
    variant: "file-tree",
    upstreamUrl: "https://ui.shadcn.com/docs/components/collapsible",
    registryDependencies: ["collapsible", "button", "card", "tabs"],
    files: [
      {
        path: "components/examples/collapsible-file-tree.tsx",
        type: "registry:example",
      },
    ],
    categories: ["disclosure", "navigation"],
  },

  // resizable
  {
    name: "resizable-default",
    type: "registry:example",
    title: "Default",
    description:
      "Three-pane horizontal-then-vertical ResizablePanelGroup with grip handles, the canonical IDE-style split layout.",
    slug: "resizable",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/resizable",
    registryDependencies: ["resizable"],
    files: [
      {
        path: "components/examples/resizable-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    span: 2,
  },
  {
    name: "resizable-vertical",
    type: "registry:example",
    title: "Vertical",
    description:
      "Vertical ResizablePanelGroup with a borderless handle dividing Header and Content panels.",
    slug: "resizable",
    variant: "vertical",
    upstreamUrl: "https://ui.shadcn.com/docs/components/resizable",
    registryDependencies: ["resizable"],
    files: [
      {
        path: "components/examples/resizable-vertical.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
  },
  {
    name: "resizable-handle",
    type: "registry:example",
    title: "Handle",
    description:
      "Horizontal Sidebar/Content split with a withHandle grip indicator, used to demonstrate the visible drag affordance variant.",
    slug: "resizable",
    variant: "handle",
    upstreamUrl: "https://ui.shadcn.com/docs/components/resizable",
    registryDependencies: ["resizable"],
    files: [
      {
        path: "components/examples/resizable-handle.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    span: 2,
  },

  // scroll-area
  {
    name: "scroll-area-default",
    type: "registry:example",
    title: "Default",
    description:
      "Vertical ScrollArea listing 50 version tags with Separator dividers, the standard pattern for long enumerated lists.",
    slug: "scroll-area",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/scroll-area",
    registryDependencies: ["scroll-area", "separator"],
    files: [
      {
        path: "components/examples/scroll-area-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
  },
  {
    name: "scroll-area-horizontal",
    type: "registry:example",
    title: "Horizontal",
    description:
      "Horizontal ScrollArea with an explicit ScrollBar orientation rendering a row of artwork figures, the gallery scroller pattern.",
    slug: "scroll-area",
    variant: "horizontal",
    upstreamUrl: "https://ui.shadcn.com/docs/components/scroll-area",
    registryDependencies: ["scroll-area"],
    files: [
      {
        path: "components/examples/scroll-area-horizontal.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    span: 2,
  },

  // separator
  {
    name: "separator-default",
    type: "registry:example",
    title: "Default",
    description:
      "Horizontal Separator between a heading block and a description paragraph, the page-hero pattern and most common rule-line layout in content sections.",
    slug: "separator",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/separator",
    registryDependencies: ["separator"],
    files: [
      {
        path: "components/examples/separator-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "surface"],
    related: ["separator-vertical", "separator-list", "separator-menu"],
  },
  {
    name: "separator-vertical",
    type: "registry:example",
    title: "Vertical",
    description:
      "Inline vertical Separators with orientation=vertical between Blog/Docs/Source labels, the breadcrumb-style horizontal-row divider for nav bars and toolbars.",
    slug: "separator",
    variant: "vertical",
    upstreamUrl: "https://ui.shadcn.com/docs/components/separator",
    registryDependencies: ["separator"],
    files: [
      {
        path: "components/examples/separator-vertical.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "surface"],
    related: ["separator-default", "separator-menu"],
  },
  {
    name: "separator-menu",
    type: "registry:example",
    title: "Menu",
    description:
      "Three-column settings/account/help row split by vertical Separators with responsive md: visibility on the third column; shows real-world nav bar application.",
    slug: "separator",
    variant: "menu",
    upstreamUrl: "https://ui.shadcn.com/docs/components/separator",
    registryDependencies: ["separator"],
    files: [
      {
        path: "components/examples/separator-menu.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "surface"],
    related: ["separator-vertical", "separator-default"],
  },
  {
    name: "separator-list",
    type: "registry:example",
    title: "List",
    description:
      "Description-list rows (dt/dd pairs) divided by horizontal Separators, a clean key-value display alternative to a bordered table or striped rows.",
    slug: "separator",
    variant: "list",
    upstreamUrl: "https://ui.shadcn.com/docs/components/separator",
    registryDependencies: ["separator"],
    files: [
      {
        path: "components/examples/separator-list.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "surface"],
    related: ["separator-default"],
  },

  // sidebar
  {
    name: "sidebar-default",
    type: "registry:example",
    title: "Default",
    description:
      "SidebarShowcase fixture with variant=sidebar, side=left, collapsible=icon — the canonical icon-collapse left rail used as the page-hero demo for this primitive.",
    slug: "sidebar",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sidebar",
    registryDependencies: ["sidebar"],
    deviations: [
      "Sidebar has no upstream ## Examples block; all variants are project-authored SidebarShowcase fixtures.",
    ],
    files: [
      {
        path: "components/examples/sidebar-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "navigation"],
    related: [
      "sidebar-offcanvas",
      "sidebar-none",
      "sidebar-floating",
      "sidebar-inset",
      "sidebar-right",
    ],
    span: 3,
    height: "tall",
  },
  {
    name: "sidebar-offcanvas",
    type: "registry:example",
    title: "Offcanvas",
    description:
      "Sidebar with collapsible=offcanvas; the trigger slides the entire rail off screen instead of collapsing to icon width. Use when vertical space is scarce on mobile.",
    slug: "sidebar",
    variant: "offcanvas",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sidebar",
    registryDependencies: ["sidebar"],
    deviations: [
      "Sidebar has no upstream ## Examples block; all variants are project-authored SidebarShowcase fixtures.",
    ],
    files: [
      {
        path: "components/examples/sidebar-offcanvas.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "navigation"],
    related: ["sidebar-default", "sidebar-none"],
    span: 3,
    height: "tall",
  },
  {
    name: "sidebar-none",
    type: "registry:example",
    title: "None",
    description:
      "Sidebar with collapsible=none rendering a permanent fixed rail; the SidebarTrigger is present for layout parity but has no collapse effect at runtime.",
    slug: "sidebar",
    variant: "none",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sidebar",
    registryDependencies: ["sidebar"],
    deviations: [
      "Sidebar has no upstream ## Examples block; all variants are project-authored SidebarShowcase fixtures.",
    ],
    files: [
      {
        path: "components/examples/sidebar-none.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "navigation"],
    related: ["sidebar-default", "sidebar-offcanvas"],
    span: 3,
    height: "tall",
  },
  {
    name: "sidebar-floating",
    type: "registry:example",
    title: "Floating",
    description:
      "Sidebar with variant=floating, detaching the rail from the page edge with rounded chrome and a visible gap; use when the layout calls for a card-elevation feel.",
    slug: "sidebar",
    variant: "floating",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sidebar",
    registryDependencies: ["sidebar"],
    deviations: [
      "Sidebar has no upstream ## Examples block; all variants are project-authored SidebarShowcase fixtures.",
    ],
    files: [
      {
        path: "components/examples/sidebar-floating.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "navigation"],
    related: ["sidebar-default", "sidebar-inset"],
    span: 3,
    height: "tall",
  },
  {
    name: "sidebar-inset",
    type: "registry:example",
    title: "Inset",
    description:
      "Sidebar with variant=inset, embedding the SidebarInset content surface inside a card-like container with elevated chrome and a visible inner border.",
    slug: "sidebar",
    variant: "inset",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sidebar",
    registryDependencies: ["sidebar"],
    deviations: [
      "Sidebar has no upstream ## Examples block; all variants are project-authored SidebarShowcase fixtures.",
    ],
    files: [
      {
        path: "components/examples/sidebar-inset.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "navigation"],
    related: ["sidebar-default", "sidebar-floating"],
    span: 3,
    height: "tall",
  },
  {
    name: "sidebar-right",
    type: "registry:example",
    title: "Right",
    description:
      "Sidebar with side=right, mirroring the icon-collapse rail to the trailing edge of the viewport; suited to inspector panels and secondary tool rails.",
    slug: "sidebar",
    variant: "right",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sidebar",
    registryDependencies: ["sidebar"],
    deviations: [
      "Sidebar has no upstream ## Examples block; all variants are project-authored SidebarShowcase fixtures.",
    ],
    files: [
      {
        path: "components/examples/sidebar-right.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout", "navigation"],
    related: ["sidebar-default"],
    span: 3,
    height: "tall",
  },
]);
