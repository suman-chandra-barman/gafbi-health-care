/** @format */
"use client";
import React from "react";
import ItemsProgress from "./ItemsProgress";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SelectedItem {
  id: string;
  name: string;
  quantity: string;
  imageSrc?: string;
}

interface SelectedItemsSidebarProps {
  items: SelectedItem[];
  currentCount: number;
  maxCount: number;
  onDeleteItem: (id: string) => void;
  onSave: () => void;
}

const SelectedItemsSidebar = ({
  items,
  currentCount,
  maxCount,
  onDeleteItem,
  onSave,
}: SelectedItemsSidebarProps) => {
  return (
    <div className="bg-card rounded-xl p-4 h-fit sticky top-4">
      <h3 className="text-base font-semibold text-primary mb-4">
        Selected Items
      </h3>
      <ItemsProgress currentCount={currentCount} maxCount={maxCount} />
      <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-tertiary text-center py-4">
            No items selected
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-background rounded-lg p-2"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-b from-blue-100 to-blue-200 rounded" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary truncate">
                  {item.name}
                </p>
                <p className="text-xs text-tertiary">{item.quantity}</p>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDeleteItem(item.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))
        )}
      </div>
      <div className="mt-4">
        <Button
          onClick={onSave}
          className="w-full rounded-lg h-10"
          disabled={items.length === 0}
        >
          Save Gafbi box
        </Button>
      </div>
    </div>
  );
};

export default SelectedItemsSidebar;
