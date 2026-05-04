/** @format */

"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function TermsConnect() {
  const { t } = useTranslation();

  return (
    <div className="text-xs text-gray-700">
      {t("auth.termsAgreementPrefix")}{" "}
      <Link
        href="/terms"
        className="text-[#1A4B5A] underline font-semibold"
        target="_blank"
      >
        {t("footer.terms")}
      </Link>
      .
    </div>
  );
}
