/** @format */
"use client";
import React from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  quantity: number;
  imageSrc?: string;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  quantity,
  imageSrc,
  onAdd,
  onRemove,
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 flex flex-col items-center">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg flex items-center justify-center mb-3 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={96}
            height={96}
            className="object-contain"
          />
        ) : (
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg" />
        )}
      </div>
      <h3 className="text-sm font-medium text-primary text-center mb-3 line-clamp-2 min-h-[2.5rem]">
        {name}
      </h3>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onRemove(id)}
          disabled={quantity <= 0}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium text-primary w-8 text-center">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => onAdd(id)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
