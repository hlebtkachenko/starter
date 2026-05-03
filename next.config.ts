import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // Hardening (output: standalone, headers, CSP) deferred to Area 8 once SST is wired.
};

export default nextConfig;
