import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setToken, logout } from "../features/auth/authSlice";

class Mutex {
  private _isLocked = false;
  private _waiters: Array<() => void> = [];

  isLocked(): boolean {
    return this._isLocked;
  }

  async acquire(): Promise<() => void> {
    if (this._isLocked) {
      await new Promise<void>((resolve) => this._waiters.push(resolve));
    }
    this._isLocked = true;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      const next = this._waiters.shift();
      if (next) {
        next();
      } else {
        this._isLocked = false;
      }
    };
  }

  async waitForUnlock(): Promise<void> {
    if (!this._isLocked) return;
    await new Promise<void>((resolve) => {
      const check = () => {
        if (!this._isLocked) {
          resolve();
        } else {
          this._waiters.push(check);
        }
      };
      this._waiters.push(check);
    });
  }
}

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL + "/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      const headerValue = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      headers.set("Authorization", headerValue);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const url = typeof args === "string" ? args : args.url;
    // Don't trigger re-auth loop if the failing request is refresh or login
    if (url.includes("/auth/refresh/") || url.includes("/auth/login/")) {
      return result;
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = (await rawBaseQuery(
          {
            url: "/auth/refresh/",
            method: "POST",
          },
          api,
          extraOptions,
        )) as {
          data?: {
            success?: boolean;
            data?: { tokens?: { access?: string } };
          };
        };

        const newAccessToken = refreshResult.data?.data?.tokens?.access;
        if (refreshResult.data?.success && newAccessToken) {
          api.dispatch(setToken(newAccessToken));
          // Retry initial query with new token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch {
        api.dispatch(logout());
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
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

