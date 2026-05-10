"use client";

import { BuildingIcon, CircleAlertIcon, KeyRoundIcon, MailIcon } from "lucide-react";

import { useI18n } from "@/components/login-3/i18n";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginFormMaintenance({ onShowDetails }: { onShowDetails: () => void }) {
  const { t } = useI18n();

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <Alert>
        <CircleAlertIcon />
        <AlertTitle>{t("alert_title")}</AlertTitle>
        <AlertDescription>
          {t("alert_desc")}{" "}
          <Button
            variant="link"
            size="sm"
            type="button"
            className="h-auto p-0"
            onClick={onShowDetails}
          >
            {t("view_details")}
          </Button>
        </AlertDescription>
      </Alert>

      <fieldset disabled className="contents">
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-heading text-2xl font-bold">{t("form_title")}</h1>
            <p className="text-sm text-balance text-muted-foreground">{t("form_subtitle")}</p>
          </div>

          <Field>
            <FieldLabel htmlFor="email-m">{t("email_label")}</FieldLabel>
            <Input
              id="email-m"
              type="email"
              placeholder={t("email_placeholder")}
              autoComplete="email"
            />
          </Field>

          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password-m">{t("password_label")}</FieldLabel>
              <span className="ml-auto text-sm text-muted-foreground/60">
                {t("forgot_password")}
              </span>
            </div>
            <Input id="password-m" type="password" autoComplete="current-password" />
          </Field>

          <Field>
            <Button type="submit">{t("login")}</Button>
          </Field>

          <FieldSeparator>{t("or")}</FieldSeparator>

          <Field>
            <Button variant="outline" type="button">
              <MailIcon /> {t("login_magic_link")}
            </Button>
          </Field>

          <Field>
            <Button variant="outline" type="button">
              <KeyRoundIcon /> {t("sign_in_passkey")}
            </Button>
          </Field>

          <Field>
            <Button variant="outline" type="button">
              <BuildingIcon /> {t("sign_in_sso")}
            </Button>
          </Field>
        </FieldGroup>
      </fieldset>
    </form>
  );
}
