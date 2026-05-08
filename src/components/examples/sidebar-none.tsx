/**
 * @slug sidebar
 * @variant none
 * @upstream https://ui.shadcn.com/docs/components/sidebar
 * @deviations ["Sidebar has no upstream ## Examples block; this demo is a project-authored SidebarShowcase fixture illustrating collapsible=none permanent fixed rail."]
 */
import { SidebarShowcase } from "./_fixtures/sidebar";

export default function SidebarNone() {
  return <SidebarShowcase variant="sidebar" side="left" collapsible="none" />;
}
