import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages normally hosts at username.github.io/repo-name/
  basePath: '/cyberdigm-ax-planner-os',
  assetPrefix: '/cyberdigm-ax-planner-os',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
