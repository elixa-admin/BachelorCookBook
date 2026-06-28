import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project, silencing the
  // stray home-directory lockfile warning.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
