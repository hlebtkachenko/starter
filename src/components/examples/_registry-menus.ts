import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the menus-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // ---------- command ----------
  {
    name: "command-default",
    type: "registry:example",
    title: "Default",
    description: "Inline command palette with input, suggestions, settings, separators, shortcuts.",
    registryDependencies: ["command"],
    files: [
      {
        path: "components/examples/command-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "command",
    variant: "default",
    isDefault: true,
    span: 2,
    height: "tall",
    upstreamUrl: "https://ui.shadcn.com/docs/components/command",
  },
  {
    name: "command-basic",
    type: "registry:example",
    title: "Basic",
    description: "Command palette inside a CommandDialog triggered by a button.",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "components/examples/command-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "command",
    variant: "basic",
    span: 2,
    height: "tall",
    upstreamUrl: "https://ui.shadcn.com/docs/components/command",
  },
  {
    name: "command-shortcuts",
    type: "registry:example",
    title: "Shortcuts",
    description: "Command palette dialog showing keyboard shortcuts on settings entries.",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "components/examples/command-shortcuts.tsx",
        type: "registry:example",
      },
    ],
    slug: "command",
    variant: "shortcuts",
    height: "tall",
    upstreamUrl: "https://ui.shadcn.com/docs/components/command",
  },
  {
    name: "command-groups",
    type: "registry:example",
    title: "Groups",
    description:
      "Command dialog with multiple groups separated by CommandSeparator and group headings.",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "components/examples/command-groups.tsx",
        type: "registry:example",
      },
    ],
    slug: "command",
    variant: "groups",
    span: 2,
    height: "tall",
    upstreamUrl: "https://ui.shadcn.com/docs/components/command",
  },
  {
    name: "command-scrollable",
    type: "registry:example",
    title: "Scrollable",
    description:
      "Long command list that scrolls inside the dialog, with navigation, actions, view, account, tools groups.",
    registryDependencies: ["command", "button"],
    files: [
      {
        path: "components/examples/command-scrollable.tsx",
        type: "registry:example",
      },
    ],
    slug: "command",
    variant: "scrollable",
    height: "tall",
    upstreamUrl: "https://ui.shadcn.com/docs/components/command",
  },

  // ---------- context-menu ----------
  {
    name: "context-menu-default",
    type: "registry:example",
    title: "Default",
    description: "Context menu with items, submenu, separators, checkboxes, and a radio group.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-basic",
    type: "registry:example",
    title: "Basic",
    description: "Minimal context menu with three navigation items.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-submenu",
    type: "registry:example",
    title: "Submenu",
    description: "Context menu with a nested submenu for grouped tooling actions.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-submenu.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "submenu",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-shortcuts",
    type: "registry:example",
    title: "Shortcuts",
    description: "Context menu items annotated with keyboard shortcuts.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-shortcuts.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "shortcuts",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-groups",
    type: "registry:example",
    title: "Groups",
    description:
      "Context menu split into File, Edit, clipboard and destructive groups by separators and labels.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-groups.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "groups",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-icons",
    type: "registry:example",
    title: "Icons",
    description: "Context menu items with leading lucide icons.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-checkboxes",
    type: "registry:example",
    title: "Checkboxes",
    description:
      "Context menu featuring multiple ContextMenuCheckboxItem entries with default state.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-checkboxes.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "checkboxes",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-radio",
    type: "registry:example",
    title: "Radio",
    description: "Context menu with two radio groups for people and theme selection.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-radio.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "radio",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },
  {
    name: "context-menu-destructive",
    type: "registry:example",
    title: "Destructive",
    description: "Context menu with edit and share actions plus a destructive delete entry.",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "components/examples/context-menu-destructive.tsx",
        type: "registry:example",
      },
    ],
    slug: "context-menu",
    variant: "destructive",
    upstreamUrl: "https://ui.shadcn.com/docs/components/context-menu",
  },

  // ---------- dropdown-menu ----------
  {
    name: "dropdown-menu-default",
    type: "registry:example",
    title: "Default",
    description:
      "Dropdown menu with account label, items, submenu, shortcuts, separators, and disabled entry.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-basic",
    type: "registry:example",
    title: "Basic",
    description: "Minimal dropdown with account label, items, separator, and disabled entry.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-submenu",
    type: "registry:example",
    title: "Submenu",
    description: "Dropdown menu with two-level nested submenus for invite users.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-submenu.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "submenu",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-shortcuts",
    type: "registry:example",
    title: "Shortcuts",
    description: "Dropdown menu items with keyboard shortcuts beside each label.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-shortcuts.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "shortcuts",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-icons",
    type: "registry:example",
    title: "Icons",
    description: "Dropdown menu items with leading icons and a destructive log out.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "registry:example",
    title: "Checkboxes",
    description: "Dropdown with three DropdownMenuCheckboxItem rows including a disabled one.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-checkboxes.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "checkboxes",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-checkboxes-icons",
    type: "registry:example",
    title: "Checkboxes Icons",
    description: "Notification preferences dropdown with checkbox rows and leading icons.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-checkboxes-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "checkboxes-icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-radio-group",
    type: "registry:example",
    title: "Radio Group",
    description: "Dropdown menu with a controlled radio group selecting panel position.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-radio-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "radio-group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-radio-icons",
    type: "registry:example",
    title: "Radio Icons",
    description: "Dropdown radio group for payment method with icons next to each option.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-radio-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "radio-icons",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-destructive",
    type: "registry:example",
    title: "Destructive",
    description: "Action dropdown with edit and share groups plus a destructive delete entry.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-destructive.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "destructive",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-avatar",
    type: "registry:example",
    title: "Avatar",
    description:
      "Avatar trigger that opens a dropdown for account, billing, notifications, and sign out.",
    registryDependencies: ["dropdown-menu", "button", "avatar"],
    files: [
      {
        path: "components/examples/dropdown-menu-avatar.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "avatar",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-complex",
    type: "registry:example",
    title: "Complex",
    description:
      "Deep multi-level dropdown with file, view (checkbox + theme radio), account (settings sub-submenu with notifications), help, and sign out groups.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-complex.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "complex",
    span: 2,
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
]);
