/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.255.254.100'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "10.255.254.100",
        port: "4401",
      },
    ],
  },
};

export default nextConfig;
