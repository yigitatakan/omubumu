/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://would-you-rather-tr.vercel.app' : '',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      }
    }
    return config
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  }
}

module.exports = nextConfig
