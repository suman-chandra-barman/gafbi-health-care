import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { RootState } from "../store";
import { setToken, logout } from "../features/auth/authSlice";

// ---- Constants ----
const AUTH_ENDPOINTS = {
  REFRESH: "/auth/refresh/",
  LOGIN: "/auth/login/",
} as const;

// ---- Types ----
interface RefreshTokenResponse {
  success?: boolean;
  data?: {
    tokens?: {
      access?: string;
    };
  };
}

// ---- Base query (raw) ----
const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set(
        "Authorization",
        token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      );
    }
    return headers;
  },
});

// ---- Single mutex instance, dedicated to auth token refresh ----
const authMutex = new Mutex();

// ---- Helpers ----
const getRequestUrl = (args: string | FetchArgs): string =>
  typeof args === "string" ? args : args.url;

const isAuthEndpoint = (url: string): boolean =>
  url.includes(AUTH_ENDPOINTS.REFRESH) || url.includes(AUTH_ENDPOINTS.LOGIN);

/**
 * Calls the refresh endpoint and dispatches the new token on success.
 * Returns true if refresh succeeded, false otherwise.
 */
const tryRefreshToken = async (
  api: Parameters<BaseQueryFn>[1],
  extraOptions: Parameters<BaseQueryFn>[2],
): Promise<boolean> => {
  try {
    const refreshResult = await rawBaseQuery(
      { url: AUTH_ENDPOINTS.REFRESH, method: "POST" },
      api,
      extraOptions,
    );

    const data = refreshResult.data as RefreshTokenResponse | undefined;
    const newAccessToken = data?.data?.tokens?.access;

    if (data?.success && newAccessToken) {
      api.dispatch(setToken(newAccessToken));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
};

// ---- Main base query with re-auth ----
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait if another request is currently refreshing the token
  await authMutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  const isUnauthorized =
    result.error?.status === 401 || result.error?.status === 403;

  if (!isUnauthorized) {
    return result;
  }

  const requestUrl = getRequestUrl(args);

  // Avoid infinite loop: don't re-auth on refresh/login failures themselves
  if (isAuthEndpoint(requestUrl)) {
    return result;
  }

  if (authMutex.isLocked()) {
    // Someone else is already refreshing — wait, then retry with new token
    await authMutex.waitForUnlock();
    return rawBaseQuery(args, api, extraOptions);
  }

  const release = await authMutex.acquire();

  try {
    const refreshed = await tryRefreshToken(api, extraOptions);

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  } finally {
    release();
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Faqs",
    "Contacts",
    "Product",
    "DeliveryAddress",
    "PersonalData",
  ],
});
