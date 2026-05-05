import { baseApi } from "@/redux/api/baseApi";
import { updateUser } from "@/redux/features/auth/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup/",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resendEmailVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-email-verify-otp/",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-forgot-password-otp/",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data.user));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    getUserAccountSettings: builder.query({
      query: () => ({
        url: "/auth/user/account-settings/",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data));
          }
        } catch {
          // silently ignore
        }
      },
    }),
    updateUserAccount: builder.mutation({
      query: (formData) => ({
        url: "/auth/user/account-settings/update/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(updateUser(data.data));
          }
        } catch {
          // silently ignore
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useResendEmailVerifyOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useGetUserAccountSettingsQuery,
  useUpdateUserAccountMutation,
} = authApi;
