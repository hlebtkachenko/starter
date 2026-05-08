"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { dict, type Locale } from "./dict";

const STORAGE_KEY = "login3-locale";

type I18nContext = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const Ctx = createContext<I18nContext | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "cs") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("cs") || nav.startsWith("sk")) return "cs";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- detect locale post-hydration
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "cs" ? "cs" : "en";
    document.title = dict[locale].meta_title ?? document.title;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const t = useCallback((key: string) => dict[locale][key] ?? key, [locale]);

  return <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
