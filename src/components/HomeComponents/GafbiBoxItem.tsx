/** @format */
"use client";
import React from "react";
import Image from "next/image";

interface GafbiBoxItemProps {
  name: string;
  quantity: string;
  imageSrc?: string;
}

const GafbiBoxItem = ({ name, quantity, imageSrc }: GafbiBoxItemProps) => {
  return (
    <div className="bg-card rounded-xl p-4 flex items-center gap-4">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={80}
            height={80}
            className="object-contain"
          />
        ) : (
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm md:text-base font-medium text-primary truncate">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-tertiary mt-0.5">{quantity}</p>
      </div>
    </div>
  );
};

export default GafbiBoxItem;
