import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages normally hosts at username.github.io/repo-name/
  basePath: '/cmtx-ax-planner-os',
  assetPrefix: '/cmtx-ax-planner-os',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
