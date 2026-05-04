/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full h-screen pb-16">
      <div className="relative mx-auto w-full max-w-625 overflow-hidden">
        <div className="relative h-[calc(100vh-100px)] w-full">
          <Image
            src="/hero-banner.jpg"
            alt="Healthcare professionals"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_45%,rgba(0,0,0,0.45)_100%)]" />

          <div className="absolute bottom-16 left-16 max-w-200 text-white">
            <h1 className="text-5xl font-bold leading-[1.08]">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-[20px] leading-[1.55] text-white/95">
              {t("hero.subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/apply-box">
                <button
                  type="button"
                  className="rounded-sm cursor-pointer bg-button-bg px-5 py-2.5 text-base font-semibold text-white"
                >
                  {t("hero.applyNow")}
                </button>
              </Link>
              <Link href="/contact">
                <button
                  type="button"
                  className="rounded-sm cursor-pointer bg-[#8d8d8d] px-5 py-2.5 text-base font-semibold text-white"
                >
                  {t("infoNav.emergencySupport")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
