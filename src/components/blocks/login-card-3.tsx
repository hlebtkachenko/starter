/**
 * @purpose Full-page i18n login layout with maintenance banner, stats cards, and AI feature card on right panel.
 * @composes [card, input, button, label, field, alert, badge, dialog]
 *
 * Extracted from src/app/login-3/page.tsx.
 * Wraps the I18nProvider so the page only needs to render <LoginCard3 />.
 * All labels are driven by the internal i18n dictionary (en/cs auto-detected).
 * The maintenance dialog opens on first render; users can re-open it via the form.
 */
"use client";

import { SparklesIcon } from "lucide-react";
import { useState } from "react";

import { GridBg } from "@/components/login-3/grid-bg";
import { I18nProvider, useI18n } from "@/components/login-3/i18n";
import { LocaleToggle } from "@/components/login-3/locale-toggle";
import { LoginFormMaintenance } from "@/components/login-form-maintenance";
import { MaintenanceDialog } from "@/components/maintenance-acknowledge";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type LoginCard3Props = Record<string, never>;

export default function LoginCard3(_props: LoginCard3Props) {
  return (
    <I18nProvider>
      <LoginCard3Inner />
    </I18nProvider>
  );
}

function LoginCard3Inner() {
  const { t } = useI18n();
  const [open, setOpen] = useState(true);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <MaintenanceDialog open={open} onOpenChange={setOpen} />

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between gap-3">
          <a href="#" className="text-sm font-medium">
            LAC <span className="text-muted-foreground">by afframe.com</span>
          </a>
          <LocaleToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginFormMaintenance onShowDetails={() => setOpen(true)} />
          </div>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs text-muted-foreground">
          <span>{t("footer_copyright")}</span>
          <span>{t("footer_compliance")}</span>
        </footer>
      </div>

      <div
        className="relative hidden overflow-hidden lg:block"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, #dbeafe, transparent 55%), radial-gradient(circle at 85% 80%, #fde68a, transparent 55%), linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)",
        }}
      >
        <GridBg />

        <div className="relative flex h-full flex-col justify-center gap-10 p-10">
          <div className="space-y-4">
            <h2 className="max-w-md font-heading text-4xl font-bold tracking-tight">
              {t("right_headline")}
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">{t("right_desc")}</p>
          </div>

          <div className="grid w-full max-w-md gap-3">
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardHeader>
                  <CardDescription>{t("card_compute")}</CardDescription>
                  <CardTitle className="text-2xl font-semibold">3.4x</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>{t("card_storage")}</CardDescription>
                  <CardTitle className="text-2xl font-semibold">5x</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardDescription>{t("card_speed")}</CardDescription>
                  <CardTitle className="text-2xl font-semibold">{t("card_speed_value")}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="login3-ai-border rounded-[var(--radius)] p-px">
              <Card className="rounded-[calc(var(--radius)-1px)]">
                <CardHeader>
                  <CardDescription className="flex items-center gap-2">
                    <Badge variant="secondary">
                      <SparklesIcon /> {t("ai_kicker")}
                    </Badge>
                  </CardDescription>
                  <CardTitle className="text-base font-semibold">{t("ai_title")}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t("ai_desc")}</p>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
