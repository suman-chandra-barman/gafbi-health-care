/** @format */

"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetFaqsQuery } from "@/redux/features/faqs/faqsApi";
import FaqsSkeleton from "@/components/CommonComponents/FaqsSkeleton";

const FaqsPage = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data, isLoading, isError } = useGetFaqsQuery({ page: 1, limit: 10 });
  const faqs = data?.data ?? [];

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main className="min-h-screen bg-[#f4f4f4] px-4 pb-12 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 text-sm text-secondary">
          <span>{t("common.home")}</span>
          <span className="mx-2">/</span>
          <span>{t("common.faqs")}</span>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-button-bg)]">
            {t("faqPage.details")}
          </span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_1.45fr]">
          <div>
            <h1 className="mb-5 max-w-xs text-xl md:text-2xl font-semibold leading-tight text-[var(--color-primary)]">
              {t("faqPage.heading")}
            </h1>
            <Image
              src="/faqs-banner.png"
              alt="FAQs banner"
              width={360}
              height={320}
              className="h-auto w-full max-w-sm"
            />
          </div>

          <div className="space-y-3">
            {isLoading ? <FaqsSkeleton /> : null}

            {isError ? (
              <div className="rounded-md bg-[var(--color-card-bg)] p-4 text-secondary">
                Failed to load FAQs.
              </div>
            ) : null}

            {!isLoading && !isError && faqs.length === 0 ? (
              <div className="rounded-md bg-[var(--color-card-bg)] p-4 text-secondary">
                No FAQs available.
              </div>
            ) : null}

            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={faq.id}
                  className="rounded-md bg-[var(--color-card-bg)] p-4"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-start justify-between gap-3 text-left"
                  >
                    <h2 className="text-xl font-medium text-[var(--color-primary)]">
                      {faq.question}
                    </h2>
                    <span className="rounded-md bg-white p-2 text-secondary">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  {isOpen ? (
                    <p className="mt-3 text-sm leading-7 text-secondary">
                      {faq.answer}
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default FaqsPage;
