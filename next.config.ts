/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75, 50, 25],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "l9vtwvjb-8002.inc1.devtunnels.ms",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
