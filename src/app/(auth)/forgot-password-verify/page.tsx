/** @format */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useVerifyForgotPasswordOtpMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";

export default function ForgotPasswordVerifyPage() {
  const { t } = useTranslation();
  const [email] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("forgotEmail") || "";
  });
  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(
    Array.from({ length: otpLength }, () => ""),
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyForgotPasswordOtp, { isLoading }] =
    useVerifyForgotPasswordOtpMutation();

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otpLength - 1) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, otpLength - index);
    if (!digits) return;

    const newOtp = [...otp];
    digits.split("").forEach((char, offset) => {
      newOtp[index + offset] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(index + digits.length, otpLength - 1);
    const next = document.getElementById(`otp-${nextIndex}`);
    if (next) (next as HTMLInputElement).focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== otpLength) {
      toast.error(t("toasts.otpRequired"));
      return;
    }

    try {
      const response = await verifyForgotPasswordOtp({
        email_address: email,
        otp_code: otp.join(""),
      }).unwrap();

      if (response?.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            tokens: response.data.tokens,
          }),
        );
        toast.success(t("toasts.otpVerified"));
        router.push("/reset-password");
        return;
      }

      toast.error(response?.message || "Verification failed.");
    } catch (error) {
      toast.error("Verification failed.");
    }
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
                onPaste={(e) => {
                  e.preventDefault();
                  handlePaste(idx, e.clipboardData.getData("text"));
                }}
              />
            ))}
          </div>
          <button
            type="submit"
            className="bg-[#1A4B5A] text-white rounded px-3 py-2 font-semibold cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? t("auth.verifying") : t("auth.verify")}
          </button>
        </form>
      </div>
    </div>
  );
}
