/**
 * @slug aspect-ratio
 * @variant portrait
 * @upstream https://ui.shadcn.com/docs/components/aspect-ratio
 * @deviations ["next/image replaced with <img> + eslint-disable per project rule."]
 */
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPortrait() {
  return (
    <div className="w-full max-w-[10rem]">
      <AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          className="rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </div>
  );
}
