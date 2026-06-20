import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"],
  },

  async rewrites() {
    return [
    {
      source: "/editor/:path*",
      destination: "http://localhost:8080/:path*",
    },
    {
      source: "/static-development/:path*",
      destination: "http://localhost:8080/static-development/:path*",
    },
    {
      source: "/manifest.json",
      destination: "http://localhost:8080/manifest.json",
},
    ];
  },
};

export default nextConfig;