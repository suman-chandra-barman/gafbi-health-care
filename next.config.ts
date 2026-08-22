/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75, 50, 25],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME || "",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
