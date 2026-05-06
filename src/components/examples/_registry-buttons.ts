import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the buttons-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // button
  {
    name: "button-size",
    type: "registry:example",
    title: "Size",
    description:
      "Side-by-side comparison of every Button size token (xs, sm, default, lg) paired with its icon-only counterpart, useful when picking the correct hit area for toolbars and dense forms.",
    slug: "button",
    variant: "size",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [{ path: "components/examples/button-size.tsx", type: "registry:example" }],
    categories: ["actions", "forms"],
    span: 2,
  },
  {
    name: "button-default",
    type: "registry:example",
    title: "Default",
    description:
      "Canonical primary Button rendering plain text, the baseline shape every other variant overrides.",
    slug: "button",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-outline",
    type: "registry:example",
    title: "Outline",
    description:
      "Secondary Button with a visible border instead of a solid fill, suited to neutral actions that should not compete with the primary CTA.",
    slug: "button",
    variant: "outline",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-outline.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-secondary",
    type: "registry:example",
    title: "Secondary",
    description:
      "Filled secondary Button using the muted surface token, ideal for the second-most-important action on a screen.",
    slug: "button",
    variant: "secondary",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-secondary.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-ghost",
    type: "registry:example",
    title: "Ghost",
    description:
      "Transparent Button that only paints background on hover, designed for tertiary actions inside menus, toolbars, and headers.",
    slug: "button",
    variant: "ghost",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-ghost.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-destructive",
    type: "registry:example",
    title: "Destructive",
    description:
      "High-emphasis Button colored with the destructive token, used for delete, remove, and other irreversible actions.",
    slug: "button",
    variant: "destructive",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-destructive.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-link",
    type: "registry:example",
    title: "Link",
    description:
      "Button styled as an inline text link with underline-on-hover, for navigation cues that need button semantics.",
    slug: "button",
    variant: "link",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [{ path: "components/examples/button-link.tsx", type: "registry:example" }],
    categories: ["actions", "forms"],
  },
  {
    name: "button-icon",
    type: "registry:example",
    title: "Icon",
    description:
      "Square icon-only Button with the default icon size, the canonical shape for toolbar and inline controls without a text label.",
    slug: "button",
    variant: "icon",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [{ path: "components/examples/button-icon.tsx", type: "registry:example" }],
    categories: ["actions", "forms"],
  },
  {
    name: "button-with-icon",
    type: "registry:example",
    title: "With Icon",
    description:
      "Compact small Button combining a leading lucide icon with a text label, the standard shape for inline actions like 'New Branch'.",
    slug: "button",
    variant: "with-icon",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-with-icon.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-rounded",
    type: "registry:example",
    title: "Rounded",
    description:
      "Icon Button with a fully circular shape via rounded-full, used for floating action buttons and pill-style controls.",
    slug: "button",
    variant: "rounded",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-rounded.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-spinner",
    type: "registry:example",
    title: "Spinner",
    description:
      "Disabled loading Buttons composing the Spinner primitive on either side of the label to communicate in-flight work.",
    slug: "button",
    variant: "spinner",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button", "spinner"],
    files: [
      {
        path: "components/examples/button-spinner.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },
  {
    name: "button-button-group",
    type: "registry:example",
    title: "Button Group",
    description:
      "Composite toolbar with three nested Button Groups (back, archive/report, snooze + dropdown) that mirrors a typical email triage row.",
    slug: "button",
    variant: "button-group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button", "button-group", "dropdown-menu"],
    files: [
      {
        path: "components/examples/button-button-group.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
    span: 2,
  },
  {
    name: "button-as-child",
    type: "registry:example",
    title: "As Child",
    description:
      "Demonstrates Button rendered through Radix Slot via asChild, forwarding styles to a Next.js Link so navigation gets button visuals without a nested anchor/button.",
    slug: "button",
    variant: "as-child",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button",
    registryDependencies: ["button"],
    files: [
      {
        path: "components/examples/button-as-child.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "forms"],
  },

  // button-group
  {
    name: "button-group-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero composition for Button Group: three nested groups stitching back, archive/report, and snooze + dropdown menu actions into one toolbar row.",
    slug: "button-group",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "dropdown-menu"],
    files: [
      {
        path: "components/examples/button-group-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
    span: 2,
  },
  {
    name: "button-group-orientation",
    type: "registry:example",
    title: "Orientation",
    description:
      "Vertical Button Group with stacked plus/minus icon buttons, the pattern for media-control and stepper layouts.",
    slug: "button-group",
    variant: "orientation",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "components/examples/button-group-orientation.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-size",
    type: "registry:example",
    title: "Size",
    description:
      "Three Button Groups stacked at sm, default, and lg sizes to compare shared-edge rendering across the size scale.",
    slug: "button-group",
    variant: "size",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "components/examples/button-group-size.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-nested",
    type: "registry:example",
    title: "Nested",
    description:
      "Outer Button Group containing an icon Button alongside a nested group with an InputGroup + tooltip, showing how compositional nesting joins disparate primitives.",
    slug: "button-group",
    variant: "nested",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "input-group", "tooltip"],
    files: [
      {
        path: "components/examples/button-group-nested.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-separator",
    type: "registry:example",
    title: "Separator",
    description:
      "Two secondary Buttons divided by ButtonGroupSeparator to mark a visual boundary between related actions like Copy and Paste.",
    slug: "button-group",
    variant: "separator",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "components/examples/button-group-separator.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-split",
    type: "registry:example",
    title: "Split",
    description:
      "Split-button pattern: a labeled Button on the left and a single icon trigger on the right, divided by a ButtonGroupSeparator.",
    slug: "button-group",
    variant: "split",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group"],
    files: [
      {
        path: "components/examples/button-group-split.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-input",
    type: "registry:example",
    title: "Input",
    description:
      "Search-style composition with an Input flush against an icon Button inside a Button Group, the canonical shape for inline submit affordances.",
    slug: "button-group",
    variant: "input",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "input"],
    files: [
      {
        path: "components/examples/button-group-input.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-input-group",
    type: "registry:example",
    title: "Input Group",
    description:
      "Pill-rounded Button Group hosting an InputGroup with a voice-mode toggle that rewrites placeholder, disables input, and recolors the addon, illustrating a full chat composer pattern.",
    slug: "button-group",
    variant: "input-group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "input-group", "tooltip"],
    files: [
      {
        path: "components/examples/button-group-input-group.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
    span: 2,
  },
  {
    name: "button-group-dropdown-menu",
    type: "registry:example",
    title: "Dropdown Menu",
    description:
      "Follow Button paired with a chevron trigger that opens a DropdownMenu of conversation actions, the standard split-action pattern for social UI.",
    slug: "button-group",
    variant: "dropdown-menu",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "dropdown-menu"],
    files: [
      {
        path: "components/examples/button-group-dropdown-menu.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-select",
    type: "registry:example",
    title: "Select",
    description:
      "Currency-amount composer combining a Select trigger, free-text Input, and send Button inside a Button Group, modelling a money-transfer entry row.",
    slug: "button-group",
    variant: "select",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "input", "select"],
    files: [
      {
        path: "components/examples/button-group-select.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "button-group-popover",
    type: "registry:example",
    title: "Popover",
    description:
      "Copilot Button next to a chevron trigger that opens a Popover with a Field-wrapped Textarea, a pattern for AI task entry inline next to an action.",
    slug: "button-group",
    variant: "popover",
    upstreamUrl: "https://ui.shadcn.com/docs/components/button-group",
    registryDependencies: ["button", "button-group", "field", "popover", "textarea"],
    files: [
      {
        path: "components/examples/button-group-popover.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },

  // toggle
  {
    name: "toggle-default",
    type: "registry:example",
    title: "Default",
    description:
      "Outline Toggle with a Bookmark icon that fills its glyph when active, the canonical bookmark-style two-state control.",
    slug: "toggle",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "components/examples/toggle-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-outline",
    type: "registry:example",
    title: "Outline",
    description:
      "Pair of outline Toggles for italic and bold, illustrating the bordered variant typical in rich-text editor toolbars.",
    slug: "toggle",
    variant: "outline",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "components/examples/toggle-outline.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-with-text",
    type: "registry:example",
    title: "With Text",
    description:
      "Default-variant Toggle combining an italic icon and visible text label, showing how to render label-plus-icon affordances.",
    slug: "toggle",
    variant: "with-text",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "components/examples/toggle-with-text.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-size",
    type: "registry:example",
    title: "Size",
    description:
      "Three outline Toggles displayed side by side at sm, default, and lg sizes for visual size-token comparison.",
    slug: "toggle",
    variant: "size",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "components/examples/toggle-size.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Disabled-state Toggles in default and outline variants, demonstrating the muted styling and pointer-events lock applied by the disabled prop.",
    slug: "toggle",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "components/examples/toggle-disabled.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },

  // toggle-group
  {
    name: "toggle-group-default",
    type: "registry:example",
    title: "Default",
    description:
      "Multiple-selection ToggleGroup with bold, italic, and strikethrough icon buttons, the canonical formatting-toolbar shape.",
    slug: "toggle-group",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-group-outline",
    type: "registry:example",
    title: "Outline",
    description:
      "Single-selection outline ToggleGroup with All/Missed labels, suited to filter pills above call-log or message lists.",
    slug: "toggle-group",
    variant: "outline",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-outline.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-group-size",
    type: "registry:example",
    title: "Size",
    description:
      "Two outline ToggleGroups stacked at sm and default sizes with four directional options, used to compare size tokens for segmented controls.",
    slug: "toggle-group",
    variant: "size",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-size.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-group-spacing",
    type: "registry:example",
    title: "Spacing",
    description:
      "Outline ToggleGroup with spacing={2}, showing how the spacing prop separates items into discrete pills instead of shared-edge segments.",
    slug: "toggle-group",
    variant: "spacing",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-spacing.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-group-vertical",
    type: "registry:example",
    title: "Vertical",
    description:
      "Vertical multi-select ToggleGroup with bold/italic/underline icons preselected, demonstrating the orientation prop with spacing.",
    slug: "toggle-group",
    variant: "vertical",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-vertical.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-group-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Multi-select ToggleGroup rendered with the disabled prop on the group, propagating disabled state to every item.",
    slug: "toggle-group",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-disabled.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
  {
    name: "toggle-group-custom",
    type: "registry:example",
    title: "Custom",
    description:
      "Controlled font-weight picker built from oversized rounded ToggleGroupItems with a Field wrapper and live FieldDescription, showing how to build bespoke selectors on top of the primitive.",
    slug: "toggle-group",
    variant: "custom",
    upstreamUrl: "https://ui.shadcn.com/docs/components/toggle-group",
    registryDependencies: ["field", "toggle", "toggle-group"],
    files: [
      {
        path: "components/examples/toggle-group-custom.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions"],
  },
]);
