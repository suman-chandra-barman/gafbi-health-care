import { baseApi } from "@/redux/api/baseApi";

export interface DeliveryAddressCurrentAddress {
  name: string;
  street_address: string;
  area: string;
  city: string;
  zip_code: string;
  email: string;
  phone_number: string;
}

export interface DeliveryAddressData {
  id: number;
  current_address: DeliveryAddressCurrentAddress;
  street_address: string;
  area: string;
  city: string;
  zip_code: string;
  email: string;
  phone_number: string;
}

export interface DeliveryAddressResponse {
  success: boolean;
  message: string;
  data: DeliveryAddressData;
}

export interface UpdateDeliveryAddressPayload {
  street_address: string;
  area: string;
  city: string;
  zip_code: string;
  phone_number: string;
}

export const deliveryAddressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDeliveryAddress: builder.query<DeliveryAddressResponse, void>({
      query: () => ({
        url: "/care-box/user-dashboard/delivery-address/",
        method: "GET",
      }),
      providesTags: ["DeliveryAddress"],
    }),
    updateUserDeliveryAddress: builder.mutation<
      DeliveryAddressResponse,
      UpdateDeliveryAddressPayload
    >({
      query: (payload) => ({
        url: "/care-box/user-dashboard/delivery-address/update/",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["DeliveryAddress"],
    }),
  }),
});

export const {
  useGetUserDeliveryAddressQuery,
  useUpdateUserDeliveryAddressMutation,
} = deliveryAddressApi;
