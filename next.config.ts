import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g7elkvtxkvm8hu72.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
