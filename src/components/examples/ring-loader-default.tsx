/**
 * @slug ring-loader
 * @variant default
 * @upstream https://loading-ui.com
 * @deviations ["Replaced inline <style> keyframe with Tailwind animate-spin.", "Renamed Ring to RingLoader to avoid shadcn ring token collision."]
 */
import { RingLoader } from "@/components/ui/ring-loader";

export default function RingLoaderDefault() {
  return (
    <div className="flex items-center gap-6">
      <RingLoader className="size-5" />
      <RingLoader className="size-8" />
      <RingLoader className="size-12 text-primary" />
    </div>
  );
}
