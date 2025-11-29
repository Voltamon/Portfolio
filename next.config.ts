import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Only apply `basePath` in production/export builds so `next dev` serves at `/`.
  basePath: process.env.NODE_ENV === 'production' ? '/voltamon48' : '',
  // Ensure static assets are served under the repository path on GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/voltamon48' : '',
  // Use directory style URLs in exported output so GitHub Pages serves index.html files
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
