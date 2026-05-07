import { baseApi } from "@/redux/api/baseApi";

export interface CareBoxProduct {
  id: number;
  image_url: string;
  product_id: string;
  name: string;
  price: string;
  quantity: string;
  unit: string;
  quantity_with_unit: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface CareBoxProductListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: CareBoxProduct[];
}

export interface ApplyCareBoxPayload {
  products: Array<{ product_id: number; quantity: number }>;
  gender: "mister" | "woman" | "diverse" | "";
  first_name: string;
  last_name: string;
  date_of_birth: string;
  level_of_care: number | null;
  street_address: string;
  area: string;
  city: string;
  zip_code: string;
  different_delivery_address: boolean;
  email: string;
  phone_number: string;
  consultation_answer: string;
  consultation_reason?: string;
  already_provided_with_care_aids: boolean;
  insurance_type: "legally_insured" | "privately_insured" | "local_social_welfare_office" | "";
  insurance_name: string;
  insurance_number: string;
  signature: string;
  signed_cost_assumption: boolean;
  signed_supplier_change: boolean;
}

export interface ApplyCareBoxResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    gender: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    level_of_care: number;
    street_address: string;
    area: string;
    city: string;
    zip_code: string;
    different_delivery_address: boolean;
    email: string;
    phone_number: string;
    consultation_answer: string;
    consultation_reason: string | null;
    already_provided_with_care_aids: boolean;
    insurance_type: string;
    insurance_name: string;
    insurance_number: string;
    signature: string;
    signed_cost_assumption: boolean;
    signed_supplier_change: boolean;
    total_amount: string;
    application_month: string;
    created_at: string;
    items: Array<{
      id: number;
      product: number;
      product_name: string;
      product_image_url: string;
      quantity: number;
      unit_price: string;
      subtotal: string;
    }>;
  };
}

export interface CareBoxFeedbackPayload {
  application: number;
  satisfaction:
    | "very_satisfied"
    | "satisfied"
    | "ok"
    | "dissatisfied"
    | "very_dissatisfied";
  information_helpful: boolean;
}

export interface CareBoxFeedbackResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    application: number;
    satisfaction: string;
    information_helpful: boolean;
    created_at: string;
  };
}

export const careBoxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCareBoxProducts: builder.query<CareBoxProductListResponse, void>({
      query: () => ({
        url: "/care-box/products/",
        method: "GET",
      }),
    }),
    applyCareBox: builder.mutation<ApplyCareBoxResponse, ApplyCareBoxPayload>({
      query: (payload) => ({
        url: "/care-box/apply/",
        method: "POST",
        body: payload,
      }),
    }),
    submitCareBoxFeedback: builder.mutation<
      CareBoxFeedbackResponse,
      CareBoxFeedbackPayload
    >({
      query: (payload) => ({
        url: "/care-box/feedback/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetCareBoxProductsQuery,
  useApplyCareBoxMutation,
  useSubmitCareBoxFeedbackMutation,
} = careBoxApi;
