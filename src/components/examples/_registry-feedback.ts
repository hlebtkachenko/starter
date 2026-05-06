import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the feedback-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // alert
  {
    name: "alert-default",
    type: "registry:example",
    title: "Default",
    description:
      "Stacked success and info Alert callouts pairing icon, title, and description for routine feedback.",
    slug: "alert",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert",
    registryDependencies: ["alert"],
    files: [
      {
        path: "components/examples/alert-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
    span: 2,
  },
  {
    name: "alert-basic",
    type: "registry:example",
    title: "Basic",
    description:
      "Single Alert with success icon confirming an account update with a follow-up description.",
    slug: "alert",
    variant: "basic",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert",
    registryDependencies: ["alert"],
    files: [{ path: "components/examples/alert-basic.tsx", type: "registry:example" }],
    categories: ["feedback"],
  },
  {
    name: "alert-destructive",
    type: "registry:example",
    title: "Destructive",
    description:
      "Destructive variant of Alert flagging a payment failure with the alert-circle icon.",
    slug: "alert",
    variant: "destructive",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert",
    registryDependencies: ["alert"],
    files: [
      {
        path: "components/examples/alert-destructive.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "alert-action",
    type: "registry:example",
    title: "Action",
    description:
      "Alert composed with AlertAction slot to surface a primary CTA Button beside the message.",
    slug: "alert",
    variant: "action",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert",
    registryDependencies: ["alert", "button"],
    files: [
      {
        path: "components/examples/alert-action.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "alert-custom-colors",
    type: "registry:example",
    title: "Custom Colors",
    description:
      "Alert overridden with amber tokens to communicate a soft subscription-expiry warning.",
    slug: "alert",
    variant: "custom-colors",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/alert",
    registryDependencies: ["alert"],
    files: [
      {
        path: "components/examples/alert-custom-colors.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },

  // progress
  {
    name: "progress-default",
    type: "registry:example",
    title: "Default",
    description: "Progress bar that animates from 13% to 66% on mount via a delayed setState.",
    slug: "progress",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/progress",
    registryDependencies: ["progress"],
    files: [
      {
        path: "components/examples/progress-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "progress-label",
    type: "registry:example",
    title: "Label",
    description: "Progress bar paired with a Field label that shows the upload percentage inline.",
    slug: "progress",
    variant: "label",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/progress",
    registryDependencies: ["progress", "field"],
    files: [
      {
        path: "components/examples/progress-label.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback", "forms"],
  },
  {
    name: "progress-controlled",
    type: "registry:example",
    title: "Controlled",
    description: "Progress bar driven by a Slider so the user can interactively set its value.",
    slug: "progress",
    variant: "controlled",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/progress",
    registryDependencies: ["progress", "slider"],
    files: [
      {
        path: "components/examples/progress-controlled.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback", "forms"],
  },

  // sonner
  {
    name: "sonner-default",
    type: "registry:example",
    title: "Default",
    description: "Outline Button that fires a toast with description and an Undo action callback.",
    slug: "sonner",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sonner",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "components/examples/sonner-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "sonner-types",
    type: "registry:example",
    title: "Types",
    description:
      "Six triggers covering default, success, info, warning, error, and promise toast types.",
    slug: "sonner",
    variant: "types",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sonner",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "components/examples/sonner-types.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
    span: 2,
  },
  {
    name: "sonner-description",
    type: "registry:example",
    title: "Description",
    description: "Toast trigger that adds a secondary description line under the title.",
    slug: "sonner",
    variant: "description",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sonner",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "components/examples/sonner-description.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "sonner-position",
    type: "registry:example",
    title: "Position",
    description: "Six anchor buttons that fire a toast at each corner and edge of the viewport.",
    slug: "sonner",
    variant: "position",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/sonner",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "components/examples/sonner-position.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
    span: 2,
  },

  // spinner
  {
    name: "spinner-default",
    type: "registry:example",
    title: "Default",
    description:
      "Spinner placed inside an Item row to signal an in-flight payment with a trailing amount.",
    slug: "spinner",
    variant: "default",
    isDefault: true,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/spinner",
    registryDependencies: ["spinner", "item"],
    files: [
      {
        path: "components/examples/spinner-default.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "spinner-size",
    type: "registry:example",
    title: "Size",
    description: "Four Spinners scaled via Tailwind size utilities from size-3 through size-8.",
    slug: "spinner",
    variant: "size",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/spinner",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "components/examples/spinner-size.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
  },
  {
    name: "spinner-button",
    type: "registry:example",
    title: "Button",
    description: "Disabled Button variants pairing an inline-start Spinner with loading copy.",
    slug: "spinner",
    variant: "button",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/spinner",
    registryDependencies: ["spinner", "button"],
    files: [
      {
        path: "components/examples/spinner-button.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback", "actions"],
  },
  {
    name: "spinner-badge",
    type: "registry:example",
    title: "Badge",
    description:
      "Spinner composed inside Badge variants to label syncing, updating, and processing states.",
    slug: "spinner",
    variant: "badge",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/spinner",
    registryDependencies: ["spinner", "badge"],
    files: [
      {
        path: "components/examples/spinner-badge.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback", "display"],
  },
  {
    name: "spinner-input-group",
    type: "registry:example",
    title: "Input Group",
    description:
      "Spinner placed in InputGroup addons to indicate inline validation on input and textarea variants.",
    slug: "spinner",
    variant: "input-group",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/spinner",
    registryDependencies: ["spinner", "input-group"],
    files: [
      {
        path: "components/examples/spinner-input-group.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback", "forms"],
    span: 2,
  },
  {
    name: "spinner-empty",
    type: "registry:example",
    title: "Empty",
    description:
      "Spinner used as Empty media to communicate a long-running request with a Cancel action.",
    slug: "spinner",
    variant: "empty",
    isDefault: false,
    isFlagged: false,
    upstreamUrl: "https://ui.shadcn.com/docs/components/spinner",
    registryDependencies: ["spinner", "empty", "button"],
    files: [
      {
        path: "components/examples/spinner-empty.tsx",
        type: "registry:example",
      },
    ],
    categories: ["feedback"],
    span: 2,
  },
]);
