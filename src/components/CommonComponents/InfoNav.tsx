/** @format */

"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n, { AppLanguage, languageStorageKey } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const HIDDEN_ROUTES = ["/apply-box"];

export default function InfoNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [language, setLanguage] = useState<AppLanguage>(
    (i18n.language as AppLanguage) || "en",
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const displayName = user?.email_address?.split("@")[0] || "Profile";

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  const applyLanguage = (targetLanguage: AppLanguage) => {
    setLanguage(targetLanguage);
    i18n.changeLanguage(targetLanguage);
    window.localStorage.setItem(languageStorageKey, targetLanguage);
    document.documentElement.lang = targetLanguage;
  };

  return (
    <>
      <div className="w-full bg-[#8CCFD0] text-[#001a29]">
        <div className="mx-auto flex w-full max-w-625 flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.01em]">
            {t("infoNav.freeConsultation")}
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full rounded-xl cursor-pointer border border-[#1b4f75] px-4 py-2 text-sm font-semibold text-[#1b4f75] sm:w-auto"
                >
                  {t("infoNav.emergencySupport")}
                </button>
              </Link>
              <Link href="/apply-box" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full rounded-xl cursor-pointer bg-[#12456d] px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                >
                  {t("infoNav.applyBox")}
                </button>
              </Link>
            </div>

            {user ? (
              <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full rounded-xl cursor-pointer font-bold border border-[#1b3f63] bg-white hover:bg-white/80 px-3 py-2 text-sm text-[#1b3f63] sm:w-auto"
                  >
                    {displayName}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="w-56 rounded-xl border border-[#dbe7f1] bg-white p-2 text-sm text-[#123a5b] shadow-lg"
                >
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#6b88a1]">
                      {t("infoNav.account")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#1b3f63]">
                      {user?.email_address}
                    </p>
                  </div>
                  <div className="my-2 h-px bg-[#e6eef4]" />
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-[#123a5b] hover:bg-[#eef4f8] py-4 cursor-pointer"
                      onClick={() => {
                        setIsProfileOpen(false);
                        router.push("/dashboard/overview");
                      }}
                    >
                      {t("infoNav.dashboard")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-[#b42318] hover:bg-[#fdecec] py-4 cursor-pointer"
                      onClick={() => {
                        dispatch(logout());
                        setIsProfileOpen(false);
                        router.push("/signin");
                      }}
                    >
                      {t("infoNav.logout")}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                href="/signin"
                className="text-sm font-semibold text-[#1b3f63]"
              >
                {t("infoNav.signIn")}
              </Link>
            )}

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
