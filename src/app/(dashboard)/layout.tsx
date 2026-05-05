/** @format */

import DashboardSidebar from "@/components/DashboardComponents/DashboardSidebar";
import { DashboardSidebarProvider } from "@/components/DashboardComponents/DashboardSidebarProvider";
import NavBar from "@/components/DashboardComponents/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Gafbi Health Care",
  description: "User Dashboard - Manage your Gafbi Box",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardSidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <NavBar />
          <div className="flex-1 overflow-auto bg-root-bg px-6 lg:px-8 py-1 lg:py-2">
            <div className="min-h-screen">{children}</div>
          </div>
        </div>
      </div>
    </DashboardSidebarProvider>
  );
}
