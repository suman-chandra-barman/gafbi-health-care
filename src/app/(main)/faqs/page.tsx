/** @format */

"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const faqs = [
  {
    question: "Was ist die Gafbi Pflegebox?",
    answer:
      "Die Gafbi Pflegebox ist ein monatliches, individuell anpassbares Paket mit Pflegehilfsmitteln zum Verbrauch (z. B. Einmalhandschuhe, Desinfektionstucher, Flachendesinfektion, Bettschutzeinlagen, Mundschutz und FFP2-Masken). Es wird kostenfrei geliefert (ab Pflegegrad 1), Gafbi ubernimmt die komplette Abrechnung mit Ihrer Pflegekasse. Zusatzlich sind oft ein wiederverwendbarer Bettschutz und ein Hausnotruf enthalten.",
  },
  {
    question: "Wer hat Anspruch auf die Gafbi Pflegebox?",
    answer:
      "Anspruch haben in der Regel Personen mit anerkanntem Pflegegrad, die zu Hause versorgt werden. Die Kosten werden uber die Pflegekasse bis zum gesetzlichen Rahmen ubernommen.",
  },
  {
    question: "Welche Produkte sind in der Pflegebox enthalten?",
    answer:
      "Typischerweise enthalt die Box Verbrauchsprodukte wie Einmalhandschuhe, Desinfektionsmittel, Bettschutzeinlagen, Mundschutz und weitere alltagstaugliche Pflegehilfsmittel.",
  },
  {
    question: "Wie funktioniert die Lieferung?",
    answer:
      "Die Pflegebox wird monatlich direkt an die angegebene Adresse geliefert. Sie konnen die Inhalte anpassen und erhalten die Lieferung regelmassig ohne manuellen Aufwand.",
  },
  {
    question: "Kann ich die Inhalte der Box individuell anpassen?",
    answer:
      "Ja, die Zusammenstellung kann anhand Ihres Bedarfs geandert werden. So erhalten Sie nur die Produkte, die fur Ihre tagliche Pflege sinnvoll sind.",
  },
  {
    question: "Wie beantrage ich die Gafbi Pflegebox?",
    answer:
      "Sie konnen die Pflegebox uber das Kontaktformular oder telefonisch anfragen. Das Team unterstutzt Sie bei den notwendigen Angaben und der Abrechnung mit der Pflegekasse.",
  },
];

const FaqsPage = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
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
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={faq.question}
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
