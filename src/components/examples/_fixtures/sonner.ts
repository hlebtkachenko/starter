/**
 * Shared fixtures for sonner example variants.
 *
 * `POSITIONS` lists the six toast anchor points used by the Position demo.
 * Keep label and value consistent with sonner's `position` prop.
 */
export const POSITIONS = [
  { label: "Top Left", value: "top-left" },
  { label: "Top Center", value: "top-center" },
  { label: "Top Right", value: "top-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Center", value: "bottom-center" },
  { label: "Bottom Right", value: "bottom-right" },
] as const;

export type ToastPosition = (typeof POSITIONS)[number]["value"];
