const PersonalDataSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />

      <div className="flex items-center justify-end">
        <div className="h-10 w-24 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="flex items-center gap-4">
        <div className="h-20 w-20 animate-pulse rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
          <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`gender-skeleton-${index}`}
              className="flex items-center gap-2"
            >
              <div className="h-5 w-5 animate-pulse rounded-full bg-slate-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={`name-skeleton-${index}`} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="pt-4">
        <div className="h-11 w-40 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
};

export default PersonalDataSkeleton;
