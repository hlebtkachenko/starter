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
      "Breadcrumb with Home, ellipsis dropdown menu of collapsed pages, a Components link, and a current page leaf — demonstrates the full composition pattern.",
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
    categories: ["navigation"],
    related: ["breadcrumb-collapsed", "breadcrumb-dropdown"],
    deviations: [
      "Uses DropdownMenu with an ellipsis trigger instead of the upstream 3-item linear breadcrumb, to demonstrate the dropdown pattern as the canonical default.",
    ],
    span: 2,
  },
  {
    name: "breadcrumb-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Breadcrumb with two link segments and a current page leaf, using the default chevron separator — the minimal starting point for any breadcrumb trail.",
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
    categories: ["navigation"],
    related: ["breadcrumb-default", "breadcrumb-link-component"],
  },
  {
    name: "breadcrumb-custom-separator",
    type: "registry:example",
    title: "Custom separator",
    description:
      "Breadcrumb using a Lucide DotIcon as the separator child instead of the default chevron, showing how to slot any icon or string between segments.",
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
    categories: ["navigation"],
    related: ["breadcrumb-basic"],
  },
  {
    name: "breadcrumb-dropdown",
    type: "registry:example",
    title: "Dropdown",
    description:
      "Breadcrumb segment that opens a DropdownMenu of sub-pages via a chevron-down trigger, useful for long paths where one segment has multiple peer routes.",
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
    categories: ["navigation"],
    related: ["breadcrumb-collapsed", "breadcrumb-default"],
  },
  {
    name: "breadcrumb-collapsed",
    type: "registry:example",
    title: "Collapsed",
    description:
      "Breadcrumb that collapses middle segments behind a BreadcrumbEllipsis, preserving Home and the active leaf for deep navigation hierarchies.",
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
    categories: ["navigation"],
    related: ["breadcrumb-dropdown", "breadcrumb-default"],
  },
  {
    name: "breadcrumb-link-component",
    type: "registry:example",
    title: "Link component",
    description:
      "Breadcrumb wired to next/link via BreadcrumbLink asChild for client-side navigation, enabling prefetch and app-router transitions inside the trail.",
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
    categories: ["navigation"],
    related: ["breadcrumb-basic"],
  },

  // menubar
  {
    name: "menubar-default",
    type: "registry:example",
    title: "Default",
    description:
      "Menubar with File, Edit, View, and Profiles menus demonstrating groups, separators, submenus, checkbox items, radio group, keyboard shortcuts, and inset items.",
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
    categories: ["navigation", "menus"],
    related: ["menubar-checkbox", "menubar-radio", "menubar-submenu", "menubar-with-icons"],
    span: 2,
  },
  {
    name: "menubar-checkbox",
    type: "registry:example",
    title: "Checkbox",
    description:
      "Menubar with MenubarCheckboxItem entries in View and Format menus, showing toggleable boolean options for bookmarks bar, full URLs, and text styling.",
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
    categories: ["navigation", "menus"],
    related: ["menubar-radio", "menubar-default"],
    span: 2,
  },
  {
    name: "menubar-radio",
    type: "registry:example",
    title: "Radio",
    description:
      "Menubar with controlled MenubarRadioGroup items for profile and theme selection, using useState to track single-select state across menu sessions.",
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
    categories: ["navigation", "menus"],
    related: ["menubar-checkbox", "menubar-default"],
    span: 2,
  },
  {
    name: "menubar-submenu",
    type: "registry:example",
    title: "Submenu",
    description:
      "Menubar with nested MenubarSub panels on File > Share and Edit > Find triggers, illustrating multi-level menu hierarchy for complex action sets.",
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
    categories: ["navigation", "menus"],
    related: ["menubar-default"],
    span: 2,
  },
  {
    name: "menubar-with-icons",
    type: "registry:example",
    title: "With Icons",
    description:
      "Menubar items decorated with Lucide icons — FileIcon, FolderIcon, SaveIcon, SettingsIcon, HelpCircleIcon, TrashIcon — plus a destructive Delete variant.",
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
    categories: ["navigation", "menus"],
    related: ["menubar-default"],
    span: 2,
  },

  // navigation-menu
  {
    name: "navigation-menu-default",
    type: "registry:example",
    title: "Default",
    description:
      "Navigation menu with a Getting started flyout panel, a Components panel listing six primitives in a 2-column grid, and a standalone Docs link item.",
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
    categories: ["navigation"],
    related: ["navigation-menu-link-component"],
    deviations: [
      "Replaced `import * as React from 'react'` namespace with named ComponentPropsWithoutRef import to avoid unnecessary namespace bundle.",
    ],
    span: 2,
    height: "tall",
  },
  {
    name: "navigation-menu-link-component",
    type: "registry:example",
    title: "Link Component",
    description:
      "Single navigation menu link composed with next/link via NavigationMenuLink asChild and navigationMenuTriggerStyle — the minimal pattern for router-aware nav items.",
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
    categories: ["navigation"],
    related: ["navigation-menu-default"],
  },

  // pagination
  {
    name: "pagination-default",
    type: "registry:example",
    title: "Default",
    description:
      "Pagination with previous, three numbered page links (page 2 active), ellipsis, and next controls — the full-featured starting point for paginated lists.",
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
    categories: ["navigation"],
    related: ["pagination-simple", "pagination-icons-only"],
    span: 2,
  },
  {
    name: "pagination-simple",
    type: "registry:example",
    title: "Simple",
    description:
      "Pagination with five numbered page links and no previous/next chrome, suitable for compact surfaces where directional controls would add visual noise.",
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
    categories: ["navigation"],
    related: ["pagination-default", "pagination-icons-only"],
  },
  {
    name: "pagination-icons-only",
    type: "registry:example",
    title: "Icons Only",
    description:
      "Pagination combining a rows-per-page Select on the left with icon-only previous/next controls on the right — composing Pagination, Field, and Select for data table footers.",
    registryDependencies: ["pagination", "field", "select"],
    files: [
      {
        path: "components/examples/pagination-icons-only.tsx",
        type: "registry:example",
      },
    ],
    slug: "pagination",
    variant: "icons-only",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/pagination",
    categories: ["navigation"],
    related: ["pagination-default", "pagination-simple"],
    deviations: [
      "Project-local variant combining Pagination previous/next icon controls with a rows-per-page Select; not present in upstream examples.",
    ],
    span: 2,
  },

  // tabs
  {
    name: "tabs-default",
    type: "registry:example",
    title: "Default",
    description:
      "Tabs with Overview, Analytics, Reports, and Settings panels each rendering a Card with a title, description, and summary content — the canonical full-panel composition.",
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
    categories: ["navigation"],
    related: ["tabs-line", "tabs-vertical"],
    deviations: [
      "Panel content uses project-themed descriptions (active projects, analytics, reports, settings) instead of upstream's account/password example.",
    ],
    span: 2,
    height: "tall",
  },
  {
    name: "tabs-line",
    type: "registry:example",
    title: "Line",
    description:
      "Tabs using the line variant on TabsList for a bottom-border trigger style without panel content — use this for navigation-style tab bars above content sections.",
    registryDependencies: ["tabs"],
    files: [{ path: "components/examples/tabs-line.tsx", type: "registry:example" }],
    slug: "tabs",
    variant: "line",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
    categories: ["navigation"],
    related: ["tabs-default", "tabs-vertical"],
  },
  {
    name: "tabs-vertical",
    type: "registry:example",
    title: "Vertical",
    description:
      "Tabs with orientation=vertical stacking Account, Password, and Notifications triggers in a column — suited for settings sidebars and multi-section forms.",
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
    categories: ["navigation"],
    related: ["tabs-default", "tabs-line"],
  },
  {
    name: "tabs-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Tabs with one disabled trigger alongside an active Home tab, demonstrating how to mark a tab as unavailable while keeping it visible in the trigger list.",
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
    categories: ["navigation"],
    related: ["tabs-default"],
  },
  {
    name: "tabs-icons",
    type: "registry:example",
    title: "Icons",
    description:
      "Tabs with Lucide icons (AppWindowIcon, CodeIcon) placed inside Preview and Code triggers, showing the icon-plus-label pattern for richer tab affordances.",
    registryDependencies: ["tabs"],
    files: [{ path: "components/examples/tabs-icons.tsx", type: "registry:example" }],
    slug: "tabs",
    variant: "icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tabs",
    categories: ["navigation"],
    related: ["tabs-default", "tabs-line"],
  },
]);
