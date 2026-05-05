/** @format */
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import InfoNav from "./InfoNav";
import NavBar from "./NavBar";
import Footer from "./Footer";
import FooterBanner from "@/components/LandingPageComponents/FooterBanner";
import { ToastContainer } from "react-toastify";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  return (
    <>
      <ToastContainer />
      {!isDashboardRoute && <InfoNav />}
      {!isDashboardRoute && <NavBar />}

      {children}

      {!isDashboardRoute && <FooterBanner />}
      {!isDashboardRoute && <Footer />}
    </>
  );
}
