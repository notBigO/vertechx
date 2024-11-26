/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
      "pub-ad7b9dfb5d1942639c6f3b5196e947c8.r2.dev",
    ],
  },
};

export default nextConfig;
