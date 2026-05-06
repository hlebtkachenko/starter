/**
 * @purpose Full-page login layout: split with form left, decorative image right.
 * @composes [card, input, button, label, field]
 *
 * Extracted from src/app/login/page.tsx.
 * Renders a two-column grid (stacked on mobile). Left panel contains the
 * brand logo, login form, and sign-up link. Right panel is a decorative image.
 */
"use client";

import { GalleryVerticalEndIcon } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export type LoginCardProps = {
  logoHref?: string;
  brandName?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function LoginCard({
  logoHref = "#",
  brandName = "Acme Inc.",
  imageSrc = "/placeholder.svg",
  imageAlt = "Image",
}: LoginCardProps) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href={logoHref} className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            {brandName}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
