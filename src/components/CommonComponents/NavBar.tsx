/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const navItems = [
    { label: t("nav.aboutUs"), href: "/#about" },
    { label: t("nav.careBox"), href: "/#carebox" },
    { label: t("common.products"), href: "/products" },
    { label: t("common.contact"), href: "/contact" },
    { label: t("common.faqs"), href: "/faqs" },
  ];

  const isActiveLink = (href: string) => {
    if (href.includes("#")) {
      return pathname === "/";
    }

    return pathname === href;
  };

  return (
    <header className="w-full bg-[#f3f3f3]">
      <div className="mx-auto flex w-full max-w-625 flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="GAFBI Health Care"
            width={58}
            height={58}
            priority
          />
          <p className="text-2xl font-semibold leading-none tracking-tight text-primary">
            {t("common.brand")}
          </p>
        </Link>

        <nav className="w-full overflow-x-auto rounded-xl border border-black/10 bg-[#efefef] shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:w-auto">
          <div className="flex w-max min-w-full items-center gap-0">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`border-r border-black/10 px-3 py-2 text-sm font-medium text-[#3b3b3b] transition-colors hover:bg-white last:border-r-0 sm:text-base ${
                  isActiveLink(item.href) ? "bg-white" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
