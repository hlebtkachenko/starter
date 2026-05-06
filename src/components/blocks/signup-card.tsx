/**
 * @purpose Full-page signup layout: centered card with name, email, password fields and terms notice.
 * @composes [card, input, button, label, field]
 *
 * Scaffold — no source page yet. Follows the login-card pattern.
 * Replace the form internals when wiring to Better Auth sign-up.
 */
import { GalleryVerticalEndIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type SignupCardProps = {
  logoHref?: string;
  brandName?: string;
  loginHref?: string;
};

export default function SignupCard({
  logoHref = "#",
  brandName = "Acme Inc.",
  loginHref = "#",
}: SignupCardProps) {
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
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Enter your details below to get started
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" type="text" placeholder="Jane Smith" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit">Create account</Button>
            </Field>
            <FieldDescription className="text-center">
              Already have an account?{" "}
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
