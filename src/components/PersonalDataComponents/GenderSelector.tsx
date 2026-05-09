/** @format */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
}

const GenderSelector = ({
  value,
  onChange,
  isDisabled = false,
}: GenderSelectorProps) => {
  const options = [
    { id: "mister", label: "Mister" },
    { id: "woman", label: "Woman" },
    { id: "diverse", label: "Diverse" },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-primary">Gender</label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex items-center gap-2",
              isDisabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                value === option.id ? "border-primary" : "border-tertiary",
                isDisabled && "opacity-60",
              )}
              onClick={() => {
                if (!isDisabled) {
                  onChange(option.id);
                }
              }}
            >
              {value === option.id && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                value === option.id
                  ? "text-primary font-medium"
                  : "text-tertiary",
                isDisabled && "opacity-70",
              )}
              onClick={() => {
                if (!isDisabled) {
                  onChange(option.id);
                }
              }}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenderSelector;
