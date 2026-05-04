/** @format */

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const findUsLinks = ["Facebook", "Instagram", "LinkedIn", "Youtube"];

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    t("infoNav.applyBox"),
    t("infoNav.emergencySupport"),
    t("apply.application"),
    t("apply.dataEntry"),
  ];

  const companyLinks = [
    t("common.faqs"),
    t("common.contact"),
    t("nav.aboutUs"),
  ];
  const pathname = usePathname();

  const HIDDEN_ROUTES = [
    "/apply-box",
    "/signin",
    "/register",
    "/forgot-password",
    "/verify-otp",
  ];
  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <footer className="w-full mx-auto bg-[#f3f3f3]">
      <div className="w-full mx-auto max-w-625">
        <div className="w-full mx-auto  max-w-625 items-center justify-between px-4 pb-4 pt-10 sm:px-6 md:mx-16 lg:px-28 xl:px-32">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-80">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-[#13161a]">
                {t("footer.newsletter")}
              </h2>
              <div className="mt-5 flex overflow-hidden rounded-md border border-[#d3d7dc] bg-white">
                <input
                  type="email"
                  placeholder={t("footer.subscribePlaceholder")}
                  className="w-full px-4 py-2 text-[18px] text-[#4e5760] outline-none"
                />
                <button
                  type="button"
                  aria-label="Submit email"
                  className="bg-[#1f5f8f] cursor-pointer px-4 text-white"
                >
                  <Image
                    src="/icons/news_letter.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <button
              type="button"
              aria-label="Back to top"
              className="mt-1 cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[#c8cdd3] text-[18px] text-[#4f5760]"
            >
              ↑
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#1b1f24]">
                {t("footer.quickLinks")}
              </h3>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-[#1f5f8f] underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#1b1f24]">
                {t("footer.company")}
              </h3>
              <ul className="mt-4 space-y-2">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-[#1f5f8f] underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-5 cursor-pointer rounded-md bg-[#c40019] px-4 py-2 text-[18px] font-semibold text-white"
              >
                Cancel Gafbi care box
              </button>
            </div>

            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#1b1f24]">
                {t("footer.findUs")}
              </h3>
              <ul className="mt-4 space-y-2">
                {findUsLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs md:text-sm text-[#1f5f8f] underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#d9dde1]">
        <div className="max-w-625 mx-auto ">
          <div className="mx-auto w-full flex justify-between max-w-625 px-4 py-4  sm:px-6 md:mx-16 lg:px-28 xl:px-32">
            <p className="text-xs md:text-sm">{t("footer.rights")}</p>
            <div className="flex flex-wrap items-center gap-5">
              <a href="#" className="text-[#4c6f91] text-xs md:text-sm">
                {t("footer.privacy")}
              </a>
              <a href="#" className="text-[#4c6f91] text-xs md:text-sm">
                {t("footer.terms")}
              </a>
              <a href="#" className="text-[#4c6f91] text-xs md:text-sm">
                {t("footer.imprint")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
