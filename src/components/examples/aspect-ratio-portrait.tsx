import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPortrait() {
  return (
    <div className="w-full max-w-[10rem]">
      <AspectRatio ratio={9 / 16} className="rounded-[var(--radius)] bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          className="h-full w-full rounded-[var(--radius)] object-cover grayscale dark:brightness-[0.2]"
        />
      </AspectRatio>
    </div>
  );
}
