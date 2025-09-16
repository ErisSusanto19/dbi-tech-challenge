import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.dapurbuzzer.co.id",
        port: "",
        pathname: "/storage/avatar/**"
      },
      {
        protocol: "https",
        hostname: "app.dapurbuzzer.co.id",
        port: "",
        pathname: "/images/**"
      },
      {
        protocol: "https",
        hostname: "dapurbuzzer.co.id",
        port: "",
        pathname: "/assets/img/**"
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/**`,
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
