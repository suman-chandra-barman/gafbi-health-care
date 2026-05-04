/** @format */

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const HIDDEN_ROUTES = ["/apply-box", "/signin", "/register", "/terms", "/privacy", "/forgot-password", "/verify-otp"];

export default function FooterBanner() {
  const pathname = usePathname();

  if (HIDDEN_ROUTES.includes(pathname)) return null;

  return (
    <section className="w-full bg-[#f3f3f3] px-0">
      <div className="relative mx-auto h-30 w-full overflow-hidden">
        <Image
          src="/footerBanner.jpg"
          alt="Footer decorative banner"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}