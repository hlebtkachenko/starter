/**
 * @slug slider
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/slider
 * @deviations ["isFlagged: not present in upstream Examples block — project-local default demo."]
 */
import { Slider } from "@/components/ui/slider";

export default function SliderDefault() {
  return <Slider defaultValue={[75]} max={100} step={1} className="mx-auto w-full max-w-xs" />;
}
