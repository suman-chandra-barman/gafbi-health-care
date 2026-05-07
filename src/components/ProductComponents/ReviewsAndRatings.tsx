/** @format */

import { Star } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  review: string;
  created_at: string;
}

interface RatingBreakdown {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

interface ReviewsAndRatingsProps {
  average_rating: number;
  total_reviews: number;
  rating_breakdown: RatingBreakdown;
  reviews: Review[];
  isSubmittingReview?: boolean;
  onSubmitReview: (payload: {
    name: string;
    email: string;
    rating: number;
    review: string;
  }) => Promise<void>;
}

const ReviewsAndRatings = ({
  average_rating,
  total_reviews,
  rating_breakdown,
  reviews,
  isSubmittingReview = false,
  onSubmitReview,
}: ReviewsAndRatingsProps) => {
  const { t } = useTranslation();
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewContent.trim() || !reviewName.trim() || !reviewEmail.trim())
      return;

    setSubmitError("");
    setSubmitSuccess("");

    try {
      await onSubmitReview({
        name: reviewName,
        email: reviewEmail,
        rating: reviewRating,
        review: reviewContent,
      });

      setReviewContent("");
      setReviewName("");
      setReviewEmail("");
      setReviewRating(5);
      setSubmitSuccess("Review submitted successfully!");

      setTimeout(() => setSubmitSuccess(""), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to submit review",
      );
    }
  };

  const getStarPercentage = (rating: number, total: number) => {
    return total === 0 ? 0 : (rating / total) * 100;
  };

  const totalRatings = Object.values(rating_breakdown).reduce(
    (a, b) => a + b,
    0,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
      <aside>
        <h2 className="mb-5 text-xl font-semibold text-(--color-primary)">
          {average_rating.toFixed(1)}
        </h2>
        <p className="mb-2 text-base text-(--color-primary)">
          {total_reviews} product rating{total_reviews !== 1 ? "s" : ""}
        </p>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="mb-2 flex items-center gap-2 text-sm">
            <span className="w-4">{star}</span>
            <div className="h-1.5 w-full rounded bg-slate-200">
              <div
                className="h-1.5 rounded bg-[#d3a008]"
                style={{
                  width: `${getStarPercentage(rating_breakdown[star as keyof RatingBreakdown], totalRatings)}%`,
                }}
              />
            </div>
          </div>
        ))}

        <div className="mt-8">
          <h3 className="mb-2 text-lg font-semibold text-(--color-primary)">
            {t("productsPage.reviewProduct")}
          </h3>
          <p className="mb-3 text-sm text-(--color-secondary)">
            {t("productsPage.shareThoughts")}
          </p>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-2">
              <label className="mb-1 block text-sm text-(--color-primary)">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="transition-transform duration-150 hover:scale-110"
                  >
                    <Star
                      size={20}
                      className={
                        star <= reviewRating
                          ? "fill-[#d3a008] text-[#d3a008]"
                          : "text-slate-300"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="mb-2 h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-base outline-none"
              placeholder={t("productsPage.shareThoughts")}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
            <input
              className="mb-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base outline-none"
              placeholder="Enter your Name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
            <input
              className="mb-3 w-full rounded-md border border-slate-300 px-3 py-2 text-base outline-none"
              placeholder="Email Address"
              value={reviewEmail}
              onChange={(e) => setReviewEmail(e.target.value)}
              type="email"
              required
            />

            {submitError && (
              <div className="mb-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="mb-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-600">
                {submitSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="rounded-md bg-(--color-button-bg) px-4 py-1.5 text-base font-semibold text-white cursor-pointer transition-colors duration-150 hover:bg-(--color-primary) disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingReview ? "Submitting..." : t("common.submit")}
            </button>
          </form>
        </div>
      </aside>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-(--color-primary)">
          {t("productsPage.mostRelevant")}
        </h2>
        {reviews.length === 0 ? (
          <p className="text-base text-(--color-secondary)">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          <div className="space-y-5">
            {reviews.map((item) => (
              <article key={item.id} className="border-b border-slate-200 pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-base font-semibold text-(--color-primary)">
                    {item.name}
                  </p>
                  <p className="text-sm text-(--color-secondary)">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="mb-2 flex items-center gap-1 text-[#d3a008]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < item.rating ? "currentColor" : "none"}
                      strokeWidth={i < item.rating ? 0 : 1}
                    />
                  ))}
                </p>
                <p className="text-base leading-6 text-(--color-primary)">
                  {item.review}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewsAndRatings;
