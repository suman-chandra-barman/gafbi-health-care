const ManageDeliveryAddressSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="h-7 w-64 animate-pulse rounded bg-slate-200" />

      <div className="flex items-center justify-end">
        <div className="h-10 w-24 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="rounded-xl bg-[var(--color-card-bg)] p-4">
        <div className="h-4 w-52 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={`address-field-skeleton-${index}`} className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-11 w-full animate-pulse rounded bg-slate-200" />
        </div>

        <div className="pt-4">
          <div className="h-11 w-40 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default ManageDeliveryAddressSkeleton;
