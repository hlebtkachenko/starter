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
      "Default Accordion demo with single collapsible items: shipping, returns, and customer support questions. Use when you need a standard FAQ or disclosure list with one item open at a time.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/accordion",
    categories: ["disclosure", "layout"],
    related: ["accordion-multiple", "accordion-borders", "accordion-card"],
  },
  {
    name: "accordion-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Basic Accordion in single-collapsible mode driven by the ACCORDION_BASIC fixture (password reset, plan changes, payment methods). Use for settings or billing FAQ sections.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-basic.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "basic",
    upstreamUrl: "https://ui.shadcn.com/docs/components/accordion",
    categories: ["disclosure", "layout"],
    related: ["accordion-default", "accordion-multiple"],
  },
  {
    name: "accordion-multiple",
    type: "registry:example",
    title: "Multiple",
    description:
      "Accordion in multiple-open mode with the ACCORDION_MULTIPLE fixture (notifications, privacy, billing sections). Pick this when users need to compare content across several panels simultaneously.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-multiple.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "multiple",
    upstreamUrl: "https://ui.shadcn.com/docs/components/accordion",
    categories: ["disclosure", "layout"],
    related: ["accordion-default", "accordion-basic"],
  },
  {
    name: "accordion-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Accordion with one disabled item demonstrating the disabled state on AccordionItem. Use to show feature gating or locked content within a disclosure list.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-disabled.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/accordion",
    categories: ["disclosure", "layout"],
    related: ["accordion-default"],
  },
  {
    name: "accordion-borders",
    type: "registry:example",
    title: "Borders",
    description:
      "Accordion wrapped in a bordered container with per-item bottom borders, driven by the ACCORDION_BORDERS fixture. Use when the accordion sits inside a card or panel that needs visual containment.",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "components/examples/accordion-borders.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "borders",
    upstreamUrl: "https://ui.shadcn.com/docs/components/accordion",
    categories: ["disclosure", "layout"],
    related: ["accordion-card", "accordion-default"],
  },
  {
    name: "accordion-card",
    type: "registry:example",
    title: "Card",
    description:
      "Accordion nested inside a Card with header, title, and description, driven by the ACCORDION_CARD fixture (subscription, billing, cancellation). Composes Accordion + Card for a self-contained help widget.",
    registryDependencies: ["accordion", "card"],
    files: [
      {
        path: "components/examples/accordion-card.tsx",
        type: "registry:example",
      },
    ],
    slug: "accordion",
    variant: "card",
    upstreamUrl: "https://ui.shadcn.com/docs/components/accordion",
    categories: ["disclosure", "layout"],
    related: ["accordion-borders", "accordion-default"],
  },

  // carousel
  {
    name: "carousel-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Carousel demo with five numbered cards and previous/next controls. Flagged: not in upstream MD examples. Use as the canonical starting point when adding a slideshow or image gallery.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/carousel",
    categories: ["display", "layout"],
    related: ["carousel-sizes", "carousel-spacing", "carousel-orientation"],
  },
  {
    name: "carousel-sizes",
    type: "registry:example",
    title: "Sizes",
    description:
      "Carousel with multiple visible items per slide using basis-1/2 and lg:basis-1/3 with align: start. Use when you need to show several cards simultaneously (e.g. a product shelf).",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-sizes.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "sizes",
    upstreamUrl: "https://ui.shadcn.com/docs/components/carousel",
    categories: ["display", "layout"],
    related: ["carousel-default", "carousel-spacing"],
  },
  {
    name: "carousel-spacing",
    type: "registry:example",
    title: "Spacing",
    description:
      "Carousel with custom horizontal gap between items using -ml-1 on CarouselContent and pl-1 on CarouselItem. Use when items need visual breathing room without changing item width.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-spacing.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "spacing",
    upstreamUrl: "https://ui.shadcn.com/docs/components/carousel",
    categories: ["display", "layout"],
    related: ["carousel-sizes", "carousel-default"],
  },
  {
    name: "carousel-orientation",
    type: "registry:example",
    title: "Orientation",
    description:
      "Vertically-oriented carousel with fixed height and align: start. Use when a horizontal scroll does not fit the layout, such as a vertical image stack or step-by-step guide.",
    registryDependencies: ["carousel", "card"],
    files: [
      {
        path: "components/examples/carousel-orientation.tsx",
        type: "registry:example",
      },
    ],
    slug: "carousel",
    variant: "orientation",
    upstreamUrl: "https://ui.shadcn.com/docs/components/carousel",
    categories: ["display", "layout"],
    related: ["carousel-default"],
    height: "tall",
  },
  {
    name: "carousel-api-slide-n-of-m",
    type: "registry:example",
    title: "API (slide N of M)",
    description:
      "Carousel using setApi to expose the embla API and render a 'Slide N of M' indicator that updates on selection. Flagged: not in upstream MD examples. Use when users need pagination context.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/carousel",
    categories: ["display", "layout"],
    related: ["carousel-plugins", "carousel-default"],
  },
  {
    name: "carousel-plugins",
    type: "registry:example",
    title: "Plugins",
    description:
      "Carousel with the embla-carousel-autoplay plugin (2s delay, stop on interaction). Pause/resume on mouse enter/leave. Flagged: not in upstream MD examples. Composes Carousel + embla-carousel-autoplay.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/carousel",
    categories: ["display", "layout"],
    related: ["carousel-api-slide-n-of-m", "carousel-default"],
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
      "Default Empty state with folder-code icon, title, description, two action buttons, and a Learn More link. Flagged: not in upstream MD examples. Use as the hero empty state for data-less views.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/empty",
    categories: ["feedback", "display"],
    related: ["empty-outline", "empty-background", "empty-avatar"],
  },
  {
    name: "empty-outline",
    type: "registry:example",
    title: "Outline",
    description:
      "Empty state with a dashed border, cloud icon, and a single Upload Files action button. Use for file-drop zones or storage empty states where a clear call-to-action is needed.",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "components/examples/empty-outline.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "outline",
    upstreamUrl: "https://ui.shadcn.com/docs/components/empty",
    categories: ["feedback", "display"],
    related: ["empty-default", "empty-background"],
  },
  {
    name: "empty-background",
    type: "registry:example",
    title: "Background",
    description:
      "Empty state with a muted background fill, bell icon, and a Refresh action. Use for notification panels or activity feeds where subtle background contrast signals an inactive state.",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "components/examples/empty-background.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "background",
    upstreamUrl: "https://ui.shadcn.com/docs/components/empty",
    categories: ["feedback", "display"],
    related: ["empty-default", "empty-outline"],
  },
  {
    name: "empty-avatar",
    type: "registry:example",
    title: "Avatar",
    description:
      "Empty state using an Avatar as the media slot for an offline-user message with a Leave Message action. Use when the empty state is person-centric — composes Empty + Avatar + Button.",
    registryDependencies: ["empty", "avatar", "button"],
    files: [
      {
        path: "components/examples/empty-avatar.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "avatar",
    upstreamUrl: "https://ui.shadcn.com/docs/components/empty",
    categories: ["feedback", "display"],
    related: ["empty-avatar-group", "empty-default"],
  },
  {
    name: "empty-avatar-group",
    type: "registry:example",
    title: "Avatar Group",
    description:
      "Empty state with an overlapping avatar group as media for a No Team Members invite scenario. Use for collaborative features where the empty state should suggest social context.",
    registryDependencies: ["empty", "avatar", "button"],
    files: [
      {
        path: "components/examples/empty-avatar-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "avatar-group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/empty",
    categories: ["feedback", "display"],
    related: ["empty-avatar", "empty-default"],
  },
  {
    name: "empty-input-group",
    type: "registry:example",
    title: "InputGroup",
    description:
      "404 Empty state composing InputGroup and Kbd inside the content area for a search-driven recovery prompt. Use for not-found pages where search is the primary recovery action.",
    registryDependencies: ["empty", "input-group", "kbd"],
    files: [
      {
        path: "components/examples/empty-input-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "empty",
    variant: "input-group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/empty",
    categories: ["feedback", "display"],
    related: ["empty-default", "kbd-input-group"],
  },

  // item
  {
    name: "item-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Item demo: outline variant with title, description, and action, plus a small asChild link Item with verified-profile message. Flagged: Default (outline) not in upstream MD examples.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-variants", "item-sizes", "item-icon"],
    span: 2,
  },
  {
    name: "item-variants",
    type: "registry:example",
    title: "Variants",
    description:
      "Item rendered in default, outline, and muted variants stacked vertically. Flagged: not in upstream MD examples. Use to compare visual weight across all three variant options.",
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
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-default", "item-sizes"],
  },
  {
    name: "item-sizes",
    type: "registry:example",
    title: "Sizes (default / sm / xs)",
    description:
      "Item rendered at default, sm, and xs sizes for size-prop visual reference. Flagged: not in upstream MD examples. Use when selecting the correct hit area for toolbars or dense lists.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-sizes.tsx", type: "registry:example" }],
    slug: "item",
    variant: "sizes",
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-variants", "item-default"],
  },
  {
    name: "item-icon",
    type: "registry:example",
    title: "Icon",
    description:
      "Item with a ShieldAlert lucide icon as the media slot for a security-alert row with Review action. Use for status or alert list items where an icon communicates urgency.",
    registryDependencies: ["item", "button"],
    files: [{ path: "components/examples/item-icon.tsx", type: "registry:example" }],
    slug: "item",
    variant: "icon",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-avatar", "item-default"],
  },
  {
    name: "item-avatar",
    type: "registry:example",
    title: "Avatar",
    description:
      "Item demos using a single Avatar and an overlapping avatar group as the media slot. Use for people lists, team membership rows, or chat participant displays — composes Item + Avatar.",
    registryDependencies: ["item", "avatar", "button"],
    files: [{ path: "components/examples/item-avatar.tsx", type: "registry:example" }],
    slug: "item",
    variant: "avatar",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-group", "item-icon"],
    span: 2,
    deviations: [
      "Replaced upstream Plus icon import with PlusIcon to match lucide-react named export convention.",
    ],
  },
  {
    name: "item-image",
    type: "registry:example",
    title: "Image",
    description:
      "Item rendered as a list of music tracks with image media (vercel avatar URLs) and dual ItemContent slots for title/artist and duration. Use for media catalogs or playlist UIs.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-image.tsx", type: "registry:example" }],
    slug: "item",
    variant: "image",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-header", "item-group"],
    span: 2,
    deviations: [
      "Uses native <img> with eslint-disable instead of next/image for showcase fixture URLs.",
    ],
  },
  {
    name: "item-group",
    type: "registry:example",
    title: "Group",
    description:
      "ItemGroup of people rows with avatar, username, email, and a ghost icon-button action. Driven by the ITEM_GROUP_PEOPLE fixture. Use for user search results or team member lists.",
    registryDependencies: ["item", "avatar", "button"],
    files: [{ path: "components/examples/item-group.tsx", type: "registry:example" }],
    slug: "item",
    variant: "group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-avatar", "item-dropdown"],
  },
  {
    name: "item-header",
    type: "registry:example",
    title: "Header",
    description:
      "Three-column ItemGroup grid with ItemHeader image previews of v0 model cards. Use when items need a prominent visual thumbnail above the text content, such as model or product cards.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-header.tsx", type: "registry:example" }],
    slug: "item",
    variant: "header",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-image", "item-group"],
    span: 2,
    height: "tall",
    deviations: [
      "Uses native <img> with eslint-disable instead of next/image for showcase fixture URLs.",
    ],
  },
  {
    name: "item-link",
    type: "registry:example",
    title: "Link",
    description:
      "Item demos with asChild anchor wrappers: an internal documentation link with chevron and an external link with target=_blank. Use when the entire item row must be keyboard- and click-navigable.",
    registryDependencies: ["item"],
    files: [{ path: "components/examples/item-link.tsx", type: "registry:example" }],
    slug: "item",
    variant: "link",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-default", "item-group"],
    span: 2,
  },
  {
    name: "item-dropdown",
    type: "registry:example",
    title: "Dropdown",
    description:
      "DropdownMenu whose items are xs Item rows with avatar, username, and email. Uses the ITEM_GROUP_PEOPLE fixture. Use for user-picker dropdowns inside toolbars or assignee selectors.",
    registryDependencies: ["item", "dropdown-menu", "avatar", "button"],
    files: [
      {
        path: "components/examples/item-dropdown.tsx",
        type: "registry:example",
      },
    ],
    slug: "item",
    variant: "dropdown",
    upstreamUrl: "https://ui.shadcn.com/docs/components/item",
    categories: ["display", "layout"],
    related: ["item-group", "item-avatar"],
  },

  // kbd
  {
    name: "kbd-default",
    type: "registry:example",
    title: "Default",
    description:
      "Default Kbd demo: macOS modifier keys grouped, plus a Ctrl + B chord with text separator. Flagged: not in upstream MD examples. Use as the reference for displaying keyboard shortcut notation.",
    registryDependencies: ["kbd"],
    files: [{ path: "components/examples/kbd-default.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/kbd",
    categories: ["display"],
    related: ["kbd-group", "kbd-button", "kbd-tooltip"],
  },
  {
    name: "kbd-group",
    type: "registry:example",
    title: "Group",
    description:
      "Kbd inline within prose using KbdGroup to chain two chords (Ctrl + B, Ctrl + K). Use when multiple shortcuts appear in a sentence or help text paragraph.",
    registryDependencies: ["kbd"],
    files: [{ path: "components/examples/kbd-group.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/kbd",
    categories: ["display"],
    related: ["kbd-default", "kbd-tooltip"],
  },
  {
    name: "kbd-button",
    type: "registry:example",
    title: "Button",
    description:
      "Outline Button with a trailing Kbd return-key icon (data-icon=inline-end). Use when a primary action button should hint its keyboard shortcut inline within the button itself.",
    registryDependencies: ["kbd", "button"],
    files: [{ path: "components/examples/kbd-button.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "button",
    upstreamUrl: "https://ui.shadcn.com/docs/components/kbd",
    categories: ["display"],
    related: ["kbd-tooltip", "kbd-input-group"],
  },
  {
    name: "kbd-tooltip",
    type: "registry:example",
    title: "Tooltip",
    description:
      "ButtonGroup with Save and Print buttons whose tooltips include single and chorded Kbd shortcuts. Use when shortcut hints belong in a tooltip rather than cluttering the button label.",
    registryDependencies: ["kbd", "button", "button-group", "tooltip"],
    files: [{ path: "components/examples/kbd-tooltip.tsx", type: "registry:example" }],
    slug: "kbd",
    variant: "tooltip",
    upstreamUrl: "https://ui.shadcn.com/docs/components/kbd",
    categories: ["display"],
    related: ["kbd-button", "kbd-group"],
  },
  {
    name: "kbd-input-group",
    type: "registry:example",
    title: "Input Group",
    description:
      "InputGroup search field with leading SearchIcon and trailing Cmd + K Kbd shortcut hint. Use for command palette triggers or search inputs where the activation shortcut should be visible.",
    registryDependencies: ["kbd", "input-group"],
    files: [
      {
        path: "components/examples/kbd-input-group.tsx",
        type: "registry:example",
      },
    ],
    slug: "kbd",
    variant: "input-group",
    upstreamUrl: "https://ui.shadcn.com/docs/components/kbd",
    categories: ["display"],
    related: ["kbd-button", "empty-input-group"],
  },
]);
