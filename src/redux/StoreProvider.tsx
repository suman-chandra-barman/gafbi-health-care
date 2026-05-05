"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "@/redux/store";
import { setCredentials } from "@/redux/features/auth/authSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (typeof window === "undefined" || !storeRef.current) return;

    const userRaw = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (userRaw && accessToken && refreshToken) {
      try {
        const user = JSON.parse(userRaw);
        storeRef.current.dispatch(
          setCredentials({
            user,
            tokens: { access: accessToken, refresh: refreshToken },
          }),
        );
      } catch {
        // Ignore malformed storage
      }
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
