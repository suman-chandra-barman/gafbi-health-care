/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TermsConnect from "../../terms/connect";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error(t("toasts.acceptTerms"));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("toasts.accountCreated"));
      router.push("/verify-otp");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9EFF3] bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.png"
            alt="Gafbi Health Care"
            width={80}
            height={80}
            className="object-cover mb-2"
          />
          <h1 className="text-2xl font-bold text-center text-[#1A4B5A]">
            Gafbi Health Care
          </h1>
        </div>
        <h2 className="text-lg font-bold text-[#1A4B5A] mb-1">
          {t("auth.registerTitle")}
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          {t("auth.registerDescription")}
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="flex items-center gap-2 text-xs mt-1">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="accent-[#1A4B5A]"
            />
            <span className="flex items-center justify-center gap-1">
              I accept the <TermsConnect />
            </span>
          </label>
          <button
            type="submit"
            className="bg-[#1A4B5A] text-white rounded px-3 py-2 font-semibold cursor-pointer"
            disabled={loading}
          >
            {loading ? t("auth.creating") : t("auth.create")}
          </button>
        </form>
        <Link
          href="/signin"
          className="block mt-4 border border-[#1A4B5A] text-[#1A4B5A] rounded px-3 py-2 text-center font-semibold hover:bg-[#1A4B5A] hover:text-white transition"
        >
          {t("auth.backToLogin")}
        </Link>
        <p className="mt-4 text-xs text-gray-700">
          Are you a customer, but have not yet entered an email address?{" "}
          <Link href="#" className="text-[#1A4B5A] underline font-semibold">
            Please contact us
          </Link>
        </p>
      </div>
    </div>
  );
}
