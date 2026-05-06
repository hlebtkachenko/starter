/**
 * @slug sidebar
 * @variant right
 * @upstream https://ui.shadcn.com/docs/components/sidebar
 * @deviations ["Sidebar has no upstream ## Examples block; this demo is a project-authored SidebarShowcase fixture illustrating side=right trailing rail."]
 */
import { SidebarShowcase } from "./_fixtures/sidebar";

export default function SidebarRight() {
  return <SidebarShowcase variant="sidebar" side="right" collapsible="icon" />;
}
