/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Adjust based on your local setup
      },
    ],
    domains: [
      "res.cloudinary.com",
      "firebasestorage.googleapis.com",
      "localhost",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint errors during deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Allows builds to pass even if TypeScript has errors
  },
};

module.exports = nextConfig;
