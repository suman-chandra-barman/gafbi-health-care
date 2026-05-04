/** @format */

"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { PiTrashSimple } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const MAX_ITEMS = 6;

const products = [
  {
    id: "1",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "2",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "3",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "4",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "5",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "6",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "7",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "8",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "9",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
  {
    id: "10",
    name: "Surface Disinfectant",
    volume: "500 ml",
    price: 12.99,
    image: "/antifect.png",
  },
];

interface ProductSelectionStepProps {
  data: Array<{
    id: string;
    name: string;
    quantity: number;
    volume: string;
    price?: number;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNext: (data: any) => void;
}

export default function ProductSelectionStep({
  data,
  onNext,
}: ProductSelectionStepProps) {
  const { t } = useTranslation();
  const [selectedProducts, setSelectedProducts] = useState(
    data.length > 0 ? data : [],
  );

  const totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
  const itemsLeft = Math.max(0, MAX_ITEMS - totalItems);

  const selectedProductsWithImages = useMemo(() => {
    return selectedProducts.map((selectedProduct) => ({
      ...selectedProduct,
      image:
        products.find((product) => product.id === selectedProduct.id)?.image ||
        "/antifect.png",
    }));
  }, [selectedProducts]);

  const updateProductQuantity = (productId: string, nextQuantity: number) => {
    if (nextQuantity < 0) return;

    const existing = selectedProducts.find(
      (product) => product.id === productId,
    );
    const currentQty = existing?.quantity || 0;
    const projectedTotal = totalItems - currentQty + nextQuantity;

    if (projectedTotal > MAX_ITEMS) {
      return;
    }

    if (nextQuantity === 0) {
      setSelectedProducts((prev) =>
        prev.filter((product) => product.id !== productId),
      );
      return;
    }

    const sourceProduct = products.find((product) => product.id === productId);
    if (!sourceProduct) return;

    if (existing) {
      setSelectedProducts((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, quantity: nextQuantity }
            : product,
        ),
      );
      return;
    }

    setSelectedProducts((prev) => [
      ...prev,
      {
        id: sourceProduct.id,
        name: sourceProduct.name,
        volume: sourceProduct.volume,
        quantity: nextQuantity,
        price: sourceProduct.price,
      },
    ]);
  };

  const handleContinue = () => {
    if (selectedProducts.length === 0) {
      toast("Please select at least one product");
      return;
    }

    onNext({ selectedProducts });
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-[42px] font-bold text-[#2f2f2f]">
        {t("apply.chooseProducts")}
      </h2>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const selected = selectedProducts.find(
              (item) => item.id === product.id,
            );
            const quantity = selected?.quantity || 0;
            const disableAdd = quantity === 0 && itemsLeft === 0;

            return (
              <div
                key={product.id}
                className={`rounded-md border bg-[#f3f5f7] p-3 ${
                  quantity > 0
                    ? "border-2 border-[#2f73b4]"
                    : "border border-[#e7eaee]"
                }`}
              >
                <div className="mb-1 flex items-start justify-between">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#9ea7b0] text-xs font-semibold text-[#5f6872]">
                    ?
                  </span>
                </div>

                <div className="mb-2 flex justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={66}
                    height={90}
                    className="h-16.5 w-auto object-contain"
                  />
                </div>

                <p className="text-lg font-medium text-[#4a4f54]">
                  {product.name}
                </p>
                <p className="mb-3 text-sm text-[#8a9299]">{product.volume}</p>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-[#8a9299]">
                    <LuShoppingBag className="text-base" />
                    {quantity}
                  </span>

                  <div className="flex items-center overflow-hidden rounded-md bg-[#e7eaee]">
                    <button
                      onClick={() =>
                        updateProductQuantity(
                          product.id,
                          Math.max(0, quantity - 1),
                        )
                      }
                      className="flex h-8 w-10 cursor-pointer items-center justify-center text-[#6d737a] transition-colors hover:bg-[#d8dde2]"
                    >
                      <AiOutlineMinus className="text-xs" />
                    </button>
                    <button
                      onClick={() =>
                        updateProductQuantity(product.id, quantity + 1)
                      }
                      disabled={disableAdd}
                      className="flex h-8 w-10 cursor-pointer items-center justify-center border-l border-[#d5dce3] text-[#4a4f54] transition-colors hover:bg-[#d8dde2] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <AiOutlinePlus className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="rounded-md border border-[#d9dee3] bg-[#f6f7f8]">
          <div className="border-b border-[#dee3e8] px-4 py-4">
            <h3 className="text-[34px] font-bold text-[#383d42]">
              {t("apply.myCareBox")}
            </h3>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#e0e5ea]">
              <div
                className="h-full bg-[#1e5a83] transition-all"
                style={{ width: `${(totalItems / MAX_ITEMS) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-[#1e5a83]">
              {t("apply.itemsLeft", { count: itemsLeft })}
            </p>
          </div>

          <div className="max-h-90 space-y-3 overflow-y-auto px-4 py-4">
            {selectedProductsWithImages.length === 0 ? (
              <p className="text-sm text-[#8b949e]">{t("apply.noItems")}</p>
            ) : (
              selectedProductsWithImages.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={36}
                    height={48}
                    className="h-12 w-auto object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#3f444a]">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#9aa2aa]">{product.volume}</p>
                  </div>

                  <span className="flex items-center gap-1 text-sm text-[#59616a]">
                    <LuShoppingBag className="text-sm" />
                    {product.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateProductQuantity(
                        product.id,
                        Math.max(0, product.quantity - 1),
                      )
                    }
                    className="cursor-pointer text-[#ea4f58] transition-colors hover:text-[#cf3640]"
                    title="Remove one"
                  >
                    <PiTrashSimple className="text-base" />
                  </button>

                  <button
                    onClick={() =>
                      updateProductQuantity(product.id, product.quantity + 1)
                    }
                    disabled={itemsLeft === 0}
                    className="rounded bg-[#e7eaee] p-1.5 text-[#4a4f54] transition-colors hover:bg-[#d8dde2] disabled:cursor-not-allowed disabled:opacity-40"
                    title="Add one"
                  >
                    <AiOutlinePlus className="text-xs" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-[#dee3e8] px-4 py-4">
            <button
              onClick={handleContinue}
              className="ml-auto flex w-full items-center cursor-pointer justify-center gap-2 rounded-md bg-[#1e5a83] px-4 py-2.5 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("apply.continue")}
              <span className="text-base">▶</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
