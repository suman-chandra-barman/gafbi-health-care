/** @format */

"use client";

import Image from "next/image";
import { PageHeader } from "@/components/HomeComponents";
import OverviewSkeleton from "@/components/Skeleton/OverviewSkeleton";
import { useGetUserDashboardOverviewQuery } from "@/redux/features/dashboard/overview/overviewApi";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

import type {
  OverviewApplication,
  OverviewData,
} from "@/redux/features/dashboard/overview/overviewApi";

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  approved: {
    label: "Approved",
    className: "bg-[var(--color-button-bg)] text-white",
  },
  delivered: {
    label: "Approved",
    className: "bg-[var(--color-button-bg)] text-white",
  },
  pending: { label: "Pending", className: "bg-[#f59e0b] text-white" },
  rejected: { label: "Rejected", className: "bg-[#ef4444] text-white" },
  processing: { label: "Pending", className: "bg-[#f59e0b] text-white" },
};

const getErrorMessage = (error?: FetchBaseQueryError | SerializedError) => {
  if (!error) {
    return "Failed to load overview data";
  }

  if ("status" in error) {
    const data = error.data as { message?: string } | undefined;
    return data?.message ?? "Failed to load overview data";
  }

  return error.message ?? "Failed to load overview data";
};

const OverviewPage = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data, isLoading, isError, error, isUninitialized } =
    useGetUserDashboardOverviewQuery(undefined, { skip: !token });
  const overviewData: OverviewData | null = data?.data ?? null;
  const applications: OverviewApplication[] = overviewData?.applications?.length
    ? overviewData.applications
    : overviewData?.latest_application
      ? [overviewData.latest_application]
      : [];
  const isFetchingOverview = isLoading || isUninitialized;

  return (
    <div className="w-full max-w-2xl space-y-6">
      <PageHeader title="Overview" />

      {isFetchingOverview ? (
        <OverviewSkeleton />
      ) : isError ? (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {getErrorMessage(error)}
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-base md:text-lg font-semibold text-primary mb-3">
            Your next Gafbi box contents
          </h2>

          <div className="space-y-5">
            {applications.length === 0 ? (
              <div className="rounded-xl bg-[var(--color-card-bg)] px-4 py-3 text-sm text-secondary">
                No applications found yet.
              </div>
            ) : (
              applications.map((application) => {
                const normalizedStatus = application.status?.toLowerCase();
                const statusConfig =
                  STATUS_STYLES[normalizedStatus] ?? STATUS_STYLES.pending;

                return (
                  <div key={application.id} className="space-y-2">
                    <p className="text-sm font-semibold text-primary">
                      {application.month}
                    </p>

                    <div className="rounded-xl bg-[var(--color-card-bg)] px-4 py-4">
                      <div className="space-y-3">
                        {application.items?.map((item) => {
                          const imageUrl = item.product_image_url
                            ? item.product_image_url.startsWith("http")
                              ? item.product_image_url
                              : `${process.env.NEXT_PUBLIC_BASE_URL}${item.product_image_url}`
                            : null;

                          return (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 rounded-lg bg-white/70 px-3 py-2"
                            >
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                                {imageUrl ? (
                                  <Image
                                    src={imageUrl}
                                    alt={item.product_name}
                                    width={44}
                                    height={44}
                                    className="h-10 w-10 object-contain"
                                  />
                                ) : (
                                  <div className="h-8 w-8 rounded bg-slate-200" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-primary">
                                  {item.product_name}
                                </p>
                                <p className="text-xs text-tertiary">
                                  {item.quantity_with_unit ?? item.quantity}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <span
                          className={`rounded-md px-3 py-1 text-xs font-semibold ${statusConfig.className}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
