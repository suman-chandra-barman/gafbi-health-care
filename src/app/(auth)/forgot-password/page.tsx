/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(t("toasts.otpSent"));
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
          {t("auth.forgotTitle")}
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          {t("auth.forgotDescription")}
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
          <button
            type="submit"
            className="bg-[#1A4B5A] text-white rounded px-3 py-2 font-semibold cursor-pointer"
            disabled={loading}
          >
            {loading ? t("auth.sending") : t("auth.sendOtp")}
          </button>
        </form>
      </div>
    </div>
  );
}
