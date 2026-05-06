import { defineItems } from "@/lib/registry-schema";

/**
 * Example entries for the forms-group source file. Populated by Phase 2
 * extraction for that group. Append items here as you extract each <Demo>
 * into its own `<slug>-<variant>.tsx` example file.
 */
export const items = defineItems([
  // checkbox
  {
    name: "checkbox-default",
    type: "registry:example",
    title: "Default",
    slug: "checkbox",
    variant: "default",
    isDefault: true,
    registryDependencies: ["checkbox", "field", "label"],
    files: [
      {
        path: "components/examples/checkbox-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-basic",
    type: "registry:example",
    title: "Basic",
    slug: "checkbox",
    variant: "basic",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "components/examples/checkbox-basic.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-description",
    type: "registry:example",
    title: "Description",
    slug: "checkbox",
    variant: "description",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "components/examples/checkbox-description.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-disabled",
    type: "registry:example",
    title: "Disabled",
    slug: "checkbox",
    variant: "disabled",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "components/examples/checkbox-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-group",
    type: "registry:example",
    title: "Group",
    slug: "checkbox",
    variant: "group",
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "components/examples/checkbox-group.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-table",
    type: "registry:example",
    title: "Table",
    slug: "checkbox",
    variant: "table",
    registryDependencies: ["checkbox", "table"],
    files: [
      {
        path: "components/examples/checkbox-table.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "checkbox-indeterminate-select-all",
    type: "registry:example",
    title: "Indeterminate (select all)",
    slug: "checkbox",
    variant: "indeterminate-select-all",
    isFlagged: true,
    registryDependencies: ["checkbox", "field"],
    files: [
      {
        path: "components/examples/checkbox-indeterminate-select-all.tsx",
        type: "registry:example",
      },
    ],
  },

  // combobox
  {
    name: "combobox-default",
    type: "registry:example",
    title: "Default",
    slug: "combobox",
    variant: "default",
    isDefault: true,
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-basic",
    type: "registry:example",
    title: "Basic",
    slug: "combobox",
    variant: "basic",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-basic.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-multiple",
    type: "registry:example",
    title: "Multiple",
    slug: "combobox",
    variant: "multiple",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-multiple.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-clear-button",
    type: "registry:example",
    title: "Clear Button",
    slug: "combobox",
    variant: "clear-button",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-clear-button.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-groups",
    type: "registry:example",
    title: "Groups",
    slug: "combobox",
    variant: "groups",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-groups.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-custom-items",
    type: "registry:example",
    title: "Custom Items",
    slug: "combobox",
    variant: "custom-items",
    registryDependencies: ["combobox", "item"],
    files: [
      {
        path: "components/examples/combobox-custom-items.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-invalid",
    type: "registry:example",
    title: "Invalid",
    slug: "combobox",
    variant: "invalid",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-disabled",
    type: "registry:example",
    title: "Disabled",
    slug: "combobox",
    variant: "disabled",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-auto-highlight",
    type: "registry:example",
    title: "Auto Highlight",
    slug: "combobox",
    variant: "auto-highlight",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "components/examples/combobox-auto-highlight.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-popup",
    type: "registry:example",
    title: "Popup",
    slug: "combobox",
    variant: "popup",
    registryDependencies: ["combobox", "button"],
    files: [
      {
        path: "components/examples/combobox-popup.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "combobox-input-group",
    type: "registry:example",
    title: "Input Group",
    slug: "combobox",
    variant: "input-group",
    registryDependencies: ["combobox", "input-group"],
    files: [
      {
        path: "components/examples/combobox-input-group.tsx",
        type: "registry:example",
      },
    ],
  },

  // date-picker
  {
    name: "date-picker-default",
    type: "registry:example",
    title: "Default",
    slug: "date-picker",
    variant: "default",
    isDefault: true,
    registryDependencies: ["calendar", "popover", "button"],
    files: [
      {
        path: "components/examples/date-picker-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-basic",
    type: "registry:example",
    title: "Basic",
    slug: "date-picker",
    variant: "basic",
    registryDependencies: ["calendar", "popover", "button", "field"],
    files: [
      {
        path: "components/examples/date-picker-basic.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-range-picker",
    type: "registry:example",
    title: "Range Picker",
    slug: "date-picker",
    variant: "range-picker",
    registryDependencies: ["calendar", "popover", "button", "field"],
    files: [
      {
        path: "components/examples/date-picker-range-picker.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-date-of-birth",
    type: "registry:example",
    title: "Date of Birth",
    slug: "date-picker",
    variant: "date-of-birth",
    registryDependencies: ["calendar", "popover", "button", "field"],
    files: [
      {
        path: "components/examples/date-picker-date-of-birth.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-input",
    type: "registry:example",
    title: "Input",
    slug: "date-picker",
    variant: "input",
    registryDependencies: ["calendar", "popover", "input-group", "field"],
    files: [
      {
        path: "components/examples/date-picker-input.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-time-picker",
    type: "registry:example",
    title: "Time Picker",
    slug: "date-picker",
    variant: "time-picker",
    registryDependencies: ["calendar", "popover", "button", "input", "field"],
    files: [
      {
        path: "components/examples/date-picker-time-picker.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "date-picker-natural-language-picker",
    type: "registry:example",
    title: "Natural Language Picker",
    slug: "date-picker",
    variant: "natural-language-picker",
    registryDependencies: ["calendar", "popover", "input-group", "field"],
    files: [
      {
        path: "components/examples/date-picker-natural-language-picker.tsx",
        type: "registry:example",
      },
    ],
  },

  // field
  {
    name: "field-default",
    type: "registry:example",
    title: "Default",
    slug: "field",
    variant: "default",
    isDefault: true,
    registryDependencies: ["field", "input", "select", "textarea", "checkbox", "button"],
    files: [
      {
        path: "components/examples/field-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-input",
    type: "registry:example",
    title: "Input",
    slug: "field",
    variant: "input",
    registryDependencies: ["field", "input"],
    files: [{ path: "components/examples/field-input.tsx", type: "registry:example" }],
  },
  {
    name: "field-textarea",
    type: "registry:example",
    title: "Textarea",
    slug: "field",
    variant: "textarea",
    registryDependencies: ["field", "textarea"],
    files: [
      {
        path: "components/examples/field-textarea.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-select",
    type: "registry:example",
    title: "Select",
    slug: "field",
    variant: "select",
    registryDependencies: ["field", "select"],
    files: [
      {
        path: "components/examples/field-select.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-slider",
    type: "registry:example",
    title: "Slider",
    slug: "field",
    variant: "slider",
    registryDependencies: ["field", "slider"],
    files: [
      {
        path: "components/examples/field-slider.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-fieldset",
    type: "registry:example",
    title: "Fieldset",
    slug: "field",
    variant: "fieldset",
    registryDependencies: ["field", "input"],
    files: [
      {
        path: "components/examples/field-fieldset.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-checkbox",
    type: "registry:example",
    title: "Checkbox",
    slug: "field",
    variant: "checkbox",
    registryDependencies: ["field", "checkbox"],
    files: [
      {
        path: "components/examples/field-checkbox.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-radio",
    type: "registry:example",
    title: "Radio",
    slug: "field",
    variant: "radio",
    registryDependencies: ["field", "radio-group"],
    files: [{ path: "components/examples/field-radio.tsx", type: "registry:example" }],
  },
  {
    name: "field-switch",
    type: "registry:example",
    title: "Switch",
    slug: "field",
    variant: "switch",
    registryDependencies: ["field", "switch"],
    files: [
      {
        path: "components/examples/field-switch.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-choice-card",
    type: "registry:example",
    title: "Choice Card",
    slug: "field",
    variant: "choice-card",
    registryDependencies: ["field", "radio-group"],
    files: [
      {
        path: "components/examples/field-choice-card.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "field-field-group",
    type: "registry:example",
    title: "Field Group",
    slug: "field",
    variant: "field-group",
    registryDependencies: ["field", "checkbox"],
    files: [
      {
        path: "components/examples/field-field-group.tsx",
        type: "registry:example",
      },
    ],
  },

  // input
  {
    name: "input-default",
    type: "registry:example",
    title: "Default",
    slug: "input",
    variant: "default",
    isDefault: true,
    registryDependencies: ["input", "field"],
    files: [
      {
        path: "components/examples/input-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-basic",
    type: "registry:example",
    title: "Basic",
    slug: "input",
    variant: "basic",
    registryDependencies: ["input"],
    files: [{ path: "components/examples/input-basic.tsx", type: "registry:example" }],
  },
  {
    name: "input-field",
    type: "registry:example",
    title: "Field",
    slug: "input",
    variant: "field",
    registryDependencies: ["input", "field"],
    files: [{ path: "components/examples/input-field.tsx", type: "registry:example" }],
  },
  {
    name: "input-field-group",
    type: "registry:example",
    title: "Field Group",
    slug: "input",
    variant: "field-group",
    registryDependencies: ["input", "field", "button"],
    files: [
      {
        path: "components/examples/input-field-group.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-disabled",
    type: "registry:example",
    title: "Disabled",
    slug: "input",
    variant: "disabled",
    registryDependencies: ["input", "field"],
    files: [
      {
        path: "components/examples/input-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-invalid",
    type: "registry:example",
    title: "Invalid",
    slug: "input",
    variant: "invalid",
    registryDependencies: ["input", "field"],
    files: [
      {
        path: "components/examples/input-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-file",
    type: "registry:example",
    title: "File",
    slug: "input",
    variant: "file",
    registryDependencies: ["input", "field"],
    files: [{ path: "components/examples/input-file.tsx", type: "registry:example" }],
  },
  {
    name: "input-inline",
    type: "registry:example",
    title: "Inline",
    slug: "input",
    variant: "inline",
    registryDependencies: ["input", "field", "button"],
    files: [
      {
        path: "components/examples/input-inline.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-grid",
    type: "registry:example",
    title: "Grid",
    slug: "input",
    variant: "grid",
    registryDependencies: ["input", "field"],
    files: [{ path: "components/examples/input-grid.tsx", type: "registry:example" }],
  },
  {
    name: "input-required",
    type: "registry:example",
    title: "Required",
    slug: "input",
    variant: "required",
    registryDependencies: ["input", "field"],
    files: [
      {
        path: "components/examples/input-required.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-badge",
    type: "registry:example",
    title: "Badge",
    slug: "input",
    variant: "badge",
    registryDependencies: ["input", "field", "badge"],
    files: [{ path: "components/examples/input-badge.tsx", type: "registry:example" }],
  },
  {
    name: "input-input-group",
    type: "registry:example",
    title: "Input Group",
    slug: "input",
    variant: "input-group",
    registryDependencies: ["input-group", "field"],
    files: [
      {
        path: "components/examples/input-input-group.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-button-group",
    type: "registry:example",
    title: "Button Group",
    slug: "input",
    variant: "button-group",
    registryDependencies: ["input", "button-group", "button", "field"],
    files: [
      {
        path: "components/examples/input-button-group.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-form",
    type: "registry:example",
    title: "Form",
    slug: "input",
    variant: "form",
    registryDependencies: ["input", "field", "select", "button"],
    files: [{ path: "components/examples/input-form.tsx", type: "registry:example" }],
  },

  // input-group
  {
    name: "input-group-default",
    type: "registry:example",
    title: "Default",
    slug: "input-group",
    variant: "default",
    isDefault: true,
    registryDependencies: ["input-group"],
    files: [
      {
        path: "components/examples/input-group-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-icon",
    type: "registry:example",
    title: "Icon",
    slug: "input-group",
    variant: "icon",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "components/examples/input-group-icon.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-text",
    type: "registry:example",
    title: "Text",
    slug: "input-group",
    variant: "text",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "components/examples/input-group-text.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-button",
    type: "registry:example",
    title: "Button",
    slug: "input-group",
    variant: "button",
    registryDependencies: ["input-group", "popover"],
    files: [
      {
        path: "components/examples/input-group-button.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-kbd",
    type: "registry:example",
    title: "Kbd",
    slug: "input-group",
    variant: "kbd",
    registryDependencies: ["input-group", "kbd"],
    files: [
      {
        path: "components/examples/input-group-kbd.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-dropdown",
    type: "registry:example",
    title: "Dropdown",
    slug: "input-group",
    variant: "dropdown",
    registryDependencies: ["input-group", "dropdown-menu"],
    files: [
      {
        path: "components/examples/input-group-dropdown.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-spinner",
    type: "registry:example",
    title: "Spinner",
    slug: "input-group",
    variant: "spinner",
    registryDependencies: ["input-group", "spinner"],
    files: [
      {
        path: "components/examples/input-group-spinner.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-textarea",
    type: "registry:example",
    title: "Textarea",
    slug: "input-group",
    variant: "textarea",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "components/examples/input-group-textarea.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-custom-input",
    type: "registry:example",
    title: "Custom Input",
    slug: "input-group",
    variant: "custom-input",
    registryDependencies: ["input-group"],
    files: [
      {
        path: "components/examples/input-group-custom-input.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-credit-card",
    type: "registry:example",
    title: "Credit card",
    slug: "input-group",
    variant: "credit-card",
    isFlagged: true,
    registryDependencies: ["input-group"],
    files: [
      {
        path: "components/examples/input-group-credit-card.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-group-locked-password",
    type: "registry:example",
    title: "Locked password (show toggle)",
    slug: "input-group",
    variant: "locked-password",
    isFlagged: true,
    registryDependencies: ["input-group", "field"],
    files: [
      {
        path: "components/examples/input-group-locked-password.tsx",
        type: "registry:example",
      },
    ],
  },

  // input-otp
  {
    name: "input-otp-default",
    type: "registry:example",
    title: "Default",
    slug: "input-otp",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-default.tsx",
        type: "registry:example",
      },
    ],
    deviations: [
      "Controlled wrapper required — defaultValue triggers React 'controlled or uncontrolled' error inside the input-otp library.",
    ],
  },
  {
    name: "input-otp-separator",
    type: "registry:example",
    title: "Separator",
    slug: "input-otp",
    variant: "separator",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-separator.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-disabled",
    type: "registry:example",
    title: "Disabled",
    slug: "input-otp",
    variant: "disabled",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-controlled",
    type: "registry:example",
    title: "Controlled",
    slug: "input-otp",
    variant: "controlled",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-invalid",
    type: "registry:example",
    title: "Invalid",
    slug: "input-otp",
    variant: "invalid",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-four-digits",
    type: "registry:example",
    title: "Four Digits",
    slug: "input-otp",
    variant: "four-digits",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-four-digits.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-alphanumeric",
    type: "registry:example",
    title: "Alphanumeric",
    slug: "input-otp",
    variant: "alphanumeric",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "components/examples/input-otp-alphanumeric.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "input-otp-form",
    type: "registry:example",
    title: "Form",
    slug: "input-otp",
    variant: "form",
    registryDependencies: ["input-otp", "card", "field", "button"],
    files: [
      {
        path: "components/examples/input-otp-form.tsx",
        type: "registry:example",
      },
    ],
  },

  // label
  {
    name: "label-label-in-field",
    type: "registry:example",
    title: "Label in Field",
    slug: "label",
    variant: "label-in-field",
    registryDependencies: ["label", "field", "input"],
    files: [
      {
        path: "components/examples/label-label-in-field.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "label-default",
    type: "registry:example",
    title: "Default",
    slug: "label",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    registryDependencies: ["label", "checkbox"],
    files: [
      {
        path: "components/examples/label-default.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "label-in-field-component",
    type: "registry:example",
    title: "In Field component",
    slug: "label",
    variant: "in-field-component",
    isFlagged: true,
    registryDependencies: ["label", "input"],
    files: [
      {
        path: "components/examples/label-in-field-component.tsx",
        type: "registry:example",
      },
    ],
  },

  // native-select
  {
    name: "native-select-groups",
    type: "registry:example",
    title: "Groups",
    slug: "native-select",
    variant: "groups",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "components/examples/native-select-groups.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "native-select-disabled",
    type: "registry:example",
    title: "Disabled",
    slug: "native-select",
    variant: "disabled",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "components/examples/native-select-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "native-select-invalid",
    type: "registry:example",
    title: "Invalid",
    slug: "native-select",
    variant: "invalid",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "components/examples/native-select-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "native-select-default",
    type: "registry:example",
    title: "Default",
    slug: "native-select",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    registryDependencies: ["native-select"],
    files: [
      {
        path: "components/examples/native-select-default.tsx",
        type: "registry:example",
      },
    ],
  },

  // radio-group
  {
    name: "radio-group-description",
    type: "registry:example",
    title: "Description",
    slug: "radio-group",
    variant: "description",
    registryDependencies: ["radio-group", "field"],
    files: [
      {
        path: "components/examples/radio-group-description.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-choice-card",
    type: "registry:example",
    title: "Choice Card",
    slug: "radio-group",
    variant: "choice-card",
    registryDependencies: ["radio-group", "field"],
    files: [
      {
        path: "components/examples/radio-group-choice-card.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-fieldset",
    type: "registry:example",
    title: "Fieldset",
    slug: "radio-group",
    variant: "fieldset",
    registryDependencies: ["radio-group", "field"],
    files: [
      {
        path: "components/examples/radio-group-fieldset.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-disabled",
    type: "registry:example",
    title: "Disabled",
    slug: "radio-group",
    variant: "disabled",
    registryDependencies: ["radio-group", "field"],
    files: [
      {
        path: "components/examples/radio-group-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-invalid",
    type: "registry:example",
    title: "Invalid",
    slug: "radio-group",
    variant: "invalid",
    registryDependencies: ["radio-group", "field"],
    files: [
      {
        path: "components/examples/radio-group-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "radio-group-default",
    type: "registry:example",
    title: "Default",
    slug: "radio-group",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    registryDependencies: ["radio-group", "label"],
    files: [
      {
        path: "components/examples/radio-group-default.tsx",
        type: "registry:example",
      },
    ],
  },

  // select
  {
    name: "select-default",
    type: "registry:example",
    title: "Default",
    description:
      "Basic Select dropdown showing a list of fruits, demonstrating the default trigger and popover content layout. Use as the canonical starting point when adding a single-choice dropdown to a form.",
    slug: "select",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/select",
    registryDependencies: ["select"],
    categories: ["forms", "input"],
    related: ["select-groups", "select-scrollable", "native-select-default"],
    files: [
      {
        path: "components/examples/select-default.tsx",
        type: "registry:example",
      },
    ],
    deviations: ["isFlagged: not present in upstream Examples block — project-local default demo."],
  },
  {
    name: "select-align-item-with-trigger",
    type: "registry:example",
    title: "Align Item With Trigger",
    description:
      "Interactive demo toggling SelectContent position between item-aligned and popper modes via a Switch. Use when you need to compare placement strategies or expose alignment as a user preference. Composes Select + Switch + Field.",
    slug: "select",
    variant: "align-item-with-trigger",
    upstreamUrl: "https://ui.shadcn.com/docs/components/select",
    registryDependencies: ["select", "switch", "field"],
    categories: ["forms", "input"],
    related: ["select-default", "select-scrollable"],
    files: [
      {
        path: "components/examples/select-align-item-with-trigger.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "select-groups",
    type: "registry:example",
    title: "Groups",
    description:
      "Select with two labeled option groups separated by a divider, showing fruits and vegetables. Use when options belong to distinct categories that benefit from visual separation and group labels.",
    slug: "select",
    variant: "groups",
    upstreamUrl: "https://ui.shadcn.com/docs/components/select",
    registryDependencies: ["select"],
    categories: ["forms", "input"],
    related: ["select-default", "select-scrollable"],
    files: [
      {
        path: "components/examples/select-groups.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "select-scrollable",
    type: "registry:example",
    title: "Scrollable",
    description:
      "Select populated with a large timezone list across five regional groups, triggering the built-in scroll area. Use when the option count exceeds the visible viewport and keyboard navigation plus scrolling must both work correctly.",
    slug: "select",
    variant: "scrollable",
    upstreamUrl: "https://ui.shadcn.com/docs/components/select",
    registryDependencies: ["select"],
    categories: ["forms", "input"],
    related: ["select-groups", "select-default"],
    files: [
      {
        path: "components/examples/select-scrollable.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "select-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Select rendered in a fully disabled state with one additional item-level disabled option inside. Use to demonstrate read-only form state or unavailable field conditions.",
    slug: "select",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/select",
    registryDependencies: ["select"],
    categories: ["forms", "input"],
    related: ["select-invalid", "select-default"],
    files: [
      {
        path: "components/examples/select-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "select-invalid",
    type: "registry:example",
    title: "Invalid",
    description:
      "Select inside a Field marked data-invalid with aria-invalid on the trigger and a FieldError message below. Use to show validation failure state with accessible error messaging. Composes Select + Field.",
    slug: "select",
    variant: "invalid",
    upstreamUrl: "https://ui.shadcn.com/docs/components/select",
    registryDependencies: ["select", "field"],
    categories: ["forms", "input", "validation"],
    related: ["select-disabled", "select-default"],
    files: [
      {
        path: "components/examples/select-invalid.tsx",
        type: "registry:example",
      },
    ],
  },

  // slider
  {
    name: "slider-default",
    type: "registry:example",
    title: "Default",
    description:
      "Single-thumb Slider set to 75 out of 100, illustrating the default horizontal track and filled range. Use as the baseline reference when adding a simple numeric input to a settings or filter form.",
    slug: "slider",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/slider",
    registryDependencies: ["slider"],
    categories: ["forms", "input"],
    related: ["slider-range", "slider-controlled", "slider-disabled"],
    files: [
      {
        path: "components/examples/slider-default.tsx",
        type: "registry:example",
      },
    ],
    deviations: ["isFlagged: not present in upstream Examples block — project-local default demo."],
  },
  {
    name: "slider-range",
    type: "registry:example",
    title: "Range",
    description:
      "Two-thumb Slider with defaultValue [25, 50] defining a selected range along the track. Use when users must pick a min/max interval, such as price filters or date span selectors.",
    slug: "slider",
    variant: "range",
    upstreamUrl: "https://ui.shadcn.com/docs/components/slider",
    registryDependencies: ["slider"],
    categories: ["forms", "input"],
    related: ["slider-default", "slider-multiple-thumbs"],
    files: [
      {
        path: "components/examples/slider-range.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "slider-multiple-thumbs",
    type: "registry:example",
    title: "Multiple Thumbs",
    description:
      "Three-thumb Slider with values [10, 20, 70] demonstrating independent thumb control across a single track. Use when the UI requires more than two breakpoints, such as a multi-band equalizer or tiered pricing boundary.",
    slug: "slider",
    variant: "multiple-thumbs",
    upstreamUrl: "https://ui.shadcn.com/docs/components/slider",
    registryDependencies: ["slider"],
    categories: ["forms", "input"],
    related: ["slider-range", "slider-default"],
    files: [
      {
        path: "components/examples/slider-multiple-thumbs.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "slider-vertical",
    type: "registry:example",
    title: "Vertical",
    description:
      "Two vertical Sliders side by side using orientation='vertical' and an explicit height, showing how the component reflows for column-based layouts. Use in audio mixers, chart annotation tools, or any design where a vertical axis is more intuitive.",
    slug: "slider",
    variant: "vertical",
    upstreamUrl: "https://ui.shadcn.com/docs/components/slider",
    registryDependencies: ["slider"],
    categories: ["forms", "input"],
    related: ["slider-default", "slider-range"],
    files: [
      {
        path: "components/examples/slider-vertical.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "slider-controlled",
    type: "registry:example",
    title: "Controlled",
    description:
      "Controlled two-thumb Slider wired to React state via onValueChange, displaying live numeric output next to the label. Use when parent state must read or reset the slider value, such as in a settings panel with a reset button. Composes Slider + Label.",
    slug: "slider",
    variant: "controlled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/slider",
    registryDependencies: ["slider", "label"],
    categories: ["forms", "input"],
    related: ["slider-default", "slider-range"],
    files: [
      {
        path: "components/examples/slider-controlled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "slider-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Slider rendered in a disabled state, blocking pointer and keyboard interaction while preserving the visual track. Use to indicate that the value is locked by a higher-level condition in the form.",
    slug: "slider",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/slider",
    registryDependencies: ["slider"],
    categories: ["forms", "input"],
    related: ["slider-default", "slider-controlled"],
    files: [
      {
        path: "components/examples/slider-disabled.tsx",
        type: "registry:example",
      },
    ],
  },

  // switch
  {
    name: "switch-default",
    type: "registry:example",
    title: "Default",
    description:
      "Minimal Switch paired with a Label for airplane mode, demonstrating the base on/off toggle layout. Use as the simplest reference when adding a boolean preference toggle that needs no extra description. Composes Switch + Label.",
    slug: "switch",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/switch",
    registryDependencies: ["switch", "label"],
    categories: ["forms", "input"],
    related: ["switch-description", "switch-choice-card", "switch-disabled"],
    files: [
      {
        path: "components/examples/switch-default.tsx",
        type: "registry:example",
      },
    ],
    deviations: ["isFlagged: not present in upstream Examples block — project-local default demo."],
  },
  {
    name: "switch-description",
    type: "registry:example",
    title: "Description",
    description:
      "Horizontal Field layout with a Switch aligned to the right of a label and supporting description text. Use for settings rows where users need context before toggling, such as focus-sharing or notification preferences. Composes Switch + Field.",
    slug: "switch",
    variant: "description",
    upstreamUrl: "https://ui.shadcn.com/docs/components/switch",
    registryDependencies: ["switch", "field"],
    categories: ["forms", "input"],
    related: ["switch-default", "switch-choice-card"],
    files: [
      {
        path: "components/examples/switch-description.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "switch-choice-card",
    type: "registry:example",
    title: "Choice Card",
    description:
      "FieldGroup of two clickable card rows, each wrapping a FieldLabel around a horizontal Field with title, description, and a Switch. Use for settings panels where each option has a name plus an explanatory sentence and both the label and card area must be click targets. Composes Switch + Field.",
    slug: "switch",
    variant: "choice-card",
    upstreamUrl: "https://ui.shadcn.com/docs/components/switch",
    registryDependencies: ["switch", "field"],
    categories: ["forms", "input"],
    related: ["switch-description", "switch-default"],
    files: [
      {
        path: "components/examples/switch-choice-card.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "switch-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Switch rendered disabled inside a data-disabled Field, graying out both the toggle and its label. Use to show a locked boolean preference when its value is determined by another condition in the form. Composes Switch + Field.",
    slug: "switch",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/switch",
    registryDependencies: ["switch", "field"],
    categories: ["forms", "input"],
    related: ["switch-invalid", "switch-default"],
    files: [
      {
        path: "components/examples/switch-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "switch-invalid",
    type: "registry:example",
    title: "Invalid",
    description:
      "Switch inside a data-invalid Field with aria-invalid set, showing the error ring and accessible invalid state. Use when a required boolean (e.g. terms acceptance) has not been toggled on before form submission. Composes Switch + Field.",
    slug: "switch",
    variant: "invalid",
    upstreamUrl: "https://ui.shadcn.com/docs/components/switch",
    registryDependencies: ["switch", "field"],
    categories: ["forms", "input", "validation"],
    related: ["switch-disabled", "switch-default"],
    files: [
      {
        path: "components/examples/switch-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "switch-size",
    type: "registry:example",
    title: "Size",
    description:
      "Side-by-side comparison of Switch size tokens — sm and default — each paired with a FieldLabel. Use when choosing the correct toggle size for dense toolbars versus standard form rows. Composes Switch + Field.",
    slug: "switch",
    variant: "size",
    upstreamUrl: "https://ui.shadcn.com/docs/components/switch",
    registryDependencies: ["switch", "field"],
    categories: ["forms", "input"],
    related: ["switch-default", "switch-description"],
    files: [{ path: "components/examples/switch-size.tsx", type: "registry:example" }],
  },

  // textarea
  {
    name: "textarea-default",
    type: "registry:example",
    title: "Default",
    description:
      "Bare Textarea with a placeholder, showing the default resizable multi-line text input without any surrounding field chrome. Use as the minimal reference before wrapping with Field or pairing with a submit button.",
    slug: "textarea",
    variant: "default",
    isDefault: true,
    isFlagged: true,
    upstreamUrl: "https://ui.shadcn.com/docs/components/textarea",
    registryDependencies: ["textarea"],
    categories: ["forms", "input"],
    related: ["textarea-field", "textarea-button", "textarea-disabled"],
    files: [
      {
        path: "components/examples/textarea-default.tsx",
        type: "registry:example",
      },
    ],
    deviations: ["isFlagged: not present in upstream Examples block — project-local default demo."],
  },
  {
    name: "textarea-field",
    type: "registry:example",
    title: "Field",
    description:
      "Textarea inside a Field with a FieldLabel and FieldDescription, demonstrating the standard accessible layout for multi-line text. Use when the textarea needs a visible label and supporting hint text below it. Composes Textarea + Field.",
    slug: "textarea",
    variant: "field",
    upstreamUrl: "https://ui.shadcn.com/docs/components/textarea",
    registryDependencies: ["textarea", "field"],
    categories: ["forms", "input"],
    related: ["textarea-default", "textarea-invalid", "textarea-disabled"],
    files: [
      {
        path: "components/examples/textarea-field.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-disabled",
    type: "registry:example",
    title: "Disabled",
    description:
      "Textarea inside a data-disabled Field, rendering the input and its label in a muted, non-interactive state. Use to show that a long-text field is locked until a prerequisite condition is met. Composes Textarea + Field.",
    slug: "textarea",
    variant: "disabled",
    upstreamUrl: "https://ui.shadcn.com/docs/components/textarea",
    registryDependencies: ["textarea", "field"],
    categories: ["forms", "input"],
    related: ["textarea-invalid", "textarea-default"],
    files: [
      {
        path: "components/examples/textarea-disabled.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-invalid",
    type: "registry:example",
    title: "Invalid",
    description:
      "Textarea inside a data-invalid Field with aria-invalid on the input and a FieldDescription acting as the error message. Use to surface validation errors on multi-line text fields in a form submission flow. Composes Textarea + Field.",
    slug: "textarea",
    variant: "invalid",
    upstreamUrl: "https://ui.shadcn.com/docs/components/textarea",
    registryDependencies: ["textarea", "field"],
    categories: ["forms", "input", "validation"],
    related: ["textarea-disabled", "textarea-field"],
    files: [
      {
        path: "components/examples/textarea-invalid.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "textarea-button",
    type: "registry:example",
    title: "Button",
    description:
      "Textarea stacked above a full-width Button in a grid gap layout, forming a minimal message composer. Use when the primary action following text entry is a single submit — such as a comment box or support request form. Composes Textarea + Button.",
    slug: "textarea",
    variant: "button",
    upstreamUrl: "https://ui.shadcn.com/docs/components/textarea",
    registryDependencies: ["textarea", "button"],
    categories: ["forms", "input"],
    related: ["textarea-default", "textarea-field"],
    files: [
      {
        path: "components/examples/textarea-button.tsx",
        type: "registry:example",
      },
    ],
  },
]);
