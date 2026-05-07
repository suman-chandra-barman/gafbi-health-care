import { baseApi } from "@/redux/api/baseApi";

export interface ProductReview {
  id: number;
  name: string;
  email: string;
  rating: number;
  review: string;
  created_at: string;
}

export interface ProductRatingBreakdown {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface ProductItem {
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
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface ProductListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ProductItem[];
}

export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: ProductItem & {
    rating_breakdown: ProductRatingBreakdown;
    reviews: ProductReview[];
  };
}

export interface CreateProductReviewPayload {
  name: string;
  email: string;
  rating: number;
  review: string;
}

export interface CreateProductReviewResponse {
  success: boolean;
  message: string;
  data: ProductReview;
}

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductListResponse, void>({
      query: () => ({
        url: "/products/",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query<ProductDetailsResponse, number | string>({
      query: (productId) => ({
        url: `/products/${productId}/`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    addProductReview: builder.mutation<
      CreateProductReviewResponse,
      { productId: number | string; payload: CreateProductReviewPayload }
    >({
      query: ({ productId, payload }) => ({
        url: `/products/${productId}/reviews/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductReviewMutation,
} = productsApi;
