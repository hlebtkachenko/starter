import { ButtonsGroup } from "@/components/showcase/buttons-group";
import { DisplayGroup } from "@/components/showcase/display-group";
import { FeedbackGroup } from "@/components/showcase/feedback-group";
import { FormsGroup } from "@/components/showcase/forms-group";
import { LayoutGroup } from "@/components/showcase/layout-group";
import { MenusGroup } from "@/components/showcase/menus-group";
import { Mounted } from "@/components/showcase/mounted";
import { NavigationGroup } from "@/components/showcase/navigation-group";
import { OverlaysGroup } from "@/components/showcase/overlays-group";
import { TokenControls } from "@/components/showcase/token-controls";
import { UtilityGroup } from "@/components/showcase/utility-group";

const TOC = [
  { id: "accordion", label: "Accordion" },
  { id: "alert", label: "Alert" },
  { id: "alert-dialog", label: "Alert Dialog" },
  { id: "aspect-ratio", label: "Aspect Ratio" },
  { id: "avatar", label: "Avatar" },
  { id: "badge", label: "Badge" },
  { id: "breadcrumb", label: "Breadcrumb" },
  { id: "button", label: "Button" },
  { id: "button-group", label: "Button Group" },
  { id: "calendar", label: "Calendar" },
  { id: "card", label: "Card" },
  { id: "carousel", label: "Carousel" },
  { id: "chart", label: "Chart" },
  { id: "checkbox", label: "Checkbox" },
  { id: "collapsible", label: "Collapsible" },
  { id: "combobox", label: "Combobox" },
  { id: "command", label: "Command" },
  { id: "context-menu", label: "Context Menu" },
  { id: "data-table", label: "Data Table" },
  { id: "date-picker", label: "Date Picker" },
  { id: "dialog", label: "Dialog" },
  { id: "drawer", label: "Drawer" },
  { id: "dropdown-menu", label: "Dropdown Menu" },
  { id: "empty", label: "Empty" },
  { id: "field", label: "Field" },
  { id: "hover-card", label: "Hover Card" },
  { id: "input", label: "Input" },
  { id: "input-group", label: "Input Group" },
  { id: "input-otp", label: "Input OTP" },
  { id: "item", label: "Item" },
  { id: "kbd", label: "Kbd" },
  { id: "label", label: "Label" },
  { id: "menubar", label: "Menubar" },
  { id: "native-select", label: "Native Select" },
  { id: "navigation-menu", label: "Navigation Menu" },
  { id: "pagination", label: "Pagination" },
  { id: "popover", label: "Popover" },
  { id: "progress", label: "Progress" },
  { id: "radio-group", label: "Radio Group" },
  { id: "resizable", label: "Resizable" },
  { id: "scroll-area", label: "Scroll Area" },
  { id: "select", label: "Select" },
  { id: "separator", label: "Separator" },
  { id: "sheet", label: "Sheet" },
  { id: "sidebar", label: "Sidebar" },
  { id: "skeleton", label: "Skeleton" },
  { id: "slider", label: "Slider" },
  { id: "sonner", label: "Sonner" },
  { id: "spinner", label: "Spinner" },
  { id: "switch", label: "Switch" },
  { id: "table", label: "Table" },
  { id: "tabs", label: "Tabs" },
  { id: "textarea", label: "Textarea" },
  { id: "toggle", label: "Toggle" },
  { id: "toggle-group", label: "Toggle Group" },
  { id: "tooltip", label: "Tooltip" },
  { id: "typography", label: "Typography" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-svh bg-background">
      <TokenControls />
      <header className="mx-auto max-w-6xl px-6 pt-12">
        <h1 className="text-4xl font-bold tracking-tight">shadcn showcase</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every shadcn component with all documented variants. Drag the radius slider to see effects
          roll through every component live.
        </p>
        <nav className="mt-6 flex flex-wrap gap-1.5 text-xs">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-[var(--radius)] border border-border bg-card px-2.5 py-1 hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <Mounted>
          <ButtonsGroup />
          <LayoutGroup />
          <DisplayGroup />
          <FormsGroup />
          <NavigationGroup />
          <OverlaysGroup />
          <FeedbackGroup />
          <MenusGroup />
          <UtilityGroup />
        </Mounted>
      </main>
    </div>
  );
}
