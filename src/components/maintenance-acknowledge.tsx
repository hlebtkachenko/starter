"use client";

import { CalendarClockIcon } from "lucide-react";

import { useI18n } from "@/components/login-3/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const MAINTENANCE = {
  windowLabel: "2026-05-04 · 10:00 → 2026-05-05 · 20:00",
  timezone: "Europe/Prague",
};

export function MaintenanceDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useI18n();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">{t("dialog_title")}</DialogTitle>
          <DialogDescription>{t("dialog_desc")}</DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <CalendarClockIcon className="size-4" /> {t("dialog_window")}
            </CardDescription>
            <CardTitle className="text-base font-semibold">{MAINTENANCE.windowLabel}</CardTitle>
            <p className="text-sm text-muted-foreground">{MAINTENANCE.timezone}</p>
          </CardHeader>
        </Card>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t("dialog_continue")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
