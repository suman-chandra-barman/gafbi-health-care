/** @format */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GenderSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderSelector = ({ value, onChange }: GenderSelectorProps) => {
  const options = [
    { id: "mister", label: "Mister" },
    { id: "woman", label: "Woman" },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-primary">Gender</label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                value === option.id ? "border-primary" : "border-tertiary",
              )}
              onClick={() => onChange(option.id)}
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
              )}
              onClick={() => onChange(option.id)}
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
