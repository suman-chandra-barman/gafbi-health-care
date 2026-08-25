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

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AUTH_ENDPOINTS = {
  REFRESH: "/auth/refresh/",
  LOGIN: "/auth/login/",
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RefreshTokenResponse {
  success?: boolean;
  data?: {
    tokens?: {
      access?: string;
    };
  };
}

// ---------------------------------------------------------------------------
// Raw base query
// Attaches the Bearer access token from Redux state to every outgoing request.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Mutex
// Ensures only one token-refresh call is in-flight at any given time.
// ---------------------------------------------------------------------------

const authMutex = new Mutex();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Extracts the URL string from a string or FetchArgs argument.
const getRequestUrl = (args: string | FetchArgs): string =>
  typeof args === "string" ? args : args.url;

// Returns true if the URL targets a refresh or login endpoint.
const isAuthEndpoint = (url: string): boolean =>
  url.includes(AUTH_ENDPOINTS.REFRESH) || url.includes(AUTH_ENDPOINTS.LOGIN);

// ---------------------------------------------------------------------------
// tryRefreshToken
// Calls the refresh endpoint and saves the new access token on success.
// Returns true on success, false on failure.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// baseQueryWithReauth
//
// Wraps rawBaseQuery with automatic token-refresh logic:
//
//  1. Wait for any in-progress refresh to finish before sending the request.
//  2. If the response is 401, acquire the mutex so only one refresh fires.
//  3. After acquiring the lock, retry the original request first — if it
//     succeeds, a competing request already refreshed the token, so we skip
//     the refresh endpoint (prevents double-rotation that clears the cookie).
//  4. If the retry still returns 401, call tryRefreshToken, then retry.
//  5. If refresh fails, dispatch logout.
// ---------------------------------------------------------------------------

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Step 1 — if a refresh is in progress, wait for it before proceeding.
  await authMutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  // Step 2 — only handle 401 Unauthorized.
  if (result.error?.status !== 401) {
    return result;
  }

  // Guard — never attempt re-auth for refresh/login endpoints (avoids loops).
  if (isAuthEndpoint(getRequestUrl(args))) {
    return result;
  }

  // Step 3 — acquire the mutex.
  // We always call acquire() directly; using isLocked() as a pre-check is
  // non-atomic and can allow two concurrent 401s to both attempt a refresh,
  // rotating the server's refresh-token cookie twice and invalidating it.
  const release = await authMutex.acquire();

  try {
    // Step 3a — retry the original request after acquiring the lock.
    // If another request refreshed the token while we were waiting, this
    // retry will succeed and we skip the refresh endpoint entirely.
    const retryResult = await rawBaseQuery(args, api, extraOptions);

    if (!retryResult.error) {
      result = retryResult;
    } else {
      // Step 4 — still 401: we are responsible for refreshing the token.
      const refreshed = await tryRefreshToken(api, extraOptions);

      if (refreshed) {
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // Step 5 — refresh failed; log the user out.
        api.dispatch(logout());
      }
    }
  } finally {
    release();
  }

  return result;
};

// ---------------------------------------------------------------------------
// baseApi
// Central RTK Query API instance shared across all feature slices.
// ---------------------------------------------------------------------------

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
