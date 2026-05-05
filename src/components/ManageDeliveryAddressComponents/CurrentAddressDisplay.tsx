/** @format */
"use client";
import React from "react";
import { MapPin } from "lucide-react";

interface CurrentAddressDisplayProps {
  address: string;
}

const CurrentAddressDisplay = ({ address }: CurrentAddressDisplayProps) => {
  return (
    <div className="bg-card rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-primary mb-1">
            Current delivery address
          </h3>
          <p className="text-sm text-tertiary leading-relaxed">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentAddressDisplay;
