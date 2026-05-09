/** @format */

type ClientsReviewSectionSkeletonProps = {
  cardsCount?: number;
};

const ClientsReviewSectionSkeleton = ({
  cardsCount = 3,
}: ClientsReviewSectionSkeletonProps) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
      {Array.from({ length: cardsCount }).map((_, index) => (
        <article
          key={`clients-review-skeleton-${index}`}
          className="rounded-xl bg-[#dfe4e8] p-5 sm:p-6"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((__, starIndex) => (
              <div
                key={`clients-review-star-${index}-${starIndex}`}
                className="h-5 w-5 animate-pulse rounded bg-slate-200 md:h-6 md:w-6"
              />
            ))}
          </div>

          <div className="mt-3 space-y-2">
            <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-10/12 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-9/12 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="mt-4 h-5 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-2/5 animate-pulse rounded bg-slate-200" />
        </article>
      ))}
    </div>
  );
};

export default ClientsReviewSectionSkeleton;
