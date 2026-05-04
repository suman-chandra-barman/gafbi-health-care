/** @format */

"use client";

import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[var(--color-card-bg)] px-4 pb-12 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 text-xs text-[var(--color-secondary)]">
          <span>{t("common.home")}</span>
          <span className="mx-2">/</span>
          <span>{t("common.contact")}</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-button-bg)]">
            {t("contactPage.details")}
          </span>
        </div>

        <section className="grid gap-8 rounded-md bg-[var(--color-card-bg)] py-4 lg:grid-cols-[1fr_1.6fr]">
          <div className="px-2 lg:px-0">
            <h1 className="mb-4 max-w-md text-xl md:text-2xl font-semibold leading-tight text-primary">
              {t("contactPage.heading")}
            </h1>
            <p className="mb-7 max-w-md text-base md:text-lg  text-[var(--color-primary)]">
              {t("contactPage.description")}
            </p>

            <div className="space-y-1 text-xs md:text-sm text-[var(--color-primary)]">
              <p>
                <span className="font-semibold text-[var(--color-button-bg)]">
                  Email:
                </span>{" "}
                info@gafbi.de
              </p>
              <p>
                <span className="font-semibold text-[var(--color-button-bg)]">
                  Telephone:
                </span>{" "}
                +49 231 86200808
              </p>
              <p>
                <span className="font-semibold text-[var(--color-button-bg)]">
                  Address:
                </span>{" "}
                KaiserstraBe 129, 44143 Dortmund, Germany
              </p>
            </div>
          </div>

          <form className="rounded-md bg-white p-4 sm:p-6 lg:p-8">
            <h2 className="mb-4 text-2xl md:text-3xl xl:text-4xl font-semibold text-[var(--color-button-bg)]">
              {t("contactPage.getInTouch")}
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="rounded-md border border-slate-200 px-4 py-3 text-sm"
                placeholder={t("contactPage.firstName")}
              />
              <input
                className="rounded-md border border-slate-200 px-4 py-3 text-sm"
                placeholder={t("contactPage.lastName")}
              />
              <input
                className="rounded-md border border-slate-200 px-4 py-3 text-sm"
                placeholder={t("contactPage.email")}
              />
              <input
                className="rounded-md border border-slate-200 px-4 py-3 text-sm"
                placeholder={t("contactPage.phone")}
              />
            </div>

            <input
              className="mt-3 w-full rounded-md border border-slate-200 px-4 py-3 text-sm"
              placeholder={t("contactPage.regarding")}
            />
            <textarea
              className="mt-3 h-28 w-full rounded-md border border-slate-200 px-4 py-3 text-sm"
              placeholder={t("contactPage.news")}
            />

            <button
              type="button"
              className="mt-4 cursor-pointer rounded-md bg-[var(--color-button-bg)] px-6 py-1 text-lg font-semibold text-white"
            >
              {t("common.submit")}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
