/** @format */

"use client";

import { useTranslation } from "react-i18next";
import ProductCard from "@/components/Cards/ProductCard";

const products = Array.from({ length: 9 }, (_, index) => ({
  id: `surface-disinfectant-${index + 1}`,
  name: "Surface Disinfectant",
  size: "500 ml",
  rating: "4.5",
  image: "/antifect.png",
}));

const ProductsPage = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-(--color-card-bg) px-4 pb-12 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 text-base text-(--color-secondary)">
          <span>{t("common.home")}</span>
          <span className="mx-2">/</span>
          <span>{t("common.products")}</span>
          <span className="mx-2">/</span>
          <span className="text-(--color-button-bg)">
            {t("productsPage.breadcrumbLabel")}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-semibold text-(--color-primary)">
          {t("productsPage.title")}
        </h1>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
