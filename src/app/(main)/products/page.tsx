/** @format */

"use client";

import { useTranslation } from "react-i18next";
import ProductCard from "@/components/Cards/ProductCard";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";

const ProductsPage = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data ?? [];

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

        {isError && (
          <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-red-600">
            Failed to fetch products
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: String(product.id),
                    name: product.name,
                    size: product.quantity_with_unit,
                    rating: product.average_rating.toFixed(1),
                    image: product.image_url,
                  }}
                />
              ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
