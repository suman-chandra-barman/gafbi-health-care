/** @format */
"use client";
import React from "react";
import CareBoxItem from "./CareBoxItem";
import { Button } from "@/components/ui/button";

export interface CareBoxProduct {
  id: string;
  name: string;
  quantity: string;
  imageSrc?: string;
}

interface MyCareBoxTabProps {
  items: CareBoxProduct[];
  onDeleteItem: (id: string) => void;
  onSave: () => void;
}

const MyCareBoxTab = ({ items, onDeleteItem, onSave }: MyCareBoxTabProps) => {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="bg-card rounded-xl p-8 text-center">
          <p className="text-tertiary">No items in your care box</p>
        </div>
      ) : (
        items.map((item) => (
          <CareBoxItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            imageSrc={item.imageSrc}
            onDelete={onDeleteItem}
          />
        ))
      )}
      <div className="pt-4">
        <Button
          onClick={onSave}
          className="w-full md:w-auto rounded-lg h-11 px-6"
        >
          Save Gafbi box
        </Button>
      </div>
    </div>
  );
};

export default MyCareBoxTab;
