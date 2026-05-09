/** @format */
"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CloudUpload, List, LogOut, Truck, User } from "lucide-react";
import { useDashboardSidebar } from "./DashboardSidebarProvider";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileMenuOpen, closeMobileMenu } =
    useDashboardSidebar();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isUserReady = Boolean(user?.email_address);

  const navItems = [
    {
      href: "/dashboard/overview",
      icon: List,
      label: "Overview",
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
  ];

  return (
    <>
      <div
        className={cn(
          "fixed md:relative z-40 flex h-screen shrink-0 flex-col border-r border-white/70 bg-[#e8f0f7] transition-all duration-300",
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
            {isUserReady ? (
              <>
                <p className="text-[1.05rem] font-semibold leading-none text-[#345f86]">
                  {user?.name ? user?.name : user?.email_address.split("@")[0]}
                </p>
                <p className="mt-1 text-[0.76rem] leading-none text-[#6e89a1]">
                  {user?.email_address}
                </p>
              </>
            ) : (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 w-36 rounded bg-[#c9d8e6]" />
                <div className="h-3 w-44 rounded bg-[#d8e3ee]" />
              </div>
            )}
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

        <div className={cn("mt-auto pb-5", isCollapsed ? "px-2" : "px-3")}>
          <Button
            type="button"
            onClick={() => {
              dispatch(logout());
              router.push("/signin");
            }}
            className={cn(
              "w-full rounded-xl py-3 text-[0.96rem] font-medium text-[#b42318] hover:bg-[#fdecec] cursor-pointer",
              isCollapsed
                ? "flex h-11 items-center justify-center px-2"
                : "flex items-center gap-3 px-4",
            )}
            variant="ghost"
          >
            <LogOut size={19} strokeWidth={2} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
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
