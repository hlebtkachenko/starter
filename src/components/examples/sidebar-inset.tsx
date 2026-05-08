/**
 * @slug sidebar
 * @variant inset
 * @upstream https://ui.shadcn.com/docs/components/sidebar
 * @deviations ["Sidebar has no upstream ## Examples block; this demo is a project-authored SidebarShowcase fixture illustrating variant=inset embedded surface."]
 */
import { SidebarShowcase } from "./_fixtures/sidebar";

export default function SidebarInset() {
  return <SidebarShowcase variant="inset" side="left" collapsible="icon" />;
}
