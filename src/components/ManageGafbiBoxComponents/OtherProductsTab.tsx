/** @format */
"use client";
import React from "react";
import ProductCard from "./ProductCard";

export interface OtherProduct {
  id: string;
  name: string;
  quantity: number;
  imageSrc?: string;
}

interface OtherProductsTabProps {
  products: OtherProduct[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

const OtherProductsTab = ({
  products,
  onAdd,
  onRemove,
}: OtherProductsTabProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          quantity={product.quantity}
          imageSrc={product.imageSrc}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default OtherProductsTab;
