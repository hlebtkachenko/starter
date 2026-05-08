/**
 * @slug separator-extended
 * @variant dashed
 * @upstream https://basecn.dev/docs/components/separator-extended
 * @deviations ["Renamed Separator to SeparatorExtended to avoid conflict with existing primitive."]
 */
import { SeparatorExtended } from "@/components/ui/separator-extended";

export default function SeparatorExtendedDashed() {
  return (
    <div className="flex w-full items-stretch gap-0">
      <div className="flex shrink-0 items-stretch py-4">
        <SeparatorExtended variant="dashed" orientation="vertical" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-4 px-6 py-4">
        <div className="h-16 w-full rounded-lg bg-muted" />
        <div className="flex w-full items-center gap-3">
          <SeparatorExtended variant="dashed" className="flex-1" />
          <span className="shrink-0 text-sm text-muted-foreground">OR</span>
          <SeparatorExtended variant="dashed" className="flex-1" />
        </div>
        <div className="flex w-full items-center gap-3">
          <span className="shrink-0 text-sm text-muted-foreground">OR</span>
          <div className="flex-1">
            <div className="h-16 w-full rounded-lg bg-muted" />
          </div>
          <span className="shrink-0 text-sm text-muted-foreground">OR</span>
        </div>
        <div className="flex w-full items-center gap-3">
          <SeparatorExtended variant="dashed" className="flex-1" />
          <span className="shrink-0 text-sm text-muted-foreground">OR</span>
          <SeparatorExtended variant="dashed" className="flex-1" />
        </div>
        <div className="h-16 w-full rounded-lg bg-muted" />
      </div>
      <div className="flex shrink-0 items-stretch py-4">
        <SeparatorExtended variant="dashed" orientation="vertical" />
      </div>
    </div>
  );
}
