/** @format */

"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full  px-4 py-12 sm:px-6 lg:px-8 lg:py-16 ">
      <div className="mx-auto relative w-full max-w-625 overflow-hidden rounded-[18px] bg-[#628db4] py-8 sm:py-12 md:py-16">
        <div className="absolute right-0 top-0 h-70 w-full md:h-120 md:w-[48%]">
          <Image
            src="/about-banner.jpg"
            alt="Healthcare team"
            fill
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-4 h-44 w-44 md:h-52 md:w-52">
          <Image
            src="/icons/about_bg.svg"
            alt="Decorative background shape"
            fill
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-contain"
          />
        </div>

        <article className="relative z-10 m-5 max-w-220 rounded-lg bg-[#dfe4ea] p-6 text-[#31353b] sm:m-7 sm:p-8  lg:ml-6 xl:ml-[15%]  md:mt-12 md:p-10">
          <h2 className="text-xl font-extrabold leading-tight text-[#1f5f8f] md:text-2xl lg:text-3xl">
            {t("landing.aboutTitle")}
          </h2>

          <p className="mt-4 text-sm leading-[1.6] md:text-base lg:text-lg">
            {t("landing.aboutDescription")}
          </p>

          <p className="mt-5 text-sm leading-[1.6] md:text-base lg:text-lg text-secondary">
            We understand how important safety and trust are, especially in the
            care sector. That&apos;s why we provide personal support from the
            very beginning - whether it&apos;s with your first order or if you
            have any questions.
            <br />
            As part of the Schülke family, we guarantee the highest quality - so
            that you and your loved ones are completely well cared for. The TUV
            certificate with the rating &ldquo;Very Good&ldquo; confirms our
            high standards for safety and reliability.
            <br />
            With us, you are the focus - with a service you can always rely on.
          </p>

          <button
            type="button"
            className="mt-6 cursor-pointer rounded-md border border-[#1f5f8f] px-4 py-2 text-sm font-semibold text-[#1f5f8f] sm:text-lg"
          >
            {t("landing.aboutMore")}
          </button>
        </article>
      </div>
    </section>
  );
}
