import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the navigation-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // breadcrumb
  {
    name: "breadcrumb-default",
    type: "registry:example",
    title: "Default",
    description:
      "Breadcrumb with Home, ellipsis dropdown menu of pages, Components link, and a current page leaf.",
    registryDependencies: ["breadcrumb", "button", "dropdown-menu"],
    files: [
      {
        path: "components/examples/breadcrumb-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "breadcrumb",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/breadcrumb",
    span: 2,
  },
  {
    name: "breadcrumb-basic",
    type: "registry:example",
    title: "Basic",
    description: "Breadcrumb with two link segments and a current page, default chevron separator.",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "components/examples/breadcrumb-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "breadcrumb",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/breadcrumb",
  },
  {
    name: "breadcrumb-custom-separator",
    type: "registry:example",
    title: "Custom separator",
    description:
      "Breadcrumb using a Lucide DotIcon between segments instead of the default chevron.",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "components/examples/breadcrumb-custom-separator.tsx",
        type: "registry:example",
      },
    ],
    slug: "breadcrumb",
    variant: "custom-separator",
    upstreamUrl: "https://ui.shadcn.com/docs/components/breadcrumb",
  },
  {
    name: "breadcrumb-dropdown",
    type: "registry:example",
    title: "Dropdown",
    description: "Breadcrumb segment that opens a dropdown menu of pages via chevron-down trigger.",
    registryDependencies: ["breadcrumb", "dropdown-menu"],
    files: [
      {
        path: "components/examples/breadcrumb-dropdown.tsx",
        type: "registry:example",
      },
    ],
    slug: "breadcrumb",
    variant: "dropdown",
    upstreamUrl: "https://ui.shadcn.com/docs/components/breadcrumb",
  },
  {
    name: "breadcrumb-collapsed",
    type: "registry:example",
    title: "Collapsed",
    description:
      "Breadcrumb that collapses middle segments with an ellipsis between Home and the active leaf.",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "components/examples/breadcrumb-collapsed.tsx",
        type: "registry:example",
      },
    ],
    slug: "breadcrumb",
    variant: "collapsed",
    upstreamUrl: "https://ui.shadcn.com/docs/components/breadcrumb",
  },
  {
    name: "breadcrumb-link-component",
    type: "registry:example",
    title: "Link component",
    description: "Breadcrumb wired to next/link via asChild for client-side navigation.",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "components/examples/breadcrumb-link-component.tsx",
        type: "registry:example",
      },
    ],
    slug: "breadcrumb",
    variant: "link-component",
    upstreamUrl: "https://ui.shadcn.com/docs/components/breadcrumb",
  },

  // menubar
  {
    name: "menubar-default",
    type: "registry:example",
    title: "Default",
    description:
      "Menubar with File, Edit, View, and Profiles menus. Demonstrates groups, separators, submenus, checkbox items, radio group, shortcuts, inset items.",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "components/examples/menubar-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "menubar",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/menubar",
    span: 2,
  },
  {
    name: "menubar-checkbox",
    type: "registry:example",
    title: "Checkbox",
    description:
      "Menubar showcasing checkbox items with checked state for toggleable view and format options.",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "components/examples/menubar-checkbox.tsx",
        type: "registry:example",
      },
    ],
    slug: "menubar",
    variant: "checkbox",
    upstreamUrl: "https://ui.shadcn.com/docs/components/menubar",
    span: 2,
  },
  {
    name: "menubar-radio",
    type: "registry:example",
    title: "Radio",
    description:
      "Menubar with controlled radio groups for profile and theme selection using useState.",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "components/examples/menubar-radio.tsx",
        type: "registry:example",
      },
    ],
    slug: "menubar",
    variant: "radio",
    upstreamUrl: "https://ui.shadcn.com/docs/components/menubar",
    span: 2,
  },
  {
    name: "menubar-submenu",
    type: "registry:example",
    title: "Submenu",
    description: "Menubar with nested submenus on File > Share and Edit > Find triggers.",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "components/examples/menubar-submenu.tsx",
        type: "registry:example",
      },
    ],
    slug: "menubar",
    variant: "submenu",
    upstreamUrl: "https://ui.shadcn.com/docs/components/menubar",
    span: 2,
  },
  {
    name: "menubar-with-icons",
    type: "registry:example",
    title: "With Icons",
    description:
      "Menubar items decorated with Lucide icons (FileIcon, FolderIcon, SaveIcon, SettingsIcon, HelpCircleIcon, TrashIcon) plus a destructive variant.",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "components/examples/menubar-with-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "menubar",
    variant: "with-icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/menubar",
    span: 2,
  },

  // navigation-menu
  {
    name: "navigation-menu-default",
    type: "registry:example",
    title: "Default",
    description:
      "Navigation menu with Getting started panel, Components panel listing primitives in a 2-column grid, and a standalone Docs link.",
    registryDependencies: ["navigation-menu"],
    files: [
      {
        path: "components/examples/navigation-menu-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "navigation-menu",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/navigation-menu",
    span: 2,
    height: "tall",
  },
  {
    name: "navigation-menu-link-component",
    type: "registry:example",
    title: "Link Component",
    description:
      "Single navigation menu link composed with next/link via asChild and navigationMenuTriggerStyle.",
    registryDependencies: ["navigation-menu"],
    files: [
      {
        path: "components/examples/navigation-menu-link-component.tsx",
        type: "registry:example",
      },
    ],
    slug: "navigation-menu",
    variant: "link-component",
    upstreamUrl: "https://ui.shadcn.com/docs/components/navigation-menu",
  },

  // pagination
  {
    name: "pagination-default",
    type: "registry:example",
    title: "Default",
    description:
      "Pagination with previous, three numbered pages (page 2 active), ellipsis, and next controls.",
    registryDependencies: ["pagination"],
    files: [
      {
        path: "components/examples/pagination-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "pagination",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/pagination",
    span: 2,
  },
  {
    name: "pagination-simple",
    type: "registry:example",
    title: "Simple",
    description: "Pagination with five numbered page links and no previous/next chrome.",
    registryDependencies: ["pagination"],
    files: [
      {
        path: "components/examples/pagination-simple.tsx",
        type: "registry:example",
      },
    ],
    slug: "pagination",
    variant: "simple",
    upstreamUrl: "https://ui.shadcn.com/docs/components/pagination",
  },
  {
    name: "pagination-icons-only",
    type: "registry:example",
    title: "Icons Only",
    description:
      "Pagination with rows-per-page Select on the left and previous/next icon-only controls on the right.",
    registryDependencies: ["pagination", "field", "select"],
    files: [
      {
        path: "components/examples/pagination-icons-only.tsx",
        type: "registry:example",
      },
    ],
    slug: "pagination",
    variant: "icons-only",
    upstreamUrl: "https://ui.shadcn.com/docs/components/pagination",
    span: 2,
  },

  // tabs
  {
    name: "tabs-default",
    type: "registry:example",
    title: "Default",
    description:
      "Tabs with Overview, Analytics, Reports, Settings panels each rendering a Card with header and description.",
    registryDependencies: ["tabs", "card"],
    files: [
      {
        path: "components/examples/tabs-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "tabs",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
    span: 2,
    height: "tall",
  },
  {
    name: "tabs-line",
    type: "registry:example",
    title: "Line",
    description: "Tabs using the line variant trigger style without panels.",
    registryDependencies: ["tabs"],
    files: [{ path: "components/examples/tabs-line.tsx", type: "registry:example" }],
    slug: "tabs",
    variant: "line",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
  },
  {
    name: "tabs-vertical",
    type: "registry:example",
    title: "Vertical",
    description: "Tabs with vertical orientation and three triggers.",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "components/examples/tabs-vertical.tsx",
        type: "registry:example",
      },
    ],
    slug: "tabs",
    variant: "vertical",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
  },
  {
    name: "tabs-disabled",
    type: "registry:example",
    title: "Disabled",
    description: "Tabs with one disabled trigger alongside an active Home tab.",
    registryDependencies: ["tabs"],
    files: [
      {
        path: "components/examples/tabs-disabled.tsx",
        type: "registry:example",
      },
    ],
    slug: "tabs",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
  },
  {
    name: "tabs-icons",
    type: "registry:example",
    title: "Icons",
    description:
      "Tabs with Lucide icons (AppWindowIcon, CodeIcon) inside Preview and Code triggers.",
    registryDependencies: ["tabs"],
    files: [{ path: "components/examples/tabs-icons.tsx", type: "registry:example" }],
    slug: "tabs",
    variant: "icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
  },
]);
