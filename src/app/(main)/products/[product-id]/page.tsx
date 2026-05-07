/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import ProductDescription from "@/components/ProductComponents/ProductDescription";
import ReviewsAndRatings from "@/components/ProductComponents/ReviewsAndRatings";
import {
  useAddProductReviewMutation,
  useGetProductByIdQuery,
} from "@/redux/features/products/productsApi";

const ProductDetails = () => {
  const { t } = useTranslation();
  const params = useParams();
  const productIdParam = params["product-id"];
  const productId = Array.isArray(productIdParam)
    ? productIdParam[0]
    : productIdParam;

  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );
  const { data, isLoading, isError, refetch } = useGetProductByIdQuery(
    productId ?? "",
    {
      skip: !productId,
    },
  );
  const [addProductReview, { isLoading: isSubmittingReview }] =
    useAddProductReviewMutation();

  const product = data?.data;

  const handleReviewSubmit = async (payload: {
    name: string;
    email: string;
    rating: number;
    review: string;
  }) => {
    if (!product) return;

    await addProductReview({
      productId: product.id,
      payload,
    }).unwrap();

    await refetch();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-(--color-card-bg) px-4 pb-12 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-6 h-4 w-1/3 rounded bg-slate-200" />
            <div className="mb-6 h-10 w-1/2 rounded bg-slate-200" />
            <div className="h-96 rounded bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="min-h-screen bg-(--color-card-bg) px-4 pb-12 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-md bg-red-50 px-4 py-3 text-red-600">
            Failed to fetch product details
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-(--color-card-bg) px-4 pb-12 pt-3 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 text-sm text-(--color-secondary)">
          <Link href="/" className="hover:text-(--color-button-bg)">
            {t("common.home")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-(--color-button-bg)">
            {t("common.products")}
          </Link>
          <span className="mx-2">/</span>
          <span>{t("productsPage.breadcrumbLabel")}</span>
          <span className="mx-2">/</span>
          <span className="text-(--color-button-bg)">
            {t("productsPage.productDetails")}
          </span>
        </div>

        <section className="rounded-md bg-white p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex min-w-36 justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url}`}
                alt={product.name}
                width={110}
                height={166}
                className="h-auto w-auto"
              />
            </div>

            <div>
              <h1 className="mb-1 text-3xl font-semibold text-(--color-primary)">
                {product.name}
              </h1>
              <p className="mb-2 text-base text-(--color-secondary)">
                {product.quantity_with_unit}
              </p>
              <p className="mb-6 flex items-center gap-1 text-base font-semibold text-[#d3a008]">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                {product.average_rating.toFixed(1)}
              </p>

              <Link href={`/apply-box`}>
                <button
                  type="button"
                  className="rounded-md bg-(--color-button-bg) px-5 py-2 text-base font-semibold text-white cursor-pointer"
                >
                  {t("productsPage.goToCarebox")}
                </button>
              </Link>
            </div>
          </div>

          <div className="mb-5 flex border-b border-slate-300 text-base">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`border-b-2 px-1 pb-2 pr-4 font-semibold cursor-pointer ${
                activeTab === "description"
                  ? "border-(--color-button-bg) text-(--color-button-bg)"
                  : "border-transparent text-(--color-secondary)"
              }`}
            >
              {t("productsPage.descriptionTab")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`border-b-2 px-1 pb-2 font-semibold cursor-pointer ${
                activeTab === "reviews"
                  ? "border-(--color-button-bg) text-(--color-button-bg)"
                  : "border-transparent text-(--color-secondary)"
              }`}
            >
              {t("productsPage.reviewsTab")}
            </button>
          </div>

          {activeTab === "description" ? (
            <ProductDescription description={product.description} />
          ) : (
            <ReviewsAndRatings
              average_rating={product.average_rating}
              total_reviews={product.total_reviews}
              rating_breakdown={product.rating_breakdown}
              reviews={product.reviews}
              isSubmittingReview={isSubmittingReview}
              onSubmitReview={handleReviewSubmit}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
