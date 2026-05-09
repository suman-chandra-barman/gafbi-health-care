const OverviewSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="rounded-xl bg-[var(--color-card-bg)] px-4 py-3">
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`overview-skeleton-${index}`} className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="rounded-xl bg-[var(--color-card-bg)] px-4 py-4">
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((__, itemIndex) => (
                <div
                  key={`overview-item-skeleton-${index}-${itemIndex}`}
                  className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2"
                >
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewSkeleton;
