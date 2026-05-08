/**
 * @slug sidebar
 * @variant offcanvas
 * @upstream https://ui.shadcn.com/docs/components/sidebar
 * @deviations ["Sidebar has no upstream ## Examples block; this demo is a project-authored SidebarShowcase fixture illustrating collapsible=offcanvas slide-off behavior."]
 */
import { SidebarShowcase } from "./_fixtures/sidebar";

export default function SidebarOffcanvas() {
  return <SidebarShowcase variant="sidebar" side="left" collapsible="offcanvas" />;
}
