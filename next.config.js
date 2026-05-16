/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  swcMinify: true,
  compiler: {
    removeConsole: false, // Changed to false for easier debugging
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
