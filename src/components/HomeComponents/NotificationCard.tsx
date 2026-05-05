/** @format */
"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";

interface NotificationCardProps {
  message: string;
}

const NotificationCard = ({ message }: NotificationCardProps) => {
  return (
    <div className="bg-[#94D0CE] rounded-xl p-4 flex items-start gap-3">
      <div className="shrink-0 mt-0.5">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
      </div>
      <p className="text-sm text-secondary leading-relaxed">{message}</p>
    </div>
  );
};

export default NotificationCard;
