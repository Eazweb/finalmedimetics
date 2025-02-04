/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This will apply the runtime configuration globally
    runtime: 'edge',
    // This ensures all pages use the edge runtime
    serverComponents: {
      defaultRuntime: 'edge',
    },
  },
  images: {
    unoptimized: true,
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
        port: "3000",
      },
    ],
    domains: [
      "res.cloudinary.com",
      "firebasestorage.googleapis.com",
      "localhost",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production'
              ? `${process.env.NEXTAUTH_URL}, ${process.env.SECONDARY_URL}, ${process.env.PRIMARY_URL}`
              : 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;