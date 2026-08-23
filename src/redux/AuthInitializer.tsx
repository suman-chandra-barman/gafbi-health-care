"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  setToken,
  setInitialized,
  logout,
} from "@/redux/features/auth/authSlice";
import {
  useRefreshTokenMutation,
  useLazyGetMeQuery,
} from "@/redux/features/auth/authApi";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const [triggerGetMe] = useLazyGetMeQuery();
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    const initializeAuth = async () => {
      try {
        const response = await refreshToken(undefined).unwrap();
        const access = response?.data?.tokens?.access;

        if (response?.success && access) {
          dispatch(setToken(access));
          await triggerGetMe(undefined).unwrap();
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      } finally {
        dispatch(setInitialized(true));
      }
    };

    initializeAuth();
  }, [dispatch, refreshToken, triggerGetMe]);

  return <>{children}</>;
}
