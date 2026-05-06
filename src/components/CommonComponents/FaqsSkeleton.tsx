interface FaqsSkeletonProps {
  count?: number;
}

const FaqsSkeleton = ({ count = 4 }: FaqsSkeletonProps) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`faq-skeleton-${index}`}
          className="rounded-md bg-[var(--color-card-bg)] p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-10/12 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-8 w-8 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqsSkeleton;
