import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the utility-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // accordion
  {
    name: "accordion-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Accordion demo with single collapsible items: shipping, returns, and customer support questions.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "default",
    isDefault: true,
  },
  {
    name: "accordion-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Basic Accordion in single-collapsible mode driven by the ACCORDION_BASIC fixture (password reset, plan changes, payment methods).",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "basic",
  },
  {
    name: "accordion-multiple",
    type: "registry:example",
    title: "Multiple",
    description:
      "Accordion in multiple-open mode with the ACCORDION_MULTIPLE fixture (notifications, privacy, billing sections).",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-multiple.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "multiple",
  },
  {
    name: "accordion-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Accordion with one disabled item demonstrating the disabled state on AccordionItem.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-disabled.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "disabled",
  },
  {
    name: "accordion-borders",
    type: "registry:example",
    title: "Borders",
    description:
      "Accordion wrapped in a bordered container with per-item bottom borders, driven by the ACCORDION_BORDERS fixture.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-borders.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "borders",
  },
  {
    name: "accordion-card",
    type: "registry:example",
    title: "Card",
    description:
      "Accordion nested inside a Card with header/title/description, driven by the ACCORDION_CARD fixture (subscription, billing, cancellation).",
    registryDependencies: ["accordion", "card"],
    files: [
      {
        path: "components/examples/accordion-card.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "card",
  },

  // carousel
  {
    name: "carousel-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Carousel demo with five numbered cards and previous/next controls. Flagged: not in upstream MD examples.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "default",
    isDefault: true,
    isFlagged: true,
  },
  {
    name: "carousel-sizes",
    type: "registry:example",
    title: "Sizes",
    description:
      "Carousel with multiple visible items per slide using basis-1/2 / lg:basis-1/3 and align: start.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-sizes.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "sizes",
  },
  {
    name: "carousel-spacing",
    type: "registry:example",
    title: "Spacing",
    description:
      "Carousel with custom horizontal spacing between items using -ml-1 on content and pl-1 on items.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-spacing.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "spacing",
  },
  {
    name: "carousel-orientation",
    type: "registry:example",
    title: "Orientation",
    description: "Vertically-oriented carousel with fixed height and align: start.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-orientation.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "orientation",
    height: "tall",
  },
  {
    name: "carousel-api-slide-n-of-m",
    type: "registry:example",
    title: "API (slide N of M)",
    description:
      "Carousel using setApi to expose the embla API and render a 'Slide N of M' indicator that updates on selection. Flagged: not in upstream MD examples.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-api-slide-n-of-m.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "api-slide-n-of-m",
    isFlagged: true,
  },
  {
    name: "carousel-plugins",
    type: "registry:example",
    title: "Plugins",
    description:
      "Carousel with the embla-carousel-autoplay plugin (2s delay, stop on interaction). Pause/resume on mouse enter/leave. Flagged: not in upstream MD examples.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-plugins.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "plugins",
    isFlagged: true,
    deviations: [
      "Replaced upstream useRef(Autoplay(...)) with useMemo(() => Autoplay(...), []) — React 19 react-hooks/refs rule blocks reading ref.current during render.",
    ],
  },

  // empty
  {
    name: "empty-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Empty state with folder-code icon, title, description, two action buttons, and a 'Learn More' link. Flagged: not in upstream MD examples.",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "components/examples/empty-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "default",
    isDefault: true,
    isFlagged: true,
  },
  {
    name: "empty-outline",
    type: "registry:example",
    title: "Outline",
    description: "Empty state with a dashed border, cloud icon, and a single Upload Files action.",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "components/examples/empty-outline.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "outline",
  },
  {
    name: "empty-background",
    type: "registry:example",
    title: "Background",
    description: "Empty state with a muted background, bell icon, and a Refresh action.",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "components/examples/empty-background.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "background",
  },
  {
    name: "empty-avatar",
    type: "registry:example",
    title: "Avatar",
    description:
      "Empty state using an Avatar as the media slot for an offline-user message with a Leave Message action.",
    registryDependencies: ["empty", "avatar", "button"],
    files: [
      {
        path: "components/examples/empty-avatar.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "avatar",
  },
  {
    name: "empty-avatar-group",
    type: "registry:example",
    title: "Avatar Group",
    description:
      "Empty state with an overlapping avatar group as media for a 'No Team Members' invite scenario.",
    registryDependencies: ["empty", "avatar", "button"],
    files: [
      {
        path: "components/examples/empty-avatar-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "avatar-group",
  },
  {
    name: "empty-input-group",
    type: "registry:example",
    title: "InputGroup",
    description:
      "404 Empty state composing InputGroup + Kbd inside the content area for a search-driven recovery prompt.",
    registryDependencies: ["empty", "input-group", "kbd"],
    files: [
      {
        path: "components/examples/empty-input-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "input-group",
  },

  // item
  {
    name: "item-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Item demo: outline variant with title/description/action plus a small asChild link Item with verified-profile message. Flagged: 'Default (outline)' not in upstream MD examples.",
    registryDependencies: ["item", "button"],
    files: [
      {
        path: "components/examples/item-default.tsx",
        type: "registry:example",
      },
    ],
    slug: "item",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    span: 2,
  },
  {
    name: "item-variants",
    type: "registry:example",
    title: "Variants",
    description:
      "Item rendered in default, outline, and muted variants stacked vertically. Flagged: not in upstream MD examples.",
    registryDependencies: ["item"],
    files: [
      {
        path: "components/examples/item-variants.tsx",
        type: "registry:example",
      },
    ],
    slug: "item",
    variant: "variants",
    isFlagged: true,
  },
  {
    name: "item-sizes",
    type: "registry:example",
    title: "Sizes (default / sm / xs)",
    description:
      "Item rendered at default, sm, and xs sizes for size-prop visual reference. Flagged: not in upstream MD examples.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-sizes.tsx", type: "registry:example" }],
    slug: "item",
    variant: "sizes",
    isFlagged: true,
  },
  {
    name: "item-icon",
    type: "registry:example",
    title: "Icon",
    description: "Item with a ShieldAlert lucide icon as the media slot for a security-alert row.",
    registryDependencies: ["item", "button"],
    files: [{ path: "components/examples/item-icon.tsx", type: "registry:example" }],
    slug: "item",
    variant: "icon",
  },
  {
    name: "item-avatar",
    type: "registry:example",
    title: "Avatar",
    description:
      "Item demos using single Avatar and an overlapping avatar group as the media slot.",
    registryDependencies: ["item", "avatar", "button"],
    files: [{ path: "components/examples/item-avatar.tsx", type: "registry:example" }],
    slug: "item",
    variant: "avatar",
    span: 2,
  },
  {
    name: "item-image",
    type: "registry:example",
    title: "Image",
    description:
      "Item rendered as a list of music tracks with image media (vercel avatar URLs) and dual ItemContent slots (title/artist + duration).",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-image.tsx", type: "registry:example" }],
    slug: "item",
    variant: "image",
    span: 2,
  },
  {
    name: "item-group",
    type: "registry:example",
    title: "Group",
    description:
      "ItemGroup of people rows with avatar, username, email, and a ghost icon-button action. Driven by the ITEM_GROUP_PEOPLE fixture.",
    registryDependencies: ["item", "avatar", "button"],
    files: [{ path: "components/examples/item-group.tsx", type: "registry:example" }],
    slug: "item",
    variant: "group",
  },
  {
    name: "item-header",
    type: "registry:example",
    title: "Header",
    description: "Three-column ItemGroup grid with ItemHeader image previews of v0 model cards.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-header.tsx", type: "registry:example" }],
    slug: "item",
    variant: "header",
    span: 2,
    height: "tall",
  },
  {
    name: "item-link",
    type: "registry:example",
    title: "Link",
    description:
      "Item demos with asChild anchor wrappers: internal documentation link with chevron and external link with target=_blank.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-link.tsx", type: "registry:example" }],
    slug: "item",
    variant: "link",
    span: 2,
  },
  {
    name: "item-dropdown",
    type: "registry:example",
    title: "Dropdown",
    description:
      "DropdownMenu whose items are xs Item rows with avatar, username, and email. Uses the ITEM_GROUP_PEOPLE fixture.",
    registryDependencies: ["item", "dropdown-menu", "avatar", "button"],
    files: [
      {
        path: "components/examples/item-dropdown.tsx",
        type: "registry:example",
      },
    ],
    slug: "item",
    variant: "dropdown",
  },

  // kbd
  {
    name: "kbd-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Kbd demo: macOS modifier keys grouped, plus a Ctrl + B chord with text separator. Flagged: not in upstream MD examples.",
    registryDependencies: ["kbd"],
    files: [{ path: "components/examples/kbd-default.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "default",
    isDefault: true,
    isFlagged: true,
  },
  {
    name: "kbd-group",
    type: "registry:example",
    title: "Group",
    description: "Kbd inline within prose using KbdGroup to chain two chords (Ctrl + B, Ctrl + K).",
    registryDependencies: ["kbd"],
    files: [{ path: "components/examples/kbd-group.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "group",
  },
  {
    name: "kbd-button",
    type: "registry:example",
    title: "Button",
    description: "Outline Button with a trailing Kbd return-key icon (data-icon=inline-end).",
    registryDependencies: ["kbd", "button"],
    files: [{ path: "components/examples/kbd-button.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "button",
  },
  {
    name: "kbd-tooltip",
    type: "registry:example",
    title: "Tooltip",
    description:
      "ButtonGroup with Save and Print buttons whose tooltips include single and chorded Kbd shortcuts.",
    registryDependencies: ["kbd", "button", "button-group", "tooltip"],
    files: [{ path: "components/examples/kbd-tooltip.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "tooltip",
  },
  {
    name: "kbd-input-group",
    type: "registry:example",
    title: "Input Group",
    description:
      "InputGroup search field with leading SearchIcon and trailing ⌘ + K Kbd shortcut hint.",
    registryDependencies: ["kbd", "input-group"],
    files: [
      {
        path: "components/examples/kbd-input-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "kbd",
    variant: "input-group",
  },
]);
