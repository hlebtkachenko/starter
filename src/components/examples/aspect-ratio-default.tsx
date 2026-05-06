/**
 * @slug aspect-ratio
 * @variant default
 * @upstream https://ui.shadcn.com/docs/components/aspect-ratio
 * @deviations ["next/image replaced with <img> + eslint-disable per project rule (no remote patterns in next.config.ts)."]
 */
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioDefault() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          className="w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  );
}
