/** @format */

"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

const services = [
  { title: "Care Application", icon: "/icons/s1.svg" },
  { title: "Upgrading", icon: "/icons/s2.svg" },
  { title: "Care Aids", icon: "/icons/s3.svg" },
  { title: "Care Application", icon: "/icons/s4.svg" },
  { title: "Product Overview", icon: "/icons/s5.svg" },
];

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:pb-20">
      <div className="relative mx-auto w-full max-w-625 overflow-hidden rounded-[14px] bg-card-bg p-6 sm:p-8 lg:p-16">
        <div className="pointer-events-none absolute right-40 bottom-10 rounded-full opacity-60">
          <Image
            src="/icons/s_right_bg.svg"
            alt=""
            width={325}
            height={325}
            sizes="(min-width: 768px) 48vw, 100vw"
            className="object-cover rounded-full"
          />
        </div>

        <h2 className="relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-6 md:mb-12">
          {t("landing.servicesTitle")}
        </h2>

        <div className="relative z-10 mx-auto mt-8 grid max-w-300 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service, index) => {
            return (
              <article
                key={`${service.title}-${index}`}
                className={`group rounded-xl bg-background p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md lg:col-span-2 ${
                  index === 3
                    ? "lg:col-start-2"
                    : index === 4
                      ? "lg:col-start-4"
                      : ""
                }`}
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-[#9ad2d3] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={service.icon}
                    alt={`${service.title} icon`}
                    width={30}
                    height={30}
                    className="h-7.5 w-7.5"
                  />
                </div>
                <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-[#1f5f8f] transition-colors duration-300 group-hover:text-[#174c73]">
                  {service.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
