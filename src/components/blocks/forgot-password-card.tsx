/**
 * @purpose Full-page forgot-password layout: centered card with email field and reset link action.
 * @composes [card, input, button, field]
 *
 * Scaffold — no source page yet. Follows the login-card pattern.
 * Replace the submit handler when wiring to Better Auth forgot-password flow.
 */
import { GalleryVerticalEndIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type ForgotPasswordCardProps = {
  logoHref?: string;
  brandName?: string;
  loginHref?: string;
};

export default function ForgotPasswordCard({
  logoHref = "#",
  brandName = "Acme Inc.",
  loginHref = "#",
}: ForgotPasswordCardProps) {
  return (
    <div className="grid min-h-svh place-items-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <a href={logoHref} className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            {brandName}
          </a>
        </div>
        <form className="flex flex-col gap-6">
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Reset your password</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Enter your email and we will send you a reset link
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </Field>
            <Field>
              <Button type="submit">Send reset link</Button>
            </Field>
            <FieldDescription className="text-center">
              Remembered your password?{" "}
              <a href={loginHref} className="underline underline-offset-4">
                Sign in
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
