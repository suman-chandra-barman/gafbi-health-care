/** @format */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import EmailDisplay from "./EmailDisplay";
import PasswordInput from "./PasswordInput";

export interface LoginFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordFormProps {
  email: string;
  formData: LoginFormData;
  onChange: (field: keyof LoginFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChangePasswordForm = ({
  email,
  formData,
  onChange,
  onSubmit,
}: ChangePasswordFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <EmailDisplay email={email} />

      <div className="pt-2">
        <h3 className="text-base font-semibold text-primary mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <PasswordInput
            label="Current password"
            value={formData.currentPassword}
            onChange={(value) => onChange("currentPassword", value)}
            placeholder="Enter current password"
          />
          <PasswordInput
            label="New password"
            value={formData.newPassword}
            onChange={(value) => onChange("newPassword", value)}
            placeholder="Enter new password"
          />
          <PasswordInput
            label="Confirm new password"
            value={formData.confirmPassword}
            onChange={(value) => onChange("confirmPassword", value)}
            placeholder="Confirm new password"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" className="w-full md:w-auto rounded-lg h-11 px-6">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
