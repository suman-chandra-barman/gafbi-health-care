/** @format */

"use client";

import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetProductReviewsQuery } from "@/redux/features/products/productsApi";
import ClientsReviewSectionSkeleton from "@/components/Skeleton/ClientsReviewSectionSkeleton";

export default function ClientsReviewSection() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const { data, isLoading, isError } = useGetProductReviewsQuery();
  const reviews = data?.data ?? [];
  const maxIndex = Math.max(0, reviews.length - 3);
  const canGoPrev = index > 0;
  const canGoNext = index < maxIndex;

  const visible = reviews.slice(index, index + 3);
  const hasReviews = reviews.length > 0;
  const showReviews = !isLoading && !isError && hasReviews;
  const showEmpty = !isLoading && !isError && !hasReviews;
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section className="w-full  px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-625 px-2 sm:px-4 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <h2 className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-130 text-xl font-extrabold leading-[1.15] text-primary sm:text-2xl md:text-3xl lg:text-4xl">
          {t("landing.clientsTitle")}
        </h2>

        {isLoading && <ClientsReviewSectionSkeleton />}

        {isError && (
          <p className="mt-10 text-sm text-secondary sm:text-base md:text-lg">
            Unable to load reviews right now.
          </p>
        )}

        {showEmpty && (
          <p className="mt-10 text-sm text-secondary sm:text-base md:text-lg">
            No reviews yet.
          </p>
        )}

        {showReviews && (
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {visible.map((review) => (
              <article
                key={review.id}
                className="group rounded-xl bg-[#dfe4e8] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-[1.02]"
                  aria-label={`${review.rating} star review`}
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Image
                      key={`review-star-${review.id}-${starIndex}`}
                      src="/icons/star.svg"
                      alt="★"
                      width={20}
                      height={20}
                      quality={100}
                      className={
                        starIndex < review.rating
                          ? "h-5 w-5 md:h-6 md:w-6"
                          : "h-5 w-5 md:h-6 md:w-6 opacity-30"
                      }
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm  leading-[1.65] text-primary sm:text-base md:text-lg">
                  {review.review}
                </p>
                <p className="mt-4 text-base font-semibold text-primary sm:text-lg md:text-xl">
                  {review.name}
                </p>
                <p className="mt-1 text-xs  text-secondary sm:text-sm md:text-base">
                  {formatDate(review.created_at)}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-end gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => canGoPrev && setIndex((prev) => prev - 1)}
              disabled={!canGoPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border text-[20px] transition-all duration-300 disabled:cursor-not-allowed disabled:border-[#e5e7eb] disabled:text-[#c4c9cf] hover:cursor-pointer hover:bg-white/70"
            >
              <MoveLeft
                className={`h-5 w-5 ${
                  canGoPrev ? "text-[#1f5f8f]" : "text-[#c4c9cf]"
                }`}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => canGoNext && setIndex((prev) => prev + 1)}
              disabled={!canGoNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border text-[20px] transition-all duration-300 disabled:cursor-not-allowed disabled:border-[#e5e7eb] disabled:text-[#c4c9cf] hover:cursor-pointer hover:bg-white/70"
            >
              <MoveRight
                className={`h-5 w-5 ${
                  canGoNext ? "text-[#1f5f8f]" : "text-[#c4c9cf]"
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
