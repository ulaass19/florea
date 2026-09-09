import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: "/florea",
  assetPrefix: "/florea/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
