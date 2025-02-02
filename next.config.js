/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      {
        protocol: 'https',
        hostname: 'vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'hanshin-branch.org',
      },
    ],
  },
  // Next.js 15の新機能を有効化
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
