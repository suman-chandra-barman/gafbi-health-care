/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const careBoxFeatures = [
  {
    icon: "/icons/1.svg",
    title: "Customize your Care Box",
    description: "You can customize your care box to suit your needs.",
  },
  {
    icon: "/icons/2.svg",
    title: "Immediate Dispatch",
    description: "Your order will be dispatched immediately upon receipt.",
  },
  {
    icon: "/icons/3.svg",
    title: "Completely Uncomplicated",
    description:
      "The processing with the long-term care insurance fund is handled.",
  },
  {
    icon: "/icons/4.svg",
    title: "Flexible with a Customer Account",
    description:
      "You can customize your box, change delivery details, or pause at any time",
  },
  {
    icon: "/icons/5.svg",
    title: "Free of Charge",
    description:
      "Your long-term care insurance covers the cost, so the care box is free for you.",
  },
  {
    icon: "/icons/6.svg",
    title: "Quality Assurance",
    description:
      "Quality products such as disinfectant from Schulke are available.",
  },
];

export default function CareBoxSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full  py-10">
      <div className="mx-auto w-full max-w-625 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-210 text-center pb-8 md:pb-20">
          <h2 className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-xl font-extrabold leading-tight text-primary sm:text-2xl md:text-3xl lg:text-5xl">
            {t("landing.careTitle")}
          </h2>
          <p className="animate-in fade-in slide-in-from-bottom-1 delay-100 duration-500 mx-auto mt-4 max-w-150 text-base leading-[1.7] text-secondary sm:text-lg md:text-xl">
            {t("landing.careDescription")}
          </p>
          <Link href="/apply-box">
            <button
              type="button"
              className="mt-7 cursor-pointer rounded-md bg-button-bg px-6 py-2 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md active:translate-y-0"
            >
              {t("landing.careApply")}
            </button>
          </Link>
        </div>

        <div className="my-8 md:my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-300 mx-auto hover:cursor-pointer">
          {careBoxFeatures.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-xl bg-[#dfe4e8] p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f4f4] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={feature.icon}
                  alt={`${feature.title} icon`}
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-[#1f5f8f]">
                {feature.title}
              </h3>
              <p className="mt-3 text-xs sm:text-sm md:text-base leading-[1.65] text-secondary">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
