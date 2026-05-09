/** @format */
"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "@/components/HomeComponents";
import {
  ChangePasswordForm,
  type LoginFormData,
} from "@/components/LoginDataComponents";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";

const LoginDataPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState<LoginFormData>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Password updated successfully.");
        setFormData({ newPassword: "", confirmPassword: "" });
        return;
      }

      toast.error(response?.message || "Password update failed.");
    } catch {
      toast.error("Password update failed.");
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Login Data" />

      <div className="mt-6">
        <ChangePasswordForm
          email={user?.email_address || ""}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
};

export default LoginDataPage;
