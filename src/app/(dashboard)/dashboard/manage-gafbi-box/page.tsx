/** @format */
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/HomeComponents";
import {
  ItemsProgress,
  MyCareBoxTab,
  OtherProductsTab,
  SelectedItemsSidebar,
  type CareBoxProduct,
  type OtherProduct,
} from "@/components/ManageGafbiBoxComponents";

const initialCareBoxItems: CareBoxProduct[] = [
  {
    id: "1",
    name: "Surface Disinfectant",
    quantity: "500ml",
    imageSrc: "/demo.png",
  },
  {
    id: "2",
    name: "Surface Disinfectant",
    quantity: "500ml",
    imageSrc: "/demo.png",
  },
  {
    id: "3",
    name: "Surface Disinfectant",
    quantity: "500ml",
    imageSrc: "/demo.png",
  },
];

const initialOtherProducts: OtherProduct[] = [
  { id: "p1", name: "Hand Sanitizer", quantity: 0, imageSrc: "/demo.png" },
  { id: "p2", name: "Face Masks", quantity: 0, imageSrc: "/demo.png" },
  { id: "p3", name: "Disposable Gloves", quantity: 0, imageSrc: "/demo.png" },
  { id: "p4", name: "Antibacterial Wipes", quantity: 0, imageSrc: "/demo.png" },
  { id: "p5", name: "Body Lotion", quantity: 0, imageSrc: "/demo.png" },
  { id: "p6", name: "Wound Care Kit", quantity: 0, imageSrc: "/demo.png" },
];

const MAX_ITEMS = 6;

const ManageGafbiBoxPage = () => {
  const [activeTab, setActiveTab] = useState("my-care-box");
  const [careBoxItems, setCareBoxItems] =
    useState<CareBoxProduct[]>(initialCareBoxItems);
  const [otherProducts, setOtherProducts] =
    useState<OtherProduct[]>(initialOtherProducts);

  const currentItemCount = careBoxItems.length;

  const handleDeleteCareBoxItem = (id: string) => {
    setCareBoxItems((items) => items.filter((item) => item.id !== id));
  };

  const handleAddProduct = (id: string) => {
    if (currentItemCount >= MAX_ITEMS) return;
    setOtherProducts((products) =>
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const handleRemoveProduct = (id: string) => {
    setOtherProducts((products) =>
      products.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      ),
    );
  };

  const handleSave = () => {
    console.log("Saving Gafbi box...");
  };

  const selectedOtherProducts = otherProducts
    .filter((p) => p.quantity > 0)
    .map((p) => ({
      id: p.id,
      name: p.name,
      quantity: `${p.quantity}x`,
    }));

  return (
    <div className="w-full">
      <PageHeader title="Manage Gafbi Box" />

      <div className="mt-6">
        <div className="w-full md:w-80 rounded-lg p-0.75 bg-muted inline-flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("my-care-box")}
            className={`flex-1 rounded-md px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "my-care-box"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            My care box
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("other-products")}
            className={`flex-1 rounded-md px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "other-products"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Other products
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "my-care-box" ? (
            <div className="max-w-2xl">
              <div className="mb-6">
                <ItemsProgress
                  currentCount={currentItemCount}
                  maxCount={MAX_ITEMS}
                />
              </div>
              <MyCareBoxTab
                items={careBoxItems}
                onDeleteItem={handleDeleteCareBoxItem}
                onSave={handleSave}
              />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <OtherProductsTab
                  products={otherProducts}
                  onAdd={handleAddProduct}
                  onRemove={handleRemoveProduct}
                />
              </div>
              <div className="w-full lg:w-80">
                <SelectedItemsSidebar
                  items={[...careBoxItems, ...selectedOtherProducts]}
                  currentCount={currentItemCount + selectedOtherProducts.length}
                  maxCount={MAX_ITEMS}
                  onDeleteItem={(id) => {
                    handleDeleteCareBoxItem(id);
                    setOtherProducts((products) =>
                      products.map((p) =>
                        p.id === id ? { ...p, quantity: 0 } : p,
                      ),
                    );
                  }}
                  onSave={handleSave}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageGafbiBoxPage;
