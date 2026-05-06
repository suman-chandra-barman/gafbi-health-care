import { baseApi } from "@/redux/api/baseApi";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  order: number;
  created_at: string;
}

export interface FaqListMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface FaqListResponse {
  success: boolean;
  message: string;
  meta: FaqListMeta;
  data: FaqItem[];
}

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FaqListResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/faqs/?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Faqs"],
    }),
  }),
});

export const { useGetFaqsQuery } = faqsApi;
