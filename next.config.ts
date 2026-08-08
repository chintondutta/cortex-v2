import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // silences Turbopack's "unused webpack config" warning in `next dev`; `build` still uses --webpack for the config below
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@prisma/client': '@prisma/client',
      });
    }
    return config;
  },
};

export default nextConfig;
