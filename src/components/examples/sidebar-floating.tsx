/**
 * @slug sidebar
 * @variant floating
 * @upstream https://ui.shadcn.com/docs/components/sidebar
 * @deviations ["Sidebar has no upstream ## Examples block; this demo is a project-authored SidebarShowcase fixture illustrating variant=floating chrome."]
 */
import { SidebarShowcase } from "./_fixtures/sidebar";

export default function SidebarFloating() {
  return <SidebarShowcase variant="floating" side="left" collapsible="icon" />;
}
