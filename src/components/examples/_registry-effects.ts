import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for effects / animation components (Aceternity and similar).
 */
export const items = defineItems([
  {
    name: "noise-background-default",
    type: "registry:example",
    title: "Default",
    description:
      "Animated gradient background with noise overlay wrapping a pill button, demonstrating spring-physics movement.",
    slug: "noise-background",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.aceternity.com/components/noise-background",
    registryDependencies: ["noise-background"],
    files: [
      {
        path: "components/examples/noise-background-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display", "effects"],
    deviations: [
      "Noise texture served from /noise.webp instead of external CDN.",
      "Token classes replace hardcoded neutral palette.",
    ],
  },
  {
    name: "noise-background-card",
    type: "registry:example",
    title: "Card",
    description:
      "Noise background wrapping a card component with image placeholder and text content, showing container composition.",
    slug: "noise-background",
    variant: "card",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.aceternity.com/components/noise-background",
    registryDependencies: ["noise-background", "card"],
    files: [
      {
        path: "components/examples/noise-background-card.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display", "effects"],
    deviations: [
      "Token classes replace hardcoded neutral palette.",
      "Self-hosted noise texture.",
      "External image replaced with placeholder.",
    ],
  },
  {
    name: "stateful-button-default",
    type: "registry:example",
    title: "Default",
    description:
      "Button that cycles through idle, loading spinner, and success check states on click with motion/react animations.",
    slug: "stateful-button",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.aceternity.com/components/stateful-button",
    registryDependencies: ["stateful-button"],
    files: [
      {
        path: "components/examples/stateful-button-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["actions", "effects"],
    deviations: [
      "Renamed export from Button to StatefulButton to avoid conflict.",
      "Token classes replace hardcoded green palette.",
    ],
  },
  {
    name: "multi-step-loader-default",
    type: "registry:example",
    title: "Default",
    description:
      "Full-screen loader overlay cycling through named steps with animated check marks, triggered by a button click.",
    slug: "multi-step-loader",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.aceternity.com/components/multi-step-loader",
    registryDependencies: ["multi-step-loader", "button"],
    files: [
      {
        path: "components/examples/multi-step-loader-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback", "effects"],
    deviations: ["Token classes replace hardcoded black/white/lime palette."],
  },
  {
    name: "separator-extended-default",
    type: "registry:example",
    title: "Default",
    description:
      "Solid separator in a composition layout with skeleton blocks, horizontal OR dividers, and vertical side separators.",
    slug: "separator-extended",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    span: 2,
    upstreamUrl: "https://basecn.dev/docs/components/separator-extended",
    registryDependencies: ["separator-extended"],
    files: [
      {
        path: "components/examples/separator-extended-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    deviations: [
      "Renamed Separator to SeparatorExtended to avoid conflict with existing primitive.",
    ],
  },
  {
    name: "separator-extended-dashed",
    type: "registry:example",
    title: "Dashed",
    description:
      "Dashed separator variant in the same composition layout showing horizontal and vertical usage.",
    slug: "separator-extended",
    variant: "dashed",
    isFlagged: false,
    span: 2,
    upstreamUrl: "https://basecn.dev/docs/components/separator-extended",
    registryDependencies: ["separator-extended"],
    files: [
      {
        path: "components/examples/separator-extended-dashed.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    deviations: [
      "Renamed Separator to SeparatorExtended to avoid conflict with existing primitive.",
    ],
  },
  {
    name: "separator-extended-dotted",
    type: "registry:example",
    title: "Dotted",
    description:
      "Dotted separator variant in the same composition layout showing horizontal and vertical usage.",
    slug: "separator-extended",
    variant: "dotted",
    isFlagged: false,
    span: 2,
    upstreamUrl: "https://basecn.dev/docs/components/separator-extended",
    registryDependencies: ["separator-extended"],
    files: [
      {
        path: "components/examples/separator-extended-dotted.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    deviations: [
      "Renamed Separator to SeparatorExtended to avoid conflict with existing primitive.",
    ],
  },
  {
    name: "separator-extended-double",
    type: "registry:example",
    title: "Double",
    description:
      "Double-line separator variant in the same composition layout showing horizontal and vertical usage.",
    slug: "separator-extended",
    variant: "double",
    isFlagged: false,
    span: 2,
    upstreamUrl: "https://basecn.dev/docs/components/separator-extended",
    registryDependencies: ["separator-extended"],
    files: [
      {
        path: "components/examples/separator-extended-double.tsx",
        type: "registry:example",
      },
    ],
    categories: ["layout"],
    deviations: [
      "Renamed Separator to SeparatorExtended to avoid conflict with existing primitive.",
    ],
  },
  // card-styles (cardcn.dev)
  {
    name: "card-styles-shadow",
    type: "registry:example",
    title: "Shadow",
    description: "Card with retro offset shadow using --border token for a bold, playful look.",
    slug: "card-styles",
    variant: "shadow",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://cardcn.dev/cards/basic-cards/",
    registryDependencies: ["card"],
    files: [
      {
        path: "components/examples/card-styles-shadow.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display"],
    deviations: ["Adapted from cardcn card-1."],
  },
  {
    name: "card-styles-lines",
    type: "registry:example",
    title: "Lines",
    description: "Card framed by gradient border lines creating a technical blueprint aesthetic.",
    slug: "card-styles",
    variant: "lines",
    isFlagged: false,
    upstreamUrl: "https://cardcn.dev/cards/basic-cards/",
    registryDependencies: ["card"],
    files: [
      {
        path: "components/examples/card-styles-lines.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display"],
    deviations: ["Adapted from cardcn card-2. Gradient uses token border color."],
  },
  {
    name: "card-styles-hatched",
    type: "registry:example",
    title: "Hatched",
    description: "Card with diagonal hatching pattern behind transparent content area.",
    slug: "card-styles",
    variant: "hatched",
    isFlagged: false,
    upstreamUrl: "https://cardcn.dev/cards/basic-cards/",
    registryDependencies: ["card"],
    files: [
      {
        path: "components/examples/card-styles-hatched.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display"],
    deviations: ["Adapted from cardcn card-10. Hatching uses --border token."],
  },
  {
    name: "card-styles-aurora",
    type: "registry:example",
    title: "Aurora",
    description: "Card with subtle radial gradient aurora glow effect behind transparent content.",
    slug: "card-styles",
    variant: "aurora",
    isFlagged: false,
    upstreamUrl: "https://cardcn.dev/cards/basic-cards/",
    registryDependencies: ["card"],
    files: [
      {
        path: "components/examples/card-styles-aurora.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display"],
    deviations: ["Adapted from cardcn card-14."],
  },
  {
    name: "card-styles-tilted",
    type: "registry:example",
    title: "Tilted",
    description: "Card with a rotated background layer creating a tilted shadow depth effect.",
    slug: "card-styles",
    variant: "tilted",
    isFlagged: false,
    upstreamUrl: "https://cardcn.dev/cards/basic-cards/",
    registryDependencies: ["card"],
    files: [
      {
        path: "components/examples/card-styles-tilted.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display"],
    deviations: ["Adapted from cardcn card-15."],
  },
  {
    name: "card-styles-stacked",
    type: "registry:example",
    title: "Stacked",
    description:
      "Card with two scaled-down layers behind it creating a stacked paper depth effect.",
    slug: "card-styles",
    variant: "stacked",
    isFlagged: false,
    upstreamUrl: "https://cardcn.dev/cards/basic-cards/",
    registryDependencies: ["card"],
    files: [
      {
        path: "components/examples/card-styles-stacked.tsx",
        type: "registry:example",
      },
    ],
    categories: ["display"],
    deviations: ["Adapted from cardcn card-18."],
  },
  // autocomplete (coss.com)
  {
    name: "autocomplete-default",
    type: "registry:example",
    title: "Default",
    description:
      "Autocomplete input filtering a list of frameworks with clear button and empty state message.",
    slug: "autocomplete",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://coss.com/ui/docs/components/autocomplete",
    registryDependencies: ["autocomplete"],
    files: [
      {
        path: "components/examples/autocomplete-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["forms"],
    deviations: [
      "Uses native input styling instead of coss Input primitive.",
      "ScrollArea without coss-specific props.",
    ],
  },
]);
