/** @format */
"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CareBoxItemProps {
  id: string;
  name: string;
  quantity: string;
  imageSrc?: string;
  onDelete: (id: string) => void;
}

const CareBoxItem = ({
  id,
  name,
  quantity,
  imageSrc,
  onDelete,
}: CareBoxItemProps) => {
  return (
    <div className="bg-card rounded-xl p-4 flex items-center gap-4">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={64}
            height={64}
            className="object-contain"
          />
        ) : (
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm md:text-base font-medium text-primary truncate">
          {name}
        </h3>
        <p className="text-xs md:text-sm text-tertiary mt-0.5">{quantity}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => onDelete(id)}
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default CareBoxItem;
