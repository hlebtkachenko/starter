/**
 * @slug kbd
 * @variant button
 * @upstream https://ui.shadcn.com/docs/components/kbd
 * @deviations []
 */
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" className="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  );
}
