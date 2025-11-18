import type { NextConfig } from "next";
import { copyFileSync } from "fs";
import { join } from "path";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      // Copy Prisma binaries to the output
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.CopyPlugin({
          patterns: [
            {
              from: join(__dirname, "src/generated/prisma/libquery_engine-*.so.node"),
              to: join(__dirname, ".next/standalone/src/generated/prisma/"),
              noErrorOnMissing: true,
            },
          ],
        })
      );
    }
    return config;
  },
};

export default nextConfig;
