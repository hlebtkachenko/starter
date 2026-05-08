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
      "Full-featured dropdown menu showing account group with label, profile/billing/settings shortcuts, a nested invite-users submenu, and a log-out action separated by dividers. Use this as the canonical reference when building app-header account menus.",
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
    categories: ["menus", "navigation", "overlay"],
    related: [
      "dropdown-menu-basic",
      "dropdown-menu-submenu",
      "dropdown-menu-avatar",
      "dropdown-menu-complex",
      "context-menu-default",
    ],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Minimal dropdown with a labelled account group, three navigation items, a separator, and a disabled API entry. Good starting point when you need a simple action list without submenus or shortcuts.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "basic",
    categories: ["menus", "navigation", "overlay"],
    related: ["dropdown-menu-default", "dropdown-menu-shortcuts", "dropdown-menu-icons"],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-submenu",
    type: "registry:example",
    title: "Submenu",
    description:
      "Dropdown with a two-level nested submenu for invite-users flow: Email, Message, and a deeper More-options sub-submenu containing Calendly, Slack, and Webhook. Use when actions have secondary choices that would clutter the top-level list.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-submenu.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "submenu",
    categories: ["menus", "navigation", "overlay"],
    related: ["dropdown-menu-default", "dropdown-menu-complex", "context-menu-submenu"],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-shortcuts",
    type: "registry:example",
    title: "Shortcuts",
    description:
      "Dropdown with an account group showing Profile (⇧⌘P), Billing (⌘B), and Settings (⌘S) shortcuts, plus a Log out entry with ⇧⌘Q. Use in power-user interfaces where keyboard discoverability matters.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-shortcuts.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "shortcuts",
    categories: ["menus", "navigation", "overlay"],
    related: ["dropdown-menu-basic", "dropdown-menu-default", "context-menu-shortcuts"],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-icons",
    type: "registry:example",
    title: "Icons",
    description:
      "Dropdown menu with Profile, Billing, and Settings items each prefixed by a lucide icon, plus a destructive Log out row. Use when visual scanning speed is important and icons provide instant recognition.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "icons",
    categories: ["menus", "navigation", "overlay"],
    related: [
      "dropdown-menu-basic",
      "dropdown-menu-destructive",
      "dropdown-menu-checkboxes-icons",
      "context-menu-icons",
    ],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "registry:example",
    title: "Checkboxes",
    description:
      "Controlled dropdown with three DropdownMenuCheckboxItem rows under an Appearance label: Status Bar (checked), Activity Bar (disabled), and Panel. Use for toggling persistent UI preferences inline without a form.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-checkboxes.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "checkboxes",
    categories: ["menus", "overlay", "forms"],
    related: [
      "dropdown-menu-checkboxes-icons",
      "dropdown-menu-radio-group",
      "context-menu-checkboxes",
    ],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-checkboxes-icons",
    type: "registry:example",
    title: "Checkboxes Icons",
    description:
      "Notification-preferences dropdown with three DropdownMenuCheckboxItem rows (Email, SMS, Push) each prefixed by a lucide icon. Use when icon context helps users identify notification channels at a glance.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-checkboxes-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "checkboxes-icons",
    categories: ["menus", "overlay", "forms"],
    related: ["dropdown-menu-checkboxes", "dropdown-menu-icons", "context-menu-checkboxes"],
    deviations: ["Import order corrected: react before lucide-react."],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-radio-group",
    type: "registry:example",
    title: "Radio Group",
    description:
      "Controlled dropdown with a DropdownMenuRadioGroup offering Top, Bottom, and Right panel-position options, persisted via useState. Use when the user must commit to exactly one choice from a short exclusive list.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-radio-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "radio-group",
    categories: ["menus", "overlay", "forms"],
    related: ["dropdown-menu-radio-icons", "dropdown-menu-checkboxes", "context-menu-radio"],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-radio-icons",
    type: "registry:example",
    title: "Radio Icons",
    description:
      "Controlled payment-method selector using DropdownMenuRadioGroup with Credit Card, PayPal, and Bank Transfer options, each with a leading lucide icon. Use when radio choices benefit from icon context to reduce cognitive load.",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-radio-icons.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "radio-icons",
    categories: ["menus", "overlay", "forms"],
    related: ["dropdown-menu-radio-group", "dropdown-menu-icons", "context-menu-radio"],
    deviations: ["Import order corrected: react before lucide-react."],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-destructive",
    type: "registry:example",
    title: "Destructive",
    description:
      'Action dropdown with Edit and Share items in the first group and a destructive Delete entry in the second group, separated by a divider. Use to surface irreversible actions with visual warning via variant="destructive".',
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "components/examples/dropdown-menu-destructive.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "destructive",
    categories: ["menus", "overlay"],
    related: ["dropdown-menu-icons", "dropdown-menu-basic", "context-menu-destructive"],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-avatar",
    type: "registry:example",
    title: "Avatar",
    description:
      "Ghost icon-button wrapping an Avatar that opens a dropdown with Account, Billing, and Notifications items plus a Sign Out action. Use in app headers where the user avatar is the conventional trigger for account actions.",
    registryDependencies: ["dropdown-menu", "button", "avatar"],
    files: [
      {
        path: "components/examples/dropdown-menu-avatar.tsx",
        type: "registry:example",
      },
    ],
    slug: "dropdown-menu",
    variant: "avatar",
    categories: ["menus", "navigation", "overlay"],
    related: ["dropdown-menu-default", "dropdown-menu-icons", "dropdown-menu-complex"],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
  {
    name: "dropdown-menu-complex",
    type: "registry:example",
    title: "Complex",
    description:
      "Deep multi-level dropdown combining File group (New File, New Folder, Open Recent sub-submenu, Save, Export), View group (checkbox toggles + Theme radio sub-menu), Account group (Profile, Billing, Settings sub-submenu with Notifications), Help group, and destructive Sign Out. Use as a reference for full IDE-style menus.",
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
    categories: ["menus", "navigation", "overlay"],
    related: [
      "dropdown-menu-default",
      "dropdown-menu-submenu",
      "dropdown-menu-checkboxes",
      "dropdown-menu-radio-group",
      "dropdown-menu-avatar",
    ],
    deviations: ["Import order corrected: react before lucide-react."],
    upstreamUrl: "https://ui.shadcn.com/docs/components/dropdown-menu",
  },
]);
