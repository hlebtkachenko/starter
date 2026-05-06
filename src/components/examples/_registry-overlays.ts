import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the overlays-group source file. Each `<Demo>` in
 * `src/components/showcase/overlays-group.tsx` has been extracted into its
 * own `<slug>-<variant>.tsx` example file and registered here.
 */
export const items = defineItems([
  // alert-dialog
  {
    name: "alert-dialog-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero Alert Dialog. Outline trigger opens a modal asking for destructive confirmation with Cancel and Continue actions.",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "components/examples/alert-dialog-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "alert-dialog",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert-dialog",
  },
  {
    name: "alert-dialog-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Basic Alert Dialog with header, description, cancel, and continue action buttons.",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "components/examples/alert-dialog-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "alert-dialog",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert-dialog",
  },
  {
    name: "alert-dialog-small",
    type: "registry:example",
    title: "Small",
    description: 'Compact Alert Dialog using `size="sm"` for short confirmation prompts.',
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "components/examples/alert-dialog-small.tsx",
        type: "registry:example",
      },
    ],
    slug: "alert-dialog",
    variant: "small",
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert-dialog",
  },
  {
    name: "alert-dialog-media",
    type: "registry:example",
    title: "Media",
    description:
      "Alert Dialog with a leading icon via AlertDialogMedia for visual emphasis on the prompt.",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "components/examples/alert-dialog-media.tsx",
        type: "registry:example",
      },
    ],
    slug: "alert-dialog",
    variant: "media",
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert-dialog",
  },
  {
    name: "alert-dialog-small-with-media",
    type: "registry:example",
    title: "Small with Media",
    description: 'Compact Alert Dialog combining `size="sm"` with an AlertDialogMedia icon.',
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "components/examples/alert-dialog-small-with-media.tsx",
        type: "registry:example",
      },
    ],
    slug: "alert-dialog",
    variant: "small-with-media",
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert-dialog",
  },
  {
    name: "alert-dialog-destructive",
    type: "registry:example",
    title: "Destructive",
    description:
      "Destructive Alert Dialog with destructive trigger, themed media icon, and destructive action button.",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "components/examples/alert-dialog-destructive.tsx",
        type: "registry:example",
      },
    ],
    slug: "alert-dialog",
    variant: "destructive",
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert-dialog",
  },

  // dialog
  {
    name: "dialog-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero Dialog: outline trigger opens a profile-edit dialog with Field, Input, Label inside FieldGroup, and a footer with Cancel/Save actions.",
    registryDependencies: ["dialog", "button", "input", "label", "field"],
    files: [
      {
        path: "components/examples/dialog-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "dialog",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/dialog",
  },
  {
    name: "dialog-custom-close-button",
    type: "registry:example",
    title: "Custom Close Button",
    description:
      "Share-link Dialog with a custom close button rendered inside the footer instead of the default top-right close icon.",
    registryDependencies: ["dialog", "button", "input", "label"],
    files: [
      {
        path: "components/examples/dialog-custom-close-button.tsx",
        type: "registry:example",
      },
    ],
    slug: "dialog",
    variant: "custom-close-button",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dialog",
  },
  {
    name: "dialog-no-close-button",
    type: "registry:example",
    title: "No Close Button",
    description: "Dialog with `showCloseButton={false}` to hide the default top-right close icon.",
    registryDependencies: ["dialog", "button"],
    files: [
      {
        path: "components/examples/dialog-no-close-button.tsx",
        type: "registry:example",
      },
    ],
    slug: "dialog",
    variant: "no-close-button",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dialog",
  },
  {
    name: "dialog-sticky-footer",
    type: "registry:example",
    title: "Sticky Footer",
    description:
      "Dialog with scrollable body and a sticky footer that stays pinned while content scrolls.",
    registryDependencies: ["dialog", "button"],
    files: [
      {
        path: "components/examples/dialog-sticky-footer.tsx",
        type: "registry:example",
      },
    ],
    slug: "dialog",
    variant: "sticky-footer",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dialog",
  },
  {
    name: "dialog-scrollable-content",
    type: "registry:example",
    title: "Scrollable Content",
    description: "Dialog with overflow-y-auto body for long content without a footer.",
    registryDependencies: ["dialog", "button"],
    files: [
      {
        path: "components/examples/dialog-scrollable-content.tsx",
        type: "registry:example",
      },
    ],
    slug: "dialog",
    variant: "scrollable-content",
    upstreamUrl: "https://ui.shadcn.com/docs/components/dialog",
  },

  // drawer
  {
    name: "drawer-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero Drawer: opens a bottom drawer with a stepper for daily activity goal and an embedded recharts BarChart preview.",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "components/examples/drawer-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "drawer",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/drawer",
  },
  {
    name: "drawer-scrollable-content",
    type: "registry:example",
    title: "Scrollable Content",
    description: "Right-anchored Drawer with overflow-y-auto body and submit/cancel footer.",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "components/examples/drawer-scrollable-content.tsx",
        type: "registry:example",
      },
    ],
    slug: "drawer",
    variant: "scrollable-content",
    upstreamUrl: "https://ui.shadcn.com/docs/components/drawer",
  },
  {
    name: "drawer-sides",
    type: "registry:example",
    title: "Sides",
    description:
      "Four Drawer triggers, one per direction (top/right/bottom/left), each rendering scrollable content with a submit/cancel footer.",
    registryDependencies: ["drawer", "button"],
    files: [
      {
        path: "components/examples/drawer-sides.tsx",
        type: "registry:example",
      },
    ],
    slug: "drawer",
    variant: "sides",
    upstreamUrl: "https://ui.shadcn.com/docs/components/drawer",
  },
  {
    name: "drawer-responsive-dialog",
    type: "registry:example",
    title: "Responsive Dialog",
    description:
      "Switches between Dialog (desktop) and Drawer (mobile) based on viewport, sharing a ProfileForm. Mobile detection uses `useIsMobile` from `@/hooks/use-mobile`.",
    registryDependencies: ["drawer", "dialog", "button", "input", "label"],
    files: [
      {
        path: "components/examples/drawer-responsive-dialog.tsx",
        type: "registry:example",
      },
    ],
    slug: "drawer",
    variant: "responsive-dialog",
    upstreamUrl: "https://ui.shadcn.com/docs/components/drawer",
    deviations: [
      "Substituted upstream useMediaQuery hook with project-local useIsMobile from @/hooks/use-mobile.",
    ],
  },

  // hover-card
  {
    name: "hover-card-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero Hover Card. Link trigger opens a small profile card on hover with handle, bio, and join date.",
    registryDependencies: ["hover-card", "button"],
    files: [
      {
        path: "components/examples/hover-card-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "hover-card",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/hover-card",
  },
  {
    name: "hover-card-basic",
    type: "registry:example",
    title: "Basic",
    description: "Basic Hover Card with profile handle, description, and meta line.",
    registryDependencies: ["hover-card", "button"],
    files: [
      {
        path: "components/examples/hover-card-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "hover-card",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/hover-card",
  },
  {
    name: "hover-card-sides",
    type: "registry:example",
    title: "Sides",
    description:
      "Four Hover Card triggers showing the `side` prop on each of left/top/bottom/right.",
    registryDependencies: ["hover-card", "button"],
    files: [
      {
        path: "components/examples/hover-card-sides.tsx",
        type: "registry:example",
      },
    ],
    slug: "hover-card",
    variant: "sides",
    upstreamUrl: "https://ui.shadcn.com/docs/components/hover-card",
  },

  // popover
  {
    name: "popover-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero Popover with a title/description and four width/height inputs in a 3-column grid.",
    registryDependencies: ["popover", "button", "input", "label"],
    files: [
      {
        path: "components/examples/popover-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "popover",
    variant: "default",
    isDefault: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/popover",
  },
  {
    name: "popover-basic",
    type: "registry:example",
    title: "Basic",
    description:
      'Basic Popover using PopoverHeader, PopoverTitle, and PopoverDescription with `align="start"`.',
    registryDependencies: ["popover", "button"],
    files: [
      {
        path: "components/examples/popover-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "popover",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/popover",
  },
  {
    name: "popover-align",
    type: "registry:example",
    title: "Align",
    description: "Three Popover triggers showing the `align` prop on each of start/center/end.",
    registryDependencies: ["popover", "button"],
    files: [
      {
        path: "components/examples/popover-align.tsx",
        type: "registry:example",
      },
    ],
    slug: "popover",
    variant: "align",
    upstreamUrl: "https://ui.shadcn.com/docs/components/popover",
  },
  {
    name: "popover-with-form",
    type: "registry:example",
    title: "With Form",
    description:
      "Popover composed with Field/FieldLabel and horizontal-orientation inputs for width and height.",
    registryDependencies: ["popover", "button", "input", "field"],
    files: [
      {
        path: "components/examples/popover-with-form.tsx",
        type: "registry:example",
      },
    ],
    slug: "popover",
    variant: "with-form",
    upstreamUrl: "https://ui.shadcn.com/docs/components/popover",
  },

  // sheet
  {
    name: "sheet-default",
    type: "registry:example",
    title: "Default",
    description:
      "Page-hero Sheet with profile-edit form (Name, Username) and Save/Close footer actions.",
    registryDependencies: ["sheet", "button", "input", "label"],
    files: [
      {
        path: "components/examples/sheet-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "sheet",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sheet",
  },
  {
    name: "sheet-side",
    type: "registry:example",
    title: "Side",
    description:
      "Four Sheet triggers, one per `side` (top/right/bottom/left), each containing scrollable content and a submit/cancel footer.",
    registryDependencies: ["sheet", "button"],
    files: [
      {
        path: "components/examples/sheet-side.tsx",
        type: "registry:example",
      },
    ],
    slug: "sheet",
    variant: "side",
    upstreamUrl: "https://ui.shadcn.com/docs/components/sheet",
  },
  {
    name: "sheet-no-close-button",
    type: "registry:example",
    title: "No Close Button",
    description: "Sheet with `showCloseButton={false}` to hide the default top-right close icon.",
    registryDependencies: ["sheet", "button"],
    files: [
      {
        path: "components/examples/sheet-no-close-button.tsx",
        type: "registry:example",
      },
    ],
    slug: "sheet",
    variant: "no-close-button",
    upstreamUrl: "https://ui.shadcn.com/docs/components/sheet",
  },

  // tooltip
  {
    name: "tooltip-default",
    type: "registry:example",
    title: "Default",
    description: "Page-hero Tooltip with outline trigger and short content text.",
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "components/examples/tooltip-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "tooltip",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/tooltip",
  },
  {
    name: "tooltip-side",
    type: "registry:example",
    title: "Side",
    description: "Four Tooltip triggers showing the `side` prop on each of left/top/bottom/right.",
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "components/examples/tooltip-side.tsx",
        type: "registry:example",
      },
    ],
    slug: "tooltip",
    variant: "side",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tooltip",
  },
  {
    name: "tooltip-with-keyboard-shortcut",
    type: "registry:example",
    title: "With Keyboard Shortcut",
    description:
      "Icon-button Tooltip whose content combines a label with a `<Kbd>` shortcut indicator.",
    registryDependencies: ["tooltip", "button", "kbd"],
    files: [
      {
        path: "components/examples/tooltip-with-keyboard-shortcut.tsx",
        type: "registry:example",
      },
    ],
    slug: "tooltip",
    variant: "with-keyboard-shortcut",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tooltip",
  },
  {
    name: "tooltip-disabled-button",
    type: "registry:example",
    title: "Disabled Button",
    description:
      "Tooltip on a disabled Button. The button is wrapped in a span so pointer events still reach the trigger.",
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "components/examples/tooltip-disabled-button.tsx",
        type: "registry:example",
      },
    ],
    slug: "tooltip",
    variant: "disabled-button",
    upstreamUrl: "https://ui.shadcn.com/docs/components/tooltip",
  },
]);
