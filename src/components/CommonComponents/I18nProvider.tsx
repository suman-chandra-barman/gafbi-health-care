/** @format */

"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { AppLanguage, languageStorageKey } from "@/lib/i18n";

const isSupportedLanguage = (lang: string): lang is AppLanguage => {
  return lang === "en" || lang === "de";
};

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(languageStorageKey);

    if (savedLanguage && isSupportedLanguage(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
