/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function SignInPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("toasts.signedIn"));
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9EFF3] bg-opacity-80">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6 border-b border-gray-300 pb-6">
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
          {t("auth.loginManage")}
        </h2>
        <p className="text-gray-700 mb-4 text-sm">
          {t("auth.loginDescription")}
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
          <div className="flex justify-end mb-2">
            <Link
              href="/forgot-password"
              className="text-xs text-[#1A4B5A] font-semibold hover:underline"
            >
              {t("auth.forgotPassword")}
            </Link>
          </div>
          <button
            type="submit"
            className="bg-[#1A4B5A] hover:bg-[#0c617a] text-white rounded px-3 py-2 font-semibold cursor-pointer"
            disabled={loading}
          >
            {loading ? t("auth.signingIn") : t("auth.login")}
          </button>
        </form>
        <Link
          href="/register"
          className="block mt-4 border border-[#1A4B5A] text-[#1A4B5A] rounded px-3 py-2 text-center font-semibold hover:bg-[#1A4B5A] hover:text-white transition"
        >
          {t("auth.createAccount")}
        </Link>
      </div>
    </div>
  );
}
