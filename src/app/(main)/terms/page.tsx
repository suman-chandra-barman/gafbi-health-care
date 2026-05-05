/** @format */

"use client";

import { useTranslation } from "react-i18next";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-[#1A4B5A]">
          {t("terms.title")}
        </h1>
        <div className="text-gray-800 space-y-4 text-sm">
          <p>
            <strong>{t("terms.introHeading")}</strong>
          </p>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of Gafbi Health Care&apos;s Website and services. By accessing
            this website we assume you accept these terms and conditions. Do not
            continue to use Gafbi Health Care if you do not agree to all of the
            terms and conditions stated on this page.
          </p>
          <p>
            <strong>{t("terms.q1")}</strong>
            <br />
            Unless otherwise stated, Gafbi Health Care and/or its licensors own
            the intellectual property rights for all material on this website.
            All intellectual property rights are reserved.
          </p>
          <p>
            <strong>{t("terms.q2")}</strong>
            <br />
            You must not use this website in any way that causes, or may cause,
            damage to the website or impairment of the availability or
            accessibility of the website.
          </p>
          <p>
            <strong>{t("terms.q3")}</strong>
            <br />
            Your privacy is important to us. Please review our Privacy Policy
            for more information.
          </p>
          <p>
            <strong>{t("terms.q4")}</strong>
            <br />
            We reserve the right to revise these terms at any time as we see
            fit. By using this website you are expected to review these terms on
            a regular basis.
          </p>
          <p className="mt-6">
            If you have any questions about these Terms, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}
