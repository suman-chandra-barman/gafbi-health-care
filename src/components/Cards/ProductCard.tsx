/** @format */

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Product {
  id: string;
  name: string;
  size: string;
  rating: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();

  return (
    <article
      key={product.id}
      className="group rounded-xl bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      tabIndex={0}
      aria-label={product.name}
    >
      <div className="mb-3 flex h-28 items-center justify-center rounded-lg bg-gradient-to-b from-slate-50 to-white px-2 ring-1 ring-slate-100">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image}`}
          alt={product.name}
          width={78}
          height={115}
          className="max-h-full w-auto select-none object-contain pointer-events-none"
          draggable={false}
        />
      </div>

      <h2 className="mb-1 text-base md:text-base font-medium text-(--color-primary)">
        {product.name}
      </h2>
      <p className="mb-2 text-base md:text-base text-(--color-secondary)">
        {product.size}
      </p>

      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1 text-base md:text-base font-semibold text-[#d3a008]">
          <Star size={12} fill="currentColor" strokeWidth={0} />
          {product.rating}
        </p>

        <div className="flex items-center gap-1">
          <Link href={`/apply-box`}>
            <button
              type="button"
              className="rounded-sm cursor-pointer border border-(--color-button-bg) px-2 py-0.5 text-base md:text-base font-semibold text-(--color-button-bg) transition-colors duration-150 hover:bg-(--color-button-bg) hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--color-button-bg)"
              aria-label={`Request booking for ${product.name}`}
            >
              {t("productsPage.goToCarebox")}
            </button>
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="rounded-sm cursor-pointer bg-(--color-button-bg) px-2 py-0.5 text-base md:text-base font-semibold text-white transition-transform duration-150 hover:scale-105 hover:bg-(--color-button-bg) active:scale-95 focus:outline-none focus:ring-2 focus:ring-(--color-button-bg)"
            aria-label={`View details for ${product.name}`}
          >
            {t("common.details")}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
