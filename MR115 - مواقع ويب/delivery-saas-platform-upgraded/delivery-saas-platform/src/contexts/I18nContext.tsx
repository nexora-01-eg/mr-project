import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AppLang = "ar" | "en";

type Dictionary = Record<string, { ar: string; en: string }>;

const dict: Dictionary = {
  appName: { ar: "منصة إدارة التوصيل", en: "Delivery Ops" },
  language: { ar: "اللغة", en: "Language" },
  arabic: { ar: "العربية", en: "Arabic" },
  english: { ar: "English", en: "English" },
  dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
  orders: { ar: "الطلبات", en: "Orders" },
  drivers: { ar: "السائقون", en: "Drivers" },
  calls: { ar: "المكالمات", en: "Calls" },
  analytics: { ar: "التحليلات", en: "Analytics" },
  settings: { ar: "الإعدادات", en: "Settings" },
};

type I18nContextValue = {
  lang: AppLang;
  dir: "rtl" | "ltr";
  setLang: (lang: AppLang) => void;
  toggleLang: () => void;
  t: (key: keyof typeof dict) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function applyHtml(lang: AppLang) {
  const html = document.documentElement;
  const dir = lang === "ar" ? "rtl" : "ltr";
  html.setAttribute("lang", lang);
  html.setAttribute("dir", dir);
  html.dataset.lang = lang;
  html.classList.toggle("rtl", dir === "rtl");
  html.classList.toggle("ltr", dir === "ltr");
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<AppLang>(() => {
    const saved = localStorage.getItem("app:lang") as AppLang | null;
    return saved === "en" || saved === "ar" ? saved : "ar";
  });

  useEffect(() => {
    localStorage.setItem("app:lang", lang);
    applyHtml(lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    return {
      lang,
      dir,
      setLang,
      toggleLang: () => setLang((l) => (l === "ar" ? "en" : "ar")),
      t: (key) => dict[key][lang],
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
