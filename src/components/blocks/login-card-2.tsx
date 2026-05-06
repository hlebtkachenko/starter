/**
 * @purpose Full-page login layout with OAuth providers, passkey, MFA, and decorative gradient right panel.
 * @composes [card, input, button, label, field, alert, checkbox, input-otp]
 *
 * Extracted from src/app/login-2/page.tsx.
 * Two-column grid: left has brand + multi-stage form (credentials then OTP);
 * right shows a subtle radial-gradient decorative panel.
 */
import { GalleryVerticalEndIcon } from "lucide-react";

import { LoginFormV2 } from "@/components/login-form-v2";

export type LoginCard2Props = {
  logoHref?: string;
  brandName?: string;
};

export default function LoginCard2({ logoHref = "#", brandName = "Acme Inc." }: LoginCard2Props) {
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
          <div className="w-full max-w-sm">
            <LoginFormV2 />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* Decorative gradient — runtime computed, inline style is intentional. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, #e5e5e5, transparent 60%), radial-gradient(circle at 70% 80%, #d4d4d4, transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
