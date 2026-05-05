/** @format */

"use client";

import Image from "next/image";

export default function FooterBanner() {
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
