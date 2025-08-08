import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Skip ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Skip TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
