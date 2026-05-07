/** @format */

const ProductCardSkeleton = () => {
  return (
    <article className="animate-pulse rounded-xl bg-white p-3 shadow-[0_0_0_1px_rgba(15,23,42,0.06)]">
      <div className="mb-3 h-28 rounded-lg bg-linear-to-b from-slate-100 to-slate-200 ring-1 ring-slate-100" />

      <div className="mb-1 h-4 w-3/4 rounded bg-slate-200" />
      <div className="mb-2 h-3 w-1/2 rounded bg-slate-200" />

      <div className="flex items-center justify-between gap-2">
        <div className="h-4 w-16 rounded bg-slate-200" />
        <div className="flex items-center gap-1">
          <div className="h-8 w-16 rounded bg-slate-200" />
          <div className="h-8 w-16 rounded bg-slate-200" />
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
