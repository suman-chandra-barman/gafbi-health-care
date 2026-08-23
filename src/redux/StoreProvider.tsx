"use client";

import { useState } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "@/redux/store";
import AuthInitializer from "@/redux/AuthInitializer";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}

