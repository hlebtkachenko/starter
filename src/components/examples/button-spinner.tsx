/**
 * @slug button
 * @variant spinner
 * @upstream https://ui.shadcn.com/docs/components/button#spinner
 * @deviations ["Replaced React fragment root with upstream div.flex.gap-2 wrapper to match upstream layout."]
 */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonSpinner() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="secondary" disabled>
        Downloading
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  );
}
