import { DataGroup } from "@/components/showcase/data-group";
import { DisplayGroup } from "@/components/showcase/display-group";
import { FeedbackGroup } from "@/components/showcase/feedback-group";
import { InputsGroup } from "@/components/showcase/inputs-group";
import { LayoutGroup } from "@/components/showcase/layout-group";
import { Mounted } from "@/components/showcase/mounted";
import { NavigationGroup } from "@/components/showcase/navigation-group";
import { OverlaysGroup } from "@/components/showcase/overlays-group";
import { TokenControls } from "@/components/showcase/token-controls";

const TOC = [
  { id: "inputs", label: "Inputs" },
  { id: "display", label: "Display" },
  { id: "overlays", label: "Overlays" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
  { id: "layout", label: "Layout" },
  { id: "data", label: "Data" },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-svh bg-background">
      <TokenControls />
      <header className="mx-auto max-w-6xl px-6 pt-12">
        <h1 className="text-4xl font-bold tracking-tight">shadcn showcase</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every primitive on one page. Drag the radius slider above to see the effect roll through
          every component live. Toggle dark mode for theme coverage.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2 text-sm">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-[var(--radius)] border border-border bg-card px-3 py-1 hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <Mounted>
          <InputsGroup />
          <DisplayGroup />
          <OverlaysGroup />
          <NavigationGroup />
          <FeedbackGroup />
          <LayoutGroup />
          <DataGroup />
        </Mounted>
      </main>
    </div>
  );
}
