/** @format */
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Box,
  CloudUpload,
  Headset,
  List,
  LogOut,
  Truck,
  User,
} from "lucide-react";
import { useDashboardSidebar } from "./DashboardSidebarProvider";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileMenuOpen, closeMobileMenu } =
    useDashboardSidebar();

  const navItems = [
    {
      href: "/dashboard/overview",
      icon: List,
      label: "Overview",
    },
    {
      href: "/dashboard/manage-gafbi-box",
      icon: Box,
      label: "Manage Gafbi box",
    },
    {
      href: "/dashboard/manage-delivery-address",
      icon: Truck,
      label: "Manage delivery address",
    },
    {
      href: "/dashboard/personal-data",
      icon: User,
      label: "Personal data",
    },
    {
      href: "/dashboard/login-data",
      icon: CloudUpload,
      label: "Login data",
    },
    {
      href: "/dashboard/customer-service",
      icon: Headset,
      label: "Customer service",
    },
    {
      href: "/dashboard/unsubscribe",
      icon: LogOut,
      label: "Unsubscribe",
    },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed md:relative z-40 h-screen shrink-0 border-r border-white/70 bg-[#e8f0f7] transition-all duration-300",
          isCollapsed ? "md:w-20" : "md:w-70",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
          "w-70",
        )}
      >
        <div className={cn("pt-5", isCollapsed ? "px-3" : "px-5")}>
          <Link
            href="/"
            className={cn(
              "flex items-center",
              isCollapsed ? "justify-center" : "gap-3",
            )}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={44}
              height={44}
              className="h-10 w-10 rounded-full object-contain"
            />

            {!isCollapsed && (
              <span className="text-[1.05rem] font-semibold tracking-tight text-[#376592]">
                Gafbi Health Care
              </span>
            )}
          </Link>
        </div>

        {!isCollapsed && (
          <div className="px-5 py-6">
            <p className="text-[1.05rem] font-semibold leading-none text-[#345f86]">
              Alex Morgan
            </p>
            <p className="mt-1 text-[0.76rem] leading-none text-[#6e89a1]">
              alexmorgan86@gmail.com
            </p>
          </div>
        )}

        <nav className={cn("pb-4 space-y-2", isCollapsed ? "px-2" : "px-3")}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  isCollapsed
                    ? "flex h-11 items-center justify-center rounded-xl px-2 py-3 text-[0.96rem] font-medium transition-all duration-200"
                    : "flex items-center gap-3 rounded-xl px-4 py-3.5 text-[0.96rem] font-medium transition-all duration-200",
                  isActive
                    ? "bg-white text-[#2f5e93] shadow-[0_8px_20px_rgba(39,71,106,0.08)]"
                    : "text-[#5e7f9c] hover:bg-white/70 hover:text-[#2f5e93]",
                )}
              >
                <Icon size={19} strokeWidth={2} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
