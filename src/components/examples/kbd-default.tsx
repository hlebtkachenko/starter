/**
 * @slug kbd
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/kbd
 * @deviations []
 */
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdDefault() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  );
}
