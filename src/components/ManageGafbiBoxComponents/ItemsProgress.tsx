/** @format */
"use client";
import React from "react";

interface ItemsProgressProps {
  currentCount: number;
  maxCount: number;
}

const ItemsProgress = ({ currentCount, maxCount }: ItemsProgressProps) => {
  const remainingItems = maxCount - currentCount;
  const progress = (currentCount / maxCount) * 100;

  return (
    <div className="bg-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">
          {remainingItems} items left
        </span>
        <span className="text-xs text-tertiary">
          {currentCount}/{maxCount}
        </span>
      </div>
      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ItemsProgress;
