import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project, silencing the
  // stray home-directory lockfile warning.
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      {
        // TUB (public/tub/tub-app.html) is the working copy — see knowledge/ROADMAP.md.
        source: "/",
        destination: "/tub/tub-app.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
