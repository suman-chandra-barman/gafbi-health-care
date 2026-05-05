/** @format */
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import {
  ChangePasswordForm,
  type LoginFormData,
} from "@/components/LoginDataComponents";

const LoginDataPage = () => {
  const email = "alexmorgan86@gmail.com";

  const [formData, setFormData] = useState<LoginFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    console.log("Changing password...");
  };

  return (
    <div className="w-full max-w-2xl">
      <PageHeader title="Login Data" />

      <div className="mt-6">
        <ChangePasswordForm
          email={email}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoginDataPage;
