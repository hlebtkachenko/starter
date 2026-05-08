"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SiApple, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { KeyRoundIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

const credentialsSchema = z.object({
  email: z.email({ message: "Enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  remember: z.boolean(),
});

type CredentialsValues = z.infer<typeof credentialsSchema>;

const otpSchema = z.object({
  code: z.string().length(6, { message: "Enter the 6-digit code from your authenticator." }),
});

type OtpValues = z.infer<typeof otpSchema>;

type Stage = "credentials" | "otp";

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0 0h11v11H0z" fill="#f25022" />
    <path d="M12 0h11v11H12z" fill="#7fba00" />
    <path d="M0 12h11v11H0z" fill="#00a4ef" />
    <path d="M12 12h11v11H12z" fill="#ffb900" />
  </svg>
);

export function LoginFormV2({ className, ...props }: React.ComponentProps<"div">) {
  const [stage, setStage] = useState<Stage>("credentials");
  const [authError, setAuthError] = useState<string | null>(null);

  const credentialsForm = useForm<CredentialsValues>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const otpForm = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  async function onCredentials(_values: CredentialsValues) {
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 600));
    setStage("otp");
  }

  async function onOtp(values: OtpValues) {
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 600));
    if (values.code !== "123456") {
      setAuthError("Invalid code. Try 123456 in this demo.");
      otpForm.reset({ code: "" });
      return;
    }
    setAuthError(null);
    alert("Signed in (demo).");
  }

  function onOAuth(provider: "google" | "github" | "apple" | "microsoft") {
    setAuthError(null);
    alert(`OAuth flow start: ${provider} (wire to Better Auth).`);
  }

  function onPasskey() {
    setAuthError(null);
    alert("Passkey ceremony start (wire to Better Auth passkey plugin).");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {authError && (
        <Alert variant="destructive">
          <AlertTitle>Sign-in failed</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      {stage === "credentials" && (
        <form onSubmit={credentialsForm.handleSubmit(onCredentials)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Continue with email + password, a passkey, or a social provider.
              </p>
            </div>

            <Field data-invalid={!!credentialsForm.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                className="bg-background"
                {...credentialsForm.register("email")}
              />
              {credentialsForm.formState.errors.email && (
                <FieldError>{credentialsForm.formState.errors.email.message}</FieldError>
              )}
            </Field>

            <Field data-invalid={!!credentialsForm.formState.errors.password}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="bg-background"
                {...credentialsForm.register("password")}
              />
              {credentialsForm.formState.errors.password && (
                <FieldError>{credentialsForm.formState.errors.password.message}</FieldError>
              )}
            </Field>

            <Field orientation="horizontal">
              <Controller
                control={credentialsForm.control}
                name="remember"
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={(v) => field.onChange(v === true)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                )}
              />
              <FieldLabel htmlFor="remember" className="font-normal">
                Remember me on this device
              </FieldLabel>
            </Field>

            <Field>
              <Button type="submit" disabled={credentialsForm.formState.isSubmitting}>
                {credentialsForm.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                Continue
              </Button>
            </Field>

            <Field>
              <Button variant="outline" type="button" onClick={onPasskey}>
                <KeyRoundIcon /> Sign in with a passkey
              </Button>
              <FieldDescription className="text-center">
                Uses your device biometrics or hardware key.
              </FieldDescription>
            </Field>

            <FieldSeparator>Or continue with</FieldSeparator>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" type="button" onClick={() => onOAuth("google")}>
                <SiGoogle /> Google
              </Button>
              <Button variant="outline" type="button" onClick={() => onOAuth("github")}>
                <SiGithub /> GitHub
              </Button>
              <Button variant="outline" type="button" onClick={() => onOAuth("apple")}>
                <SiApple /> Apple
              </Button>
              <Button variant="outline" type="button" onClick={() => onOAuth("microsoft")}>
                <MicrosoftIcon className="size-4" /> Microsoft
              </Button>
            </div>

            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      )}

      {stage === "otp" && (
        <form onSubmit={otpForm.handleSubmit(onOtp)}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Two-factor verification</h1>
              <p className="text-sm text-balance text-muted-foreground">
                Enter the 6-digit code from your authenticator app.
              </p>
            </div>

            <Field orientation="vertical" data-invalid={!!otpForm.formState.errors.code}>
              <FieldLabel htmlFor="code" className="sr-only">
                Authenticator code
              </FieldLabel>
              <div className="flex justify-center">
                <Controller
                  control={otpForm.control}
                  name="code"
                  render={({ field }) => (
                    <InputOTP
                      id="code"
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>
              {otpForm.formState.errors.code && (
                <FieldError className="text-center">
                  {otpForm.formState.errors.code.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <Button type="submit" disabled={otpForm.formState.isSubmitting}>
                {otpForm.formState.isSubmitting && <Loader2Icon className="animate-spin" />}
                Verify and sign in
              </Button>
            </Field>

            <Field>
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  otpForm.reset({ code: "" });
                  setStage("credentials");
                  setAuthError(null);
                }}
              >
                Back to sign in
              </Button>
            </Field>
          </FieldGroup>
        </form>
      )}
    </div>
  );
}
