/** @format */
"use client";
import React from "react";
import GafbiBoxItem from "./GafbiBoxItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BoxItem {
  id: string;
  name: string;
  quantity: string;
  imageSrc?: string;
}

interface GafbiBoxContentsProps {
  items: BoxItem[];
}

const GafbiBoxContents = ({ items }: GafbiBoxContentsProps) => {
  return (
    <div className="mt-6 md:mt-8">
      <h2 className="text-base md:text-lg font-semibold text-primary mb-4">
        Your next Gafbi box contents
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <GafbiBoxItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button asChild className="w-full md:w-auto rounded-lg h-11 px-6">
          <Link href="/dashboard/manage-gafbi-box">
            Customize your Gafbi box
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default GafbiBoxContents;
