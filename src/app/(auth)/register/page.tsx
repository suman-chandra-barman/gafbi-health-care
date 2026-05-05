/** @format */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TermsConnect from "../../(main)/terms/connect";
import { useTranslation } from "react-i18next";
import { useSignupMutation } from "@/redux/features/auth/authApi";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error(t("toasts.acceptTerms"));
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await signup({
        email_address: email,
        password,
        confirm_password: confirmPassword,
      }).unwrap();

      if (response?.success) {
        localStorage.setItem("pendingEmail", email);
        toast.success(t("toasts.accountCreated"));
        router.push("/email-verify");
        return;
      }

      toast.error(response?.message || "Signup failed.");
    } catch (error) {
      toast.error("Signup failed.");
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
          <input
            type="password"
            placeholder="Confirm password"
            className="border rounded px-3 py-2"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            disabled={isLoading}
          >
            {isLoading ? t("auth.creating") : t("auth.create")}
          </button>
        </form>
        <Link
          href="/signin"
          className="block mt-4 border border-[#1A4B5A] text-[#1A4B5A] rounded px-3 py-2 text-center font-semibold hover:bg-[#1A4B5A] hover:text-white transition"
        >
          {t("auth.backToLogin")}
        </Link>
      </div>
    </div>
  );
}
