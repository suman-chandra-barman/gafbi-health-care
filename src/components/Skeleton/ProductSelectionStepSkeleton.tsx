interface ProductSelectionStepSkeletonProps {
  cardsCount?: number;
  selectedItemsCount?: number;
}

export default function ProductSelectionStepSkeleton({
  cardsCount = 6,
  selectedItemsCount = 4,
}: ProductSelectionStepSkeletonProps) {
  return (
    <div className="grid gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-[1fr_320px]">
      <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:col-span-2 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-3">
        {Array.from({ length: cardsCount }).map((_, index) => (
          <div
            key={`product-card-skeleton-${index}`}
            className="rounded-md border-1.5 border-[#e7eaee] bg-[#f3f5f7] p-3"
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="mb-3 flex justify-center">
              <div className="h-16.5 w-14 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-200" />

            <div className="flex items-center justify-between">
              <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded-md border border-[#d9dee3] bg-[#f6f7f8] md:col-span-1 lg:col-span-1">
        <div className="border-b border-[#dee3e8] px-4 py-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-3 w-full animate-pulse rounded-full bg-gray-200" />
          <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-90 space-y-3 overflow-y-auto px-4 py-4">
          {Array.from({ length: selectedItemsCount }).map((_, index) => (
            <div
              key={`selected-item-skeleton-${index}`}
              className="flex items-center gap-3"
            >
              <div className="h-12 w-8 animate-pulse rounded bg-gray-200" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <div className="border-t border-[#dee3e8] px-4 py-4">
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
        </div>
      </aside>
    </div>
  );
}
