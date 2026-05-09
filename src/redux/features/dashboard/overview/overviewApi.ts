import { baseApi } from "@/redux/api/baseApi";

export interface OverviewItem {
  id: number;
  product: number;
  product_name: string;
  product_image_url?: string | null;
  quantity: number;
  quantity_with_unit?: string | null;
}

export interface OverviewApplication {
  id: number;
  month: string;
  status: string;
  application_month: string;
  created_at: string;
  items: OverviewItem[];
}

export interface OverviewData {
  next_shipping_date: string | null;
  note: string | null;
  latest_application: OverviewApplication | null;
  applications: OverviewApplication[];
}

export interface OverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
}

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardOverview: builder.query<OverviewResponse, void>({
      query: () => ({
        url: "/care-box/user-dashboard/overview/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserDashboardOverviewQuery } = overviewApi;
