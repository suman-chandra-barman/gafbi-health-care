/** @format */
"use client";
import React from "react";
import { Mail } from "lucide-react";

interface EmailDisplayProps {
  email: string;
}

const EmailDisplay = ({ email }: EmailDisplayProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-primary">
        Email Address
      </label>
      <div className="bg-card rounded-lg p-3 flex items-center gap-3 border border-border">
        <Mail className="w-5 h-5 text-tertiary" />
        <span className="text-sm text-tertiary">{email}</span>
      </div>
      <p className="text-xs text-tertiary">
        Email cannot be changed. Contact support if needed.
      </p>
    </div>
  );
};

export default EmailDisplay;
