import { baseApi } from "@/redux/api/baseApi";

export interface ContactSubmitPayload {
  first_name: string;
  last_name: string;
  email: string;
  telephone_number: string;
  regarding: string;
  news: string;
}

export interface ContactSubmitResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone_number: string;
    regarding: string;
    news: string;
    is_read: boolean;
    created_at: string;
  };
}

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<
      ContactSubmitResponse,
      ContactSubmitPayload
    >({
      query: (payload) => ({
        url: "/contacts/submit/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactsApi;
