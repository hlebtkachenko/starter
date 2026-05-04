"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useI18n } from "./i18n";
import type { Locale } from "./dict";

export function LocaleToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <ToggleGroup
      type="single"
      value={locale}
      onValueChange={(v) => v && setLocale(v as Locale)}
      variant="outline"
      size="sm"
      aria-label="Language"
    >
      <ToggleGroupItem value="en" className="px-3 text-xs">
        EN
      </ToggleGroupItem>
      <ToggleGroupItem value="cs" className="px-3 text-xs">
        CS
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
