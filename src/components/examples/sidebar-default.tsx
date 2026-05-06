/**
 * @slug sidebar
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/sidebar
 * @deviations ["Sidebar has no upstream ## Examples block; this demo is a project-authored SidebarShowcase fixture illustrating the canonical icon-collapse left rail."]
 */
import { SidebarShowcase } from "./_fixtures/sidebar";

export default function SidebarDefault() {
  return <SidebarShowcase variant="sidebar" side="left" collapsible="icon" />;
}
