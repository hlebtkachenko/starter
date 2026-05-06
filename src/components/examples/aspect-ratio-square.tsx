/**
 * @slug aspect-ratio
 * @variant square
 * @upstream https://ui.shadcn.com/docs/components/aspect-ratio
 * @deviations ["next/image replaced with <img> + eslint-disable per project rule.", "rounded-lg used instead of upstream rounded-lg (same)."]
 */
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioSquare() {
  return (
    <div className="w-full max-w-[12rem]">
      <AspectRatio ratio={1 / 1} className="rounded-lg bg-muted">
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
