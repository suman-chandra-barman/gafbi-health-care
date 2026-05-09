/** @format */

type ProductsSectionSkeletonProps = {
  cardsCount?: number;
};

const ProductsSectionSkeleton = ({
  cardsCount = 4,
}: ProductsSectionSkeletonProps) => {
  return (
    <div className="mt-6 md:mt-12 overflow-hidden px-2 md:px-4 lg:px-6">
      <div className="flex gap-4">
        {Array.from({ length: cardsCount }).map((_, index) => (
          <article
            key={`products-section-skeleton-${index}`}
            className="w-full shrink-0 rounded-xl bg-background p-4 sm:p-5 md:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]"
          >
            <div className="flex h-57.5 items-center justify-center sm:h-75">
              <div className="h-28 w-28 animate-pulse rounded-lg bg-slate-200" />
            </div>
            <div className="rounded-xl border border-[#d8dde2] p-4">
              <div className="flex items-end justify-between gap-3">
                <div className="w-full">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                </div>
                <div className="h-7 w-20 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductsSectionSkeleton;
