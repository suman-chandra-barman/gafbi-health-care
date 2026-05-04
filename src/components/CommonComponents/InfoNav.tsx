/** @format */

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n, { AppLanguage, languageStorageKey } from "@/lib/i18n";

const HIDDEN_ROUTES = [
  "/apply-box",
  "/signin",
  "/register",
  "/forgot-password",
  "/verify-otp",
];
// "/signin", "/register", "/terms", "/privacy"

export default function InfoNav() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<AppLanguage>(
    (i18n.language as AppLanguage) || "en",
  );
  const pathname = usePathname();

  const applyLanguage = (targetLanguage: AppLanguage) => {
    setLanguage(targetLanguage);
    i18n.changeLanguage(targetLanguage);
    window.localStorage.setItem(languageStorageKey, targetLanguage);
    document.documentElement.lang = targetLanguage;
  };

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <>
      <div className="w-full bg-[#8CCFD0] text-[#001a29]">
        <div className="mx-auto flex w-full max-w-625 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.01em]">
            {t("infoNav.freeConsultation")}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl cursor-pointer border border-[#1b4f75] px-4 py-2 text-sm font-semibold text-[#1b4f75]"
            >
              {t("infoNav.emergencySupport")}
            </button>
            <Link href="/apply-box">
              <button
                type="button"
                className="rounded-xl cursor-pointer bg-[#12456d] px-4 py-2 text-sm font-semibold text-white"
              >
                {t("infoNav.applyBox")}
              </button>
            </Link>

            <Link
              href="/signin"
              className="text-sm font-semibold text-[#1b3f63]"
            >
              {t("infoNav.signIn")}
            </Link>

            <div className="flex items-center rounded-xl bg-white p-1 text-sm font-medium text-[#123a5b]">
              <button
                type="button"
                onClick={() => applyLanguage("de")}
                className={`rounded-lg px-3 py-1 ${
                  language === "de" ? "bg-[#e8eef2]" : "bg-transparent"
                }`}
              >
                GER
              </button>
              <button
                type="button"
                onClick={() => applyLanguage("en")}
                className={`rounded-lg px-3 py-1 ${
                  language === "en" ? "bg-[#e8eef2]" : "bg-transparent"
                }`}
              >
                ENG
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
