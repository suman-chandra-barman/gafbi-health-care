/** @format */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function VerifyOtpPage() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to next input if value entered
      if (value && index < 3) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== 4) {
      toast.error(t("toasts.otpRequired"));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("toasts.otpVerified"));
      router.push("/signin");
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
          {t("auth.verifyTitle")}
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          {t("auth.verifyDescription")}
        </p>
        <form
          className="flex flex-col gap-3 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 mb-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border rounded text-xl"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-[#1A4B5A] text-white rounded px-3 py-2 font-semibold cursor-pointer"
            disabled={loading}
          >
            {loading ? t("auth.verifying") : t("auth.verify")}
          </button>
        </form>
      </div>
    </div>
  );
}
