/** @format */
"use client";
import React from "react";
import { AlertCircle } from "lucide-react";

const UnsubscribeWarning = () => {
  return (
    <div className="bg-card rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary mb-1">
            Warning: This action cannot be undone
          </h3>
          <p className="text-sm text-tertiary leading-relaxed">
            If you unsubscribe, you will no longer receive your monthly Gafbi
            box deliveries. Your account data will be retained for 30 days in
            case you change your mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeWarning;
