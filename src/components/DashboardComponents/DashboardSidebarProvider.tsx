/** @format */
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type DashboardSidebarContextValue = {
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  toggleSidebar: () => void;
  closeMobileMenu: () => void;
};

const DashboardSidebarContext =
  createContext<DashboardSidebarContextValue | null>(null);

export function DashboardSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileMenuOpen((prev) => !prev);
      return;
    }

    setIsCollapsed((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const value = useMemo(
    () => ({
      isCollapsed,
      isMobileMenuOpen,
      toggleSidebar,
      closeMobileMenu,
    }),
    [isCollapsed, isMobileMenuOpen],
  );

  return (
    <DashboardSidebarContext.Provider value={value}>
      {children}
    </DashboardSidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const context = useContext(DashboardSidebarContext);

  if (!context) {
    throw new Error(
      "useDashboardSidebar must be used within DashboardSidebarProvider",
    );
  }

  return context;
}
