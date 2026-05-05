/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const initialReviews = [
  {
    name: "Alex Morgan",
    time: "1 mo ago",
    content:
      "The item arrived in excellent condition and was packaged with great care to prevent any damage during transit. Shipping was both fast and reliable. It arrived on time and the cost was very fair given the speed of delivery.",
  },
  {
    name: "Alex Morgan",
    time: "1 mo ago",
    content:
      "The item looks just as great in person as it did in the photos and works perfectly. I have tested it thoroughly with no issues at all. For the price, including shipping, the overall value is truly outstanding.",
  },
  {
    name: "Alex Morgan",
    time: "1 mo ago",
    content:
      "I am very happy with the purchase and highly recommend this seller.",
  },
];

const ProductDetails = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );
  const [reviewItems, setReviewItems] = useState(initialReviews);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");

  function handleReviewSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reviewContent.trim() || !reviewName.trim()) return;
    setReviewItems([
      {
        name: reviewName,
        time: "just now",
        content: reviewContent,
      },
      ...reviewItems,
    ]);
    setReviewContent("");
    setReviewName("");
    setReviewEmail("");
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
                src="/antifect.png"
                alt="Surface Disinfectant"
                width={110}
                height={166}
              />
            </div>

            <div>
              <h1 className="mb-1 text-3xl font-semibold text-(--color-primary)">
                Surface Disinfectant
              </h1>
              <p className="mb-2 text-base text-(--color-secondary)">500 ml</p>
              <p className="mb-6 flex items-center gap-1 text-base font-semibold text-[#d3a008]">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                4.5
              </p>

              <button
                type="button"
                className="rounded-md bg-(--color-button-bg) px-5 py-2 text-base font-semibold text-white cursor-pointer"
              >
                {t("productsPage.bookingRequest")}
              </button>
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
            <div className="space-y-1 text-base leading-7 text-(--color-primary)">
              <p>
                Dr. Schumacher - Aseptoman Med - alcoholic hand disinfectant
                wipes - 15 pcs.
              </p>
              <p>
                Dr. Schumacher&apos;s Aseptoman Med hand disinfectant wipes
                offer an effective solution for hygienic hand disinfection on
                the go.
              </p>
              <p>
                Each wipe is soaked in an alcohol-based solution that reliably
                reduces germs while being gentle on the skin.
              </p>
              <p>Product features:</p>
              <p>
                Effective disinfection: The wipes are bactericidal, yeasticidal,
                and tuberculocidal.
              </p>
              <p>
                Skin-friendly: Thanks to high-quality, moisturizing ingredients,
                the skin is protected from drying out.
              </p>
              <p>
                Fast action time: The disinfectant solution takes effect within
                a very short time.
              </p>
              <p>
                Fragrance-free: The wipes are fragrance-free and therefore ideal
                for people with sensitive skin.
              </p>
              <p>
                Convenient packaging: The pack contains 15 individually
                removable wipes that can be easily stored in a bag or car.
              </p>
              <p>Areas of application:</p>
              <p>
                Aseptoman Med hand disinfectant wipes are ideally suited for use
                in various areas: on the go, in the workplace, and at home.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
              <aside>
                <h2 className="mb-5 text-xl font-semibold text-(--color-primary)">
                  4.6
                </h2>
                <p className="mb-2 text-base text-(--color-primary)">
                  634 product ratings
                </p>
                {[5, 4, 3, 2, 1].map((star, index) => (
                  <div
                    key={star}
                    className="mb-2 flex items-center gap-2 text-sm"
                  >
                    <span className="w-4">{star}</span>
                    <div className="h-1.5 w-full rounded bg-slate-200">
                      <div
                        className="h-1.5 rounded bg-[#d3a008]"
                        style={{ width: `${[85, 50, 30, 20, 25][index]}%` }}
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
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-(--color-button-bg) px-4 py-1.5 text-base font-semibold text-white cursor-pointer transition-colors duration-150 hover:bg-[var(--color-primary)]"
                    >
                      {t("common.submit")}
                    </button>
                  </form>
                </div>
              </aside>

              <section>
                <h2 className="mb-4 text-lg font-semibold text-(--color-primary)">
                  {t("productsPage.mostRelevant")}
                </h2>
                <div className="space-y-5">
                  {reviewItems.map((item, idx) => (
                    <article
                      key={`${item.name}-${idx}`}
                      className="border-b border-slate-200 pb-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-base font-semibold text-(--color-primary)">
                          {item.name}
                        </p>
                        <p className="text-sm text-(--color-secondary)">
                          {item.time}
                        </p>
                      </div>
                      <p className="mb-2 flex items-center gap-1 text-[#d3a008]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill="currentColor"
                            strokeWidth={0}
                          />
                        ))}
                      </p>
                      <p className="text-base leading-6 text-(--color-primary)">
                        {item.content}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
